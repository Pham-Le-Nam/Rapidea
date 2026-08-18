import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { RatePostRepository } from '../../../domain/rate-post/repositories/rate-post.repository';

@Injectable()
export class PrismaRatePostRepository implements RatePostRepository {
    constructor(private prisma: PrismaService) {}

    findPostSummary(postId: string) {
        return this.prisma.post.findUnique({ where: { id: postId }, select: { userId: true, title: true } });
    }

    findOwnedRating(id: string, userId: string) {
        return this.prisma.ratePost.findFirst({ where: { id, userId }, select: { postId: true } });
    }

    findPostAccess(postId: string, userId: string) {
        return this.prisma.post.findUnique({
            where: { id: postId },
            select: {
                userId: true, courseId: true, isPreview: true,
                course: { select: { userId: true, subscribers: { where: { userId }, select: { userId: true }, take: 1 } } },
            },
        });
    }

    async create(postId: string, userId: string, rating: number): Promise<any> {
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

        // Check if postId is valid
        if (!post) {
            throw new InternalServerErrorException("Post not found");
        }

        // Check if the userId is valid
        if (!user) {
            throw new InternalServerErrorException("User not found");
        }

        const ratePost = await this.prisma.ratePost.create({
            data: {
                postId,
                userId,
                rating,
            },
        });

        if (!ratePost) {
            throw new InternalServerErrorException("Couldn't rate this post");
        }

        const currentRatingCount = post.ratingCount;
        const currentRatingTotal = post.ratingTotal;
        
        const newRatingCount = currentRatingCount + 1;
        const newRatingTotal = currentRatingTotal + rating;
        const newRating = newRatingTotal / newRatingCount;

        // Update rating for the post
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

    async updateById(id: string, userId: string, rating: number): Promise<any> {
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
            throw new InternalServerErrorException("Couldn't update rating for this post");
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
            throw new InternalServerErrorException("Post not found");
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

    async updateByPostId(postId: string, userId: string, rating: number): Promise<any> {
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
            throw new InternalServerErrorException("Couldn't update rating for this post");
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
            throw new InternalServerErrorException("Post not found");
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

    async findRating(postId: string, userId: string): Promise<any> {
        return this.prisma.ratePost.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });
    }

    async findByPostId(postId: string): Promise<any> {
        return this.prisma.ratePost.findMany({
            where: {
                postId,
            },
        });
    }

    async findByUserId(userId: string): Promise<any> {
        return this.prisma.ratePost.findMany({
            where: {
                userId,
            },
        });
    }
}
