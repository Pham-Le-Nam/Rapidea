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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const tags_service_1 = require("../tags/tags.service");
const notification_service_1 = require("../notification/notification.service");
const post_generation_prompt_1 = require("./post-generation.prompt");
let PostService = class PostService {
    postRepo;
    tagsService;
    notificationService;
    constructor(postRepo, tagsService, notificationService) {
        this.postRepo = postRepo;
        this.tagsService = tagsService;
        this.notificationService = notificationService;
    }
    async generatePostField(userId, target, input) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey)
            throw new common_1.InternalServerErrorException('OPENAI_API_KEY is not configured');
        const { user, files } = await this.postRepo.findGenerationContext(userId, input.fileIds ?? []);
        const materials = files.map((file) => ({
            name: file.name,
            mimeType: file.mimeType,
            transcript: file.transcript?.text?.slice(0, 20_000) ?? '',
            tags: file.tags.map((entry) => entry.tag.name),
            moderationStatus: file.moderationStatus,
        }));
        const context = JSON.stringify({
            existingTitle: target === 'title' ? undefined : input.title,
            existingDetails: target === 'details' ? undefined : input.details,
            tags: input.tags ?? [],
            materials,
        });
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: process.env.CONTENT_GENERATION_MODEL || 'gpt-4.1-mini',
                messages: [
                    { role: 'system', content: (0, post_generation_prompt_1.buildPostGenerationPrompt)(target, user?.creatorPrompt) },
                    { role: 'user', content: context },
                ],
                response_format: target === 'details' ? { type: 'json_object' } : undefined,
                temperature: 0.4,
            }),
        });
        if (!response.ok)
            throw new common_1.InternalServerErrorException(`Post generation failed (${response.status})`);
        const data = await response.json();
        const value = data.choices?.[0]?.message?.content?.trim();
        if (!value)
            throw new common_1.InternalServerErrorException('Post generation returned no content');
        if (target === 'details') {
            try {
                return { target, value: JSON.parse(value) };
            }
            catch {
                return {
                    target,
                    value: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: value }] }] },
                };
            }
        }
        return { target, value: value.replace(/^["']|["']$/g, '') };
    }
    async createPost(userId, title, content, courseId, isPreview, tags = []) {
        const post = await this.postRepo.create(userId, title, content, courseId, isPreview);
        await this.tagsService.setPostTags(post.id, tags);
        await this.notificationService.notifyFollowersAndSubscribersOfNewPost(userId, post.id, post.title);
        return this.postRepo.findById(post.id);
    }
    async deletePostById(id, userId) {
        return this.postRepo.deleteById(id, userId);
    }
    async updatePostById(id, userId, title, content, isPreview, courseId, tags) {
        const post = await this.postRepo.updateById(id, userId, title, content, isPreview, courseId);
        if (tags) {
            await this.tagsService.setPostTags(id, tags);
        }
        return this.postRepo.findById(post.id);
    }
    async recordPostView(id, userId) {
        return this.postRepo.recordView(id, userId);
    }
    async canViewAllCoursePosts(courseId, viewerId) {
        return this.postRepo.canViewAllCoursePosts(courseId, viewerId);
    }
    async getPostById(id) {
        return this.postRepo.findById(id);
    }
    async getPostsByCourseId(courseId, viewerId, options) {
        return this.postRepo.findByCourseId(courseId, viewerId, options);
    }
    async getPostsByUserId(userId, options) {
        return this.postRepo.findByUserId(userId, options);
    }
    async getRecommendedFeed(viewerId, options) {
        return this.postRepo.findRecommendedFeed(viewerId, options);
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('POST_REPOSITORY')),
    __metadata("design:paramtypes", [Object, tags_service_1.TagsService,
        notification_service_1.NotificationService])
], PostService);
//# sourceMappingURL=post.service.js.map