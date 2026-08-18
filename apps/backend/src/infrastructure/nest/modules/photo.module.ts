import { Module } from '@nestjs/common';
import { PrismaPhotoRepository } from '../../../adapters/repository/prisma/prisma-photo.repository';
import { CourseModule } from './course.module';
import { PhotoController } from '../../../adapters/http/controllers/photo/photo.controller';
import { PhotoService } from '../../../application/photo/photo.service';
import { StorageModule } from './storage.module';

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
