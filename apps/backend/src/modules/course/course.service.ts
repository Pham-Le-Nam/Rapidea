import { Injectable, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { FolderService } from '../folder/folder.service';
import { UsersService } from '../users/users.service';
import { PostInCourseService } from '../post-in-course/post-in-course.service';

@Injectable()
export class CourseService {
    constructor(
        @Inject('COURSE_REPOSITORY')
        private readonly courseRepo: CourseRepository,
        private readonly folderService: FolderService,
        private readonly usersService: UsersService,
        private readonly postInCourseService: PostInCourseService,
    ) {}

    async createCourse(userId: string, title: string, description?: string, price?: number, currency?: string) {
        const user = await this.usersService.getUserById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const parentFolder = await this.folderService.findFolderByLocation(user.username);

        if (!parentFolder) {
            throw new InternalServerErrorException('Folder not found');
        }

        const folder = await this.folderService.createFolder(userId, title, parentFolder.id);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't create the folder");
        }

        return this.courseRepo.create(userId, title, folder.id, description, price, currency);
    }

    async updateCourse(id: string, userId: string, title?: string, description?: string, price?: number, currency?: string) {
        if (title) {
            const course = await this.courseRepo.findById(id);
            const courseFolder = await this.folderService.renameFolder(course.folderId, userId, title);

            if (!courseFolder) {
                throw new InternalServerErrorException("", "Couldn't rename the folder");
            }
        }

        return this.courseRepo.updateById(id, userId, title, description, price, currency);
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

    async getCourseByUserId(userId: string) {
        return this.courseRepo.findByUserId(userId, "id", "asc");
    }

    async getCourseById (id: string) {
        return this.courseRepo.findById(id);
    }
}
