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

        if (courseId) {
            const course = await this.prisma.course.findUnique({
                where: {
                    id: courseId,
                    userId,
                },
            });

            if (!course) {
                throw new InternalServerErrorException("Course not found");
            }
        }

        const [post] = await this.prisma.$transaction([
            this.prisma.post.create({
                data: {
                    title,
                    content,
                    userId,
                    courseId,
                },
            }),
            this.prisma.users.update({
                where: {
                    id: userId,
                },
                data: {
                    postsCount: { increment: 1 },
                },
            }),
            ...(courseId
                ? [
                    this.prisma.course.update({
                        where: {
                            id: courseId,
                        },
                        data: {
                            postsCount: { increment: 1 },
                        },
                    }),
                ]
                : []
            ),
        ]);

        if (!post) {
            throw new InternalServerErrorException("Couldn't create the post");
        }

        return post;
    }

    async deleteById (id: string, userId: string): Promise<any> {
        const post = await this.prisma.post.findUnique({
            where: {
                id,
                userId,
            },
            select: {
                courseId: true,
            },
        });

        if (!post) {
            throw new InternalServerErrorException("Post not found");
        }

        const [deletedPost] = await this.prisma.$transaction([
            this.prisma.post.delete({
                where: {
                    id,
                    userId,
                },
            }),
            this.prisma.users.update({
                where: {
                    id: userId,
                },
                data: {
                    postsCount: { decrement: 1 },
                },
            }),
            ...(post.courseId
                ? [
                    this.prisma.course.update({
                        where: {
                            id: post.courseId,
                        },
                        data: {
                            postsCount: { decrement: 1 },
                        },
                    }),
                ]
                : []
            ),
        ]);

        if (!deletedPost) {
            throw new InternalServerErrorException("Couldn't delete the post");
        }

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
