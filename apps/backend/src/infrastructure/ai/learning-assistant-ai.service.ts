import { Injectable } from '@nestjs/common';
import {
    OpenAiClientService,
    OpenAiTextResponseInput,
} from './openai-client.service';
import { LearningAssistantPromptService } from './learning-assistant-prompt.service';

export type LearningAssistantResponseInput = Omit<
    OpenAiTextResponseInput,
    'instructions'
> & {
    additionalPolicyLayers?: readonly string[];
};

@Injectable()
export class LearningAssistantAiService {
    constructor(
        private readonly openAiClient: OpenAiClientService,
        private readonly prompt: LearningAssistantPromptService,
    ) {}

    async createResponse(input: LearningAssistantResponseInput): Promise<string> {
        const { additionalPolicyLayers, ...responseInput } = input;
        return this.openAiClient.createTextResponse({
            ...responseInput,
            // Responses API instructions are not inherited by later responses,
            // so rebuild and send the complete policy stack on every call.
            instructions: this.prompt.build(additionalPolicyLayers),
        });
    }
}
