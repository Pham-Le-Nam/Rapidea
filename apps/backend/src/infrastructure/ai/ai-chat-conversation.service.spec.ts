import { AiChatMessageRole } from '../../../generated/prisma/enums';
import { LearnerIntent, LearnerQuery } from '../../application/ai-chat/learner-query.types';
import { AiChatConversationService } from './ai-chat-conversation.service';

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
        role: AiChatMessageRole.USER,
        content: 'Explain this post',
        model: null,
        tokenCount: null,
        citations: null,
        metadata,
        createdAt,
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
        aiChatMessage: { create: jest.fn().mockResolvedValue(message()) },
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
    return { transaction, prisma, trustedSources, intentClassification };
}

describe('AiChatConversationService', () => {
    it('creates a conversation only when the first message is sent', async () => {
        const { transaction, prisma, trustedSources, intentClassification } = setup();
        const service = new AiChatConversationService(
            prisma as any,
            trustedSources as any,
            intentClassification as any,
        );

        const result = await service.sendMessage('learner-1', {
            clientRequestId: 'request-1',
            content: 'Explain this post',
            trustedSourcesToAdd: [{ sourceType: 'POST' as any, sourceId: 'post-1' }],
        });

        expect(result.conversationCreated).toBe(true);
        expect(result.assistantMessage).toBeNull();
        expect(result.learnerQuery).toEqual(learnerQuery);
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
    });

    it('returns an idempotent replay without creating another conversation', async () => {
        const { transaction, prisma, trustedSources, intentClassification } = setup();
        prisma.aiChatMessage.findUnique.mockResolvedValue({
            ...message('message-1', { learnerQuery }),
            conversation: { ...conversation(), userId: 'learner-1' },
        });
        const service = new AiChatConversationService(
            prisma as any,
            trustedSources as any,
            intentClassification as any,
        );

        const result = await service.sendMessage('learner-1', {
            clientRequestId: 'request-1',
            content: 'Explain this post',
        });

        expect(result.idempotentReplay).toBe(true);
        expect(transaction.aiChatConversation.create).not.toHaveBeenCalled();
        expect(trustedSources.validateSources).not.toHaveBeenCalled();
        expect(intentClassification.classify).not.toHaveBeenCalled();
    });

    it('returns the latest message page in chronological display order', async () => {
        const { prisma, trustedSources, intentClassification } = setup();
        prisma.aiChatConversation.findFirst.mockResolvedValue({ id: 'conversation-1' });
        prisma.aiChatMessage.findMany.mockResolvedValue([
            { ...message('message-3'), createdAt: new Date('2026-09-21T03:00:00Z') },
            { ...message('message-2'), createdAt: new Date('2026-09-21T02:00:00Z') },
            { ...message('message-1'), createdAt: new Date('2026-09-21T01:00:00Z') },
        ]);
        const service = new AiChatConversationService(
            prisma as any,
            trustedSources as any,
            intentClassification as any,
        );

        const result = await service.listMessages(
            'learner-1',
            'conversation-1',
            2,
        );

        expect(result.messages.map((item) => item.id)).toEqual([
            'message-2',
            'message-3',
        ]);
        expect(result).toEqual(
            expect.objectContaining({ hasMore: true, nextCursor: 'message-2' }),
        );
    });
});
