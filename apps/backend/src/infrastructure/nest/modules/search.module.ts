import { Module } from '@nestjs/common';
import { SearchController } from '../../../adapters/http/controllers/search/search.controller';
import { SearchService } from '../../../application/search/search.service';
import { PrismaSearchRepository } from '../../../adapters/repository/prisma/prisma-search.repository';

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
