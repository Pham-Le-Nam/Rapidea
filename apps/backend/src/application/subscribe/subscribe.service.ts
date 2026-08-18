import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SubscribeRepository } from '../../domain/subscribe/repositories/subscribe.repository';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../../domain/notification/notification-type';
import { PAYMENT_SERVICE, PaymentService } from '../ports/payment.service';

@Injectable()
export class SubscribeService {
    constructor(
        @Inject('SUBSCRIBE_REPOSITORY')
        private readonly subscribeRepo: SubscribeRepository,
        private readonly notificationService: NotificationService,
        @Inject(PAYMENT_SERVICE) private readonly paymentService: PaymentService,
    ) {}

    async subscribeCourse(courseId: string, userId: string) {
        if (!courseId) {
            throw new BadRequestException("Course id is required");
        }

        const coursePrice = await this.subscribeRepo.getCoursePrice(courseId);
        if (!coursePrice) throw new BadRequestException('Course not found');
        if (coursePrice.price > 0) {
            throw new BadRequestException({
                code: 'PAYMENT_REQUIRED',
                message: 'Payment is required before subscribing to this course.',
            });
        }

        return this.createSubscription(courseId, userId);
    }

    async createCheckoutSession(courseId: string, userId: string) {
        const [{ course, user }, existing] = await Promise.all([
            this.subscribeRepo.getCheckoutContext(courseId, userId),
            this.subscribeRepo.getSubscription(courseId, userId),
        ]);
        if (!course || !user) throw new BadRequestException('Course or user not found');
        if (course.userId === userId) throw new BadRequestException('You cannot subscribe to your own course');
        if (existing) return { alreadySubscribed: true };
        if (course.price <= 0) throw new BadRequestException('This course is free and does not require checkout');
        if (course.user.payoutAccount?.status !== 'READY_FOR_REVIEW') {
            throw new BadRequestException('This creator is not ready to receive payments.');
        }

        const zeroDecimal = new Set(['bif','clp','djf','gnf','jpy','kmf','krw','mga','pyg','rwf','ugx','vnd','vuv','xaf','xof','xpf']);
        const currency = course.currency.toLowerCase();
        const unitAmount = Math.round(course.price * (zeroDecimal.has(currency) ? 1 : 100));
        const session = await this.paymentService.createCheckoutSession({
            courseId,
            userId,
            customerEmail: user.email,
            courseTitle: course.title,
            currency,
            unitAmount,
        });
        return { checkoutUrl: session.url };
    }

    async confirmCheckoutSession(sessionId: string, userId: string) {
        const existingPayment = await this.subscribeRepo.findByPaymentSession(sessionId);
        if (existingPayment) return existingPayment;
        const session = await this.paymentService.getCheckoutSession(sessionId);
        if (session.paymentStatus !== 'paid' || session.metadata?.userId !== userId || !session.metadata?.courseId) {
            throw new UnauthorizedException('This payment cannot be used for this subscription.');
        }
        const subscription = await this.createSubscription(session.metadata.courseId, userId);
        return this.subscribeRepo.attachPaymentSession(subscription.id, session.id);
    }

    private async createSubscription(courseId: string, userId: string) {
        const existingSubscription = await this.subscribeRepo.getSubscription(courseId, userId);

        if (existingSubscription) {
            return existingSubscription;
        }

        const subscription = await this.subscribeRepo.create(courseId, userId);

        if (!subscription) {
            throw new InternalServerErrorException("Couldn't subscribe to course");
        }

        const course = await this.subscribeRepo.findCourseSummary(courseId);

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
        const course = await this.subscribeRepo.findCourseSummary(courseId);

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
