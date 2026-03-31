import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { PrismaFolderRepository } from 'src/database/prisma/prisma-folder.repository';
import { FolderController } from './folder.controller';

@Module({
    imports: [

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
