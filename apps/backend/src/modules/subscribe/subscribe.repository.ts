export interface SubscribeRepository {
    create(courseId: string, userId: string): Promise<any>;
    reviewById(id: string, review: string, rating: number): Promise<any>;
    editReviewById(id: string, review: string, rating: number): Promise<any>;
    getSubcribedCourses(userId: string): Promise<any>;
    getSubscribers(courseId: string): Promise<any>;
    getSubscription(courseId: string, userId: string): Promise<any>;
}