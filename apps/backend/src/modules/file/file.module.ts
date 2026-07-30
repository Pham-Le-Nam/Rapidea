import { Module } from '@nestjs/common';
import { FolderModule } from '../folder/folder.module';
import { FileService } from './file.service';
import { PrismaFileRepository } from 'src/database/prisma/prisma-file.repository';
import { FileController } from './file.controller';
import { StorageModule } from '../storage/storage.module';
import { TagsModule } from '../tags/tags.module';
import { ContentModerationService } from './content-moderation.service';

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
        ContentModerationService,
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
