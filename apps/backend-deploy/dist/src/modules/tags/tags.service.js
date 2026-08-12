"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const education_tags_1 = require("./education-tags");
let TagsService = class TagsService {
    tagsRepo;
    embeddingModel = process.env.TEXT_EMBEDDING_MODEL || 'text-embedding-3-small';
    openAiApiKey = process.env.OPENAI_API_KEY;
    constructor(tagsRepo) {
        this.tagsRepo = tagsRepo;
    }
    async ensureDefaultTags() {
        await this.tagsRepo.ensure(education_tags_1.EDUCATION_TAGS);
    }
    async listTags() {
        await this.ensureDefaultTags();
        return this.tagsRepo.list();
    }
    async suggestTags(text, limit = 5) {
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
                ? this.cosineSimilarity(textEmbedding, tag.embedding)
                : this.lexicalScore(tag.name, normalizedText),
        }))
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
        return scoredTags;
    }
    async setCourseTags(courseId, tagNames, isSuggested = false) {
        const tags = await this.upsertTagsByName(tagNames);
        await this.tagsRepo.replaceCourseTags(courseId, tags, isSuggested);
        return tags;
    }
    async setPostTags(postId, tagNames, isSuggested = false) {
        const tags = await this.upsertTagsByName(tagNames);
        await this.tagsRepo.replacePostTags(postId, tags, isSuggested);
        return tags;
    }
    async setFileSuggestedTags(fileId, suggestions) {
        const tagNames = suggestions.slice(0, 5).map((tag) => tag.name);
        const tags = await this.upsertTagsByName(tagNames);
        const scoreByName = new Map(suggestions.map((tag) => [tag.name, tag.score]));
        await this.tagsRepo.replaceFileTags(fileId, tags, scoreByName);
        return tags;
    }
    async addFileTagsToPost(postId, fileId) {
        const fileTags = await this.tagsRepo.findFileTags([fileId]);
        if (fileTags.length === 0) {
            return [];
        }
        await this.tagsRepo.addFileTagsToPost(postId, fileTags);
        return fileTags.map((fileTag) => fileTag.tag);
    }
    async getFileTagNames(fileIds) {
        if (fileIds.length === 0) {
            return [];
        }
        const fileTags = await this.tagsRepo.findFileTags(fileIds);
        return Array.from(new Set(fileTags.map((fileTag) => fileTag.tag.name)));
    }
    async createTranscript(fileId) {
        return this.tagsRepo.createTranscript(fileId);
    }
    async completeTranscript(fileId, text, language, durationSec) {
        return this.tagsRepo.completeTranscript(fileId, text, language, durationSec);
    }
    async failTranscript(fileId, errorMessage) {
        return this.tagsRepo.failTranscript(fileId, errorMessage);
    }
    async transcribeMedia(uploadedFile) {
        const apiKey = this.openAiApiKey;
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not configured');
        }
        const model = process.env.VIDEO_TRANSCRIPTION_MODEL || 'gpt-4o-mini-transcribe';
        const formData = new FormData();
        formData.append('model', model);
        formData.append('file', new Blob([new Uint8Array(uploadedFile.buffer)], { type: uploadedFile.mimetype }), uploadedFile.originalname);
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
        const data = await response.json();
        return data.text ?? '';
    }
    async upsertTagsByName(tagNames) {
        await this.ensureDefaultTags();
        const cleanTagNames = Array.from(new Set(tagNames
            .map((tagName) => tagName.trim().toLowerCase())
            .filter(Boolean)));
        if (cleanTagNames.length === 0) {
            return [];
        }
        await this.tagsRepo.ensure(cleanTagNames);
        return this.tagsRepo.findByNames(cleanTagNames);
    }
    async backfillTagEmbeddings(tags) {
        const embeddings = await this.createEmbeddings(tags.map((tag) => tag.name));
        if (!embeddings) {
            return;
        }
        await this.tagsRepo.updateEmbeddings(tags, embeddings);
    }
    async createEmbedding(text) {
        const embeddings = await this.createEmbeddings([text]);
        return embeddings?.[0] ?? null;
    }
    async createEmbeddings(input) {
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
            const data = await response.json();
            return data.data?.map((item) => item.embedding) ?? null;
        }
        catch {
            return null;
        }
    }
    lexicalSuggestions(tags, text, limit) {
        return tags
            .map((tag) => ({
            id: tag.id,
            name: tag.name,
            score: this.lexicalScore(tag.name, text),
        }))
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }
    lexicalScore(tagName, text) {
        const words = tagName.split(/[-\s]+/).filter(Boolean);
        const directMatch = text.includes(tagName) ? 2 : 0;
        const wordMatches = words.reduce((score, word) => score + (text.includes(word) ? 1 : 0), 0);
        return directMatch + wordMatches / Math.max(words.length, 1);
    }
    cosineSimilarity(a, b) {
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
    normalizeText(text) {
        return text.toLowerCase().replace(/\s+/g, ' ').trim();
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TAGS_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], TagsService);
//# sourceMappingURL=tags.service.js.map