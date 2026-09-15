import { Module } from '@nestjs/common';
import { ChunkingEmbeddingService } from '../../content-processing/chunking-embedding.service';
import { ContentProcessingQueueService } from '../../content-processing/content-processing-queue.service';
import { TextExtractionService } from '../../content-processing/text-extraction.service';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { AiModule } from './ai.module';
import { FolderModule } from './folder.module';
import { StorageModule } from './storage.module';

@Module({
    imports: [AiModule, PrismaModule, FolderModule, StorageModule],
    providers: [
        TextExtractionService,
        ChunkingEmbeddingService,
        ContentProcessingQueueService,
    ],
    exports: [
        TextExtractionService,
        ChunkingEmbeddingService,
        ContentProcessingQueueService,
    ],
})
export class ContentProcessingModule {}
