import { Module } from '@nestjs/common';
import { FolderModule } from './folder.module';
import { FileService } from '../../../application/file/file.service';
import { PrismaFileRepository } from '../../../adapters/repository/prisma/prisma-file.repository';
import { FileController } from '../../../adapters/http/controllers/file/file.controller';
import { StorageModule } from './storage.module';
import { TagsModule } from './tags.module';
import { ContentModerationService } from '../../ai/content-moderation.service';
import { CONTENT_MODERATION_SERVICE } from '../../../application/ports/content-moderation.service';

@Module({
    imports: [
        FolderModule,
        StorageModule,
        TagsModule,
    ],
    controllers: [
        FileController,
    ],
    providers: [
        FileService,
        {
            provide: CONTENT_MODERATION_SERVICE,
            useClass: ContentModerationService,
        },
        {
            provide: 'FILE_REPOSITORY',
            useClass: PrismaFileRepository,
        },
    ],
    exports: [
        FileService,
    ],
})
export class FileModule {}
