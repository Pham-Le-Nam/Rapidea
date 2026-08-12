import { ReviewSubscriptionDto } from './subscribe-dto/review-subscription.dto';
import { SubscribeCourseDto } from './subscribe-dto/subscribe-course.dto';
import { SubscribeService } from './subscribe.service';
export declare class SubscribeController {
    private readonly subscribeService;
    constructor(subscribeService: SubscribeService);
    getMySubscribedCourses(req: any): Promise<any>;
    getCourseSubscribers(courseId: string): Promise<any>;
    getCourseReviews(courseId: string): Promise<any>;
    getSubscription(courseId: string, req: any): Promise<{
        isSubscribed: boolean;
        subscription: any;
    }>;
    subscribeCourse(req: any, subscribeCourseDto: SubscribeCourseDto): Promise<any>;
    createCheckout(req: any, dto: SubscribeCourseDto): Promise<{
        alreadySubscribed: boolean;
        checkoutUrl?: undefined;
    } | {
        checkoutUrl: string | null;
        alreadySubscribed?: undefined;
    }>;
    confirmCheckout(req: any, body: {
        sessionId: string;
    }): Promise<any>;
    unsubscribeCourse(req: any, subscribeCourseDto: SubscribeCourseDto): Promise<any>;
    reviewCourse(req: any, reviewSubscriptionDto: ReviewSubscriptionDto): Promise<any>;
}
