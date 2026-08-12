import { FollowRepository } from './follow.repository';
import { NotificationService } from '../notification/notification.service';
export declare class FollowService {
    private readonly followRepo;
    private readonly notificationService;
    constructor(followRepo: FollowRepository, notificationService: NotificationService);
    followUser(followerId: string, followingId: string): Promise<any>;
    unfollowUser(followerId: string, followingId: string): Promise<any>;
    getFollow(followerId: string, followingId: string): Promise<any>;
    getFollowers(followingId: string): Promise<any>;
    getFollowings(followerId: string): Promise<any>;
    getMutualFollowings(followerId: string, otherFollowerId: string): Promise<any>;
}
