import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FileInPostRepository } from '../../modules/file-in-post/file-in-post.repository';

@Injectable()
export class PrismaFileInPostRepository implements FileInPostRepository {
    constructor(private prisma: PrismaService) {}

    async create(fileId: string, postId: string): Promise<any> {
        const file = await this.prisma.file.findUnique({
            where: {
                id: fileId,
            },
            select: {
                id: true,
            },
        });

        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                id: true,
            },
        });

        if (!file) {
            throw new InternalServerErrorException("File not found");
        }

        if (!post) {
            throw new InternalServerErrorException("Post not found");
        }

        return this.prisma.fileInPost.create({
            data: {
                fileId,
                postId,
            },
        });
    }

    async delete(fileId: string, postId: string): Promise<any> {
        return this.prisma.fileInPost.delete({
            where: {
                fileId_postId: {
                    fileId,
                    postId,
                },
            },
        });
    }

    async getPosts(fileId: string): Promise<any> {
        const posts = await this.prisma.fileInPost.findMany({
            where: {
                fileId,
            },
            select: {
                postId: true,
            },
        });

        if (!posts) {
            throw new InternalServerErrorException("Posts not found");
        }

        const ids = posts.map(post => post.postId);

        return this.prisma.post.findMany({
            where: {
                id: { in: ids },
            },
        });
    }

    async getFiles(postId: string): Promise<any> {
        const files = await this.prisma.fileInPost.findMany({
            where: {
                postId,
            },
            select: {
                fileId: true,
            },
        });

        if (!files) {
            throw new InternalServerErrorException("Files not found");
        }

        const ids = files.map(post => post.fileId);

        return this.prisma.file.findMany({
            where: {
                id: { in: ids },
            },
        });
    }
}