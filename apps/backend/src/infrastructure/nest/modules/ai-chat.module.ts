import { Module } from '@nestjs/common';
import { AiChatTrustedSourceController } from '../../../adapters/http/controllers/ai-chat/ai-chat-trusted-source.controller';
import { AiChatController } from '../../../adapters/http/controllers/ai-chat/ai-chat.controller';
import { AiChatConversationService } from '../../ai/ai-chat-conversation.service';
import { AiChatTrustedSourceService } from '../../ai/ai-chat-trusted-source.service';
import { AiModule } from './ai.module';

@Module({
    imports: [AiModule],
    controllers: [AiChatController, AiChatTrustedSourceController],
    providers: [AiChatConversationService, AiChatTrustedSourceService],
    exports: [AiChatConversationService, AiChatTrustedSourceService],
})
export class AiChatModule {}
