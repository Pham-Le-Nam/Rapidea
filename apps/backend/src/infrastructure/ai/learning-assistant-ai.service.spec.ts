import { LearningAssistantAiService } from './learning-assistant-ai.service';
import { RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT } from './prompts/learning-assistant.prompts';

it('sends the complete system policy on every learning-assistant response', async () => {
  const openAiClient = {
    createTextResponse: jest.fn().mockResolvedValue('answer'),
  };
  const prompt = {
    build: jest.fn().mockReturnValue(RAPIDEIA_LEARNING_ASSISTANT_SYSTEM_PROMPT),
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

it('maps provider-neutral structured output to Responses API text format', async () => {
  const openAiClient = {
    createTextResponse: jest.fn().mockResolvedValue('{"answer":"ok"}'),
  };
  const prompt = { build: jest.fn().mockReturnValue('system policy') };
  const service = new LearningAssistantAiService(
    openAiClient as any,
    prompt as any,
  );

  await service.createResponse({
    input: 'evidence',
    failureLabel: 'Final answer',
    structuredOutput: {
      name: 'answer',
      schema: { type: 'object' },
    },
  });

  expect(openAiClient.createTextResponse).toHaveBeenCalledWith({
    input: 'evidence',
    failureLabel: 'Final answer',
    textFormat: {
      type: 'json_schema',
      name: 'answer',
      strict: true,
      schema: { type: 'object' },
    },
    instructions: 'system policy',
  });
});
