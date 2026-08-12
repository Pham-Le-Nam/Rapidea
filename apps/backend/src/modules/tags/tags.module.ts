import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { PrismaTagsRepository } from '../../database/prisma/prisma-tags.repository';

@Module({
    controllers: [TagsController],
    providers: [TagsService, { provide: 'TAGS_REPOSITORY', useClass: PrismaTagsRepository }],
    exports: [TagsService],
})
export class TagsModule {}
