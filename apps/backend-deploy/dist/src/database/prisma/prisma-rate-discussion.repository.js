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
exports.PrismaRateDiscussionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaRateDiscussionRepository = class PrismaRateDiscussionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(discussionId, userId, rating) {
        const discussion = await this.prisma.discussion.findUnique({
            where: {
                id: discussionId,
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
        if (!discussion) {
            throw new common_1.InternalServerErrorException("Discussion not found");
        }
        if (!user) {
            throw new common_1.InternalServerErrorException("User not found");
        }
        const rateDiscussion = await this.prisma.rateDiscussion.create({
            data: {
                discussionId,
                userId,
                rating,
            },
        });
        if (!rateDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't rate this discussion");
        }
        const currentRatingCount = discussion.ratingCount;
        const currentRatingTotal = discussion.ratingTotal;
        const newRatingCount = currentRatingCount + 1;
        const newRatingTotal = currentRatingTotal + rating;
        const newRating = newRatingTotal / newRatingCount;
        await this.prisma.discussion.update({
            where: {
                id: discussionId,
            },
            data: {
                ratingCount: newRatingCount,
                ratingTotal: newRatingTotal,
                rating: newRating,
            },
        });
        return rateDiscussion;
    }
    async updateById(id, userId, rating) {
        const oldRateDiscussion = await this.prisma.rateDiscussion.findUnique({
            where: {
                id,
                userId,
            },
        });
        const rateDiscussion = await this.prisma.rateDiscussion.update({
            where: {
                id,
                userId,
            },
            data: {
                rating,
            },
        });
        if (!rateDiscussion || !oldRateDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't update rating for this discussion");
        }
        const discussion = await this.prisma.discussion.findUnique({
            where: {
                id: rateDiscussion.discussionId,
            },
            select: {
                ratingCount: true,
                ratingTotal: true,
            },
        });
        if (!discussion) {
            throw new common_1.InternalServerErrorException("Discussion not found");
        }
        const currentRatingCount = discussion.ratingCount;
        const currentRatingTotal = discussion.ratingTotal;
        const newRatingCount = currentRatingCount;
        const newRatingTotal = currentRatingTotal - oldRateDiscussion.rating + rating;
        const newRating = newRatingTotal / newRatingCount;
        await this.prisma.discussion.update({
            where: {
                id: rateDiscussion.discussionId,
            },
            data: {
                ratingCount: newRatingCount,
                ratingTotal: newRatingTotal,
                rating: newRating,
            },
        });
        return rateDiscussion;
    }
    async updateByDiscussionId(discussionId, userId, rating) {
        const oldRateDiscussion = await this.prisma.rateDiscussion.findUnique({
            where: {
                discussionId_userId: {
                    discussionId,
                    userId,
                },
            },
        });
        const rateDiscussion = await this.prisma.rateDiscussion.update({
            where: {
                discussionId_userId: {
                    discussionId,
                    userId,
                },
            },
            data: {
                rating,
            },
        });
        if (!rateDiscussion || !oldRateDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't update rating for this discussion");
        }
        const discussion = await this.prisma.discussion.findUnique({
            where: {
                id: rateDiscussion.discussionId,
            },
            select: {
                ratingCount: true,
                ratingTotal: true,
            },
        });
        if (!discussion) {
            throw new common_1.InternalServerErrorException("Discussion not found");
        }
        const currentRatingCount = discussion.ratingCount;
        const currentRatingTotal = discussion.ratingTotal;
        const newRatingCount = currentRatingCount;
        const newRatingTotal = currentRatingTotal - oldRateDiscussion.rating + rating;
        const newRating = newRatingTotal / newRatingCount;
        await this.prisma.discussion.update({
            where: {
                id: rateDiscussion.discussionId,
            },
            data: {
                ratingCount: newRatingCount,
                ratingTotal: newRatingTotal,
                rating: newRating,
            },
        });
        return rateDiscussion;
    }
    async findRating(discussionId, userId) {
        return this.prisma.rateDiscussion.findUnique({
            where: {
                discussionId_userId: {
                    discussionId,
                    userId,
                },
            },
        });
    }
};
exports.PrismaRateDiscussionRepository = PrismaRateDiscussionRepository;
exports.PrismaRateDiscussionRepository = PrismaRateDiscussionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaRateDiscussionRepository);
//# sourceMappingURL=prisma-rate-discussion.repository.js.map