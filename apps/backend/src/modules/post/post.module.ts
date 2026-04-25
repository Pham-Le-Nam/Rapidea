import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaPostRepository } from 'src/database/prisma/prisma-post.repository';
import { PostController } from './post.controller';
import { CourseModule } from '../course/course.module';

@Module({
    imports: [
        forwardRef(() => CourseModule),
    ],
    controllers: [
        PostController,
    ],
    providers: [
        PostService,
        {
            provide: 'POST_REPOSITORY',
            useClass: PrismaPostRepository,
        }
    ],
    exports: [
        PostService,
    ],
})
export class PostModule {}
