import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RateDiscussionRepository } from '../../modules/rate-discussion/rate-discussion.repository';

@Injectable()
export class PrismaRateDiscussionRepository implements RateDiscussionRepository {
    constructor(private prisma: PrismaService) {}

    async create(discussionId: string, userId: string, rating: number): Promise<any> {
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

        // Check if discussionId is valid
        if (!discussion) {
            throw new InternalServerErrorException("Discussion not found");
        }

        // Check if the userId is valid
        if (!user) {
            throw new InternalServerErrorException("User not found");
        }

        const rateDiscussion = await this.prisma.rateDiscussion.create({
            data: {
                discussionId,
                userId,
                rating,
            },
        });

        if (!rateDiscussion) {
            throw new InternalServerErrorException("Couldn't rate this discussion");
        }

        const currentRatingCount = discussion.ratingCount;
        const currentRatingTotal = discussion.ratingTotal;
        
        const newRatingCount = currentRatingCount + 1;
        const newRatingTotal = currentRatingTotal + rating;
        const newRating = newRatingTotal / newRatingCount;

        // Update rating for the discussion
        this.prisma.discussion.update({
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

    async updateById(id: string, rating: number): Promise<any> {
        const rateDiscussion = await this.prisma.rateDiscussion.update({
            where: {
                id,
            },
            data: {
                rating,
            },
        });

        if (!rateDiscussion) {
            throw new InternalServerErrorException("Couldn't update rating for this discussion");
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
            throw new InternalServerErrorException("Discussion not found");
        }

        const currentRatingCount = discussion.ratingCount;
        const currentRatingTotal = discussion.ratingTotal;
        
        const newRatingCount = currentRatingCount + 1;
        const newRatingTotal = currentRatingTotal + rating;
        const newRating = newRatingTotal / newRatingCount;

        this.prisma.discussion.update({
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

    async findRating(discussionId: string, userId: string): Promise<any> {
        return this.prisma.rateDiscussion.findUnique({
            where: {
                discussionId_userId: {
                    discussionId,
                    userId,
                },
            },
        });
    }

}