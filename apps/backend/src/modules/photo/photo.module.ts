import { Module } from '@nestjs/common';
import { PrismaPhotoRepository } from 'src/database/prisma/prisma-photo.repository';
import { CourseModule } from '../course/course.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
    imports: [
        CourseModule,
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
