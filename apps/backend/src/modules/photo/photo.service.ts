import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { CourseService } from '../course/course.service';
import { STORAGE_SERVICE } from '../storage/storage.constants';
import { StorageService } from '../storage/storage.service';
import { PhotoRepository } from './photo.repository';

@Injectable()
export class PhotoService {
    constructor(
        @Inject('PHOTO_REPOSITORY')
        private readonly photoRepo: PhotoRepository,
        private readonly courseService: CourseService,
        @Inject(STORAGE_SERVICE)
        private readonly storage: StorageService,
    ) {}

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

        const storageKey = path.posix.join(this.mediaFolder, photo.name);

        try {
            await this.storage.writeFile(storageKey, file.buffer, {
                contentType: file.mimetype,
                cacheControl: 'public, max-age=31536000, immutable',
            });
        } catch (error) {
            await this.photoRepo.delete(photo.id).catch(() => undefined);
            throw error;
        }

        return {
            ...photo,
            photoUrl: this.storage.getPublicUrl(storageKey),
        };
    }

    async getPhotoById(id: number) {
        const photo = await this.photoRepo.findById(id);

        if (!photo) {
            throw new NotFoundException('Photo not found');
        }

        return {
            ...photo,
            photoUrl: this.storage.getPublicUrl(photo.url || path.posix.join(this.mediaFolder, photo.name)),
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
