import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SubscribeRepository } from './subscribe.repository';

@Injectable()
export class SubscribeService {
    constructor(
        @Inject('SUBSCRIBE_REPOSITORY')
        private readonly subscribeRepo: SubscribeRepository,
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

        return this.subscribeRepo.reviewByCourseId(courseId, userId, review.trim(), rating);
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
