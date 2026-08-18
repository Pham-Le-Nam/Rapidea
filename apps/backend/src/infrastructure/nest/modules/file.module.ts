import { Module } from '@nestjs/common';
import { FolderModule } from './folder.module';
import { FileService } from '../../../application/file/file.service';
import { PrismaFileRepository } from '../../../adapters/repository/prisma/prisma-file.repository';
import { FileController } from '../../../adapters/http/controllers/file/file.controller';
import { StorageModule } from './storage.module';
import { TagsModule } from './tags.module';
import { ContentModerationService } from '../../ai/content-moderation.service';
import { CONTENT_MODERATION_SERVICE } from '../../../application/ports/content-moderation.service';
import { MulterModule } from '@nestjs/platform-express';

const MAX_FILE_UPLOAD_SIZE_BYTES = 100 * 1024 * 1024;

@Module({
    imports: [
        FolderModule,
        StorageModule,
        TagsModule,
        MulterModule.register({
            limits: {
                fileSize: MAX_FILE_UPLOAD_SIZE_BYTES,
            },
        }),
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
