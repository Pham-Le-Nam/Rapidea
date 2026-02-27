import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DiscussionRepository } from '../../modules/discussion/discussion.repository';

@Injectable()
export class PrismaDiscussionRepository implements DiscussionRepository {
    constructor(private prisma: PrismaService) {}

    async create(discussion: any, postId: string, userId: string) {
        return this.prisma.discussion.create({
            data: {
                discussion,
                postId,
                userId,
            }
        });
    }

    async updateById(id: string, discussion: any) {
        return this.prisma.discussion.update({
            where: { id },
            data: {
                discussion,
            }
        });
    }

    async deleteById(id: string) {
        const deletedDiscussion = await this.prisma.discussion.delete({
            where: { id },
        });

        const replyindDiscussions = await this.prisma.replyDiscussion.findMany({
            where: {
                repliedId: id,
            },
            select: {
                replyingId: true,
            },
        });

        if (replyindDiscussions) {
            // Delete all discussions replying given discussion
            replyindDiscussions.map(replyingDiscussion => this.deleteById(replyingDiscussion.replyingId));
        }

        return deletedDiscussion;
    }

    async findById(id: string) {
        return this.prisma.discussion.findUnique({
            where: { id }
        });
    }

    async findByPostId(postId: string) {
        return this.prisma.discussion.findMany({
            where: { postId }
        });
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