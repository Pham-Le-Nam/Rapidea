import { PrismaConversationMemoryRepository } from './prisma-conversation-memory.repository';

const summaryRecord = {
  summary: 'Existing summary',
  topics: ['Architecture'],
  decisions: [],
  openQuestions: [],
  nextSteps: [],
  salientFacts: [],
  currentLearningPath: [],
  interests: [],
  learningGoals: [],
  learnerPreferences: [],
  skills: [],
  resourceReferences: [],
  summarizedThroughAt: new Date('2026-09-27T00:00:02Z'),
  summarizedThroughMessageId: 'message-2',
  sourceMessageCount: 2,
  summaryVersion: 1,
  generatedAt: new Date('2026-09-27T00:01:00Z'),
  updatedAt: new Date('2026-09-27T00:01:00Z'),
};

function createFixture() {
  const prisma = {
    aiChatConversation: { findFirst: jest.fn() },
    aiChatMessage: { findFirst: jest.fn(), findMany: jest.fn() },
    aiChatConversationSummary: {
      findUnique: jest.fn(),
      updateMany: jest.fn(),
      create: jest.fn(),
    },
  };
  return {
    prisma,
    repository: new PrismaConversationMemoryRepository(prisma as any),
  };
}

describe('PrismaConversationMemoryRepository', () => {
  it('loads only messages after the summary cursor and before the current message', async () => {
    const fixture = createFixture();
    const boundary = {
      id: 'message-5',
      createdAt: new Date('2026-09-27T00:00:05Z'),
    };
    fixture.prisma.aiChatConversation.findFirst.mockResolvedValue({
      id: 'conversation-1',
      summary: summaryRecord,
    });
    fixture.prisma.aiChatMessage.findFirst.mockResolvedValue(boundary);
    fixture.prisma.aiChatMessage.findMany.mockResolvedValue([
      {
        id: 'message-3',
        role: 'USER',
        content: 'Question',
        tokenCount: 2,
        createdAt: new Date('2026-09-27T00:00:03Z'),
      },
      {
        id: 'message-4',
        role: 'ASSISTANT',
        content: 'Answer',
        tokenCount: 2,
        createdAt: new Date('2026-09-27T00:00:04Z'),
      },
    ]);

    const state = await fixture.repository.load(
      'learner-1',
      'conversation-1',
      'message-5',
    );

    expect(state.summary?.summarizedThroughMessageId).toBe('message-2');
    expect(state.messages.map((message) => message.id)).toEqual([
      'message-3',
      'message-4',
    ]);
    expect(fixture.prisma.aiChatMessage.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        cursor: { id: 'message-2' },
        skip: 1,
        where: expect.objectContaining({
          conversationId: 'conversation-1',
          OR: [
            { createdAt: { lt: boundary.createdAt } },
            { createdAt: boundary.createdAt, id: { lt: 'message-5' } },
          ],
        }),
      }),
    );
  });

  it('uses optimistic cursor matching when updating a rolling summary', async () => {
    const fixture = createFixture();
    fixture.prisma.aiChatConversation.findFirst.mockResolvedValue({
      id: 'conversation-1',
    });
    fixture.prisma.aiChatConversationSummary.findUnique.mockResolvedValue({
      summarizedThroughMessageId: 'message-2',
    });
    fixture.prisma.aiChatConversationSummary.updateMany.mockResolvedValue({
      count: 1,
    });

    await expect(
      fixture.repository.saveSummary({
        userId: 'learner-1',
        conversationId: 'conversation-1',
        expectedSummarizedThroughMessageId: 'message-2',
        summarizedThroughMessage: {
          id: 'message-6',
          createdAt: new Date('2026-09-27T00:00:06Z'),
        },
        sourceMessageCount: 6,
        summary: {
          summary: 'Updated summary',
          topics: [],
          decisions: [],
          openQuestions: [],
          nextSteps: [],
          salientFacts: [],
          currentLearningPath: [],
          interests: [],
          learningGoals: [],
          learnerPreferences: [],
          skills: [],
          resourceReferences: [],
        },
      }),
    ).resolves.toBe(true);

    expect(
      fixture.prisma.aiChatConversationSummary.updateMany,
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          conversationId: 'conversation-1',
          summarizedThroughMessageId: 'message-2',
        },
        data: expect.objectContaining({
          summarizedThroughMessageId: 'message-6',
          sourceMessageCount: 6,
        }),
      }),
    );
  });

  it('does not overwrite a summary advanced by another request', async () => {
    const fixture = createFixture();
    fixture.prisma.aiChatConversation.findFirst.mockResolvedValue({
      id: 'conversation-1',
    });
    fixture.prisma.aiChatConversationSummary.findUnique.mockResolvedValue({
      summarizedThroughMessageId: 'message-8',
    });

    await expect(
      fixture.repository.saveSummary({
        userId: 'learner-1',
        conversationId: 'conversation-1',
        expectedSummarizedThroughMessageId: 'message-2',
        summarizedThroughMessage: {
          id: 'message-6',
          createdAt: new Date(),
        },
        sourceMessageCount: 6,
        summary: {
          summary: 'Stale summary',
          topics: [],
          decisions: [],
          openQuestions: [],
          nextSteps: [],
          salientFacts: [],
          currentLearningPath: [],
          interests: [],
          learningGoals: [],
          learnerPreferences: [],
          skills: [],
          resourceReferences: [],
        },
      }),
    ).resolves.toBe(false);
    expect(
      fixture.prisma.aiChatConversationSummary.updateMany,
    ).not.toHaveBeenCalled();
  });
});
