"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPostRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaPostRepository = class PrismaPostRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findGenerationContext(userId, fileIds) {
        const [user, files] = await Promise.all([
            this.prisma.users.findUnique({ where: { id: userId }, select: { creatorPrompt: true } }),
            this.prisma.file.findMany({
                where: { id: { in: fileIds }, userId },
                include: { transcript: true, tags: { include: { tag: true } } },
            }),
        ]);
        return { user, files };
    }
    async create(userId, title, content, courseId, isPreview = false) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.InternalServerErrorException("User not found");
        }
        if (courseId) {
            const course = await this.prisma.course.findUnique({
                where: {
                    id: courseId,
                    userId,
                },
            });
            if (!course) {
                throw new common_1.InternalServerErrorException("Course not found");
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
                : []),
        ]);
        if (!post) {
            throw new common_1.InternalServerErrorException("Couldn't create the post");
        }
        return {
            ...post,
            userPostsCount: updatedUser.postsCount,
            coursePostsCount: updatedCourse?.postsCount,
            courseLastUpdated: updatedCourse?.lastUpdated,
        };
    }
    async deleteById(id, userId) {
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
            throw new common_1.InternalServerErrorException("Post not found");
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
                : []),
        ]);
        if (!deletedPost) {
            throw new common_1.InternalServerErrorException("Couldn't delete the post");
        }
        return deletedPost;
    }
    async updateById(id, userId, title, content, isPreview, courseId) {
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
            throw new common_1.InternalServerErrorException("Post not found");
        }
        if (courseId) {
            const course = await this.prisma.course.findUnique({
                where: {
                    id: courseId,
                    userId,
                },
            });
            if (!course) {
                throw new common_1.InternalServerErrorException("Course not found");
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
                : []),
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
                : []),
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
                : []),
        ]);
        return updatedPost;
    }
    async recordView(id, userId) {
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
    async canViewAllCoursePosts(courseId, viewerId) {
        if (!viewerId)
            return false;
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
    async findById(id) {
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
    async findByCourseId(courseId, viewerId, options = {}) {
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
    async findByUserId(userId, options = {}) {
        const orderByField = options.orderBy === 'rating' ? 'rating' : 'createdAt';
        const order = options.order === 'asc' ? 'asc' : 'desc';
        return this.prisma.post.findMany({
            where: {
                userId,
                ...(options.nonCourseOnly
                    ? { courseId: null }
                    : options.courseId
                        ? { courseId: options.courseId }
                        : {}),
                ...(options.previewMode === 'preview'
                    ? { isPreview: true }
                    : options.previewMode === 'nonPreview'
                        ? { isPreview: false }
                        : {}),
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
    async findRecommendedFeed(viewerId, options = {}) {
        const offset = options.offset ?? 0;
        const limit = options.limit ?? 10;
        const candidateLimit = Math.max(250, offset + limit * 8);
        const [interestProfile, followedAuthorIds, viewedPostIds, authorInteraction] = viewerId
            ? await this.getViewerRecommendationContext(viewerId)
            : [{}, new Set(), new Set(), new Map()];
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
            const similarityScore = this.calculateSimilarityScore(this.getTagNames(post), interestProfile);
            const recencyScore = this.calculateRecencyScore(post.createdAt);
            const engagementScore = this.calculateEngagementScore({
                rating: post.rating,
                ratingCount: post.ratingCount,
                commentCount: post._count.discussions,
                saveCount: 0,
                viewCount: post._count.recentViews,
            });
            const authorScore = this.calculateAuthorScore(post.userId, followedAuthorIds, authorInteraction);
            const recommendationScore = this.clampScore(similarityScore * 0.45
                + recencyScore * 0.30
                + engagementScore * 0.20
                + authorScore * 0.05);
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
    async getViewerRecommendationContext(viewerId) {
        const [createdPosts, ratedPosts, commentedPosts, viewedPosts, follows,] = await Promise.all([
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
        const interests = {};
        const authorInteraction = new Map();
        const addTags = (tags, weight) => {
            this.getTagNames({ tags }).forEach((tag) => {
                interests[tag] = (interests[tag] ?? 0) + weight;
            });
        };
        const addAuthorInteraction = (authorId, weight = 1) => {
            if (!authorId || authorId === viewerId)
                return;
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
        ];
    }
    getTagNames(entity) {
        return entity?.tags
            ?.map((tagEntry) => tagEntry.tag?.name ?? tagEntry.name)
            .filter(Boolean)
            .map((tag) => tag.trim().toLowerCase())
            ?? [];
    }
    calculateSimilarityScore(postTags, userInterests) {
        const maxPossibleScore = Object.values(userInterests).reduce((total, weight) => total + weight, 0);
        if (maxPossibleScore === 0) {
            return 0;
        }
        const score = Array.from(new Set(postTags)).reduce((total, tag) => {
            return total + (userInterests[tag] ?? 0);
        }, 0);
        return this.clampScore(score / maxPossibleScore);
    }
    calculateRecencyScore(createdAt) {
        const ageInHours = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
        return this.clampScore(Math.exp(-ageInHours / 72));
    }
    calculateEngagementScore(post) {
        const weightedEngagement = post.rating * 2
            + post.ratingCount * 1.5
            + post.commentCount * 2
            + post.saveCount * 3
            + post.viewCount * 0.2;
        return this.clampScore(Math.log1p(Math.max(0, weightedEngagement)) / 10);
    }
    calculateAuthorScore(postAuthorId, followedAuthorIds, authorInteraction) {
        if (followedAuthorIds.has(postAuthorId)) {
            return 1;
        }
        const interactionWeight = authorInteraction.get(postAuthorId) ?? 0;
        if (interactionWeight >= 6) {
            return 0.6;
        }
        return interactionWeight > 0 ? 0.3 : 0;
    }
    diversifyPosts(posts, userInterests) {
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
    diversifyPostGroup(posts, userInterests, viewedPenalty) {
        const remaining = [...posts].sort((a, b) => b.recommendationScore - a.recommendationScore);
        const selected = [];
        const selectedTagCounts = new Map();
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
    getPrimaryTag(post, userInterests) {
        const tags = this.getTagNames(post);
        if (tags.length === 0) {
            return undefined;
        }
        return tags.sort((a, b) => (userInterests[b] ?? 0) - (userInterests[a] ?? 0))[0];
    }
    clampScore(score) {
        return Math.max(0, Math.min(1, score));
    }
};
exports.PrismaPostRepository = PrismaPostRepository;
exports.PrismaPostRepository = PrismaPostRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaPostRepository);
//# sourceMappingURL=prisma-post.repository.js.map