import { Injectable, Inject } from "@nestjs/common";
import { PostRepository } from "../../domain/post/repositories/post.repository";
import { TagsService } from "../tags/tags.service";
import { NotificationService } from "../notification/notification.service";
import { buildPostGenerationPrompt } from "./post-generation.prompt";
import { AI_SERVICE, AiService } from "../ports/ai.service";

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_REPOSITORY')
        private readonly postRepo: PostRepository,
        private readonly tagsService: TagsService,
        private readonly notificationService: NotificationService,
        @Inject(AI_SERVICE) private readonly aiService: AiService,
    ) {}

    async generatePostField(
        userId: string,
        target: 'title' | 'details',
        input: { title?: string; details?: string; tags?: string[]; fileIds?: string[] },
    ) {
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
        const value = await this.aiService.generatePostContent({
            target,
            systemPrompt: buildPostGenerationPrompt(target, user?.creatorPrompt),
            context,
        });

        if (target === 'details') {
            try {
                return { target, value: JSON.parse(value) };
            } catch {
                return {
                    target,
                    value: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: value }] }] },
                };
            }
        }
        return { target, value: value.replace(/^["']|["']$/g, '') };
    }

    async createPost(userId: string, title?: string, content?: any, courseId?: string, isPreview?: boolean, tags: string[] = []) {
        const post = await this.postRepo.create(userId, title, content, courseId, isPreview);
        await this.tagsService.setPostTags(post.id, tags);
        await this.notificationService.notifyFollowersAndSubscribersOfNewPost(userId, post.id, post.title);

        return this.postRepo.findById(post.id);
    }

    async deletePostById(id: string, userId: string) {
        return this.postRepo.deleteById(id, userId);
    }

    async updatePostById(id: string, userId: string, title?: string, content?: any, isPreview?: boolean, courseId?: string | null, tags?: string[]) {
        const post = await this.postRepo.updateById(id, userId, title, content, isPreview, courseId);
        if (tags) {
            await this.tagsService.setPostTags(id, tags);
        }

        return this.postRepo.findById(post.id);
    }

    async recordPostView(id: string, userId: string) {
        return this.postRepo.recordView(id, userId);
    }

    async canViewAllCoursePosts(courseId: string, viewerId?: string) {
        return this.postRepo.canViewAllCoursePosts(courseId, viewerId);
    }

    async getPostById(id: string) {
        return this.postRepo.findById(id);
    }

    async getPostsByCourseId(courseId: string, viewerId?: string, options?: {
        previewOnly?: boolean;
        orderBy?: 'rating' | 'createdAt';
        order?: 'asc' | 'desc';
        offset?: number;
        limit?: number;
    }) {
        return this.postRepo.findByCourseId(courseId, viewerId, options);
    }

    async getPostsByUserId(userId: string, options?: {
        offset?: number;
        limit?: number;
        courseId?: string;
        nonCourseOnly?: boolean;
        previewMode?: 'all' | 'preview' | 'nonPreview';
        orderBy?: 'rating' | 'createdAt';
        order?: 'asc' | 'desc';
    }) {
        return this.postRepo.findByUserId(userId, options);
    }

    async getRecommendedFeed(viewerId?: string, options?: {
        offset?: number;
        limit?: number;
    }) {
        return this.postRepo.findRecommendedFeed(viewerId, options);
    }
}
