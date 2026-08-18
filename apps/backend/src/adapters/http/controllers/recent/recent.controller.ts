import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/auth/jwt.guard';
import { RecentService } from '../../../../application/recent/recent.service';

@Controller('api/recent')
export class RecentController {
    constructor(private readonly recentService: RecentService) {}

    @UseGuards(JwtAuthGuard)
    @Get('sidebar')
    async getSidebarActivity(@Request() req: any) {
        return this.recentService.getSidebarActivity(req.user.userId);
    }
}
