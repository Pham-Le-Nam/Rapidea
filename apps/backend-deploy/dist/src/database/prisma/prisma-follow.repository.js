"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFollowRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaFollowRepository = class PrismaFollowRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(followerId, followingId) {
        if (followerId === followingId) {
            throw new common_1.BadRequestException("You cannot follow yourself");
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
                throw new common_1.NotFoundException("User not found");
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
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error?.code === 'P2002') {
                throw new common_1.ConflictException("You already follow this user");
            }
            throw new common_1.InternalServerErrorException("Cannot follow this user");
        }
    }
    async delete(followerId, followingId) {
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
        }
        catch (error) {
            if (error?.code === 'P2025') {
                throw new common_1.NotFoundException("Follow not found");
            }
            throw new common_1.InternalServerErrorException("Cannot unfollow this user");
        }
    }
    async findFollow(followerId, followingId) {
        return this.prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });
    }
    async findFollowers(followingId) {
        const followers = await this.prisma.follow.findMany({
            where: {
                followingId,
            },
            select: {
                followerId: true,
            },
        });
        if (!followers) {
            throw new common_1.InternalServerErrorException("Cannot get the followers of this user");
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
    async findFollowings(followerId) {
        const followings = await this.prisma.follow.findMany({
            where: {
                followerId,
            },
            select: {
                followingId: true,
            },
        });
        if (!followings) {
            throw new common_1.InternalServerErrorException("Cannot get the following of this user");
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
    async findMutualFollowings(followerOneId, followerTwoId) {
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
};
exports.PrismaFollowRepository = PrismaFollowRepository;
exports.PrismaFollowRepository = PrismaFollowRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaFollowRepository);
//# sourceMappingURL=prisma-follow.repository.js.map