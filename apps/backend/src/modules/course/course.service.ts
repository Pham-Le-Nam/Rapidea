import { BadRequestException, Injectable, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { FolderService } from '../folder/folder.service';
import { UsersService } from '../users/users.service';
import { TagsService } from '../tags/tags.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class CourseService {
    constructor(
        @Inject('COURSE_REPOSITORY')
        private readonly courseRepo: CourseRepository,
        private readonly folderService: FolderService,
        private readonly usersService: UsersService,
        private readonly tagsService: TagsService,
        private readonly notificationService: NotificationService,
    ) {}

    async createCourse(userId: string, title: string, description?: string, price?: number, currency?: string, tags: string[] = []) {
        const user = await this.usersService.getUserById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.requirePayoutAccountForPaidCourse(userId, price);

        const parentFolder = await this.folderService.findFolderByLocation(user.username);

        if (!parentFolder) {
            throw new InternalServerErrorException('Folder not found');
        }

        const folder = await this.folderService.createFolder(userId, title, parentFolder.id);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't create the folder");
        }

        const course = await this.courseRepo.create(userId, title, folder.id, description, price, currency);
        await this.tagsService.setCourseTags(course.id, tags);
        await this.notificationService.notifyFollowersAndSubscribersOfNewCourse(userId, course.id, course.title);

        return this.courseRepo.findById(course.id);
    }

    async updateCourse(id: string, userId: string, title?: string, description?: string, price?: number, currency?: string, thumbnailId?: number, tags?: string[]) {
        if (price !== undefined) {
            await this.requirePayoutAccountForPaidCourse(userId, price);
        }
        if (title) {
            const course = await this.courseRepo.findById(id);
            const courseFolder = await this.folderService.renameFolder(course.folderId, userId, title);

            if (!courseFolder) {
                throw new InternalServerErrorException("", "Couldn't rename the folder");
            }
        }

        const course = await this.courseRepo.updateById(id, userId, title, description, price, currency, thumbnailId);
        if (tags) {
            await this.tagsService.setCourseTags(id, tags);
        }

        return this.courseRepo.findById(course.id);
    }

    async updateCourseLastUpdated(courseId: string, lastUpdated: Date = new Date()) {
        return this.courseRepo.updateLastUpdatedById(courseId, lastUpdated);
    }

    async recordCourseView(courseId: string, userId: string) {
        return this.courseRepo.recordView(courseId, userId);
    }

    async deleteCourse(courseId: string, userId: string) {
        const course = await this.courseRepo.deleteCourseById(courseId);

        if (!course) {
            throw new InternalServerErrorException("Couldn't delete the course");
        }

        const folder = await this.folderService.deleteFolder(course.folderId, userId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't delete the folder");
        }

        return course;
    }   

    async getCourseByUserId(userId: string, options?: {
        offset?: number;
        limit?: number;
    }) {
        return this.courseRepo.findByUserId(userId, "id", "asc", options?.limit, options?.offset);
    }

    async getCourseById (id: string) {
        return this.courseRepo.findById(id);
    }

    private async requirePayoutAccountForPaidCourse(userId: string, price?: number) {
        if (!price || price <= 0) return;
        const payout = await this.usersService.getPayoutAccount(userId);
        if (!payout || payout.status !== 'READY_FOR_REVIEW') {
            throw new BadRequestException({
                code: 'PAYOUT_ACCOUNT_REQUIRED',
                message: 'Complete your payout account before creating or pricing a paid course.',
            });
        }
    }
}
