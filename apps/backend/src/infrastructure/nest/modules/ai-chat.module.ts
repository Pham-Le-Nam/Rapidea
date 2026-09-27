import { Module } from '@nestjs/common';
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
import { AiModule } from './ai.module';
import { ContentProcessingModule } from './content-processing.module';

@Module({
    imports: [AiModule, ContentProcessingModule],
    controllers: [AiChatController, AiChatTrustedSourceController],
    providers: [
        AiChatConversationService,
        AiContentAuthorizationService,
        AiChatTrustedSourceService,
        ContentRetrievalService,
        CourseRetrievalService,
        HybridContentSearchService,
        IntentClassificationService,
        QueryEmbeddingService,
    ],
    exports: [
        AiChatConversationService,
        AiContentAuthorizationService,
        AiChatTrustedSourceService,
        ContentRetrievalService,
        CourseRetrievalService,
        HybridContentSearchService,
        IntentClassificationService,
        QueryEmbeddingService,
    ],
})
export class AiChatModule {}
