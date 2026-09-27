import {
  ConversationMemoryEnvironmentVariable,
  conversationMemoryOptions,
} from './conversation-memory.config';

describe('conversationMemoryOptions', () => {
  afterEach(() => {
    for (const name of Object.values(ConversationMemoryEnvironmentVariable)) {
      delete process.env[name];
    }
  });

  it('uses bounded defaults when no overrides are configured', () => {
    expect(conversationMemoryOptions()).toEqual({
      summaryTriggerTokens: 6000,
      summaryTriggerMessages: 24,
      recentTokenBudget: 6000,
      retainRecentTurns: 3,
      summaryMaxOutputTokens: 1500,
    });
  });

  it('reads positive integer overrides', () => {
    process.env.AI_CONVERSATION_SUMMARY_TRIGGER_TOKENS = '7000';

    expect(conversationMemoryOptions().summaryTriggerTokens).toBe(7000);
  });

  it('rejects an invalid override', () => {
    process.env.AI_CONVERSATION_RETAIN_RECENT_TURNS = '0';

    expect(() => conversationMemoryOptions()).toThrow(
      'AI_CONVERSATION_RETAIN_RECENT_TURNS must be configured as a positive integer',
    );
  });
});
