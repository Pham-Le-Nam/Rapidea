import { Body, Controller, Get, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { FollowUserDto } from './follow-dto/follow-user.dto';
import { FollowService } from './follow.service';

@Controller('api/follow')
export class FollowController {
    constructor(
        private readonly followService: FollowService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get(':followingId')
    async getFollow(
        @Param('followingId') followingId: string,
        @Request() req: any,
    ) {
        const followerId = req.user?.userId;

        if (!followerId) {
            throw new NotFoundException("User not found");
        }

        const follow = await this.followService.getFollow(followerId, followingId);

        return {
            isFollowing: !!follow,
            follow,
        };
    }

    @Get(':followingId/followers')
    async getFollowers(
        @Param('followingId') followingId: string,
    ) {
        const followers = await this.followService.getFollowers(followingId);

        return { followers };
    }

    @Get(':followerId/following')
    async getFollowings(
        @Param('followerId') followerId: string,
    ) {
        const following = await this.followService.getFollowings(followerId);

        return { following };
    }

    @UseGuards(JwtAuthGuard)
    @Get(':otherFollowerId/mutual')
    async getMutualFollowings(
        @Param('otherFollowerId') otherFollowerId: string,
        @Request() req: any,
    ) {
        const followerId = req.user?.userId;

        if (!followerId) {
            throw new NotFoundException("User not found");
        }

        const mutual = await this.followService.getMutualFollowings(followerId, otherFollowerId);

        return { mutual };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async followUser(
        @Request() req: any,
        @Body() followUserDto: FollowUserDto,
    ) {
        const followerId = req.user?.userId;

        if (!followerId) {
            throw new NotFoundException("User not found");
        }

        return this.followService.followUser(followerId, followUserDto.followingId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async unfollowUser(
        @Request() req: any,
        @Body() followUserDto: FollowUserDto,
    ) {
        const followerId = req.user?.userId;

        if (!followerId) {
            throw new NotFoundException("User not found");
        }

        return this.followService.unfollowUser(followerId, followUserDto.followingId);
    }
}
