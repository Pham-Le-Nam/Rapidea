import { Injectable, Inject } from "@nestjs/common";
import { PostRepository } from "./post.repository";

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_REPOSITORY')
        private readonly postRepo: PostRepository,
    ) {}

    async createPost(userId: string, title?: string, content?: any, courseId?: string, isPreview?: boolean) {
        return this.postRepo.create(userId, title, content, courseId, isPreview);
    }

    async deletePostById(id: string, userId: string) {
        return this.postRepo.deleteById(id, userId);
    }

    async updatePostById(id: string, userId: string, title?: string, content?: any, isPreview?: boolean) {
        return this.postRepo.updateById(id, userId, title, content, isPreview);
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
    }) {
        return this.postRepo.findByCourseId(courseId, viewerId, options);
    }

    async getPostsByUserId(userId: string) {
        return this.postRepo.findByUserId(userId);
    }
}
