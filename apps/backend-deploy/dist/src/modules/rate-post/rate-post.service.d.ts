import { RatePostRepository } from './rate-post.repository';
import { NotificationService } from '../notification/notification.service';
export declare class RatePostService {
    private readonly ratePostRepo;
    private readonly notificationService;
    constructor(ratePostRepo: RatePostRepository, notificationService: NotificationService);
    createRatePost(postId: string, userId: string, rating: number): Promise<any>;
    updateRatePostById(id: string, userId: string, rating: number): Promise<any>;
    updateRatePostByPostId(postId: string, userId: string, rating: number): Promise<any>;
    findRatePost(postId: string, userId: string): Promise<any>;
    findRatePostByPostId(postId: string): Promise<any>;
    findRatePostByUserId(userId: string): Promise<any>;
    private assertCanRatePost;
}
