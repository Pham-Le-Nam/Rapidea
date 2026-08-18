import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../../domain/admin/repositories/admin.repository';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
    constructor(private readonly prisma: PrismaService) {}

    findModerationQueue() {
        return this.prisma.file.findMany({
            where: { moderationStatus: { in: ['SERIOUS_WARNING', 'WARNING'] } },
            include: { user: { select: { id: true, username: true, email: true } } },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
    }

    async banUser(userId: string, reason: string) {
        const user = await this.prisma.users.findUnique({ where: { id: userId } });
        if (!user) return null;
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

    deletePost(postId: string) { return this.prisma.post.delete({ where: { id: postId } }); }
    deleteCourse(courseId: string) { return this.prisma.course.delete({ where: { id: courseId } }); }
    deleteFile(fileId: string) { return this.prisma.file.delete({ where: { id: fileId } }); }
}
