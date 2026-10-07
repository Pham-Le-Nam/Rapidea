import { AiChatMessageRole } from '../../../generated/prisma/enums';
import {
  LearnerIntent,
  LearnerQuery,
} from '../../application/ai-chat/learner-query.types';
import { AiChatConversationService } from './ai-chat-conversation.service';
import { AiAssistantMode } from '../../application/ai-chat/ai-assistant-mode';

const createdAt = new Date('2026-09-21T00:00:00.000Z');

const learnerQuery: LearnerQuery = {
  intent: LearnerIntent.EXPLAIN_CONTENT,
  targets: [],
  courseScope: null,
  desiredSkills: [],
  existingSkills: [],
  desiredOutcomes: [],
  difficulty: null,
  constraints: { maxDurationHours: null, language: null },
  searchQuery: null,
  explanationLevel: null,
  includeDiscussions: false,
};

function message(id = 'message-1', metadata: unknown = null) {
  return {
    id,
    responseToMessageId: null,
    role: AiChatMessageRole.USER,
    content: 'Explain this post',
    model: null,
    tokenCount: null,
    citations: null,
    metadata,
    createdAt,
  };
}

function assistantMessage() {
  return {
    id: 'assistant-1',
    responseToMessageId: 'message-1',
    role: AiChatMessageRole.ASSISTANT,
    content: 'Here is the answer.\n\nWould you like an example?',
    model: 'test-response-model',
    tokenCount: 12,
    citations: [],
    metadata: { intent: LearnerIntent.EXPLAIN_CONTENT },
    createdAt: new Date('2026-09-21T00:01:00.000Z'),
  };
}

function conversation() {
  return {
    id: 'conversation-1',
    title: 'Explain this post',
    lastMessageAt: createdAt,
    createdAt,
    updatedAt: createdAt,
  };
}

