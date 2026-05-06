import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PostRepository } from '../../modules/post/post.repository';

@Injectable()
export class PrismaPostRepository implements PostRepository {
    constructor(private prisma: PrismaService) {}

    async create (userId: string, title?: string, content?: any, courseId?: string, isPreview: boolean = false): Promise<any> {
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

        const [post, updatedUser, updatedCourse] = await this.prisma.$transaction([
            this.prisma.post.create({
                data: {
                    title,
                    content,
                    userId,
                    courseId,
                    isPreview,
                },
                include: {
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                },
            }),
            this.prisma.users.update({
                where: {
                    id: userId,
                },
                data: {
                    postsCount: { increment: 1 },
                },
                select: {
                    postsCount: true,
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
                            lastUpdated: new Date(),
                        },
                        select: {
                            postsCount: true,
                            lastUpdated: true,
                        },
                    }),
                ]
                : []
            ),
        ]);

        if (!post) {
            throw new InternalServerErrorException("Couldn't create the post");
        }

        return {
            ...post,
            userPostsCount: updatedUser.postsCount,
            coursePostsCount: updatedCourse?.postsCount,
            courseLastUpdated: updatedCourse?.lastUpdated,
        };
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

    async updateById (id: string, userId: string, title?: string, content?: any, isPreview?: boolean, courseId?: string | null): Promise<any> {
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

        const isMovingCourse = courseId !== undefined && courseId !== post.courseId;

        const [updatedPost] = await this.prisma.$transaction([
            this.prisma.post.update({
                where: {
                    id,
                    userId,
                },
                data: {
                    title,
                    content,
                    isPreview,
                    courseId,
                    lastUpdated: new Date(),
                },
                include: {
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                },
            }),
            ...(post.courseId
                ? [
                    this.prisma.course.update({
                        where: {
                            id: post.courseId,
                        },
                        data: {
                            lastUpdated: new Date(),
                        },
                    }),
                ]
                : []
            ),
            ...(isMovingCourse && post.courseId
                ? [
                    this.prisma.course.update({
                        where: {
                            id: post.courseId,
                        },
                        data: {
                            postsCount: { decrement: 1 },
                            lastUpdated: new Date(),
                        },
                    }),
                ]
                : []
            ),
            ...(isMovingCourse && courseId
                ? [
                    this.prisma.course.update({
                        where: {
                            id: courseId,
                        },
                        data: {
                            postsCount: { increment: 1 },
                            lastUpdated: new Date(),
                        },
                    }),
                ]
                : []
            ),
        ]);

        return updatedPost;
    }

    async recordView(id: string, userId: string): Promise<any> {
        return this.prisma.recentPostView.upsert({
            where: {
                postId_userId: {
                    postId: id,
                    userId,
                },
            },
            update: {
                viewedAt: new Date(),
            },
            create: {
                postId: id,
                userId,
            },
        });
    }

    async canViewAllCoursePosts(courseId: string, viewerId?: string): Promise<boolean> {
        if (!viewerId) return false;

        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            select: {
                userId: true,
                subscribers: {
                    where: { userId: viewerId },
                    select: { userId: true },
                },
            },
        });

        return !!course && (course.userId === viewerId || course.subscribers.length > 0);
    }

    async findById (id: string): Promise<any> {
        return this.prisma.post.findUnique({
            where: {
                id,
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
                course: {
                    select: {
                        id: true,
                        userId: true,
                        subscribers: {
                            select: {
                                userId: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findByCourseId (
        courseId: string,
        viewerId?: string,
        options: {
            previewOnly?: boolean;
            orderBy?: 'rating' | 'createdAt';
            order?: 'asc' | 'desc';
            offset?: number;
            limit?: number;
        } = {},
    ): Promise<any> {
        const shouldShowPreviewOnly = !!options.previewOnly;
        const orderByField = options.orderBy === 'rating' ? 'rating' : 'createdAt';
        const order = options.order === 'asc' ? 'asc' : 'desc';

        return this.prisma.post.findMany({
            where: {
                courseId,
                ...(shouldShowPreviewOnly ? { isPreview: true } : {}),
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: [
                { [orderByField]: order },
                { id: 'asc' },
            ],
            skip: options.offset,
            take: options.limit,
        });
    }

    async findByUserId (userId: string, options: {
        offset?: number;
        limit?: number;
        courseId?: string;
        nonCourseOnly?: boolean;
        previewMode?: 'all' | 'preview' | 'nonPreview';
        orderBy?: 'rating' | 'createdAt';
        order?: 'asc' | 'desc';
    } = {}): Promise<any> {
        const orderByField = options.orderBy === 'rating' ? 'rating' : 'createdAt';
        const order = options.order === 'asc' ? 'asc' : 'desc';

        return this.prisma.post.findMany({
            where: {
                userId,
                ...(options.nonCourseOnly
                    ? { courseId: null }
                    : options.courseId
                        ? { courseId: options.courseId }
                        : {}
                ),
                ...(options.previewMode === 'preview'
                    ? { isPreview: true }
                    : options.previewMode === 'nonPreview'
                        ? { isPreview: false }
                        : {}
                ),
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: [
                { [orderByField]: order },
                { id: 'asc' },
            ],
            skip: options.offset,
            take: options.limit,
        });
    }
}
