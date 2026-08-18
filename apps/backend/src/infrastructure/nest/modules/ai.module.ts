import { Module } from '@nestjs/common';
import { AI_SERVICE } from '../../../application/ports/ai.service';
import { OpenAiService } from '../../ai/openai.service';

@Module({
    providers: [{ provide: AI_SERVICE, useClass: OpenAiService }],
    exports: [AI_SERVICE],
})
export class AiModule {}
