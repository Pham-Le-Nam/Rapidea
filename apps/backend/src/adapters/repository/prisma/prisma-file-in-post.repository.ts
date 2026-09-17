import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { FileInPostRepository } from '../../../domain/file-in-post/repositories/file-in-post.repository';

@Injectable()
export class PrismaFileInPostRepository implements FileInPostRepository {
    constructor(private prisma: PrismaService) {}

    async create(fileId: string, postId: string, userId: string): Promise<any> {
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
                courseId: true,
            },
        });

        if (!file) {
            throw new InternalServerErrorException('File not found');
        }

        if (!post) {
            throw new InternalServerErrorException('Post not found');
        }

        const [relation] = await this.prisma.$transaction([
            this.prisma.fileInPost.create({
                data: {
                    fileId,
                    postId,
                    userId,
                },
            }),
            this.prisma.post.update({
                where: { id: postId },
                data: {
                    aiStatus: 'PENDING',
                    aiError: null,
                    aiProcessedAt: null,
                    summary: null,
                },
            }),
            this.prisma.postSkill.deleteMany({ where: { postId } }),
            ...(post.courseId
                ? [
                      this.prisma.course.update({
                          where: { id: post.courseId },
                          data: {
                              aiStatus: 'PENDING' as const,
                              aiError: null,
                              aiProcessedAt: null,
                          },
                      }),
                  ]
                : []),
        ]);

        return relation;
    }

    async delete(fileId: string, postId: string, userId: string): Promise<any> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { courseId: true },
        });
        if (!post) {
            throw new InternalServerErrorException('Post not found');
        }

        const [relation] = await this.prisma.$transaction([
            this.prisma.fileInPost.delete({
                where: {
                    fileId_postId: {
                        fileId,
                        postId,
                    },
                    userId,
                },
            }),
            this.prisma.post.update({
                where: { id: postId },
                data: {
                    aiStatus: 'PENDING',
                    aiError: null,
                    aiProcessedAt: null,
                    summary: null,
                },
            }),
            this.prisma.postSkill.deleteMany({ where: { postId } }),
            ...(post.courseId
                ? [
                      this.prisma.course.update({
                          where: { id: post.courseId },
                          data: {
                              aiStatus: 'PENDING' as const,
                              aiError: null,
                              aiProcessedAt: null,
                          },
                      }),
                  ]
                : []),
        ]);

        return relation;
    }

    async getPosts(fileId: string): Promise<any> {
        return this.prisma.fileInPost
            .findMany({
                where: {
                    fileId,
                },
                orderBy: {
                    post: {
                        createdAt: 'desc',
                    },
                },
                select: {
                    post: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                },
            })
            .then((relations) => relations.map(({ post }) => post));
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
            throw new InternalServerErrorException('Files not found');
        }

        const ids = files.map((post) => post.fileId);

        const fileList = await this.prisma.file.findMany({
            where: {
                id: { in: ids },
            },
            include: {
                transcript: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        return fileList;
    }
}
