import { Module } from '@nestjs/common';
import { FileInPostService } from './file-in-post.service';
import { FileInPostController } from './file-in-post.controller';
import { PrismaFileInPostRepository } from 'src/database/prisma/prisma-file-in-post.repository';
import { PostModule } from '../post/post.module';
import { FileModule } from '../file/file.module';

@Module({
    imports: [
        PostModule,
        FileModule,
    ],
    providers: [
        FileInPostService,
        {
            provide: 'FILE_IN_POST_REPOSITORY',
            useClass: PrismaFileInPostRepository,
        }
    ],
    controllers: [
        FileInPostController,
    ],
    exports: [
        FileInPostService,
    ],
})
export class FileInPostModule {}
