import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { PrismaCourseRepository } from 'src/database/prisma/prisma-course.repository';

@Module({
    imports: [

    ],
    controllers: [

    ],
    providers: [
        CourseService,
        {
            provide: "COURSE_REPOSITORY",
            useClass: PrismaCourseRepository,
        }
    ],
})
export class CourseModule {}
