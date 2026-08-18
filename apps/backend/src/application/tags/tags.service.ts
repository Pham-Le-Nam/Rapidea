import { Inject, Injectable } from '@nestjs/common';
import { TagsRepository } from '../../domain/tags/repositories/tags.repository';
import { EDUCATION_TAGS } from '../../domain/tags/education-tags';
import { AI_SERVICE, AiService } from '../ports/ai.service';

type SuggestedTag = {
    id: string;
    name: string;
    score: number;
};

@Injectable()
export class TagsService {
    constructor(
        @Inject('TAGS_REPOSITORY') private readonly tagsRepo: TagsRepository,
        @Inject(AI_SERVICE) private readonly aiService: AiService,
    ) {}

    async ensureDefaultTags() {
        await this.tagsRepo.ensure(EDUCATION_TAGS);
    }

    async listTags() {
        await this.ensureDefaultTags();

        return this.tagsRepo.list();
    }

    async suggestTags(text: string, limit = 5): Promise<SuggestedTag[]> {
        await this.ensureDefaultTags();

        const normalizedText = this.normalizeText(text);
        if (!normalizedText) {
            return [];
        }

        const tags = await this.tagsRepo.listWithEmbeddings();

        const textEmbedding = await this.createEmbedding(normalizedText);
        if (!textEmbedding) {
            return this.lexicalSuggestions(tags, normalizedText, limit);
        }

        const missingEmbeddingTags = tags.filter((tag) => !Array.isArray(tag.embedding));
        if (missingEmbeddingTags.length > 0) {
            await this.backfillTagEmbeddings(missingEmbeddingTags);
        }

        const refreshedTags = missingEmbeddingTags.length > 0
            ? await this.tagsRepo.listWithEmbeddings()
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

        await this.tagsRepo.replaceCourseTags(courseId, tags, isSuggested);

        return tags;
    }

    async setPostTags(postId: string, tagNames: string[], isSuggested = false) {
        const tags = await this.upsertTagsByName(tagNames);

        await this.tagsRepo.replacePostTags(postId, tags, isSuggested);

        return tags;
    }

    async setFileSuggestedTags(fileId: string, suggestions: SuggestedTag[]) {
        const tagNames = suggestions.slice(0, 5).map((tag) => tag.name);
        const tags = await this.upsertTagsByName(tagNames);
        const scoreByName = new Map(suggestions.map((tag) => [tag.name, tag.score]));

        await this.tagsRepo.replaceFileTags(fileId, tags, scoreByName);

        return tags;
    }

    async addFileTagsToPost(postId: string, fileId: string) {
        const fileTags = await this.tagsRepo.findFileTags([fileId]);

        if (fileTags.length === 0) {
            return [];
        }

        await this.tagsRepo.addFileTagsToPost(postId, fileTags);

        return fileTags.map((fileTag) => fileTag.tag);
    }

    async getFileTagNames(fileIds: string[]) {
        if (fileIds.length === 0) {
            return [];
        }

        const fileTags = await this.tagsRepo.findFileTags(fileIds);

        return Array.from(new Set(fileTags.map((fileTag) => fileTag.tag.name)));
    }

    async createTranscript(fileId: string) {
        return this.tagsRepo.createTranscript(fileId);
    }

    async completeTranscript(fileId: string, text: string, language?: string, durationSec?: number) {
        return this.tagsRepo.completeTranscript(fileId, text, language, durationSec);
    }

    async failTranscript(fileId: string, errorMessage: string) {
        return this.tagsRepo.failTranscript(fileId, errorMessage);
    }

    async transcribeMedia(uploadedFile: Express.Multer.File) {
        return this.aiService.transcribeMedia(uploadedFile);
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

        await this.tagsRepo.ensure(cleanTagNames);
        return this.tagsRepo.findByNames(cleanTagNames);
    }

    private async backfillTagEmbeddings(tags: { id: string; name: string }[]) {
        const embeddings = await this.createEmbeddings(tags.map((tag) => tag.name));
        if (!embeddings) {
            return;
        }

        await this.tagsRepo.updateEmbeddings(tags, embeddings);
    }

    private async createEmbedding(text: string) {
        const embeddings = await this.createEmbeddings([text]);
        return embeddings?.[0] ?? null;
    }

    private async createEmbeddings(input: string[]) {
        return this.aiService.createEmbeddings(input);
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
