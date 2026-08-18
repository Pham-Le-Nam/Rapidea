import { Module } from '@nestjs/common';
import { FolderService } from '../../../application/folder/folder.service';
import { PrismaFolderRepository } from '../../../adapters/repository/prisma/prisma-folder.repository';
import { FolderController } from '../../../adapters/http/controllers/folder/folder.controller';
import { StorageModule } from './storage.module';

@Module({
    imports: [
        StorageModule,
    ],
    controllers: [
        FolderController
    ],
    providers: [
        FolderService,
        {
            provide: "FOLDER_REPOSITORY",
            useClass: PrismaFolderRepository,
        }
    ],
    exports: [
        FolderService,
    ],
})
export class FolderModule {}
