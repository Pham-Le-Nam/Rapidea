import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { NotificationService } from './notification.service';

@UseGuards(JwtAuthGuard)
@Controller('api/notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Get()
    async getNotifications(
        @Request() req: any,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
    ) {
        return this.notificationService.getNotifications(
            req.user.userId,
            Number(limit) || 20,
            Number(offset) || 0,
        );
    }

    @Post('read')
    async markAsRead(
        @Request() req: any,
        @Body('notificationId') notificationId: string,
    ) {
        return this.notificationService.markAsRead(req.user.userId, notificationId);
    }

    @Post('read-all')
    async markAllAsRead(@Request() req: any) {
        return this.notificationService.markAllAsRead(req.user.userId);
    }
}
