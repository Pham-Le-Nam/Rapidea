import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { PrismaFolderRepository } from 'src/database/prisma/prisma-folder.repository';

@Module({
    imports: [

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
