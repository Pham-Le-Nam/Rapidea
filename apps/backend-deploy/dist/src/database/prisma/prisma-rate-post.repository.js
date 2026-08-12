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
exports.PrismaRatePostRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaRatePostRepository = class PrismaRatePostRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findPostSummary(postId) {
        return this.prisma.post.findUnique({ where: { id: postId }, select: { userId: true, title: true } });
    }
    findOwnedRating(id, userId) {
        return this.prisma.ratePost.findFirst({ where: { id, userId }, select: { postId: true } });
    }
    findPostAccess(postId, userId) {
        return this.prisma.post.findUnique({
            where: { id: postId },
            select: {
                userId: true, courseId: true, isPreview: true,
                course: { select: { userId: true, subscribers: { where: { userId }, select: { userId: true }, take: 1 } } },
            },
        });
    }
    async create(postId, userId, rating) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                ratingCount: true,
                ratingTotal: true,
            },
        });
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
            },
        });
        if (!post) {
            throw new common_1.InternalServerErrorException("Post not found");
        }
        if (!user) {
            throw new common_1.InternalServerErrorException("User not found");
        }
        const ratePost = await this.prisma.ratePost.create({
            data: {
                postId,
                userId,
                rating,
            },
        });
        if (!ratePost) {
            throw new common_1.InternalServerErrorException("Couldn't rate this post");
        }
        const currentRatingCount = post.ratingCount;
        const currentRatingTotal = post.ratingTotal;
        const newRatingCount = currentRatingCount + 1;
        const newRatingTotal = currentRatingTotal + rating;
        const newRating = newRatingTotal / newRatingCount;
        await this.prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                ratingCount: newRatingCount,
                ratingTotal: newRatingTotal,
                rating: newRating,
            },
        });
        return ratePost;
    }
    async updateById(id, userId, rating) {
        const oldRatePost = await this.prisma.ratePost.findUnique({
            where: {
                id,
                userId,
            },
        });
        const ratePost = await this.prisma.ratePost.update({
            where: {
                id,
                userId,
            },
            data: {
                rating,
            },
        });
        if (!ratePost || !oldRatePost) {
            throw new common_1.InternalServerErrorException("Couldn't update rating for this post");
        }
        const post = await this.prisma.post.findUnique({
            where: {
                id: ratePost.postId,
            },
            select: {
                ratingCount: true,
                ratingTotal: true,
            },
        });
        if (!post) {
            throw new common_1.InternalServerErrorException("Post not found");
        }
        const currentRatingCount = post.ratingCount;
        const currentRatingTotal = post.ratingTotal;
        const newRatingCount = currentRatingCount;
        const newRatingTotal = currentRatingTotal - oldRatePost.rating + rating;
        const newRating = newRatingTotal / newRatingCount;
        await this.prisma.post.update({
            where: {
                id: ratePost.postId,
            },
            data: {
                ratingCount: newRatingCount,
                ratingTotal: newRatingTotal,
                rating: newRating,
            },
        });
        return ratePost;
    }
    async updateByPostId(postId, userId, rating) {
        const oldRatePost = await this.prisma.ratePost.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });
        const ratePost = await this.prisma.ratePost.update({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
            data: {
                rating,
            },
        });
        if (!ratePost || !oldRatePost) {
            throw new common_1.InternalServerErrorException("Couldn't update rating for this post");
        }
        const post = await this.prisma.post.findUnique({
            where: {
                id: ratePost.postId,
            },
            select: {
                ratingCount: true,
                ratingTotal: true,
            },
        });
        if (!post) {
            throw new common_1.InternalServerErrorException("Post not found");
        }
        const currentRatingCount = post.ratingCount;
        const currentRatingTotal = post.ratingTotal;
        const newRatingCount = currentRatingCount;
        const newRatingTotal = currentRatingTotal - oldRatePost.rating + rating;
        const newRating = newRatingTotal / newRatingCount;
        await this.prisma.post.update({
            where: {
                id: ratePost.postId,
            },
            data: {
                ratingCount: newRatingCount,
                ratingTotal: newRatingTotal,
                rating: newRating,
            },
        });
        return ratePost;
    }
    async findRating(postId, userId) {
        return this.prisma.ratePost.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });
    }
    async findByPostId(postId) {
        return this.prisma.ratePost.findMany({
            where: {
                postId,
            },
        });
    }
    async findByUserId(userId) {
        return this.prisma.ratePost.findMany({
            where: {
                userId,
            },
        });
    }
};
exports.PrismaRatePostRepository = PrismaRatePostRepository;
exports.PrismaRatePostRepository = PrismaRatePostRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaRatePostRepository);
//# sourceMappingURL=prisma-rate-post.repository.js.map