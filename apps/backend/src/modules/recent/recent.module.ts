import { Module } from '@nestjs/common';
import { RecentController } from './recent.controller';
import { RecentService } from './recent.service';
import { PrismaRecentRepository } from '../../database/prisma/prisma-recent.repository';

@Module({
    controllers: [
        RecentController,
    ],
    providers: [
        RecentService,
        { provide: 'RECENT_REPOSITORY', useClass: PrismaRecentRepository },
    ],
})
export class RecentModule {}
