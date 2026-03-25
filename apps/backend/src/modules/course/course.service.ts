import { Injectable, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { FolderService } from '../folder/folder.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CourseService {
    constructor(
        @Inject('COURSE_REPOSITORY')
        private readonly courseRepo: CourseRepository,
        private readonly folderService: FolderService,
        private readonly usersService: UsersService,
    ) {}

    async createCourse(userId: string, title: string, description?: string, price?: number, currency?: string) {
        const user = await this.usersService.getUserById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const parentFolder = await this.folderService.findFolderByLocation("", user.username);

        const folder = await this.folderService.createFolder(userId, title, parentFolder.id);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't create the folder");
        }

        return this.courseRepo.create(userId, title, folder.id, description, price, currency);
    }

    async updateCourse(id: string, title?: string, description?: string, price?: number, currency?: string) {
        return this.courseRepo.updateById(id, title, description, price, currency);
    }

    async deleteCourse(id: string) {
        const course = await this.courseRepo.deleteCourseById(id);

        if (!course) {
            throw new InternalServerErrorException("Couldn't delete the course");
        }

        const folder = await this.folderService.deleteFolder(course.folderId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't delete the folder");
        }

        return course;
    }   

    async getCourse(userId: string) {
        return this.courseRepo.findByUserId(userId, "id", "asc");
    }
}
