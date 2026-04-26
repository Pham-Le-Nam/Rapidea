import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FollowRepository } from '../../modules/follow/follow.repository';

@Injectable()
export class PrismaFollowRepository implements FollowRepository {
    constructor(private prisma: PrismaService) {}

    async create(followerId: string, followingId: string) {
        if (followerId === followingId) {
            throw new BadRequestException("You cannot follow yourself");
        }

        try {
            const [follower, following] = await Promise.all([
                this.prisma.users.findUnique({
                    where: {
                        id: followerId,
                    },
                    select: {
                        id: true,
                    },
                }),
                this.prisma.users.findUnique({
                    where: {
                        id: followingId,
                    },
                    select: {
                        id: true,
                    },
                }),
            ]);

            if (!follower || !following) {
                throw new NotFoundException("User not found");
            }

            const [follow, followerCounts, followingCounts] = await this.prisma.$transaction([
                this.prisma.follow.create({
                    data: {
                        followerId,
                        followingId,
                    },
                }),
                this.prisma.users.update({
                    where: {
                        id: followerId,
                    },
                    data: {
                        followingCount: { increment: 1 },
                    },
                    select: {
                        followingCount: true,
                    },
                }),
                this.prisma.users.update({
                    where: {
                        id: followingId,
                    },
                    data: {
                        followersCount: { increment: 1 },
                    },
                    select: {
                        followersCount: true,
                    },
                }),
            ]);

            return {
                ...follow,
                followerFollowingCount: followerCounts.followingCount,
                followingFollowersCount: followingCounts.followersCount,
            };
        } catch (error: any) {
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }

            if (error?.code === 'P2002') {
                throw new ConflictException("You already follow this user");
            }

            throw new InternalServerErrorException("Cannot follow this user");
        }
    }

    async delete(followerId: string, followingId: string) {
        try {
            const [follow, followerCounts, followingCounts] = await this.prisma.$transaction([
                this.prisma.follow.delete({
                    where: {
                        followerId_followingId: {
                            followerId,
                            followingId,
                        },
                    },
                }),
                this.prisma.users.update({
                    where: {
                        id: followerId,
                    },
                    data: {
                        followingCount: { decrement: 1 },
                    },
                    select: {
                        followingCount: true,
                    },
                }),
                this.prisma.users.update({
                    where: {
                        id: followingId,
                    },
                    data: {
                        followersCount: { decrement: 1 },
                    },
                    select: {
                        followersCount: true,
                    },
                }),
            ]);

            return {
                ...follow,
                followerFollowingCount: followerCounts.followingCount,
                followingFollowersCount: followingCounts.followersCount,
            };
        } catch (error: any) {
            if (error?.code === 'P2025') {
                throw new NotFoundException("Follow not found");
            }

            throw new InternalServerErrorException("Cannot unfollow this user");
        }
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
            omit: {
                password: true,
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
            omit: {
                password: true,
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
            omit: {
                password: true,
            },
        });
    }

}
