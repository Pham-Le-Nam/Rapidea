import { Module } from '@nestjs/common';
import { PostInCourseModule } from '../post-in-course/post-in-course.module';
import { PostService } from './post.service';
import { PrismaPostRepository } from 'src/database/prisma/prisma-post.repository';

@Module({
    imports: [
        PostInCourseModule,
    ],
    controllers: [

    ],
    providers: [
        PostService,
        {
            provide: 'POST_REPOSITORY',
            useClass: PrismaPostRepository,
        }
    ],
    exports: [
    
    ],
})
export class PostModule {}
