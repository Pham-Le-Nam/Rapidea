import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CourseService } from '../course/course.service';
import { PhotoRepository } from './photo.repository';

@Injectable()
export class PhotoService {
    constructor(
        @Inject('PHOTO_REPOSITORY')
        private readonly photoRepo: PhotoRepository,
        private readonly courseService: CourseService,
    ) {}

    private rootFolder = process.env.STORAGE_URL || 'storage';
    private mediaFolder = 'media';

    async uploadPhoto(file: Express.Multer.File, userId: string) {
        if (!file) {
            throw new NotFoundException('Photo file not found');
        }

        if (!file.mimetype.startsWith('image/')) {
            throw new InternalServerErrorException('Only image files can be uploaded');
        }

        const extension = this.getExtension(file);
        const photo = await this.photoRepo.create(userId, extension);

        if (!photo) {
            throw new InternalServerErrorException("Couldn't create photo");
        }

        const mediaPath = path.join(process.cwd(), this.rootFolder, this.mediaFolder);
        await fs.mkdir(mediaPath, { recursive: true });
        await fs.writeFile(path.join(mediaPath, photo.name), file.buffer);

        return {
            ...photo,
            photoUrl: photo.name,
        };
    }

    async getPhotoById(id: number) {
        const photo = await this.photoRepo.findById(id);

        if (!photo) {
            throw new NotFoundException('Photo not found');
        }

        return {
            ...photo,
            photoUrl: photo.name,
        };
    }

    async uploadCourseThumbnail(file: Express.Multer.File, userId: string, courseId: string) {
        const photo = await this.uploadPhoto(file, userId);
        const course = await this.courseService.updateCourse(
            courseId,
            userId,
            undefined,
            undefined,
            undefined,
            undefined,
            photo.id,
        );

        return {
            photo,
            course,
        };
    }

    private getExtension(file: Express.Multer.File) {
        const extension = path.extname(file.originalname).replace('.', '').toLowerCase();

        if (extension) {
            return extension;
        }

        return file.mimetype.split('/')[1] || 'jpg';
    }
}
