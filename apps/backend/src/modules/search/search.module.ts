import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { PrismaSearchRepository } from '../../database/prisma/prisma-search.repository';

@Module({
    controllers: [
        SearchController,
    ],
    providers: [
        SearchService,
        { provide: 'SEARCH_REPOSITORY', useClass: PrismaSearchRepository },
    ],
})
export class SearchModule {}
