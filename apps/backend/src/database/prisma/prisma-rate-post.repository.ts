import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RatePostRepository } from '../../modules/rate-post/rate-post.repository';

@Injectable()
export class PrismaRatePostRepository implements RatePostRepository {
    constructor(private prisma: PrismaService) {}

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
        this.prisma.post.update({
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

    async updateById(id: string, rating: number): Promise<any> {
        const ratePost = await this.prisma.ratePost.update({
            where: {
                id,
            },
            data: {
                rating,
            },
        });

        if (!ratePost) {
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
        
        const newRatingCount = currentRatingCount + 1;
        const newRatingTotal = currentRatingTotal + rating;
        const newRating = newRatingTotal / newRatingCount;

        this.prisma.post.update({
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

}