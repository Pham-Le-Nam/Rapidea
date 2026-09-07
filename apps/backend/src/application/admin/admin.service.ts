import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AdminRepository } from '../../domain/admin/repositories/admin.repository';
import { NotificationService } from '../notification/notification.service';
import { STORAGE_SERVICE, StorageService } from '../ports/storage.service';

@Injectable()
export class AdminService {
    constructor(
        @Inject('ADMIN_REPOSITORY') private readonly adminRepo: AdminRepository,
        private readonly notifications: NotificationService,
        @Inject(STORAGE_SERVICE) private readonly storage: StorageService,
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

    async getInstructorApplications() {
        return this.adminRepo.findInstructorApplications();
    }

    async getInstructorApplicationHistory() {
        return this.adminRepo.findInstructorApplicationHistory();
    }

    async getInstructorApplicationDocument(applicationId: string) {
        const application = await this.adminRepo.findInstructorApplicationById(applicationId);
        if (!application) throw new NotFoundException('Instructor application not found');
        return {
            stream: await this.storage.readFile(application.idDocumentKey),
            name: application.idDocumentName,
            mimeType: application.idDocumentMimeType,
        };
    }

    async disapproveInstructorApplication(applicationId: string, adminId: string) {
        const application = await this.adminRepo.disapproveInstructorApplication(applicationId, adminId);
        if (!application) {
            throw new ConflictException('This instructor application is no longer pending');
        }
        await this.notifications.createNotification({
            userId: application.userId,
            actorId: adminId,
            type: 'INSTRUCTOR_DISAPPROVED',
            title: 'Instructor application disapproved',
            message: 'Your instructor application was disapproved. Your account remains a learner.',
            link: '/settings',
        });
        return application;
    }

    async approveInstructorApplication(applicationId: string, adminId: string) {
        const application = await this.adminRepo.approveInstructorApplication(applicationId, adminId);
        if (!application) {
            throw new ConflictException('This instructor application is no longer pending');
        }
        await this.notifications.createNotification({
            userId: application.userId,
            actorId: adminId,
            type: 'INSTRUCTOR_APPROVED',
            title: 'Instructor application approved',
            message: 'You can now create posts and courses and configure creator settings.',
            link: '/settings',
        });
        return application;
    }
}
