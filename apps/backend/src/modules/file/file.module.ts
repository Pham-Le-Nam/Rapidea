import { Module } from '@nestjs/common';
import { FolderModule } from '../folder/folder.module';
import { FileService } from './file.service';
import { PrismaFileRepository } from 'src/database/prisma/prisma-file.repository';
import { FileController } from './file.controller';

@Module({
    imports: [
        FolderModule,
    ],
    controllers: [
        FileController,
    ],
    providers: [
        FileService,
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
