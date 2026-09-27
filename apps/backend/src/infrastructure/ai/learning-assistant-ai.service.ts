import { Injectable } from '@nestjs/common';
import {
  LearningAssistantResponsePort,
  LearningAssistantResponseRequest,
} from '../../application/ports/learning-assistant-response.port';
import { OpenAiClientService } from './openai-client.service';
import { LearningAssistantPromptService } from './learning-assistant-prompt.service';

@Injectable()
export class LearningAssistantAiService implements LearningAssistantResponsePort {
  constructor(
    private readonly openAiClient: OpenAiClientService,
    private readonly prompt: LearningAssistantPromptService,
  ) {}

  async createResponse(
    input: LearningAssistantResponseRequest,
  ): Promise<string> {
    const { additionalPolicyLayers, structuredOutput, ...responseInput } =
      input;
    return this.openAiClient.createTextResponse({
      ...responseInput,
      ...(structuredOutput
        ? {
            textFormat: {
              type: 'json_schema',
              name: structuredOutput.name,
              strict: true,
              schema: structuredOutput.schema,
            },
          }
        : {}),
      // Responses API instructions are not inherited by later responses,
      // so rebuild and send the complete policy stack on every call.
      instructions: this.prompt.build(additionalPolicyLayers),
    });
  }
}
