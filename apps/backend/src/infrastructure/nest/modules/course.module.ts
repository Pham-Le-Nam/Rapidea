import { Module } from '@nestjs/common';
import { CourseService } from '../../../application/course/course.service';
import { PrismaCourseRepository } from '../../../adapters/repository/prisma/prisma-course.repository';
import { CourseController } from '../../../adapters/http/controllers/course/course.controller';
import { UsersModule } from './users.module';
import { FolderModule } from './folder.module';
import { TagsModule } from './tags.module';

@Module({
    imports: [
        UsersModule,
        FolderModule,
        TagsModule,
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
