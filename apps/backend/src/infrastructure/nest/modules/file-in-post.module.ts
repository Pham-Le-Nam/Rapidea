import { Module } from '@nestjs/common';
import { FileInPostService } from '../../../application/file-in-post/file-in-post.service';
import { FileInPostController } from '../../../adapters/http/controllers/file-in-post/file-in-post.controller';
import { PrismaFileInPostRepository } from '../../../adapters/repository/prisma/prisma-file-in-post.repository';
import { PostModule } from './post.module';
import { FileModule } from './file.module';
import { TagsModule } from './tags.module';

@Module({
    imports: [
        PostModule,
        FileModule,
        TagsModule,
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
