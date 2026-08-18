import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileInPostRepository } from '../../domain/file-in-post/repositories/file-in-post.repository';
import { FileService } from '../file/file.service';
import { PostService } from '../post/post.service';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class FileInPostService {
    constructor(
        @Inject('FILE_IN_POST_REPOSITORY')
        private readonly fileInPostRepo: FileInPostRepository,
        private readonly fileService: FileService,
        private readonly postService: PostService,
        private readonly tagsService: TagsService,
    ) {}

    async addFileToPost (fileId: string, postId: string, userId: string) {
        const file = await this.fileService.getFileById(fileId);

        if (!file) {
            throw new Error("File not found");
        }

        const post = await this.postService.getPostById(postId);

        if (!post) {
            throw new Error("Post not found");
        }

        if (post.userId !== userId) {
            throw new Error("Unauthorized: You are not the owner of this post");
        }

        if (file.userId !== userId) {
            throw new Error("Unauthorized: You are not the owner of this file");
        }

        const fileInPost = await this.fileInPostRepo.create(fileId, postId, userId);
        await this.tagsService.addFileTagsToPost(postId, fileId);

        return fileInPost;
    }

    async removeFileFromPost (fileId: string, postId: string, userId: string) {
        const fileInPost = await this.fileInPostRepo.delete(fileId, postId, userId);

        if (!fileInPost) {
            throw new InternalServerErrorException("", "Couldn't remove file from post");
        }

        return fileInPost;
    }

    async getPostsByFileId (fileId: string) {
        return this.fileInPostRepo.getPosts(fileId);
    }

    async getFilesByPostId (postId: string) {
        return this.fileInPostRepo.getFiles(postId);
    }
}
