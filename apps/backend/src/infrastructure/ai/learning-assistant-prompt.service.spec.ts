import { LearningAssistantPromptService } from './learning-assistant-prompt.service';
import {
    RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT,
    RAPIDEIA_TRUSTED_SOURCE_POLICY,
} from './prompts/learning-assistant.prompts';

describe('LearningAssistantPromptService', () => {
    it('always places the Rapideia system policy first', () => {
        const prompt = new LearningAssistantPromptService().build([
            'APPLICATION-CONTROLLED TASK POLICY',
        ]);

        expect(prompt.startsWith(RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT)).toBe(
            true,
        );
        expect(prompt.indexOf(RAPIDEIA_TRUSTED_SOURCE_POLICY)).toBeGreaterThan(
            prompt.indexOf(RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT),
        );
        expect(prompt.endsWith('APPLICATION-CONTROLLED TASK POLICY')).toBe(true);
    });

    it('does not add empty policy layers', () => {
        const prompt = new LearningAssistantPromptService().build(['  ']);

        expect(prompt).toBe(
            `${RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT}\n\n${RAPIDEIA_TRUSTED_SOURCE_POLICY}`,
        );
    });
});
