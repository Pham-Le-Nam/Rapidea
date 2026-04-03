import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PostRepository } from '../../modules/post/post.repository';

@Injectable()
export class PrismaPostRepository implements PostRepository {
    constructor(private prisma: PrismaService) {}

    async create (userId: string, title?: string, content?: any, courseId?: string): Promise<any> {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        // Check if userId is valid
        if (!user) {
            throw new InternalServerErrorException("User not found");
        }

        const post = await this.prisma.post.create({
            data: {
                title,
                content,
                userId,
                courseId,
            },
        });

        if (!post) {
            throw new InternalServerErrorException("Couldn't create the post");
        }

        // Increase the user's postsCount by 1
        this.prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                postsCount: { increment: 1 },
            },
        });

        return post;
    }

    async deleteById (id: string, userId: string): Promise<any> {
        const deletedPost = await this.prisma.post.delete({
            where: {
                id,
                userId,
            },
        });

        if (!deletedPost) {
            throw new InternalServerErrorException("Couldn't delete the post");
        }

        this.prisma.users.update({
            where: {
                id: deletedPost.userId,
            },
            data: {
                postsCount: { decrement: 1 },
            },
        });

        return  deletedPost;
    }

    async updateById (id: string, userId: string, title?: string, content?: any): Promise<any> {
        return this.prisma.post.update({
            where: {
                id,
                userId,
            },
            data: {
                title,
                content,
            },
        });
    }

    async findById (id: string): Promise<any> {
        return this.prisma.post.findUnique({
            where: {
                id,
            },
        });
    }

    async findByCourseId (courseId: string): Promise<any> {
        return this.prisma.post.findMany({
            where: {
                courseId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}