import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SubscribeRepository } from './subscribe.repository';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubscribeService {
    constructor(
        @Inject('SUBSCRIBE_REPOSITORY')
        private readonly subscribeRepo: SubscribeRepository,
        private readonly notificationService: NotificationService,
        private readonly prisma: PrismaService,
    ) {}

    async subscribeCourse(courseId: string, userId: string) {
        if (!courseId) {
            throw new BadRequestException("Course id is required");
        }

        const existingSubscription = await this.subscribeRepo.getSubscription(courseId, userId);

        if (existingSubscription) {
            return existingSubscription;
        }

        const subscription = await this.subscribeRepo.create(courseId, userId);

        if (!subscription) {
            throw new InternalServerErrorException("Couldn't subscribe to course");
        }

        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            select: {
                title: true,
                userId: true,
            },
        });

        if (course) {
            await this.notificationService.createNotification({
                userId: course.userId,
                actorId: userId,
                type: NotificationType.COURSE_SUBSCRIBE,
                title: 'New course subscriber',
                message: course.title,
                link: `/course/${courseId}`,
            });
        }

        return subscription;
    }

    async unsubscribeCourse(courseId: string, userId: string) {
        if (!courseId) {
            throw new BadRequestException("Course id is required");
        }

        return this.subscribeRepo.delete(courseId, userId);
    }

    async reviewCourse(courseId: string, userId: string, review: string, rating: number) {
        if (!courseId) {
            throw new BadRequestException("Course id is required");
        }

        if (typeof review !== 'string' || !review.trim()) {
            throw new BadRequestException("Review is required");
        }

        if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
            throw new BadRequestException("Invalid rating it must be from 0 to 5");
        }

        const subscription = await this.subscribeRepo.reviewByCourseId(courseId, userId, review.trim(), rating);
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            select: {
                title: true,
                userId: true,
            },
        });

        if (course) {
            await this.notificationService.createNotification({
                userId: course.userId,
                actorId: userId,
                type: NotificationType.COURSE_REVIEW,
                title: 'New course review',
                message: course.title,
                link: `/course/${courseId}`,
            });
        }

        return subscription;
    }

    async getSubscribedCourses(userId: string) {
        return this.subscribeRepo.getSubscribedCourses(userId);
    }

    async getSubscribers(courseId: string) {
        if (!courseId) {
            throw new BadRequestException("Course id is required");
        }

        return this.subscribeRepo.getSubscribers(courseId);
    }

    async getCourseReviews(courseId: string) {
        if (!courseId) {
            throw new BadRequestException("Course id is required");
        }

        return this.subscribeRepo.getSubscriptionsByCourse(courseId);
    }

    async getSubscription(courseId: string, userId: string) {
        if (!courseId) {
            throw new BadRequestException("Course id is required");
        }

        return this.subscribeRepo.getSubscription(courseId, userId);
    }
}
