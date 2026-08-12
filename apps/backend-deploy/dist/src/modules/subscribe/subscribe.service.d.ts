import { ConfigService } from '@nestjs/config';
import { SubscribeRepository } from './subscribe.repository';
import { NotificationService } from '../notification/notification.service';
export declare class SubscribeService {
    private readonly subscribeRepo;
    private readonly notificationService;
    private readonly config;
    constructor(subscribeRepo: SubscribeRepository, notificationService: NotificationService, config: ConfigService);
    subscribeCourse(courseId: string, userId: string): Promise<any>;
    createCheckoutSession(courseId: string, userId: string): Promise<{
        alreadySubscribed: boolean;
        checkoutUrl?: undefined;
    } | {
        checkoutUrl: string | null;
        alreadySubscribed?: undefined;
    }>;
    confirmCheckoutSession(sessionId: string, userId: string): Promise<any>;
    private createSubscription;
    private getStripe;
    unsubscribeCourse(courseId: string, userId: string): Promise<any>;
    reviewCourse(courseId: string, userId: string, review: string, rating: number): Promise<any>;
    getSubscribedCourses(userId: string): Promise<any>;
    getSubscribers(courseId: string): Promise<any>;
    getCourseReviews(courseId: string): Promise<any>;
    getSubscription(courseId: string, userId: string): Promise<any>;
}
