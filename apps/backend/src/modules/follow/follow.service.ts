import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FollowRepository } from './follow.repository';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class FollowService {
    constructor(
        @Inject('FOLLOW_REPOSITORY')
        private readonly followRepo: FollowRepository,
        private readonly notificationService: NotificationService,
    ) {}

    async followUser(followerId: string, followingId: string) {
        if (!followingId) {
            throw new BadRequestException("Following user id is required");
        }

        const follow = await this.followRepo.create(followerId, followingId);

        await this.notificationService.notifyFollow(followerId, followingId);

        return follow;
    }

    async unfollowUser(followerId: string, followingId: string) {
        if (!followingId) {
            throw new BadRequestException("Following user id is required");
        }

        return this.followRepo.delete(followerId, followingId);
    }

    async getFollow(followerId: string, followingId: string) {
        if (!followingId) {
            throw new BadRequestException("Following user id is required");
        }

        return this.followRepo.findFollow(followerId, followingId);
    }

    async getFollowers(followingId: string) {
        if (!followingId) {
            throw new BadRequestException("Following user id is required");
        }

        return this.followRepo.findFollowers(followingId);
    }

    async getFollowings(followerId: string) {
        if (!followerId) {
            throw new BadRequestException("Follower user id is required");
        }

        return this.followRepo.findFollowings(followerId);
    }

    async getMutualFollowings(followerId: string, otherFollowerId: string) {
        if (!otherFollowerId) {
            throw new BadRequestException("Other user id is required");
        }

        return this.followRepo.findMutualFollowings(followerId, otherFollowerId);
    }
}
