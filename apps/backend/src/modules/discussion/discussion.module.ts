import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { PrismaDiscussionRepository } from 'src/database/prisma/prisma-discussion.repository';
import { PostModule } from '../post/post.module';

@Module({
    imports: [
        PostModule,
    ],
    providers: [
        DiscussionService,
        {
            provide: "DISCUSSION_REPOSITORY",
            useClass: PrismaDiscussionRepository,
        },
    ],
    controllers: [
        DiscussionController
    ],
    exports: [

    ],
})
export class DiscussionModule {}
