export interface SubscribeRepository {
    create(courseId: string, userId: string): Promise<any>;
    delete(courseId: string, userId: string): Promise<any>;
    reviewByCourseId(courseId: string, userId: string, review: string, rating: number): Promise<any>;
    getSubscribedCourses(userId: string): Promise<any>;
    getSubscribers(courseId: string): Promise<any>;
    getSubscriptionsByCourse(courseId: string): Promise<any>;
    getSubscription(courseId: string, userId: string): Promise<any>;
    getCoursePrice(courseId: string): Promise<any | null>;
    getCheckoutContext(courseId: string, userId: string): Promise<{ course: any | null; user: any | null }>;
    findByPaymentSession(sessionId: string): Promise<any | null>;
    attachPaymentSession(subscriptionId: string, sessionId: string): Promise<any>;
    findCourseSummary(courseId: string): Promise<any | null>;
}
