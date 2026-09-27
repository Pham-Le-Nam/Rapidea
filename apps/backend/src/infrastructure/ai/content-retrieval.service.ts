import { Injectable } from '@nestjs/common';
import {
    AiContentAccessMode,
    AiContentResourceType,
} from '../../application/ai-chat/ai-content-authorization.types';
import { ContentSearchInput } from '../../application/ai-chat/retrieval-primitives.types';
import { PrismaService } from '../database/prisma/prisma.service';
import { AiContentAuthorizationService } from './ai-content-authorization.service';
import { HybridContentSearchService } from './hybrid-content-search.service';

const DEFAULT_REVIEW_LIMIT = 20;
const MAX_REVIEW_LIMIT = 50;
const DEFAULT_DISCUSSION_LIMIT = 50;
const MAX_DISCUSSION_LIMIT = 100;

@Injectable()
export class ContentRetrievalService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly authorization: AiContentAuthorizationService,
        private readonly hybridSearch: HybridContentSearchService,
    ) {}

    search(userId: string, input: ContentSearchInput) {
        return this.hybridSearch.search(userId, input);
    }

    async getPost(userId: string, postId: string) {
        await this.authorization.assertCanAccess(
            userId,
            { type: AiContentResourceType.POST, id: postId },
            AiContentAccessMode.DETAILS,
        );
        return this.prisma.post.findUniqueOrThrow({
            where: { id: postId },
            select: {
                id: true,
                title: true,
                content: true,
                summary: true,
                courseId: true,
                isPreview: true,
                rating: true,
                ratingCount: true,
                createdAt: true,
                lastUpdated: true,
                user: {
                    select: {
                        username: true,
                        firstname: true,
                        middlename: true,
                        lastname: true,
                    },
                },
                course: { select: { id: true, title: true } },
                skills: {
                    orderBy: { importance: 'desc' },
                    select: {
                        outcome: true,
                        importance: true,
                        confidence: true,
                        skill: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
                files: {
                    orderBy: { createdAt: 'asc' },
                    select: {
                        file: {
                            select: {
                                id: true,
                                name: true,
                                mimeType: true,
                                size: true,
                                summary: true,
                            },
                        },
                    },
                },
                _count: { select: { discussions: true } },
            },
        });
    }

    async getFile(userId: string, fileId: string) {
        await this.authorization.assertCanAccess(
            userId,
            { type: AiContentResourceType.FILE, id: fileId },
            AiContentAccessMode.DETAILS,
        );
        return this.prisma.file.findUniqueOrThrow({
            where: { id: fileId },
            select: {
                id: true,
                name: true,
                mimeType: true,
                size: true,
                summary: true,
                createdAt: true,
                folder: { select: { isPublic: true } },
                inCourses: {
                    select: {
                        course: { select: { id: true, title: true } },
                    },
                },
                inPosts: {
                    select: {
                        post: {
                            select: {
                                id: true,
                                title: true,
                                courseId: true,
                                isPreview: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async getDiscussion(userId: string, discussionId: string) {
        await this.authorization.assertCanAccess(
            userId,
            { type: AiContentResourceType.DISCUSSION, id: discussionId },
            AiContentAccessMode.DETAILS,
        );
        return this.prisma.discussion.findUniqueOrThrow({
            where: { id: discussionId },
            select: {
                id: true,
                discussion: true,
                rating: true,
                ratingCount: true,
                parentId: true,
                repliedId: true,
                createdAt: true,
                post: {
                    select: {
                        id: true,
                        title: true,
                        userId: true,
                        courseId: true,
                        course: { select: { userId: true } },
                    },
                },
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstname: true,
                        middlename: true,
                        lastname: true,
                        role: true,
                    },
                },
                _count: { select: { childrenDiscussion: true } },
            },
        });
    }

    async getPostDiscussions(
        userId: string,
        postId: string,
        limit = DEFAULT_DISCUSSION_LIMIT,
    ) {
        await this.authorization.assertCanAccess(
            userId,
            { type: AiContentResourceType.POST, id: postId },
            AiContentAccessMode.DETAILS,
        );
        const [post, discussions] = await Promise.all([
            this.prisma.post.findUniqueOrThrow({
                where: { id: postId },
                select: {
                    id: true,
                    title: true,
                    userId: true,
                    courseId: true,
                    course: {
                        select: {
                            id: true,
                            title: true,
                            userId: true,
                        },
                    },
                },
            }),
            this.prisma.discussion.findMany({
                where: { postId },
                orderBy: { createdAt: 'asc' },
                take: this.discussionLimit(limit),
                select: {
                    id: true,
                    discussion: true,
                    rating: true,
                    ratingCount: true,
                    parentId: true,
                    repliedId: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            firstname: true,
                            middlename: true,
                            lastname: true,
                            role: true,
                        },
                    },
                },
            }),
        ]);

        return {
            post,
            discussions: discussions.map((discussion) => ({
                ...discussion,
                authorContext: {
                    isPostAuthor: discussion.user.id === post.userId,
                    isCourseInstructor:
                        discussion.user.id === post.course?.userId,
                },
            })),
        };
    }

    async getCourseReviews(
        userId: string,
        courseId: string,
        limit = DEFAULT_REVIEW_LIMIT,
    ) {
        await this.authorization.assertCanAccess(
            userId,
            { type: AiContentResourceType.COURSE, id: courseId },
            AiContentAccessMode.SUMMARY,
        );
        return this.prisma.subscribe.findMany({
            where: { courseId, review: { not: null } },
            orderBy: { createdAt: 'desc' },
            take: this.reviewLimit(limit),
            select: {
                id: true,
                review: true,
                rating: true,
                createdAt: true,
                subscriber: {
                    select: {
                        username: true,
                        firstname: true,
                        middlename: true,
                        lastname: true,
                    },
                },
            },
        });
    }

    private reviewLimit(value: number): number {
        if (!Number.isInteger(value)) return DEFAULT_REVIEW_LIMIT;
        return Math.min(Math.max(value, 1), MAX_REVIEW_LIMIT);
    }

    private discussionLimit(value: number): number {
        if (!Number.isInteger(value)) return DEFAULT_DISCUSSION_LIMIT;
        return Math.min(Math.max(value, 1), MAX_DISCUSSION_LIMIT);
    }
}
