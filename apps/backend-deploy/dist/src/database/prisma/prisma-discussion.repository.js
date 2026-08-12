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
exports.PrismaDiscussionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaDiscussionRepository = class PrismaDiscussionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(discussion, postId, userId, parentId, repliedId) {
        return this.prisma.discussion.create({
            data: {
                discussion,
                postId,
                userId,
                parentId,
                repliedId,
            },
        });
    }
    async updateById(id, userId, discussion) {
        return this.prisma.discussion.update({
            where: {
                id,
                userId,
            },
            data: {
                discussion,
            }
        });
    }
    async deleteById(id, userId) {
        const deletedDiscussion = await this.prisma.discussion.delete({
            where: {
                id,
                userId,
            },
        });
        return deletedDiscussion;
    }
    async findById(id) {
        return this.prisma.discussion.findUnique({
            where: { id }
        });
    }
    findPostSummary(postId) {
        return this.prisma.post.findUnique({
            where: { id: postId },
            select: { userId: true, title: true },
        });
    }
    async findByPostId(postId, startIndex = 0, amount = 5) {
        const discussion = await this.prisma.discussion.findMany({
            where: {
                postId,
                repliedId: null,
            },
            orderBy: {
                createdAt: "asc",
            },
            skip: startIndex,
            take: amount,
        });
        return {
            discussion,
            startIndex,
            amount,
        };
    }
    async findReplyingById(repliedId, startIndex = 0, amount = 5) {
        const discussion = await this.prisma.discussion.findMany({
            where: {
                repliedId,
            },
            orderBy: {
                createdAt: "asc",
            },
            skip: startIndex,
            take: amount,
        });
        return {
            discussion,
            startIndex,
            amount,
        };
    }
    async findChildrenById(parentId, startIndex, amount) {
        const discussion = await this.prisma.discussion.findMany({
            where: {
                parentId,
            },
            orderBy: {
                createdAt: "asc",
            },
            skip: startIndex,
            take: amount,
        });
        return {
            discussion,
            startIndex,
            amount,
        };
    }
    async addRatingById(id, rating) {
        if (rating < 0 || rating > 5) {
            throw new common_1.InternalServerErrorException("Invalid Rating");
        }
        const discussion = await this.prisma.discussion.findUnique({
            where: { id },
            select: {
                ratingCount: true,
                ratingTotal: true,
            }
        });
        if (!discussion) {
            throw new Error("Discussion not found");
        }
        const newRatingCount = discussion.ratingCount + 1;
        const newRatingtotal = discussion.ratingTotal + rating;
        const newRating = newRatingtotal / newRatingCount;
        return this.prisma.discussion.update({
            where: { id },
            data: {
                ratingCount: newRatingCount,
                ratingTotal: newRatingtotal,
                rating: newRating,
            },
        });
    }
    async updateRatingById(id, ratingDifference) {
        if (ratingDifference < -5 || ratingDifference > 5) {
            throw new common_1.InternalServerErrorException("Invalid Rating");
        }
        const discussion = await this.prisma.discussion.findUnique({
            where: { id },
            select: {
                ratingCount: true,
                ratingTotal: true,
            }
        });
        if (!discussion) {
            throw new Error("Discussion not found");
        }
        const newRatingtotal = discussion.ratingTotal + ratingDifference;
        const newRating = newRatingtotal / discussion.ratingCount;
        return this.prisma.discussion.update({
            where: { id },
            data: {
                ratingTotal: newRatingtotal,
                rating: newRating,
            },
        });
    }
};
exports.PrismaDiscussionRepository = PrismaDiscussionRepository;
exports.PrismaDiscussionRepository = PrismaDiscussionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaDiscussionRepository);
//# sourceMappingURL=prisma-discussion.repository.js.map