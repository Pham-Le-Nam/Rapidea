import { Module } from '@nestjs/common';
import { PostInCourseService } from './post-in-course.service';
import { PrismaPostInCourseRepository } from 'src/database/prisma/prisma-post-in-course.repository';

@Module({
    imports: [

    ],
    controllers: [

    ],
    providers: [
        PostInCourseService,
        {
            provide: 'POST_IN_COURSE_REPOSITORY',
            useClass: PrismaPostInCourseRepository,
        }
    ],
    exports: [
        PostInCourseService,
    ],
})
export class PostInCourseModule {}
