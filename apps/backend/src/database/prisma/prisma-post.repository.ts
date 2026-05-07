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

    async findRecommendedFeed(viewerId?: string, options: {
        offset?: number;
        limit?: number;
    } = {}): Promise<any> {
        const offset = options.offset ?? 0;
        const limit = options.limit ?? 10;
        const candidateLimit = Math.max(250, offset + limit * 8);

        const [interestProfile, followedAuthorIds, viewedPostIds, authorInteraction] = viewerId
            ? await this.getViewerRecommendationContext(viewerId)
            : [{}, new Set<string>(), new Set<string>(), new Map<string, number>()] as const;

        const posts = await this.prisma.post.findMany({
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
                _count: {
                    select: {
                        discussions: true,
                        recentViews: true,
                    },
                },
            },
            orderBy: [
                { createdAt: 'desc' },
                { rating: 'desc' },
                { id: 'asc' },
            ],
            take: candidateLimit,
        });

        const scoredPosts = posts.map((post) => {
            const similarityScore = this.calculateSimilarityScore(
                this.getTagNames(post),
                interestProfile,
            );
            const recencyScore = this.calculateRecencyScore(post.createdAt);
            const engagementScore = this.calculateEngagementScore({
                rating: post.rating,
                ratingCount: post.ratingCount,
                commentCount: post._count.discussions,
                saveCount: 0,
                viewCount: post._count.recentViews,
            });
            const authorScore = this.calculateAuthorScore(
                post.userId,
                followedAuthorIds,
                authorInteraction,
            );
            const recommendationScore = this.clampScore(
                similarityScore * 0.45
                + recencyScore * 0.30
                + engagementScore * 0.20
                + authorScore * 0.05,
            );
            const hasBeenViewed = viewedPostIds.has(post.id);
            const isOwnPost = !!viewerId && post.userId === viewerId;

            return {
                ...post,
                recommendationScore,
                hasBeenViewed,
                isOwnPost,
                recommendationSignals: {
                    similarityScore,
                    recencyScore,
                    engagementScore,
                    authorScore,
                },
            };
        });

        return this.diversifyPosts(scoredPosts, interestProfile).slice(offset, offset + limit);
    }

    private async getViewerRecommendationContext(viewerId: string) {
        const [
            createdPosts,
            ratedPosts,
            commentedPosts,
            viewedPosts,
            follows,
        ] = await Promise.all([
            this.prisma.post.findMany({
                where: { userId: viewerId },
                select: {
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                },
                take: 100,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.ratePost.findMany({
                where: {
                    userId: viewerId,
                    rating: {
                        gte: 4,
                    },
                },
                include: {
                    post: {
                        select: {
                            userId: true,
                            tags: {
                                include: {
                                    tag: true,
                                },
                            },
                        },
                    },
                },
                take: 100,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.discussion.findMany({
                where: { userId: viewerId },
                distinct: ['postId'],
                include: {
                    post: {
                        select: {
                            userId: true,
                            tags: {
                                include: {
                                    tag: true,
                                },
                            },
                        },
                    },
                },
                take: 100,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.recentPostView.findMany({
                where: { userId: viewerId },
                include: {
                    post: {
                        select: {
                            userId: true,
                            tags: {
                                include: {
                                    tag: true,
                                },
                            },
                        },
                    },
                },
                take: 150,
                orderBy: { viewedAt: 'desc' },
            }),
            this.prisma.follow.findMany({
                where: { followerId: viewerId },
                select: {
                    followingId: true,
                },
            }),
        ]);

        const interests: Record<string, number> = {};
        const authorInteraction = new Map<string, number>();

        const addTags = (tags: any[], weight: number) => {
            this.getTagNames({ tags }).forEach((tag) => {
                interests[tag] = (interests[tag] ?? 0) + weight;
            });
        };
        const addAuthorInteraction = (authorId?: string, weight: number = 1) => {
            if (!authorId || authorId === viewerId) return;

            authorInteraction.set(authorId, (authorInteraction.get(authorId) ?? 0) + weight);
        };

        createdPosts.forEach((post) => addTags(post.tags, 5));
        ratedPosts.forEach((rating) => {
            addTags(rating.post.tags, 4);
            addAuthorInteraction(rating.post.userId, 4);
        });
        commentedPosts.forEach((discussion) => {
            addTags(discussion.post.tags, 3);
            addAuthorInteraction(discussion.post.userId, 3);
        });
        viewedPosts.forEach((view) => {
            addTags(view.post.tags, 1);
            addAuthorInteraction(view.post.userId, 1);
        });

        return [
            interests,
            new Set(follows.map((follow) => follow.followingId)),
            new Set(viewedPosts.map((view) => view.postId)),
            authorInteraction,
        ] as const;
    }

    private getTagNames(entity: any): string[] {
        return entity?.tags
            ?.map((tagEntry: any) => tagEntry.tag?.name ?? tagEntry.name)
            .filter(Boolean)
            .map((tag: string) => tag.trim().toLowerCase())
            ?? [];
    }

    private calculateSimilarityScore(postTags: string[], userInterests: Record<string, number>): number {
        const maxPossibleScore = Object.values(userInterests).reduce((total, weight) => total + weight, 0);

        if (maxPossibleScore === 0) {
            return 0;
        }

        const score = Array.from(new Set(postTags)).reduce((total, tag) => {
            return total + (userInterests[tag] ?? 0);
        }, 0);

        return this.clampScore(score / maxPossibleScore);
    }

    private calculateRecencyScore(createdAt: Date): number {
        const ageInHours = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);

        return this.clampScore(Math.exp(-ageInHours / 72));
    }

    private calculateEngagementScore(post: {
        rating: number;
        ratingCount: number;
        commentCount: number;
        saveCount: number;
        viewCount: number;
    }): number {
        const weightedEngagement =
            post.rating * 2
            + post.ratingCount * 1.5
            + post.commentCount * 2
            + post.saveCount * 3
            + post.viewCount * 0.2;

        return this.clampScore(Math.log1p(Math.max(0, weightedEngagement)) / 10);
    }

    private calculateAuthorScore(
        postAuthorId: string,
        followedAuthorIds: Set<string>,
        authorInteraction: Map<string, number>,
    ): number {
        if (followedAuthorIds.has(postAuthorId)) {
            return 1;
        }

        const interactionWeight = authorInteraction.get(postAuthorId) ?? 0;

        if (interactionWeight >= 6) {
            return 0.6;
        }

        return interactionWeight > 0 ? 0.3 : 0;
    }

    private diversifyPosts(posts: any[], userInterests: Record<string, number>) {
        const otherPosts = posts.filter((post) => !post.isOwnPost);
        const ownPosts = posts.filter((post) => post.isOwnPost);
        const unviewedPosts = otherPosts.filter((post) => !post.hasBeenViewed);
        const viewedPosts = otherPosts.filter((post) => post.hasBeenViewed);

        return [
            ...this.diversifyPostGroup(unviewedPosts, userInterests, 0),
            ...this.diversifyPostGroup(viewedPosts, userInterests, 0.45),
            ...this.diversifyPostGroup(ownPosts, userInterests, 0.65),
        ];
    }

    private diversifyPostGroup(posts: any[], userInterests: Record<string, number>, viewedPenalty: number) {
        const remaining = [...posts].sort((a, b) => b.recommendationScore - a.recommendationScore);
        const selected: any[] = [];
        const selectedTagCounts = new Map<string, number>();

        while (remaining.length > 0) {
            let bestIndex = 0;
            let bestAdjustedScore = -Infinity;

            remaining.forEach((post, index) => {
                const primaryTag = this.getPrimaryTag(post, userInterests);
                const tagCount = primaryTag ? selectedTagCounts.get(primaryTag) ?? 0 : 0;
                const diversityPenalty = Math.min(0.35, tagCount * 0.12);
                const adjustedScore = (post.recommendationScore - viewedPenalty) * (1 - diversityPenalty);

                if (adjustedScore > bestAdjustedScore) {
                    bestAdjustedScore = adjustedScore;
                    bestIndex = index;
                }
            });

            const [post] = remaining.splice(bestIndex, 1);
            const primaryTag = this.getPrimaryTag(post, userInterests);

            if (primaryTag) {
                selectedTagCounts.set(primaryTag, (selectedTagCounts.get(primaryTag) ?? 0) + 1);
            }

            selected.push(post);
        }

        return selected;
    }

    private getPrimaryTag(post: any, userInterests: Record<string, number>) {
        const tags = this.getTagNames(post);

        if (tags.length === 0) {
            return undefined;
        }

        return tags.sort((a, b) => (userInterests[b] ?? 0) - (userInterests[a] ?? 0))[0];
    }

    private clampScore(score: number) {
        return Math.max(0, Math.min(1, score));
    }
}