function setup() {
  const transaction = {
    aiChatConversation: {
      findFirst: jest.fn(),
      create: jest.fn().mockResolvedValue(conversation()),
      update: jest.fn().mockResolvedValue(conversation()),
    },
    aiChatTrustedSource: { createMany: jest.fn() },
    aiChatMessage: {
      create: jest
        .fn()
        .mockImplementation(({ data }) =>
          Promise.resolve(
            data.role === AiChatMessageRole.ASSISTANT
              ? assistantMessage()
              : message(),
          ),
        ),
    },
  };
  const prisma = {
    aiChatMessage: {
      findUnique: jest.fn().mockResolvedValue(null),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    aiChatConversation: { findFirst: jest.fn(), findMany: jest.fn() },
    $transaction: jest.fn((callback) => callback(transaction)),
  };
  const trustedSources = {
    validateSources: jest.fn().mockResolvedValue([{ postId: 'post-1' }]),
    list: jest.fn().mockResolvedValue([]),
  };
  const intentClassification = {
    classify: jest.fn().mockResolvedValue(learnerQuery),
  };
  const orchestration = {
    respond: jest.fn().mockResolvedValue({
      content: 'Here is the answer.\n\nWould you like an example?',
      answer: 'Here is the answer.',
      followUpQuestion: 'Would you like an example?',
      citations: [],
      citedReferences: [],
      retrievalWarnings: [],
      evidenceTokenCount: 100,
      assistantTokenCount: 12,
    }),
  };
  const conversationMemory = {
    refreshAfterAssistantResponse: jest.fn().mockResolvedValue(false),
  };
  return {
    transaction,
    prisma,
    trustedSources,
    intentClassification,
    orchestration,
    conversationMemory,
  };
}

describe('AiChatConversationService', () => {
  it('creates an instructor conversation on first send, dispatches only the instructor pipeline and persists proposals', async () => {
    const f = setup();
    f.transaction.aiChatConversation.create.mockResolvedValue({ ...conversation(), mode: 'INSTRUCTOR' } as any);
    f.transaction.aiChatConversation.update.mockResolvedValue({ ...conversation(), mode: 'INSTRUCTOR' } as any);
    const trustedSources = { ...f.trustedSources, getLearnerQueryContext: jest.fn().mockResolvedValue([]) };
    const instructor = { respond: jest.fn().mockResolvedValue({ content: 'Draft lesson', answer: 'Draft lesson', followUpQuestion: 'Review it?', query: { intent: 'DRAFT_POST' }, citations: [], citedReferences: [], proposal: { kind: 'POST_DRAFT', title: 'Limits', body: 'Explanation', items: [] }, retrievalWarnings: [], evidenceTokenCount: 0, assistantTokenCount: 5 }) };
    const service = new AiChatConversationService(f.prisma as any, trustedSources as any, f.intentClassification as any, f.orchestration as any, f.conversationMemory as any, instructor as any);
    await service.sendMessage('owner', { clientRequestId: 'request', content: 'Draft a lesson' }, AiAssistantMode.INSTRUCTOR);
    expect(f.transaction.aiChatConversation.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ mode: 'INSTRUCTOR' }) }));
    expect(f.intentClassification.classify).not.toHaveBeenCalled();
    expect(f.orchestration.respond).not.toHaveBeenCalled();
    expect(instructor.respond).toHaveBeenCalledTimes(1);
    expect(trustedSources.list).toHaveBeenCalledWith('owner', 'conversation-1', AiAssistantMode.INSTRUCTOR);
    expect(f.transaction.aiChatMessage.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ role: 'ASSISTANT', metadata: expect.objectContaining({ proposal: expect.objectContaining({ kind: 'POST_DRAFT' }) }) }) }));
  });
  it('does not replay an instructor message through the learner endpoint', async () => {
    const f = setup();
    f.prisma.aiChatMessage.findUnique.mockResolvedValue({ ...message(), conversation: { ...conversation(), userId: 'owner', mode: 'INSTRUCTOR' } });
    const service = new AiChatConversationService(f.prisma as any, f.trustedSources as any, f.intentClassification as any, f.orchestration as any, f.conversationMemory as any);
    await expect(service.sendMessage('owner', { clientRequestId: 'request', content: 'Explain this post' })).rejects.toThrow('already been used');
    expect(f.orchestration.respond).not.toHaveBeenCalled();
  });
  it('rejects retry keys reused for different content', async () => {
    const f = setup();
    f.prisma.aiChatMessage.findUnique.mockResolvedValueOnce({ ...message(), conversation: { ...conversation(), userId: 'owner' } }).mockResolvedValueOnce(null);
    const service = new AiChatConversationService(f.prisma as any, f.trustedSources as any, f.intentClassification as any, f.orchestration as any, f.conversationMemory as any);
    await expect(service.sendMessage('owner', { clientRequestId: 'request', content: 'Different question' })).rejects.toThrow('different message');
  });
  it('creates a conversation only when the first message is sent', async () => {
    const {
      transaction,
      prisma,
      trustedSources,
      intentClassification,
      orchestration,
      conversationMemory,
    } = setup();
    const service = new AiChatConversationService(
      prisma as any,
      trustedSources as any,
      intentClassification as any,
      orchestration as any,
      conversationMemory as any,
    );

    const result = await service.sendMessage('learner-1', {
      clientRequestId: 'request-1',
      content: 'Explain this post',
      trustedSourcesToAdd: [{ sourceType: 'POST' as any, sourceId: 'post-1' }],
    });

    expect(result.conversationCreated).toBe(true);
    expect(result.assistantMessage).toEqual(assistantMessage());
    expect(result.learnerQuery).toEqual(learnerQuery);
    expect(orchestration.respond).toHaveBeenCalledWith({
      userId: 'learner-1',
      conversationId: 'conversation-1',
      currentMessageId: 'message-1',
      learnerMessage: 'Explain this post',
      learnerQuery,
    });
    expect(
      conversationMemory.refreshAfterAssistantResponse,
    ).toHaveBeenCalledWith('learner-1', 'conversation-1');
    expect(transaction.aiChatConversation.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ userId: 'learner-1' }),
      }),
    );
    expect(transaction.aiChatTrustedSource.createMany).toHaveBeenCalledWith(
      expect.objectContaining({ skipDuplicates: true }),
    );
    expect(transaction.aiChatMessage.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          clientRequestId: 'request-1',
          role: AiChatMessageRole.USER,
        }),
      }),
    );
    expect(transaction.aiChatMessage.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          responseToMessageId: 'message-1',
          role: AiChatMessageRole.ASSISTANT,
          tokenCount: 12,
        }),
      }),
    );
  });

  it('returns an idempotent replay without creating another conversation', async () => {
    const {
      transaction,
      prisma,
      trustedSources,
      intentClassification,
      orchestration,
      conversationMemory,
    } = setup();
    prisma.aiChatMessage.findUnique
      .mockResolvedValueOnce({
        ...message('message-1', { learnerQuery }),
        conversation: { ...conversation(), userId: 'learner-1' },
      })
      .mockResolvedValueOnce(assistantMessage());
    const service = new AiChatConversationService(
      prisma as any,
      trustedSources as any,
      intentClassification as any,
      orchestration as any,
      conversationMemory as any,
    );

    const result = await service.sendMessage('learner-1', {
      clientRequestId: 'request-1',
      content: 'Explain this post',
    });

    expect(result.idempotentReplay).toBe(true);
    expect(transaction.aiChatConversation.create).not.toHaveBeenCalled();
    expect(trustedSources.validateSources).not.toHaveBeenCalled();
    expect(intentClassification.classify).not.toHaveBeenCalled();
    expect(orchestration.respond).not.toHaveBeenCalled();
    expect(result.assistantMessage).toEqual(assistantMessage());
  });

  it('resumes response generation when a retry finds a stored user message without an assistant response', async () => {
    const {
      transaction,
      prisma,
      trustedSources,
      intentClassification,
      orchestration,
      conversationMemory,
    } = setup();
    prisma.aiChatMessage.findUnique
      .mockResolvedValueOnce({
        ...message('message-1', { learnerQuery }),
        conversation: { ...conversation(), userId: 'learner-1' },
      })
      .mockResolvedValueOnce(null);
    const service = new AiChatConversationService(
      prisma as any,
      trustedSources as any,
      intentClassification as any,
      orchestration as any,
      conversationMemory as any,
    );

    const result = await service.sendMessage('learner-1', {
      clientRequestId: 'request-1',
      content: 'Explain this post',
    });

    expect(result.idempotentReplay).toBe(true);
    expect(result.assistantMessage).toEqual(assistantMessage());
    expect(orchestration.respond).toHaveBeenCalledTimes(1);
    expect(transaction.aiChatConversation.create).not.toHaveBeenCalled();
  });

  it('returns the winning response when concurrent first-message creation hits the idempotency constraint', async () => {
    const {
      transaction,
      prisma,
      trustedSources,
      intentClassification,
      orchestration,
      conversationMemory,
    } = setup();
    prisma.aiChatMessage.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        ...message('message-1', { learnerQuery }),
        conversation: { ...conversation(), userId: 'learner-1' },
      })
      .mockResolvedValueOnce(assistantMessage());
    prisma.$transaction.mockRejectedValueOnce({ code: 'P2002' });
    const service = new AiChatConversationService(
      prisma as any,
      trustedSources as any,
      intentClassification as any,
      orchestration as any,
      conversationMemory as any,
    );

    const result = await service.sendMessage('learner-1', {
      clientRequestId: 'request-1',
      content: 'Explain this post',
    });

    expect(result.idempotentReplay).toBe(true);
    expect(result.assistantMessage).toEqual(assistantMessage());
    expect(transaction.aiChatConversation.create).not.toHaveBeenCalled();
    expect(orchestration.respond).not.toHaveBeenCalled();
  });

  it('returns the winning assistant message when concurrent response persistence hits the reply constraint', async () => {
    const {
      prisma,
      trustedSources,
      intentClassification,
      orchestration,
      conversationMemory,
    } = setup();
    prisma.aiChatMessage.findUnique
      .mockResolvedValueOnce({
        ...message('message-1', { learnerQuery }),
        conversation: { ...conversation(), userId: 'learner-1' },
      })
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(assistantMessage());
    prisma.$transaction.mockRejectedValueOnce({ code: 'P2002' });
    const service = new AiChatConversationService(
      prisma as any,
      trustedSources as any,
      intentClassification as any,
      orchestration as any,
      conversationMemory as any,
    );

    const result = await service.sendMessage('learner-1', {
      clientRequestId: 'request-1',
      content: 'Explain this post',
    });

    expect(orchestration.respond).toHaveBeenCalledTimes(1);
    expect(result.assistantMessage).toEqual(assistantMessage());
    expect(
      conversationMemory.refreshAfterAssistantResponse,
    ).toHaveBeenCalledTimes(1);
  });

  it('returns the persisted answer even when the optional memory refresh fails', async () => {
    const {
      prisma,
      trustedSources,
      intentClassification,
      orchestration,
      conversationMemory,
    } = setup();
    conversationMemory.refreshAfterAssistantResponse.mockRejectedValue(
      new Error('summary unavailable'),
    );
    const service = new AiChatConversationService(
      prisma as any,
      trustedSources as any,
      intentClassification as any,
      orchestration as any,
      conversationMemory as any,
    );

    await expect(
      service.sendMessage('learner-1', {
        clientRequestId: 'request-1',
        content: 'Explain this post',
      }),
    ).resolves.toEqual(
      expect.objectContaining({ assistantMessage: assistantMessage() }),
    );
  });

  it('does not hold the response open while conversation memory refreshes', async () => {
    const {
      prisma,
      trustedSources,
      intentClassification,
      orchestration,
      conversationMemory,
    } = setup();
    conversationMemory.refreshAfterAssistantResponse.mockReturnValue(
      new Promise(() => undefined),
    );
    const service = new AiChatConversationService(
      prisma as any,
      trustedSources as any,
      intentClassification as any,
      orchestration as any,
      conversationMemory as any,
    );

    const result = await service.sendMessage('learner-1', {
      clientRequestId: 'request-1',
      content: 'Explain this post',
    });

    expect(result).toEqual(
      expect.objectContaining({ assistantMessage: assistantMessage() }),
    );
    expect(
      conversationMemory.refreshAfterAssistantResponse,
    ).toHaveBeenCalledWith('learner-1', 'conversation-1');
  });

  it('returns the latest message page in chronological display order', async () => {
    const {
      prisma,
      trustedSources,
      intentClassification,
      orchestration,
      conversationMemory,
    } = setup();
    prisma.aiChatConversation.findFirst.mockResolvedValue({
      id: 'conversation-1',
    });
    prisma.aiChatMessage.findMany.mockResolvedValue([
      { ...message('message-3'), createdAt: new Date('2026-09-21T03:00:00Z') },
      { ...message('message-2'), createdAt: new Date('2026-09-21T02:00:00Z') },
      { ...message('message-1'), createdAt: new Date('2026-09-21T01:00:00Z') },
    ]);
    const service = new AiChatConversationService(
      prisma as any,
      trustedSources as any,
      intentClassification as any,
      orchestration as any,
      conversationMemory as any,
    );

    const result = await service.listMessages('learner-1', 'conversation-1', 2);

    expect(result.messages.map((item) => item.id)).toEqual([
      'message-2',
      'message-3',
    ]);
    expect(result).toEqual(
      expect.objectContaining({ hasMore: true, nextCursor: 'message-2' }),
    );
  });

  it('returns one owned conversation without loading its complete message history', async () => {
    const {
      prisma,
      trustedSources,
      intentClassification,
      orchestration,
      conversationMemory,
    } = setup();
    prisma.aiChatConversation.findFirst.mockResolvedValue({
      ...conversation(),
      messages: [assistantMessage()],
      _count: { messages: 4, trustedSources: 2 },
    });
    const service = new AiChatConversationService(
      prisma as any,
      trustedSources as any,
      intentClassification as any,
      orchestration as any,
      conversationMemory as any,
    );

    const result = await service.getConversation('learner-1', 'conversation-1');

    expect(prisma.aiChatConversation.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'conversation-1', userId: 'learner-1', mode: 'LEARNER' },
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        id: 'conversation-1',
        lastMessage: assistantMessage(),
        messageCount: 4,
        trustedSourceCount: 2,
      }),
    );
  });

  it('does not return an AI conversation owned by another user', async () => {
    const {
      prisma,
      trustedSources,
      intentClassification,
      orchestration,
      conversationMemory,
    } = setup();
    prisma.aiChatConversation.findFirst.mockResolvedValue(null);
    const service = new AiChatConversationService(
      prisma as any,
      trustedSources as any,
      intentClassification as any,
      orchestration as any,
      conversationMemory as any,
    );

    await expect(
      service.getConversation('learner-2', 'conversation-1'),
    ).rejects.toThrow('AI conversation not found');
  });
});
