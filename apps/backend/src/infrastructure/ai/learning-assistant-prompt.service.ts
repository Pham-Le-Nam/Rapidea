import { Injectable } from '@nestjs/common';
import {
    RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT,
    RAPIDEIA_TRUSTED_SOURCE_POLICY,
} from './prompts/learning-assistant.prompts';

@Injectable()
export class LearningAssistantPromptService {
    /**
     * Only application-controlled policy text belongs in additionalPolicyLayers.
     * User messages and retrieved content must be sent as model input/data instead.
     */
    build(additionalPolicyLayers: readonly string[] = []): string {
        return [
            RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT,
            RAPIDEIA_TRUSTED_SOURCE_POLICY,
            ...additionalPolicyLayers,
        ]
            .map((layer) => layer.trim())
            .filter(Boolean)
            .join('\n\n');
    }
}
