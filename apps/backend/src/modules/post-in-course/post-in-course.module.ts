import { forwardRef, Module } from '@nestjs/common';
import { PostInCourseService } from './post-in-course.service';
import { PrismaPostInCourseRepository } from 'src/database/prisma/prisma-post-in-course.repository';
import { CourseModule } from '../course/course.module';
import { PostInCourseController } from './post-in-course.controller';
import { PostModule } from '../post/post.module';

@Module({
    imports: [
        forwardRef(() => CourseModule),
        forwardRef(() => PostModule),
    ],
    controllers: [
        PostInCourseController,
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
