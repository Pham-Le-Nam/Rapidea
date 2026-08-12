import { Module } from '@nestjs/common';
import { PrismaPhotoRepository } from 'src/database/prisma/prisma-photo.repository';
import { CourseModule } from '../course/course.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { StorageModule } from '../storage/storage.module';

@Module({
    imports: [
        CourseModule,
        StorageModule,
    ],
    controllers: [
        PhotoController,
    ],
    providers: [
        PhotoService,
        {
            provide: 'PHOTO_REPOSITORY',
            useClass: PrismaPhotoRepository,
        },
    ],
    exports: [
        PhotoService,
    ],
})
export class PhotoModule {}
