import { Module } from '@nestjs/common';
import { DiscussionService } from '../../../application/discussion/discussion.service';
import { DiscussionController } from '../../../adapters/http/controllers/discussion/discussion.controller';
import { PrismaDiscussionRepository } from '../../../adapters/repository/prisma/prisma-discussion.repository';
import { PostModule } from './post.module';

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
