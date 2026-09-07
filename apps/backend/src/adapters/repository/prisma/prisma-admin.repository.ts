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

    findInstructorApplications() {
        return this.prisma.instructorApplication.findMany({
            where: { status: 'PENDING' },
            select: {
                id: true,
                status: true,
                idDocumentName: true,
                idDocumentMimeType: true,
                submittedAt: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                    },
                },
            },
            orderBy: { submittedAt: 'asc' },
        });
    }

    async findInstructorApplicationHistory() {
        const applications = await this.prisma.instructorApplication.findMany({
            where: { status: { in: ['APPROVED', 'DISAPPROVED'] } },
            select: {
                id: true,
                status: true,
                submittedAt: true,
                reviewedAt: true,
                reviewedById: true,
                idDocumentName: true,
                user: { select: { email: true } },
            },
            orderBy: [{ reviewedAt: 'desc' }, { id: 'asc' }],
        });
        const reviewerIds = [...new Set(applications.flatMap((item) => item.reviewedById ? [item.reviewedById] : []))];
        const reviewers = await this.prisma.users.findMany({
            where: { id: { in: reviewerIds } },
            select: { id: true, email: true },
        });
        const reviewerEmails = new Map(reviewers.map((user) => [user.id, user.email]));
        return applications.map((item) => ({
            id: item.id,
            status: item.status,
            applicantEmail: item.user.email,
            reviewerEmail: item.reviewedById ? reviewerEmails.get(item.reviewedById) ?? null : null,
            submittedAt: item.submittedAt,
            reviewedAt: item.reviewedAt,
            idDocumentName: item.idDocumentName,
        }));
    }

    findInstructorApplicationById(applicationId: string) {
        return this.prisma.instructorApplication.findUnique({
            where: { id: applicationId },
            include: { user: true },
        });
    }

    async disapproveInstructorApplication(applicationId: string, adminId: string) {
        return this.prisma.$transaction(async (tx) => {
            const result = await tx.instructorApplication.updateMany({
                where: { id: applicationId, status: 'PENDING' },
                data: {
                    status: 'DISAPPROVED',
                    reviewedAt: new Date(),
                    reviewedById: adminId,
                },
            });
            if (result.count !== 1) return null;

            return tx.instructorApplication.findUnique({
                where: { id: applicationId },
                include: { user: { select: { id: true, username: true, email: true } } },
            });
        });
    }

    async approveInstructorApplication(applicationId: string, adminId: string) {
        return this.prisma.$transaction(async (tx) => {
            const approval = await tx.instructorApplication.updateMany({
                where: { id: applicationId, status: 'PENDING' },
                data: {
                    status: 'APPROVED',
                    reviewedAt: new Date(),
                    reviewedById: adminId,
                },
            });
            if (approval.count !== 1) return null;

            const application = await tx.instructorApplication.findUnique({
                where: { id: applicationId },
            });
            if (!application) return null;

            await tx.users.update({
                where: { id: application.userId },
                data: { role: 'INSTRUCTOR' },
            });
            return tx.instructorApplication.findUnique({
                where: { id: applicationId },
                include: { user: { select: { id: true, username: true, email: true } } },
            });
        });
    }
}
