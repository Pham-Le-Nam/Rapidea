import { LearningAssistantAiService } from './learning-assistant-ai.service';
import { RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT } from './prompts/learning-assistant.prompts';

it('sends the complete system policy on every learning-assistant response', async () => {
    const openAiClient = {
        createTextResponse: jest.fn().mockResolvedValue('answer'),
    };
    const prompt = {
        build: jest
            .fn()
            .mockReturnValue(RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT),
    };
    const service = new LearningAssistantAiService(
        openAiClient as any,
        prompt as any,
    );

    await expect(
        service.createResponse({
            input: 'What does this file mean?',
            failureLabel: 'Learning assistant response',
        }),
    ).resolves.toBe('answer');

    expect(prompt.build).toHaveBeenCalledWith(undefined);
    expect(openAiClient.createTextResponse).toHaveBeenCalledWith({
        instructions: RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT,
        input: 'What does this file mean?',
        failureLabel: 'Learning assistant response',
    });
});
