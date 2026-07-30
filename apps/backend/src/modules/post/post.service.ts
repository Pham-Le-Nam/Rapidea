import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { PostRepository } from "./post.repository";
import { TagsService } from "../tags/tags.service";
import { NotificationService } from "../notification/notification.service";
import { PrismaService } from "../../prisma/prisma.service";
import { buildPostGenerationPrompt } from "./post-generation.prompt";

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_REPOSITORY')
        private readonly postRepo: PostRepository,
        private readonly tagsService: TagsService,
        private readonly notificationService: NotificationService,
        private readonly prisma: PrismaService,
    ) {}

    async generatePostField(
        userId: string,
        target: 'title' | 'details',
        input: { title?: string; details?: string; tags?: string[]; fileIds?: string[] },
    ) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new InternalServerErrorException('OPENAI_API_KEY is not configured');

        const [user, files] = await Promise.all([
            this.prisma.users.findUnique({
                where: { id: userId },
                select: { creatorPrompt: true },
            }),
            this.prisma.file.findMany({
                where: { id: { in: input.fileIds ?? [] }, userId },
                include: { transcript: true, tags: { include: { tag: true } } },
            }),
        ]);
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
                    { role: 'system', content: buildPostGenerationPrompt(target, user?.creatorPrompt) },
                    { role: 'user', content: context },
                ],
                response_format: target === 'details' ? { type: 'json_object' } : undefined,
                temperature: 0.4,
            }),
        });
        if (!response.ok) throw new InternalServerErrorException(`Post generation failed (${response.status})`);
        const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
        const value = data.choices?.[0]?.message?.content?.trim();
        if (!value) throw new InternalServerErrorException('Post generation returned no content');

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
