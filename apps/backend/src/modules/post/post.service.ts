import { Injectable, Inject } from "@nestjs/common";
import { PostRepository } from "./post.repository";

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_REPOSITORY')
        private readonly postRepo: PostRepository,
    ) {}

    async createPost(userId: string, title?: string, content?: any, courseId?: string) {
        return this.postRepo.create(userId, title, content, courseId);
    }

    async deletePostById(id: string, userId: string) {
        return this.postRepo.deleteById(id, userId);
    }

    async updatePostById(id: string, userId: string, title?: string, content?: any) {
        return this.postRepo.updateById(id, userId, title, content);
    }

    async getPostById(id: string) {
        return this.postRepo.findById(id);
    }

    async getPostsByCourseId(courseId: string) {
        return this.postRepo.findByCourseId(courseId);
    }
}