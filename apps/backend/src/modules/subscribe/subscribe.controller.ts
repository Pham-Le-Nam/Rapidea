import { Body, Controller, Get, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { SubscribeService } from './subscribe.service';

@Controller('api/subscribe')
export class SubscribeController {
    constructor(
        private readonly subscribeService: SubscribeService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get(':courseId')
    async getSubscription(
        @Param('courseId') courseId: string,
        @Request() req: any,
    ) {
        const userId = req.user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        const subscription = await this.subscribeService.getSubscription(courseId, userId);

        return {
            isSubscribed: !!subscription,
            subscription,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async subscribeCourse(
        @Request() req: any,
        @Body() data: { courseId: string },
    ) {
        const userId = req.user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        return this.subscribeService.subscribeCourse(data.courseId, userId);
    }
}
