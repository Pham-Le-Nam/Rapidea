import { Module } from '@nestjs/common';
import { AI_SERVICE } from '../../../application/ports/ai.service';
import { LEARNING_ASSISTANT_RESPONSE_PORT } from '../../../application/ports/learning-assistant-response.port';
import { OpenAiClientService } from '../../ai/openai-client.service';
import { OpenAiService } from '../../ai/openai.service';
import { LearningAssistantAiService } from '../../ai/learning-assistant-ai.service';
import { LearningAssistantPromptService } from '../../ai/learning-assistant-prompt.service';

@Module({
  providers: [
    OpenAiClientService,
    OpenAiService,
    LearningAssistantPromptService,
    LearningAssistantAiService,
    {
      provide: LEARNING_ASSISTANT_RESPONSE_PORT,
      useExisting: LearningAssistantAiService,
    },
    { provide: AI_SERVICE, useExisting: OpenAiService },
  ],
  exports: [
    AI_SERVICE,
    OpenAiClientService,
    LearningAssistantPromptService,
    LearningAssistantAiService,
    LEARNING_ASSISTANT_RESPONSE_PORT,
  ],
})
export class AiModule {}
