import { Logger } from '@nestjs/common';
import { ConversationMemoryService } from './conversation-memory.service';
import { CONVERSATION_SUMMARY_OUTPUT } from './conversation-summary.schema';
import {
  ConversationMemoryMessage,
  ConversationMemoryOptions,
  ConversationSummaryData,
  StoredConversationSummary,
} from './conversation-memory.types';
import { RAPIDEIA_CONVERSATION_SUMMARY_PROMPT } from './prompts/conversation-summary.prompt';

const generatedSummary: ConversationSummaryData = {
  summary: 'The learner is building backend architecture skills.',
  topics: ['Dependency injection'],
  decisions: ['Use TypeScript examples'],
  openQuestions: ['How should repositories be tested?'],
  nextSteps: ['Study repository patterns'],
  salientFacts: [
    { fact: 'The learner uses TypeScript.', attribution: 'LEARNER' },
  ],
  currentLearningPath: ['TypeScript', 'Backend architecture'],
  interests: ['Software architecture'],
  learningGoals: ['Build maintainable APIs'],
  learnerPreferences: ['Concrete examples'],
  skills: [
    {
      name: 'TypeScript',
      status: 'EXPLICIT',
      context: 'The learner said they use TypeScript.',
    },
  ],
  resourceReferences: [{ type: 'FILE', name: 'Architecture.pdf' }],
};

const options: ConversationMemoryOptions = {
  summaryTriggerTokens: 100,
  summaryTriggerMessages: 8,
  recentTokenBudget: 100,
  retainRecentTurns: 1,
  summaryMaxOutputTokens: 300,
};

function message(
  number: number,
  role: ConversationMemoryMessage['role'],
  tokenCount = 20,
): ConversationMemoryMessage {
  return {
    id: `message-${number}`,
    role,
    content: `${role} content ${number}`,
    tokenCount,
    createdAt: new Date(`2026-09-27T00:00:${String(number).padStart(2, '0')}Z`),
  };
}

function messages(turns: number): ConversationMemoryMessage[] {
  return Array.from({ length: turns }).flatMap((_, index) => [
    message(index * 2 + 1, 'USER'),
    message(index * 2 + 2, 'ASSISTANT'),
  ]);
}

function storedSummary(cursor = 'message-2'): StoredConversationSummary {
  return {
    ...generatedSummary,
    summarizedThroughAt: new Date('2026-09-27T00:00:02Z'),
    summarizedThroughMessageId: cursor,
    sourceMessageCount: 2,
    summaryVersion: 1,
    generatedAt: new Date('2026-09-27T00:01:00Z'),
    updatedAt: new Date('2026-09-27T00:01:00Z'),
  };
}

function createFixture(response = generatedSummary) {
  const repository = {
    load: jest.fn(),
    saveSummary: jest.fn().mockResolvedValue(true),
  };
  const learningAssistant = {
    createResponse: jest.fn().mockResolvedValue(JSON.stringify(response)),
  };
  const tokenCounter = {
    count: jest.fn((text: string) => text.split(/\s+/).filter(Boolean).length),
    truncate: jest.fn((text: string, maximum: number) =>
      text.split(/\s+/).slice(0, maximum).join(' '),
    ),
  };
  return {
    repository,
    learningAssistant,
    tokenCounter,
    service: new ConversationMemoryService(
      repository,
      learningAssistant,
      tokenCounter,
      options,
    ),
  };
}

describe('ConversationMemoryService', () => {
  beforeEach(() => {
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  it('returns the stored summary with only repository-supplied unsummarized messages', async () => {
    const fixture = createFixture();
    fixture.repository.load.mockResolvedValue({
      summary: storedSummary(),
      messages: [message(3, 'USER'), message(4, 'ASSISTANT')],
    });

    const context = await fixture.service.getContextForFinalResponse(
      'learner-1',
      'conversation-1',
      'message-5',
    );

    expect(context.summary).toEqual(generatedSummary);
    expect(context.recentConversation).toEqual([
      { role: 'USER', content: 'USER content 3' },
      { role: 'ASSISTANT', content: 'ASSISTANT content 4' },
    ]);
    expect(fixture.repository.load).toHaveBeenCalledWith(
      'learner-1',
      'conversation-1',
      'message-5',
    );
    expect(fixture.learningAssistant.createResponse).not.toHaveBeenCalled();
  });

  it('rolls up old completed turns and reloads only messages after the new cursor', async () => {
    const fixture = createFixture();
    const allMessages = messages(4);
    fixture.repository.load
      .mockResolvedValueOnce({ summary: null, messages: allMessages })
      .mockResolvedValueOnce({
        summary: storedSummary('message-6'),
        messages: allMessages.slice(6),
      });

    const context = await fixture.service.getContextForFinalResponse(
      'learner-1',
      'conversation-1',
      'current-message',
    );

    expect(fixture.repository.saveSummary).toHaveBeenCalledWith(
      expect.objectContaining({
        expectedSummarizedThroughMessageId: null,
        summarizedThroughMessage: {
          id: 'message-6',
          createdAt: allMessages[5].createdAt,
        },
        sourceMessageCount: 6,
        summary: generatedSummary,
      }),
    );
    expect(context.recentConversation).toEqual([
      { role: 'USER', content: 'USER content 7' },
      { role: 'ASSISTANT', content: 'ASSISTANT content 8' },
    ]);
    expect(
      fixture.learningAssistant.createResponse.mock.calls[0][0].input,
    ).not.toContain('message-6');
    expect(fixture.learningAssistant.createResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        additionalPolicyLayers: [RAPIDEIA_CONVERSATION_SUMMARY_PROMPT],
        structuredOutput: CONVERSATION_SUMMARY_OUTPUT,
        maxOutputTokens: 300,
      }),
    );
  });

  it('updates rolling memory after an assistant response crosses the threshold', async () => {
    const fixture = createFixture();
    fixture.repository.load.mockResolvedValue({
      summary: storedSummary(),
      messages: messages(4),
    });

    await expect(
      fixture.service.refreshAfterAssistantResponse(
        'learner-1',
        'conversation-1',
      ),
    ).resolves.toBe(true);

    expect(fixture.repository.saveSummary).toHaveBeenCalledWith(
      expect.objectContaining({
        expectedSummarizedThroughMessageId: 'message-2',
        sourceMessageCount: 8,
      }),
    );
  });

  it('falls back to bounded recent messages if synchronous summarization fails', async () => {
    const fixture = createFixture();
    fixture.repository.load.mockResolvedValue({
      summary: null,
      messages: messages(4),
    });
    fixture.learningAssistant.createResponse.mockRejectedValue(
      new Error('provider unavailable'),
    );

    const context = await fixture.service.getContextForFinalResponse(
      'learner-1',
      'conversation-1',
      'current-message',
    );

    expect(context.summary).toBeNull();
    expect(context.recentConversation.length).toBeGreaterThan(0);
    expect(Logger.prototype.warn).toHaveBeenCalled();
  });

  it('keeps the newest messages when the recent-message budget is exceeded', async () => {
    const fixture = createFixture();
    fixture.repository.load.mockResolvedValue({
      summary: storedSummary(),
      messages: [message(3, 'USER', 120), message(4, 'ASSISTANT', 120)],
    });

    const context = await fixture.service.getContextForFinalResponse(
      'learner-1',
      'conversation-1',
      'message-5',
    );

    expect(context.recentConversation.at(-1)?.role).toBe('ASSISTANT');
    expect(
      context.recentConversation.some(
        (item) => item.content === 'USER content 3',
      ),
    ).toBe(false);
  });
});
