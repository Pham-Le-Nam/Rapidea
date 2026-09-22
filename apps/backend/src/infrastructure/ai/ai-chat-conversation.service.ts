import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AiChatMessageRole } from '../../../generated/prisma/enums';
import { AiChatTrustedSourceInput } from '../../application/ai-chat/ai-chat-trusted-source.types';
import { PrismaService } from '../database/prisma/prisma.service';
import { AiChatTrustedSourceService } from './ai-chat-trusted-source.service';

type SendMessageInput = {
    clientRequestId: string;
    conversationId?: string;
    content: string;
    trustedSourcesToAdd?: readonly AiChatTrustedSourceInput[];
};

const messageSelect = {
    id: true,
    role: true,
    content: true,
    model: true,
    tokenCount: true,
    citations: true,
    metadata: true,
    createdAt: true,
} as const;

@Injectable()
export class AiChatConversationService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly trustedSources: AiChatTrustedSourceService,
    ) {}

    async sendMessage(userId: string, input: SendMessageInput) {
        const replay = await this.findReplay(userId, input.clientRequestId);
        if (replay) return replay;

        const sourceData = await this.trustedSources.validateSources(
            userId,
            input.trustedSourcesToAdd ?? [],
        );

        try {
            const result = await this.prisma.$transaction(async (transaction) => {
                const conversation = input.conversationId
                    ? await transaction.aiChatConversation.findFirst({
                          where: { id: input.conversationId, userId },
                          select: {
                              id: true,
                              title: true,
                              lastMessageAt: true,
                              createdAt: true,
                              updatedAt: true,
                          },
                      })
                    : await transaction.aiChatConversation.create({
                          data: {
                              userId,
                              title: this.initialTitle(input.content),
                          },
                          select: {
                              id: true,
                              title: true,
                              lastMessageAt: true,
                              createdAt: true,
                              updatedAt: true,
                          },
                      });

                if (!conversation) {
                    throw new NotFoundException('AI conversation not found');
                }

                if (sourceData.length > 0) {
                    await transaction.aiChatTrustedSource.createMany({
                        data: sourceData.map((source) => ({
                            id: randomUUID(),
                            conversationId: conversation.id,
                            ...source,
                        })),
                        skipDuplicates: true,
                    });
                }

                const userMessage = await transaction.aiChatMessage.create({
                    data: {
                        conversationId: conversation.id,
                        clientRequestId: input.clientRequestId,
                        role: AiChatMessageRole.USER,
                        content: input.content,
                    },
                    select: messageSelect,
                });
                const updatedConversation =
                    await transaction.aiChatConversation.update({
                        where: { id: conversation.id },
                        data: { lastMessageAt: userMessage.createdAt },
                        select: {
                            id: true,
                            title: true,
                            lastMessageAt: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    });

                return {
                    conversation: updatedConversation,
                    conversationCreated: !input.conversationId,
                    userMessage,
                };
            });

            return this.responseWithSources(userId, result, false);
        } catch (error) {
            if ((error as { code?: string })?.code !== 'P2002') throw error;
            const concurrentReplay = await this.findReplay(
                userId,
                input.clientRequestId,
            );
            if (concurrentReplay) return concurrentReplay;
            throw error;
        }
    }

    async listConversations(userId: string, limit: number, before?: string) {
        if (before) await this.assertConversationOwner(userId, before);

        const conversations = await this.prisma.aiChatConversation.findMany({
            where: { userId },
            ...(before ? { cursor: { id: before }, skip: 1 } : {}),
            take: limit + 1,
            orderBy: [{ lastMessageAt: 'desc' }, { id: 'desc' }],
            select: {
                id: true,
                title: true,
                lastMessageAt: true,
                createdAt: true,
                updatedAt: true,
                messages: {
                    take: 1,
                    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
                    select: messageSelect,
                },
                _count: { select: { messages: true, trustedSources: true } },
            },
        });
        const hasMore = conversations.length > limit;
        const page = conversations.slice(0, limit).map((conversation) => ({
            id: conversation.id,
            title: conversation.title,
            lastMessageAt: conversation.lastMessageAt,
            createdAt: conversation.createdAt,
            updatedAt: conversation.updatedAt,
            lastMessage: conversation.messages[0] ?? null,
            messageCount: conversation._count.messages,
            trustedSourceCount: conversation._count.trustedSources,
        }));

        return {
            conversations: page,
            hasMore,
            nextCursor: hasMore ? page.at(-1)?.id ?? null : null,
        };
    }

    async listMessages(
        userId: string,
        conversationId: string,
        limit: number,
        before?: string,
    ) {
        await this.assertConversationOwner(userId, conversationId);
        if (before) {
            const cursor = await this.prisma.aiChatMessage.findFirst({
                where: { id: before, conversationId },
                select: { id: true },
            });
            if (!cursor) throw new NotFoundException('AI message cursor not found');
        }

        const messages = await this.prisma.aiChatMessage.findMany({
            where: { conversationId },
            ...(before ? { cursor: { id: before }, skip: 1 } : {}),
            take: limit + 1,
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            select: messageSelect,
        });
        const hasMore = messages.length > limit;
        const descendingPage = messages.slice(0, limit);

        return {
            conversationId,
            messages: [...descendingPage].reverse(),
            hasMore,
            nextCursor: hasMore
                ? descendingPage.at(-1)?.id ?? null
                : null,
        };
    }

    private async findReplay(userId: string, clientRequestId: string) {
        const existing = await this.prisma.aiChatMessage.findUnique({
            where: { clientRequestId },
            select: {
                ...messageSelect,
                conversation: {
                    select: {
                        id: true,
                        userId: true,
                        title: true,
                        lastMessageAt: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (!existing) return null;
        if (existing.conversation.userId !== userId) {
            throw new ConflictException('clientRequestId has already been used');
        }

        const { conversation, ...userMessage } = existing;
        return this.responseWithSources(
            userId,
            {
                conversation: {
                    id: conversation.id,
                    title: conversation.title,
                    lastMessageAt: conversation.lastMessageAt,
                    createdAt: conversation.createdAt,
                    updatedAt: conversation.updatedAt,
                },
                conversationCreated: false,
                userMessage,
            },
            true,
        );
    }

    private async responseWithSources(
        userId: string,
        result: {
            conversation: {
                id: string;
                title: string | null;
                lastMessageAt: Date;
                createdAt: Date;
                updatedAt: Date;
            };
            conversationCreated: boolean;
            userMessage: {
                id: string;
                role: AiChatMessageRole;
                content: string;
                model: string | null;
                tokenCount: number | null;
                citations: unknown;
                metadata: unknown;
                createdAt: Date;
            };
        },
        idempotentReplay: boolean,
    ) {
        return {
            ...result,
            idempotentReplay,
            trustedSources: await this.trustedSources.list(
                userId,
                result.conversation.id,
            ),
            assistantMessage: null,
        };
    }

    private async assertConversationOwner(userId: string, id: string) {
        const conversation = await this.prisma.aiChatConversation.findFirst({
            where: { id, userId },
            select: { id: true },
        });
        if (!conversation) throw new NotFoundException('AI conversation not found');
    }

    private initialTitle(content: string): string {
        const normalized = content.replace(/\s+/g, ' ').trim();
        return normalized.length <= 80
            ? normalized
            : `${normalized.slice(0, 77)}...`;
    }
}
