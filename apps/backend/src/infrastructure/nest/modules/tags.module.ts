import { Module } from '@nestjs/common';
import { TagsController } from '../../../adapters/http/controllers/tags/tags.controller';
import { TagsService } from '../../../application/tags/tags.service';
import { PrismaTagsRepository } from '../../../adapters/repository/prisma/prisma-tags.repository';
import { AiModule } from './ai.module';

@Module({
    imports: [AiModule],
    controllers: [TagsController],
    providers: [TagsService, { provide: 'TAGS_REPOSITORY', useClass: PrismaTagsRepository }],
    exports: [TagsService],
})
export class TagsModule {}
