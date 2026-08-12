import { FollowUserDto } from './follow-dto/follow-user.dto';
import { FollowService } from './follow.service';
export declare class FollowController {
    private readonly followService;
    constructor(followService: FollowService);
    getFollow(followingId: string, req: any): Promise<{
        isFollowing: boolean;
        follow: any;
    }>;
    getFollowers(followingId: string): Promise<{
        followers: any;
    }>;
    getFollowings(followerId: string): Promise<{
        following: any;
    }>;
    getMutualFollowings(otherFollowerId: string, req: any): Promise<{
        mutual: any;
    }>;
    followUser(req: any, followUserDto: FollowUserDto): Promise<any>;
    unfollowUser(req: any, followUserDto: FollowUserDto): Promise<any>;
}
