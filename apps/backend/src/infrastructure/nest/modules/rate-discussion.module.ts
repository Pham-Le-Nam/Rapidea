import { Module } from '@nestjs/common';
import { PrismaRateDiscussionRepository } from '../../../adapters/repository/prisma/prisma-rate-discussion.repository';
import { RateDiscussionController } from '../../../adapters/http/controllers/rate-discussion/rate-discussion.controller';
import { RateDiscussionService } from '../../../application/rate-discussion/rate-discussion.service';

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
