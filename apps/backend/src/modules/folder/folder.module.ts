import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';

@Module({
    imports: [

    ],
    exports: [
        FolderService,
    ]
})
export class FolderModule {}
