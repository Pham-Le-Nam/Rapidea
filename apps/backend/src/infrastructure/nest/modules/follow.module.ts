import { Module } from '@nestjs/common';
import { PrismaFollowRepository } from '../../../adapters/repository/prisma/prisma-follow.repository';
import { FollowController } from '../../../adapters/http/controllers/follow/follow.controller';
import { FollowService } from '../../../application/follow/follow.service';

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
