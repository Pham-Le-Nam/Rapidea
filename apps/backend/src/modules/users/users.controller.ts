import { Controller, Get, Param, UseGuards, Request, NotFoundException, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UpdateProfileDto } from './users-dto/update-profile.dto';

@Controller('api/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':username')
    async getProfile(
        @Param('username') username: string,
        @Request() req: any,
    ) {
        const viewer = req.user; // This will be undefined if the user is not authenticated

        const profile = await this.usersService.getUserByUsername(username);

        if (!profile) {
            throw new NotFoundException('User not found');
        }

        return {
            profile,
            viewerId: viewer?.userId,
            profileId: profile.id,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post(':username')
    async editProfile(
        @Param('username') username: string,
        @Request() req: any,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        const viewer = req.user; // This will be undefined if the user is not authenticated
        const profile = await this.usersService.getUserByUsername(username);

        if (viewer.userId != profile.id) {
            throw new UnauthorizedException("Not allowed to edit other user's profile.");
        }

        const updatedProfile = await this.usersService.updateProfileByUsername(
            updateProfileDto.username,
            updateProfileDto.firstname,
            updateProfileDto.lastname,
            updateProfileDto.middlename,
            updateProfileDto.avatarId,
            updateProfileDto.backgroundId,
            updateProfileDto.headline,
            updateProfileDto.bio,
        );

        return updatedProfile;
    }
}