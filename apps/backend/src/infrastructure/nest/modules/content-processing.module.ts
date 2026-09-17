import { Module } from '@nestjs/common';
import { ChunkingEmbeddingService } from '../../content-processing/chunking-embedding.service';
import { ContentProcessingQueueService } from '../../content-processing/content-processing-queue.service';
import { CourseProfileService } from '../../content-processing/course-profile.service';
import { CourseSummaryService } from '../../content-processing/course-summary.service';
import { FileSummaryService } from '../../content-processing/file-summary.service';
import { PostSkillService } from '../../content-processing/post-skill.service';
import { PostSummaryService } from '../../content-processing/post-summary.service';
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
        CourseProfileService,
        CourseSummaryService,
        FileSummaryService,
        PostSkillService,
        PostSummaryService,
        ContentProcessingQueueService,
    ],
    exports: [
        TextExtractionService,
        ChunkingEmbeddingService,
        CourseProfileService,
        CourseSummaryService,
        FileSummaryService,
        PostSkillService,
        PostSummaryService,
        ContentProcessingQueueService,
    ],
})
export class ContentProcessingModule {}
