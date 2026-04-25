import { Module } from '@nestjs/common';
import { PrismaSubscribeRepository } from 'src/database/prisma/prisma-subscribe.repository';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';

@Module({
    controllers: [
        SubscribeController,
    ],
    providers: [
        SubscribeService,
        {
            provide: 'SUBSCRIBE_REPOSITORY',
            useClass: PrismaSubscribeRepository,
        },
    ],
})
export class SubscribeModule {}
