import { Module } from '@nestjs/common';
import { AiChatOrchestrationService } from '../../../application/ai-chat/ai-chat-orchestration.service';
import { IntentRetrievalRouterService } from '../../../application/ai-chat/intent-retrieval-router.service';
import { FinalAnswerGenerationService } from '../../../application/ai-chat/final-answer-generation.service';
import { ConversationMemoryService } from '../../../application/ai-chat/conversation-memory.service';
import { LearningPathRetrievalService } from '../../../application/ai-chat/learning-path-retrieval.service';
import { RapideiaEvidenceService } from '../../../application/ai-chat/rapideia-evidence.service';
import { CONTENT_RETRIEVAL_PORT } from '../../../application/ports/content-retrieval.port';
import { COURSE_RETRIEVAL_PORT } from '../../../application/ports/course-retrieval.port';
import { LEARNER_CONTEXT_PORT } from '../../../application/ports/learner-context.port';
import { TOKEN_COUNTER_PORT } from '../../../application/ports/token-counter.port';
import { CONVERSATION_MEMORY_REPOSITORY } from '../../../application/ports/conversation-memory-repository.port';
import { CONVERSATION_MEMORY_OPTIONS } from '../../../application/ports/conversation-memory-options.port';
import { AiChatTrustedSourceController } from '../../../adapters/http/controllers/ai-chat/ai-chat-trusted-source.controller';
import { AiChatController } from '../../../adapters/http/controllers/ai-chat/ai-chat.controller';
import { AiChatConversationService } from '../../ai/ai-chat-conversation.service';
import { AiContentAuthorizationService } from '../../ai/ai-content-authorization.service';
import { IntentClassificationService } from '../../ai/intent-classification.service';
import { AiChatTrustedSourceService } from '../../ai/ai-chat-trusted-source.service';
import { ContentRetrievalService } from '../../ai/content-retrieval.service';
import { CourseRetrievalService } from '../../ai/course-retrieval.service';
import { HybridContentSearchService } from '../../ai/hybrid-content-search.service';
import { QueryEmbeddingService } from '../../ai/query-embedding.service';
import { TiktokenTokenCounterService } from '../../ai/tiktoken-token-counter.service';
import { PrismaConversationMemoryRepository } from '../../ai/prisma-conversation-memory.repository';
import { conversationMemoryOptions } from '../../ai/conversation-memory.config';
import { LearnerContextService } from '../../content-processing/learner-context.service';
import { AiModule } from './ai.module';
import { ContentProcessingModule } from './content-processing.module';

@Module({
  imports: [AiModule, ContentProcessingModule],
  controllers: [AiChatController, AiChatTrustedSourceController],
  providers: [
    AiChatConversationService,
    AiChatOrchestrationService,
    AiContentAuthorizationService,
    AiChatTrustedSourceService,
    ContentRetrievalService,
    CourseRetrievalService,
    HybridContentSearchService,
    IntentClassificationService,
    QueryEmbeddingService,
    IntentRetrievalRouterService,
    FinalAnswerGenerationService,
    ConversationMemoryService,
    LearningPathRetrievalService,
    RapideiaEvidenceService,
    TiktokenTokenCounterService,
    PrismaConversationMemoryRepository,
    {
      provide: CONTENT_RETRIEVAL_PORT,
      useExisting: ContentRetrievalService,
    },
    {
      provide: COURSE_RETRIEVAL_PORT,
      useExisting: CourseRetrievalService,
    },
    {
      provide: LEARNER_CONTEXT_PORT,
      useExisting: LearnerContextService,
    },
    {
      provide: TOKEN_COUNTER_PORT,
      useExisting: TiktokenTokenCounterService,
    },
    {
      provide: CONVERSATION_MEMORY_REPOSITORY,
      useExisting: PrismaConversationMemoryRepository,
    },
    {
      provide: CONVERSATION_MEMORY_OPTIONS,
      useFactory: conversationMemoryOptions,
    },
  ],
  exports: [
    AiChatConversationService,
    AiChatOrchestrationService,
    AiContentAuthorizationService,
    AiChatTrustedSourceService,
    ContentRetrievalService,
    CourseRetrievalService,
    HybridContentSearchService,
    IntentClassificationService,
    QueryEmbeddingService,
    IntentRetrievalRouterService,
    FinalAnswerGenerationService,
    ConversationMemoryService,
    LearningPathRetrievalService,
    RapideiaEvidenceService,
  ],
})
export class AiChatModule {}
