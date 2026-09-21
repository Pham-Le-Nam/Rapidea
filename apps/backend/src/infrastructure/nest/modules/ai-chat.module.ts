import { Module } from '@nestjs/common';
import { AiChatTrustedSourceController } from '../../../adapters/http/controllers/ai-chat/ai-chat-trusted-source.controller';
import { AiChatTrustedSourceService } from '../../ai/ai-chat-trusted-source.service';
import { AiModule } from './ai.module';

@Module({
    imports: [AiModule],
    controllers: [AiChatTrustedSourceController],
    providers: [AiChatTrustedSourceService],
    exports: [AiChatTrustedSourceService],
})
export class AiChatModule {}
