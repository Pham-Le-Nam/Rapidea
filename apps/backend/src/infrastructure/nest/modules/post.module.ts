import { forwardRef, Module } from '@nestjs/common';
import { PostService } from '../../../application/post/post.service';
import { PrismaPostRepository } from '../../../adapters/repository/prisma/prisma-post.repository';
import { PostController } from '../../../adapters/http/controllers/post/post.controller';
import { CourseModule } from './course.module';
import { UsersModule } from './users.module';
import { TagsModule } from './tags.module';
import { AiModule } from './ai.module';

@Module({
    imports: [
        forwardRef(() => CourseModule),
        UsersModule,
        TagsModule,
        AiModule,
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
