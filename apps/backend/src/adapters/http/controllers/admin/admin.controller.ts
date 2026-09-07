import { Body, Controller, Delete, Get, Param, Post, Request, StreamableFile, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/auth/jwt.guard';
import { AdminGuard } from '../../guards/admin/admin.guard';
import { AdminService } from '../../../../application/admin/admin.service';

@Controller('api/admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
    constructor(private readonly admin: AdminService) {}

    @Get('moderation')
    moderationQueue() {
        return this.admin.getModerationQueue();
    }

    @Post('warning')
    warning(@Request() req: any, @Body() data: { userId: string; message: string; link?: string }) {
        return this.admin.warn(req.user.userId, data.userId, data.message, data.link);
    }

    @Post('users/:id/ban')
    ban(@Param('id') id: string, @Body('reason') reason: string) {
        return this.admin.ban(id, reason);
    }

    @Get('instructor-applications')
    instructorApplications() {
        return this.admin.getInstructorApplications();
    }

    @Get('instructor-applications/:id/document')
    async instructorApplicationDocument(@Param('id') id: string) {
        const document = await this.admin.getInstructorApplicationDocument(id);
        return new StreamableFile(document.stream, {
            type: document.mimeType,
            disposition: `inline; filename="${document.name.replace(/[^\x20-\x7E]|["\\]/g, '_')}"`,
        });
    }

    @Post('instructor-applications/:id/approve')
    approveInstructorApplication(@Param('id') id: string, @Request() req: any) {
        return this.admin.approveInstructorApplication(id, req.user.userId);
    }

    @Delete('posts/:id')
    deletePost(@Param('id') id: string) {
        return this.admin.deletePost(id);
    }

    @Delete('courses/:id')
    deleteCourse(@Param('id') id: string) {
        return this.admin.deleteCourse(id);
    }

    @Delete('files/:id')
    deleteFile(@Param('id') id: string) {
        return this.admin.deleteFile(id);
    }
}
