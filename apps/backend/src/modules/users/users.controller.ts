import { Controller, Get, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt.guard';

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
}