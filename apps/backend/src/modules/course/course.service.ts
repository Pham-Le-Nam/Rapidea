import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { FolderService } from '../folder/folder.service';

@Injectable()
export class CourseService {
    private folderService: FolderService;

    constructor(
        @Inject('COURSE_REPOSITORY')
        private readonly courseRepo: CourseRepository,
    ) {}

    async createCourse(userId: string, title: string, description?: string, price?: number, currency?: string) {
        const folder = await this.folderService.createFolder(userId, title);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't create the folder");
        }

        return this.courseRepo.create(userId, title, folder.id, description, price, currency);
    }

    async updateCourse(id: string, title?: string, description?: string, price?: number, currency?: string) {
        return this.courseRepo.updateById(id, title, description, price, currency);
    }

    
}
