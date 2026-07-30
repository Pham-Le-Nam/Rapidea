import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly notifications: NotificationService,
    ) {}

    async getModerationQueue() {
        return this.prisma.file.findMany({
            where: { moderationStatus: { in: ['SERIOUS_WARNING', 'WARNING'] } },
            include: { user: { select: { id: true, username: true, email: true } } },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
    }

    async warn(adminId: string, userId: string, message: string, link?: string) {
        return this.notifications.createNotification({
            userId,
            actorId: adminId,
            type: 'ADMIN_WARNING',
            title: 'Administrator warning',
            message: message.trim(),
            link,
        });
    }

    async ban(userId: string, reason: string) {
        const user = await this.prisma.users.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');
        return this.prisma.users.update({
            where: { id: userId },
            data: {
                isBanned: true,
                bannedAt: new Date(),
                banReason: reason.trim(),
                sessionVersion: { increment: 1 },
            },
            select: { id: true, username: true, isBanned: true, bannedAt: true, banReason: true },
        });
    }

    async deletePost(postId: string) {
        return this.prisma.post.delete({ where: { id: postId } });
    }

    async deleteCourse(courseId: string) {
        return this.prisma.course.delete({ where: { id: courseId } });
    }

    async deleteFile(fileId: string) {
        return this.prisma.file.delete({ where: { id: fileId } });
    }
}
