import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DiscussionRepository } from '../../modules/discussion/discussion.repository';

@Injectable()
export class PrismaDiscussionRepository implements DiscussionRepository {
    constructor(private prisma: PrismaService) {}

    async create(discussion: any, postId: string, userId: string, parentId?: string, repliedId?: string) {
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

    async updateById(id: string, userId: string, discussion: any) {
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

    async deleteById(id: string, userId: string) {
        const deletedDiscussion = await this.prisma.discussion.delete({
            where: {
                id,
                userId,
            },
        });

        return deletedDiscussion;
    }

    async findById(id: string) {
        return this.prisma.discussion.findUnique({
            where: { id }
        });
    }

    async findByPostId(postId: string, startIndex: number = 0, amount: number = 5) {
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

    async findReplyingById(repliedId: string, startIndex: number = 0, amount: number = 5): Promise<any> {
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

    async findChildrenById(parentId: string, startIndex?: number, amount?: number): Promise<any> {
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

    async addRatingById(id: string, rating: number) {
        if (rating < 0 || rating > 5) {
            throw new InternalServerErrorException("Invalid Rating");
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

    async updateRatingById(id: string, ratingDifference: number) {
        if (ratingDifference < -5 || ratingDifference > 5) {
            throw new InternalServerErrorException("Invalid Rating");
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

}
