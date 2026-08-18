import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { SubscribeRepository } from '../../../domain/subscribe/repositories/subscribe.repository';

@Injectable()
export class PrismaSubscribeRepository implements SubscribeRepository {
    constructor(private prisma: PrismaService) {}

    getCoursePrice(courseId: string) { return this.prisma.course.findUnique({ where: { id: courseId }, select: { price: true } }); }
    async getCheckoutContext(courseId: string, userId: string) {
        const [course, user] = await Promise.all([
            this.prisma.course.findUnique({ where: { id: courseId }, include: { user: { include: { payoutAccount: true } } } }),
            this.prisma.users.findUnique({ where: { id: userId } }),
        ]);
        return { course, user };
    }
    findByPaymentSession(sessionId: string) { return this.prisma.subscribe.findUnique({ where: { paymentSessionId: sessionId } }); }
    attachPaymentSession(subscriptionId: string, sessionId: string) { return this.prisma.subscribe.update({ where: { id: subscriptionId }, data: { paymentSessionId: sessionId } }); }
    findCourseSummary(courseId: string) { return this.prisma.course.findUnique({ where: { id: courseId }, select: { title: true, userId: true } }); }

    async create(courseId: string, userId: string): Promise<any> {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            select: {
                userId: true,
                price: true,
                currency: true,
            },
        });

        if (!course) {
            throw new NotFoundException("Course not found");
        }

        if (userId === course.userId) {
            throw new BadRequestException("You cannot subscribe to your own course");
        }

        try {
            return await this.prisma.$transaction(async (tx) => {
                const user = await tx.users.findUnique({
                    where: { id: userId },
                    select: { id: true },
                });

                if (!user) {
                    throw new NotFoundException("User not found");
                }

                const subscription = await tx.subscribe.create({
                    data: {
                        courseId,
                        userId,
                        price: course.price,
                        currency: course.currency,
                    },
                });

                const updatedCourse = await tx.course.update({
                    where: { id: courseId },
                    data: { subscribersCount: { increment: 1 } },
                    select: {
                        subscribersCount: true,
                    },
                });

                const updatedCreator = await tx.users.update({
                    where: { id: course.userId },
                    data: { subscribersCount: { increment: 1 } },
                    select: {
                        subscribersCount: true,
                    },
                });

                return {
                    ...subscription,
                    courseSubscribersCount: updatedCourse.subscribersCount,
                    creatorSubscribersCount: updatedCreator.subscribersCount,
                };
            });
        } catch (error: any) {
            if (error?.code === 'P2002') {
                throw new ConflictException("You already subscribed to this course");
            }

            throw error;
        }
    }

    async delete(courseId: string, userId: string): Promise<any> {
        return this.prisma.$transaction(async (tx) => {
            const subscription = await tx.subscribe.findUnique({
                where: {
                    courseId_userId: {
                        courseId,
                        userId,
                    },
                },
                select: {
                    id: true,
                    courseId: true,
                    userId: true,
                    review: true,
                    rating: true,
                    price: true,
                    currency: true,
                    createdAt: true,
                    course: {
                        select: {
                            userId: true,
                            ratingCount: true,
                            ratingTotal: true,
                        },
                    },
                },
            });

            if (!subscription) {
                throw new NotFoundException("Subscription not found");
            }

            const deletedSubscription = await tx.subscribe.delete({
                where: {
                    courseId_userId: {
                        courseId,
                        userId,
                    },
                },
            });

            await tx.course.update({
                where: { id: courseId },
                data: { subscribersCount: { decrement: 1 } },
            });

            await tx.users.update({
                where: { id: subscription.course.userId },
                data: { subscribersCount: { decrement: 1 } },
            });

            if (subscription.review !== null) {
                const ratingCount = Math.max(subscription.course.ratingCount - 1, 0);
                const ratingTotal = Math.max(subscription.course.ratingTotal - subscription.rating, 0);
                const rating = ratingCount === 0 ? 0 : ratingTotal / ratingCount;

                await tx.course.update({
                    where: { id: courseId },
                    data: {
                        ratingCount,
                        ratingTotal,
                        rating,
                    },
                });

                const creator = await tx.users.findUnique({
                    where: { id: subscription.course.userId },
                    select: {
                        ratingCount: true,
                        ratingTotal: true,
                    },
                });

                if (creator) {
                    const creatorRatingCount = Math.max(creator.ratingCount - 1, 0);
                    const creatorRatingTotal = Math.max(creator.ratingTotal - subscription.rating, 0);
                    const creatorRating = creatorRatingCount === 0 ? 0 : creatorRatingTotal / creatorRatingCount;

                    await tx.users.update({
                        where: { id: subscription.course.userId },
                        data: {
                            ratingCount: creatorRatingCount,
                            ratingTotal: creatorRatingTotal,
                            rating: creatorRating,
                        },
                    });
                }
            }

            return deletedSubscription;
        });
    }

    async reviewByCourseId(courseId: string, userId: string, review: string, rating: number): Promise<any> {
        return this.prisma.$transaction(async (tx) => {
            const subscription = await tx.subscribe.findUnique({
                where: {
                    courseId_userId: {
                        courseId,
                        userId,
                    },
                },
                select: {
                    id: true,
                    review: true,
                    rating: true,
                    course: {
                        select: {
                            userId: true,
                            ratingCount: true,
                            ratingTotal: true,
                        },
                    },
                },
            });

            if (!subscription) {
                throw new ForbiddenException("Subscribe to this course before reviewing it");
            }

            const isFirstReview = subscription.review === null;
            const ratingCount = subscription.course.ratingCount + (isFirstReview ? 1 : 0);
            const ratingTotal = subscription.course.ratingTotal + (isFirstReview ? rating : rating - subscription.rating);
            const courseRating = ratingCount === 0 ? 0 : ratingTotal / ratingCount;

            const updatedSubscription = await tx.subscribe.update({
                where: {
                    courseId_userId: {
                        courseId,
                        userId,
                    },
                },
                data: {
                    review,
                    rating,
                },
            });

            await tx.course.update({
                where: { id: courseId },
                data: {
                    ratingCount,
                    ratingTotal,
                    rating: courseRating,
                },
            });

            const creator = await tx.users.findUnique({
                where: { id: subscription.course.userId },
                select: {
                    ratingCount: true,
                    ratingTotal: true,
                },
            });

            if (!creator) {
                throw new InternalServerErrorException("Creator not found");
            }

            const creatorRatingCount = creator.ratingCount + (isFirstReview ? 1 : 0);
            const creatorRatingTotal = creator.ratingTotal + (isFirstReview ? rating : rating - subscription.rating);
            const creatorRating = creatorRatingCount === 0 ? 0 : creatorRatingTotal / creatorRatingCount;

            await tx.users.update({
                where: { id: subscription.course.userId },
                data: {
                    ratingCount: creatorRatingCount,
                    ratingTotal: creatorRatingTotal,
                    rating: creatorRating,
                },
            });

            return updatedSubscription;
        });
    }

    async getSubscribedCourses(userId: string): Promise<any> {
        return this.prisma.subscribe.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                review: true,
                rating: true,
                price: true,
                currency: true,
                createdAt: true,
                course: {
                    include: {
                        thumbnail: true,
                        user: {
                            select: {
                                id: true,
                                firstname: true,
                                lastname: true,
                                middlename: true,
                                username: true,
                                avatarId: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    
    async getSubscribers(courseId: string): Promise<any> {
        return this.prisma.subscribe.findMany({
            where: {
                courseId,
            },
            select: {
                id: true,
                review: true,
                rating: true,
                createdAt: true,
                subscriber: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        middlename: true,
                        username: true,
                        avatarId: true,
                        avatar: true,
                        headline: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async getSubscriptionsByCourse(courseId: string): Promise<any> {
        return this.prisma.subscribe.findMany({
            where: {
                courseId,
                review: {
                    not: null,
                },
            },
            include: {
                subscriber: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        middlename: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
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
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        userId: true,
                        price: true,
                        currency: true,
                    },
                },
            },
        });
    }
}
