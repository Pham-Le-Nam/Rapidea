import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EDUCATION_TAGS } from './education-tags';

type SuggestedTag = {
    id: string;
    name: string;
    score: number;
};

@Injectable()
export class TagsService {
    private readonly embeddingModel = process.env.TEXT_EMBEDDING_MODEL || 'text-embedding-3-small';
    private readonly openAiApiKey = process.env.OPENAI_API_KEY;

    constructor(private readonly prisma: PrismaService) {}

    async ensureDefaultTags() {
        await this.prisma.$transaction(
            EDUCATION_TAGS.map((name) => this.prisma.tag.upsert({
                where: { name },
                update: {},
                create: { name },
            })),
        );
    }

    async listTags() {
        await this.ensureDefaultTags();

        return this.prisma.tag.findMany({
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
            },
        });
    }

    async suggestTags(text: string, limit = 5): Promise<SuggestedTag[]> {
        await this.ensureDefaultTags();

        const normalizedText = this.normalizeText(text);
        if (!normalizedText) {
            return [];
        }

        const tags = await this.prisma.tag.findMany({
            select: {
                id: true,
                name: true,
                embedding: true,
            },
        });

        const textEmbedding = await this.createEmbedding(normalizedText);
        if (!textEmbedding) {
            return this.lexicalSuggestions(tags, normalizedText, limit);
        }

        const missingEmbeddingTags = tags.filter((tag) => !Array.isArray(tag.embedding));
        if (missingEmbeddingTags.length > 0) {
            await this.backfillTagEmbeddings(missingEmbeddingTags);
        }

        const refreshedTags = missingEmbeddingTags.length > 0
            ? await this.prisma.tag.findMany({
                select: {
                    id: true,
                    name: true,
                    embedding: true,
                },
            })
            : tags;

        const scoredTags = refreshedTags
            .map((tag) => ({
                id: tag.id,
                name: tag.name,
                score: Array.isArray(tag.embedding)
                    ? this.cosineSimilarity(textEmbedding, tag.embedding as number[])
                    : this.lexicalScore(tag.name, normalizedText),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);

        return scoredTags;
    }

    async setCourseTags(courseId: string, tagNames: string[], isSuggested = false) {
        const tags = await this.upsertTagsByName(tagNames);

        await this.prisma.courseTag.deleteMany({
            where: { courseId },
        });

        if (tags.length === 0) {
            return [];
        }

        await this.prisma.courseTag.createMany({
            data: tags.map((tag) => ({
                courseId,
                tagId: tag.id,
                isSuggested,
            })),
            skipDuplicates: true,
        });

        return tags;
    }

    async setPostTags(postId: string, tagNames: string[], isSuggested = false) {
        const tags = await this.upsertTagsByName(tagNames);

        await this.prisma.postTag.deleteMany({
            where: { postId },
        });

        if (tags.length === 0) {
            return [];
        }

        await this.prisma.postTag.createMany({
            data: tags.map((tag) => ({
                postId,
                tagId: tag.id,
                isSuggested,
            })),
            skipDuplicates: true,
        });

        return tags;
    }

    async setFileSuggestedTags(fileId: string, suggestions: SuggestedTag[]) {
        const tagNames = suggestions.slice(0, 5).map((tag) => tag.name);
        const tags = await this.upsertTagsByName(tagNames);
        const scoreByName = new Map(suggestions.map((tag) => [tag.name, tag.score]));

        await this.prisma.fileTag.deleteMany({
            where: { fileId },
        });

        if (tags.length === 0) {
            return [];
        }

        await this.prisma.fileTag.createMany({
            data: tags.map((tag) => ({
                fileId,
                tagId: tag.id,
                isSuggested: true,
                score: scoreByName.get(tag.name),
            })),
            skipDuplicates: true,
        });

        return tags;
    }

    async addFileTagsToPost(postId: string, fileId: string) {
        const fileTags = await this.prisma.fileTag.findMany({
            where: { fileId },
            include: { tag: true },
        });

        if (fileTags.length === 0) {
            return [];
        }

        await this.prisma.postTag.createMany({
            data: fileTags.map((fileTag) => ({
                postId,
                tagId: fileTag.tagId,
                isSuggested: true,
                score: fileTag.score,
            })),
            skipDuplicates: true,
        });

        return fileTags.map((fileTag) => fileTag.tag);
    }

    async getFileTagNames(fileIds: string[]) {
        if (fileIds.length === 0) {
            return [];
        }

        const fileTags = await this.prisma.fileTag.findMany({
            where: {
                fileId: { in: fileIds },
            },
            include: { tag: true },
        });

        return Array.from(new Set(fileTags.map((fileTag) => fileTag.tag.name)));
    }

    async createTranscript(fileId: string) {
        return this.prisma.fileTranscript.upsert({
            where: { fileId },
            update: {
                status: 'PROCESSING',
                errorMessage: null,
                provider: 'openai',
                model: process.env.VIDEO_TRANSCRIPTION_MODEL || 'gpt-4o-mini-transcribe',
            },
            create: {
                fileId,
                status: 'PROCESSING',
                provider: 'openai',
                model: process.env.VIDEO_TRANSCRIPTION_MODEL || 'gpt-4o-mini-transcribe',
            },
        });
    }

    async completeTranscript(fileId: string, text: string, language?: string, durationSec?: number) {
        return this.prisma.fileTranscript.update({
            where: { fileId },
            data: {
                status: 'COMPLETED',
                text,
                language,
                durationSec,
                errorMessage: null,
            },
        });
    }

    async failTranscript(fileId: string, errorMessage: string) {
        return this.prisma.fileTranscript.update({
            where: { fileId },
            data: {
                status: 'FAILED',
                errorMessage,
            },
        });
    }

    async transcribeMedia(uploadedFile: Express.Multer.File) {
        const apiKey = this.openAiApiKey;
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not configured');
        }

        const model = process.env.VIDEO_TRANSCRIPTION_MODEL || 'gpt-4o-mini-transcribe';
        const formData = new FormData();
        formData.append('model', model);
        formData.append(
            'file',
            new Blob([new Uint8Array(uploadedFile.buffer)], { type: uploadedFile.mimetype }),
            uploadedFile.originalname,
        );

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Transcription failed with status ${response.status}`);
        }

        const data = await response.json() as { text?: string; language?: string; duration?: number };
        return data.text ?? '';
    }

    private async upsertTagsByName(tagNames: string[]) {
        await this.ensureDefaultTags();
        const cleanTagNames = Array.from(new Set(
            tagNames
                .map((tagName) => tagName.trim().toLowerCase())
                .filter(Boolean),
        ));

        if (cleanTagNames.length === 0) {
            return [];
        }

        await this.prisma.$transaction(
            cleanTagNames.map((name) => this.prisma.tag.upsert({
                where: { name },
                update: {},
                create: { name },
            })),
        );

        return this.prisma.tag.findMany({
            where: {
                name: { in: cleanTagNames },
            },
            select: {
                id: true,
                name: true,
            },
        });
    }

    private async backfillTagEmbeddings(tags: { id: string; name: string }[]) {
        const embeddings = await this.createEmbeddings(tags.map((tag) => tag.name));
        if (!embeddings) {
            return;
        }

        await this.prisma.$transaction(
            tags.map((tag, index) => this.prisma.tag.update({
                where: { id: tag.id },
                data: {
                    embedding: embeddings[index] ?? undefined,
                },
            })),
        );
    }

    private async createEmbedding(text: string) {
        const embeddings = await this.createEmbeddings([text]);
        return embeddings?.[0] ?? null;
    }

    private async createEmbeddings(input: string[]) {
        const apiKey = this.openAiApiKey;
        if (!apiKey) {
            return null;
        }

        try {
            const response = await fetch('https://api.openai.com/v1/embeddings', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.embeddingModel,
                    input,
                }),
            });

            if (!response.ok) {
                return null;
            }

            const data = await response.json() as { data?: { embedding: number[] }[] };
            return data.data?.map((item) => item.embedding) ?? null;
        } catch {
            return null;
        }
    }

    private lexicalSuggestions(tags: { id: string; name: string }[], text: string, limit: number) {
        return tags
            .map((tag) => ({
                id: tag.id,
                name: tag.name,
                score: this.lexicalScore(tag.name, text),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    private lexicalScore(tagName: string, text: string) {
        const words = tagName.split(/[-\s]+/).filter(Boolean);
        const directMatch = text.includes(tagName) ? 2 : 0;
        const wordMatches = words.reduce((score, word) => score + (text.includes(word) ? 1 : 0), 0);
        return directMatch + wordMatches / Math.max(words.length, 1);
    }

    private cosineSimilarity(a: number[], b: number[]) {
        let dot = 0;
        let aMagnitude = 0;
        let bMagnitude = 0;

        for (let index = 0; index < Math.min(a.length, b.length); index += 1) {
            dot += a[index] * b[index];
            aMagnitude += a[index] * a[index];
            bMagnitude += b[index] * b[index];
        }

        if (aMagnitude === 0 || bMagnitude === 0) {
            return 0;
        }

        return dot / (Math.sqrt(aMagnitude) * Math.sqrt(bMagnitude));
    }

    private normalizeText(text: string) {
        return text.toLowerCase().replace(/\s+/g, ' ').trim();
    }
}
