import { Module } from '@nestjs/common';
import { PrismaFollowRepository } from 'src/database/prisma/prisma-follow.repository';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
    controllers: [
        FollowController,
    ],
    providers: [
        FollowService,
        {
            provide: 'FOLLOW_REPOSITORY',
            useClass: PrismaFollowRepository,
        },
    ],
})
export class FollowModule {}
