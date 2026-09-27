import { Module } from '@nestjs/common';
import { AiChatTrustedSourceController } from '../../../adapters/http/controllers/ai-chat/ai-chat-trusted-source.controller';
import { AiChatController } from '../../../adapters/http/controllers/ai-chat/ai-chat.controller';
import { AiChatConversationService } from '../../ai/ai-chat-conversation.service';
import { AiContentAuthorizationService } from '../../ai/ai-content-authorization.service';
import { IntentClassificationService } from '../../ai/intent-classification.service';
import { AiChatTrustedSourceService } from '../../ai/ai-chat-trusted-source.service';
import { HybridContentSearchService } from '../../ai/hybrid-content-search.service';
import { AiModule } from './ai.module';

@Module({
    imports: [AiModule],
    controllers: [AiChatController, AiChatTrustedSourceController],
    providers: [
        AiChatConversationService,
        AiContentAuthorizationService,
        AiChatTrustedSourceService,
        HybridContentSearchService,
        IntentClassificationService,
    ],
    exports: [
        AiChatConversationService,
        AiContentAuthorizationService,
        AiChatTrustedSourceService,
        HybridContentSearchService,
        IntentClassificationService,
    ],
})
export class AiChatModule {}
