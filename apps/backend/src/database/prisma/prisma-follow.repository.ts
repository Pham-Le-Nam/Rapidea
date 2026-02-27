import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FollowRepository } from '../../modules/follow/follow.repository';

@Injectable()
export class PrismaFollowRepository implements FollowRepository {
    constructor(private prisma: PrismaService) {}

    async create(followerId: string, followingId: string) {
        const follower = await this.prisma.users.findUnique({
            where: { 
                id: followerId,
            },
        });

        const following = await this.prisma.users.findUnique({
            where: { 
                id: followingId,
            },
        });

        // Check if the input ids are valid
        if (!follower || !following) {
            throw new InternalServerErrorException("User not found");
        }

        // Create follow entity
        const follow = await this.prisma.follow.create({
            data: {
                followerId,
                followingId,
            },
        });

        if (!follow) {
            throw new InternalServerErrorException("Cannot follow this user");
        }

        // Increase the No.followings of the follower by 1
        this.prisma.users.update({
            where: {
                id: followerId,
            },
            data: {
                followingCount: { increment: 1 },
            },
        });

        //  Increase the No.followers of the following by 1
        this.prisma.users.update({
            where: {
                id: followingId,
            },
            data: {
                followersCount: { increment: 1 },
            },
        });

        return follow;
    }

    async delete(followerId: string, followingId: string) {
        const follow = await this.prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });

        if (!follow) {
            throw new InternalServerErrorException("Cannot unfollow this user");
        }

        // Decrease the No.followings of the follower by 1
        this.prisma.users.update({
            where: {
                id: followerId,
            },
            data: {
                followingCount: { increment: -1 },
            },
        });

        //  Decrease the No.followers of the following by 1
        this.prisma.users.update({
            where: {
                id: followingId,
            },
            data: {
                followersCount: { increment: -1 },
            },
        });

        return follow;
    }

    async findFollow(followerId: string, followingId: string) {
        return this.prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });
    }

    async findFollowers(followingId: string) {
        const followers = await this.prisma.follow.findMany({
            where: {
                followingId,
            },
            select: {
                followerId: true,
            },
        });

        if (!followers) {
            throw new InternalServerErrorException("Cannot get the followers of this user")
        }

        const ids = followers.map(follower => follower.followerId);

        return this.prisma.users.findMany({
            where: {
                id: { in: ids },
            },
        });
    }

    async findFollowings(followerId: string) {
        const followings = await this.prisma.follow.findMany({
            where: {
                followerId,
            },
            select: {
                followingId: true,
            },
        });

        if (!followings) {
            throw new InternalServerErrorException("Cannot get the following of this user")
        }

        const ids = followings.map(following => following.followingId);

        return this.prisma.users.findMany({
            where: {
                id: { in: ids },
            },
        });
    }

    async findMutualFollowings(followerOneId: string, followerTwoId: string) {
        const mutual = await this.prisma.follow.groupBy({
            by: ['followingId'],
            where: {
                followerId: {
                    in: [followerOneId, followerTwoId],
                },
            },
            _count: {
                followingId: true,
            },
            having: {
                followingId: {
                    _count: {
                    equals: 2,
                    },
                },
            },
        });

        const ids = mutual.map(m => m.followingId);

        return this.prisma.users.findMany({
            where: {
                id: { in: ids },
            },
        });
    }

}