import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SubscribeRepository } from '../../modules/subscribe/subscribe.repository';

@Injectable()
export class PrismaSubscribeRepository implements SubscribeRepository {
    constructor(private prisma: PrismaService) {}

    async create(courseId: string, userId: string): Promise<any> {
        const course = await this.prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                userId: true,
                price: true,
                currency: true,
            },
        });

        const user = await this.prisma.users.findUnique.apply({
            where: {
                id: userId,
            },
            select: {
                id: true,
            },
        });

        if (!course) {
            throw new InternalServerErrorException("Course not found");
        }

        if (!user) {
            throw new InternalServerErrorException("User not found");
        }


        const subscription = await this.prisma.subscribe.create({
            data: {
                courseId,
                userId,
                price: course.price,
                currency: course.currency,
            },
        });

        if (!subscription) {
            throw new InternalServerErrorException("Couldn't create subscription");
        }

        this.prisma.course.update({
            where: {
                id: courseId,
            },
            data: {
                subscribersCount: { increment: 1 },
            },
        });

        this.prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                subscribersCount: { increment: 1 },
            },
        });

        return subscription;

    }
    async reviewById(id: string, review: string, rating: number): Promise<any> {
        const subscription = await this.prisma.subscribe.update({
            where: {
                id,
            },
            data: {
                review,
                rating,
            },
            select: {
                courseId: true,
            },
        });

        if (!subscription) {
            throw new InternalServerErrorException("Couldn't review the course");
        }

        const course = await this.prisma.course.findUnique({
            where: {
                id: subscription.courseId,
            },
            select: {
                userId: true,
                ratingCount: true,
                ratingTotal: true,
            },
        });

        if (!course) {
            throw new InternalServerErrorException("Course not found");
        }

        const courseCreator = await this.prisma.users.findUnique({
            where: {
                id: course.userId,
            },
            select: {
                ratingCount: true,
                ratingTotal: true,
            }
        })
        
        if (!courseCreator) {
            throw new InternalServerErrorException("Creator not found");
        }

        const newCourseRatingCount = course.ratingCount + 1;
        const newCourseRatingTotal = course.ratingTotal + rating;
        const newCourseRating = newCourseRatingTotal / newCourseRatingCount;

        const newCreatorRatingCount = courseCreator.ratingCount + 1;
        const newCreatorRatingTotal = courseCreator.ratingTotal + rating;
        const newCreatorRating = newCreatorRatingTotal / newCreatorRatingCount;

        this.prisma.course.update({
            where: {
                id: subscription.courseId,
            },
            data: {
                ratingCount: newCourseRatingCount,
                ratingTotal: newCourseRatingTotal,
                rating: newCourseRating
            },
        });

        this.prisma.users.update({
            where: {
                id: course.userId,
            },
            data: {
                ratingCount: newCreatorRatingCount,
                ratingTotal: newCreatorRatingTotal,
                rating: newCreatorRating
            },
        })

        return subscription;
    }

    async editReviewById(id: string, review: string, rating: number): Promise<any> {
        const subscription = await this.prisma.subscribe.findUnique({
            where: {
                id,
            },
            select: {
                rating: true,
            },
        });

        if (!subscription) {
            throw new InternalServerErrorException("Subscription not found");
        }

        const ratingDifference = rating - subscription.rating;

        const newSubscription = await this.prisma.subscribe.update({
            where: {
                id,
            },
            data: {
                review,
                rating,
            },
            select: {
                courseId: true,
            },
        });

        if (!newSubscription) {
            throw new InternalServerErrorException("Couldn't update the review");
        }

        const course = await this.prisma.course.findUnique({
            where: {
                id: newSubscription.courseId,
            },
            select: {
                userId: true,
                ratingCount: true,
                ratingTotal: true,
            },
        });

        if (!course) {
            throw new InternalServerErrorException("Course not found");
        }

        const courseCreator = await this.prisma.users.findUnique({
            where: {
                id: course.userId,
            },
            select: {
                ratingCount: true,
                ratingTotal: true,
            }
        })
        
        if (!courseCreator) {
            throw new InternalServerErrorException("Creator not found");
        }

        const newCourseRatingTotal = course.ratingTotal + ratingDifference;
        const newCourseRating = newCourseRatingTotal / course.ratingCount;

        const newCreatorRatingTotal = courseCreator.ratingTotal + ratingDifference;
        const newCreatorRating = newCreatorRatingTotal / courseCreator.ratingCount;

        this.prisma.course.update({
            where: {
                id: newSubscription.courseId,
            },
            data: {
                ratingTotal: newCourseRatingTotal,
                rating: newCourseRating
            },
        });

        this.prisma.users.update({
            where: {
                id: course.userId,
            },
            data: {
                ratingTotal: newCreatorRatingTotal,
                rating: newCreatorRating
            },
        })

        return newSubscription;
    }

    async getSubcribedCourses(userId: string): Promise<any> {
        const subscriptions = await this.prisma.subscribe.findMany({
            where: {
                userId,
            },
            select: {
                courseId: true,
            },
        });

        if (!subscriptions) {
            throw new InternalServerErrorException("Subscriptions not found");
        }

        const ids = subscriptions.map(subscription => subscription.courseId);

        return this.prisma.course.findMany({
            where: {
                id: { in: ids },
            },
        });
    }
    
    async getSubscribers(courseId: string): Promise<any> {
        const subscriptions = await this.prisma.subscribe.findMany({
            where: {
                courseId,
            },
            select: {
                userId: true,
            },
        });

        if (!subscriptions) {
            throw new InternalServerErrorException("Subscriptions not found");
        }

        const ids = subscriptions.map(subscription => subscription.userId);

        return this.prisma.users.findMany({
            where: {
                id: { in: ids },
            },
        });
    }

    async getSubscription(courseId: string, userId: string): Promise<any> {
        return this.prisma.subscribe.findUnique({
            where: {
                courseId_userId: {
                    courseId,
                    userId,
                },
            },
        });
    }
}