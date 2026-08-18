import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AdminRepository } from '../../domain/admin/repositories/admin.repository';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AdminService {
    constructor(
        @Inject('ADMIN_REPOSITORY') private readonly adminRepo: AdminRepository,
        private readonly notifications: NotificationService,
    ) {}

    async getModerationQueue() {
        return this.adminRepo.findModerationQueue();
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
        const user = await this.adminRepo.banUser(userId, reason);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async deletePost(postId: string) {
        return this.adminRepo.deletePost(postId);
    }

    async deleteCourse(courseId: string) {
        return this.adminRepo.deleteCourse(courseId);
    }

    async deleteFile(fileId: string) {
        return this.adminRepo.deleteFile(fileId);
    }
}
