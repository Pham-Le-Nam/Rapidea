import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { PrismaCourseRepository } from 'src/database/prisma/prisma-course.repository';
import { CourseController } from './course.controller';
import { UsersModule } from '../users/users.module';
import { FolderModule } from '../folder/folder.module';

@Module({
    imports: [
        UsersModule,
        FolderModule,
    ],
    controllers: [
        CourseController,
    ],
    providers: [
        CourseService,
        {
            provide: "COURSE_REPOSITORY",
            useClass: PrismaCourseRepository,
        }
    ],
    exports: [
        CourseService,
    ],
})
export class CourseModule {}
