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
exports.PrismaSubscribeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaSubscribeRepository = class PrismaSubscribeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getCoursePrice(courseId) { return this.prisma.course.findUnique({ where: { id: courseId }, select: { price: true } }); }
    async getCheckoutContext(courseId, userId) {
        const [course, user] = await Promise.all([
            this.prisma.course.findUnique({ where: { id: courseId }, include: { user: { include: { payoutAccount: true } } } }),
            this.prisma.users.findUnique({ where: { id: userId } }),
        ]);
        return { course, user };
    }
    findByPaymentSession(sessionId) { return this.prisma.subscribe.findUnique({ where: { paymentSessionId: sessionId } }); }
    attachPaymentSession(subscriptionId, sessionId) { return this.prisma.subscribe.update({ where: { id: subscriptionId }, data: { paymentSessionId: sessionId } }); }
    findCourseSummary(courseId) { return this.prisma.course.findUnique({ where: { id: courseId }, select: { title: true, userId: true } }); }
    async create(courseId, userId) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            select: {
                userId: true,
                price: true,
                currency: true,
            },
        });
        if (!course) {
            throw new common_1.NotFoundException("Course not found");
        }
        if (userId === course.userId) {
            throw new common_1.BadRequestException("You cannot subscribe to your own course");
        }
        try {
            return await this.prisma.$transaction(async (tx) => {
                const user = await tx.users.findUnique({
                    where: { id: userId },
                    select: { id: true },
                });
                if (!user) {
                    throw new common_1.NotFoundException("User not found");
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
        }
        catch (error) {
            if (error?.code === 'P2002') {
                throw new common_1.ConflictException("You already subscribed to this course");
            }
            throw error;
        }
    }
    async delete(courseId, userId) {
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
                throw new common_1.NotFoundException("Subscription not found");
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
    async reviewByCourseId(courseId, userId, review, rating) {
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
                throw new common_1.ForbiddenException("Subscribe to this course before reviewing it");
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
                throw new common_1.InternalServerErrorException("Creator not found");
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
    async getSubscribedCourses(userId) {
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
    async getSubscribers(courseId) {
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
    async getSubscriptionsByCourse(courseId) {
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
    async getSubscription(courseId, userId) {
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
};
exports.PrismaSubscribeRepository = PrismaSubscribeRepository;
exports.PrismaSubscribeRepository = PrismaSubscribeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaSubscribeRepository);
//# sourceMappingURL=prisma-subscribe.repository.js.map