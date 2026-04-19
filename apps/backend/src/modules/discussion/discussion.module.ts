import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { PrismaDiscussionRepository } from 'src/database/prisma/prisma-discussion.repository';

@Module({
    imports: [

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
