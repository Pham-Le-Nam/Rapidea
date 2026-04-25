import { Module } from '@nestjs/common';
import { PrismaRateDiscussionRepository } from 'src/database/prisma/prisma-rate-discussion.repository';
import { RateDiscussionController } from './rate-discussion.controller';
import { RateDiscussionService } from './rate-discussion.service';

@Module({
    providers: [
        RateDiscussionService,
        {
            provide: "RATE_DISCUSSION_REPOSITORY",
            useClass: PrismaRateDiscussionRepository,
        },
    ],
    controllers: [
        RateDiscussionController,
    ],
})
export class RateDiscussionModule {}
