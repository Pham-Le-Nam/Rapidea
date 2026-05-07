import { Injectable, Inject } from "@nestjs/common";
import { PostRepository } from "./post.repository";
import { TagsService } from "../tags/tags.service";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_REPOSITORY')
        private readonly postRepo: PostRepository,
        private readonly tagsService: TagsService,
        private readonly notificationService: NotificationService,
    ) {}

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
