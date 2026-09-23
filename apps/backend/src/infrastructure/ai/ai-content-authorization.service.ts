import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import {
    AiContentAccessMode,
    AiContentResourceReference,
    AiContentResourceType,
} from '../../application/ai-chat/ai-content-authorization.types';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class AiContentAuthorizationService {
    constructor(private readonly prisma: PrismaService) {}

    courseWhere(
        userId: string,
        mode: AiContentAccessMode,
    ): Prisma.CourseWhereInput {
        if (mode === AiContentAccessMode.SUMMARY) return {};

        return {
            OR: [{ userId }, { subscribers: { some: { userId } } }],
        };
    }

    postWhere(userId: string): Prisma.PostWhereInput {
        return {
            OR: [
                { courseId: null },
                { isPreview: true },
                { userId },
                { course: { is: { userId } } },
                {
                    course: {
                        is: { subscribers: { some: { userId } } },
                    },
                },
            ],
        };
    }

    fileWhere(userId: string): Prisma.FileWhereInput {
        return {
            OR: [
                { userId },
                {
                    folder: {
                        is: { isPublic: true },
                    },
                },
                {
                    inPosts: {
                        some: { post: { is: this.postWhere(userId) } },
                    },
                },
                {
                    inCourses: {
                        some: {
                            course: {
                                is: this.courseWhere(
                                    userId,
                                    AiContentAccessMode.DETAILS,
                                ),
                            },
                        },
                    },
                },
            ],
        };
    }

    discussionWhere(userId: string): Prisma.DiscussionWhereInput {
        return { post: { is: this.postWhere(userId) } };
    }

    reviewWhere(
        userId: string,
        mode: AiContentAccessMode,
    ): Prisma.SubscribeWhereInput {
        return {
            review: { not: null },
            ...(mode === AiContentAccessMode.DETAILS
                ? {
                      course: {
                          is: this.courseWhere(userId, mode),
                      },
                  }
                : {}),
        };
    }

    async canAccess(
        userId: string,
        resource: AiContentResourceReference,
        mode: AiContentAccessMode,
    ): Promise<boolean> {
        switch (resource.type) {
            case AiContentResourceType.COURSE:
                return Boolean(
                    await this.prisma.course.findFirst({
                        where: {
                            id: resource.id,
                            ...this.courseWhere(userId, mode),
                        },
                        select: { id: true },
                    }),
                );
            case AiContentResourceType.POST:
                return Boolean(
                    await this.prisma.post.findFirst({
                        where: {
                            id: resource.id,
                            ...this.postWhere(userId),
                        },
                        select: { id: true },
                    }),
                );
            case AiContentResourceType.FILE:
                return Boolean(
                    await this.prisma.file.findFirst({
                        where: {
                            id: resource.id,
                            ...this.fileWhere(userId),
                        },
                        select: { id: true },
                    }),
                );
            case AiContentResourceType.DISCUSSION:
                return Boolean(
                    await this.prisma.discussion.findFirst({
                        where: {
                            id: resource.id,
                            ...this.discussionWhere(userId),
                        },
                        select: { id: true },
                    }),
                );
            case AiContentResourceType.REVIEW:
                return Boolean(
                    await this.prisma.subscribe.findFirst({
                        where: {
                            id: resource.id,
                            ...this.reviewWhere(userId, mode),
                        },
                        select: { id: true },
                    }),
                );
        }
    }

    async assertCanAccess(
        userId: string,
        resource: AiContentResourceReference,
        mode: AiContentAccessMode,
    ): Promise<void> {
        if (await this.canAccess(userId, resource, mode)) return;

        throw new NotFoundException(
            'Source not found or is not accessible to this learner',
        );
    }
}
