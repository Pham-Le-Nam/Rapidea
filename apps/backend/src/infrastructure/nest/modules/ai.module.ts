import { Module } from '@nestjs/common';
import { AI_SERVICE } from '../../../application/ports/ai.service';
import { OpenAiClientService } from '../../ai/openai-client.service';
import { OpenAiService } from '../../ai/openai.service';

@Module({
    providers: [
        OpenAiClientService,
        OpenAiService,
        { provide: AI_SERVICE, useExisting: OpenAiService },
    ],
    exports: [AI_SERVICE, OpenAiClientService],
})
export class AiModule {}
