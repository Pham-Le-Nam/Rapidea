import { Module } from '@nestjs/common';
import { RecentController } from '../../../adapters/http/controllers/recent/recent.controller';
import { RecentService } from '../../../application/recent/recent.service';
import { PrismaRecentRepository } from '../../../adapters/repository/prisma/prisma-recent.repository';

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
