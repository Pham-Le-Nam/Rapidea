import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { createHash, randomUUID } from 'crypto';
import { Prisma } from '../../../generated/prisma/client';
import { AiChatMessageRole } from '../../../generated/prisma/enums';
import { AiChatOrchestrationService } from '../../application/ai-chat/ai-chat-orchestration.service';
import { AiChatTrustedSourceInput } from '../../application/ai-chat/ai-chat-trusted-source.types';
import { ConversationMemoryService } from '../../application/ai-chat/conversation-memory.service';
import { parseLearnerQuery } from '../../application/ai-chat/learner-query.parser';
import { LearnerQuery } from '../../application/ai-chat/learner-query.types';
import { PrismaService } from '../database/prisma/prisma.service';
import { AiModelEnvironmentVariable } from './ai-model-config';
import { AiChatTrustedSourceService } from './ai-chat-trusted-source.service';
import { IntentClassificationService } from './intent-classification.service';
import { AiAssistantMode } from '../../application/ai-chat/ai-assistant-mode';
import { InstructorAssistantService } from '../../application/instructor-ai/instructor-assistant.service';

type SendMessageInput = {
  mode?: AiAssistantMode;
  clientRequestId: string;
  conversationId?: string;
  content: string;
  trustedSourcesToAdd?: readonly AiChatTrustedSourceInput[];
};

const messageSelect = {
  id: true,
  responseToMessageId: true,
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
  private readonly logger = new Logger(AiChatConversationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly trustedSources: AiChatTrustedSourceService,
    private readonly intentClassification: IntentClassificationService,
    private readonly orchestration: AiChatOrchestrationService,
    private readonly conversationMemory: ConversationMemoryService,
    @Optional() private readonly instructor?: InstructorAssistantService,
  ) {}

  async sendMessage(userId: string, input: SendMessageInput, mode: AiAssistantMode = AiAssistantMode.LEARNER) {
    input = { ...input, mode };
    const replay = await this.findReplay(userId, input.clientRequestId, mode);
    if (replay) {
      if (input.conversationId && input.conversationId !== replay.conversation.id) throw new ConflictException('clientRequestId belongs to a different conversation');
      this.assertReplayMatches(input, replay.userMessage);
      return this.completeMessage(userId, input, replay);
    }

    const sourceData = await this.trustedSources.validateSources(
      userId,
      input.trustedSourcesToAdd ?? [],
      mode,
    );

    let result: Awaited<ReturnType<typeof this.createUserMessage>>;
    try {
      result = await this.createUserMessage(userId, input, sourceData);
    } catch (error) {
      if ((error as { code?: string })?.code !== 'P2002') throw error;
      const concurrentReplay = await this.findReplay(
        userId,
        input.clientRequestId,
        mode,
      );
      if (concurrentReplay) {
        if (input.conversationId && input.conversationId !== concurrentReplay.conversation.id) throw new ConflictException('clientRequestId belongs to a different conversation');
        this.assertReplayMatches(input, concurrentReplay.userMessage);
        return this.completeMessage(userId, input, concurrentReplay);
      }
      throw error;
    }

    const response = await this.responseWithSources(userId, result, false);
    return this.completeMessage(userId, input, response);
  }

  private async createUserMessage(
    userId: string,
    input: SendMessageInput,
    sourceData: Awaited<
      ReturnType<AiChatTrustedSourceService['validateSources']>
    >,
  ) {
    return this.prisma.$transaction(async (transaction) => {
      const conversation = input.conversationId
        ? await transaction.aiChatConversation.findFirst({
            where: { id: input.conversationId, userId, mode: input.mode },
            select: {
              id: true,
              mode: true,
              title: true,
              lastMessageAt: true,
              createdAt: true,
              updatedAt: true,
            },
          })
        : await transaction.aiChatConversation.create({
            data: {
              userId,
              mode: input.mode,
              title: this.initialTitle(input.content),
            },
            select: {
              id: true,
              mode: true,
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
          metadata: { requestSignature: this.requestSignature(input) },
        },
        select: messageSelect,
      });
      const updatedConversation = await transaction.aiChatConversation.update({
        where: { id: conversation.id },
        data: { lastMessageAt: userMessage.createdAt },
        select: {
          id: true,
          mode: true,
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
  }

  async listConversations(userId: string, limit: number, before?: string, mode: AiAssistantMode = AiAssistantMode.LEARNER) {
    if (before) await this.assertConversationOwner(userId, before, mode);

    const conversations = await this.prisma.aiChatConversation.findMany({
      where: { userId, mode },
      ...(before ? { cursor: { id: before }, skip: 1 } : {}),
      take: limit + 1,
      orderBy: [{ lastMessageAt: 'desc' }, { id: 'desc' }],
      select: {
        id: true,
        mode: true,
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
      mode: conversation.mode,
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
      nextCursor: hasMore ? (page.at(-1)?.id ?? null) : null,
    };
  }

  async getConversation(userId: string, conversationId: string, mode: AiAssistantMode = AiAssistantMode.LEARNER) {
    const conversation = await this.prisma.aiChatConversation.findFirst({
      where: { id: conversationId, userId, mode },
      select: {
        id: true,
        mode: true,
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
    if (!conversation) throw new NotFoundException('AI conversation not found');

    return {
      id: conversation.id,
      mode: conversation.mode,
      title: conversation.title,
      lastMessageAt: conversation.lastMessageAt,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
      lastMessage: conversation.messages[0] ?? null,
      messageCount: conversation._count.messages,
      trustedSourceCount: conversation._count.trustedSources,
    };
  }

  async listMessages(
    userId: string,
    conversationId: string,
    limit: number,
    before?: string,
    mode: AiAssistantMode = AiAssistantMode.LEARNER,
  ) {
    await this.assertConversationOwner(userId, conversationId, mode);
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
      nextCursor: hasMore ? (descendingPage.at(-1)?.id ?? null) : null,
    };
  }

  private async findReplay(userId: string, clientRequestId: string, mode: AiAssistantMode) {
    const existing = await this.prisma.aiChatMessage.findUnique({
      where: { clientRequestId },
      select: {
        ...messageSelect,
        conversation: {
          select: {
            id: true,
            mode: true,
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
    if (existing.conversation.userId !== userId || (existing.conversation.mode ?? AiAssistantMode.LEARNER) !== mode) {
      throw new ConflictException('clientRequestId has already been used');
    }

    const { conversation, ...userMessage } = existing;
    return this.responseWithSources(
      userId,
      {
        conversation: {
          id: conversation.id,
          mode: conversation.mode,
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
        mode?: 'LEARNER' | 'INSTRUCTOR';
        title: string | null;
        lastMessageAt: Date;
        createdAt: Date;
        updatedAt: Date;
      };
      conversationCreated: boolean;
      userMessage: {
        id: string;
        responseToMessageId: string | null;
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
    const assistantMessage = await this.prisma.aiChatMessage.findUnique({
      where: { responseToMessageId: result.userMessage.id },
      select: messageSelect,
    });
    return {
      ...result,
      idempotentReplay,
      trustedSources: await this.trustedSources.list(
        userId,
        result.conversation.id,
        (result.conversation.mode ?? AiAssistantMode.LEARNER) as AiAssistantMode,
      ),
      assistantMessage,
    };
  }

  private async completeMessage<
    T extends {
      conversation: {
        id: string;
        lastMessageAt: Date;
        updatedAt: Date;
      };
      userMessage: {
        id: string;
        content: string;
        metadata: unknown;
      };
      assistantMessage: unknown;
    },
  >(userId: string, input: SendMessageInput, response: T) {
    if (input.mode === AiAssistantMode.INSTRUCTOR) {
      if (response.assistantMessage) return response;
      if (!this.instructor) throw new Error('Instructor assistant is not configured');
      const sources = await this.trustedSources.getLearnerQueryContext(userId, response.conversation.id, input.trustedSourcesToAdd ?? [], AiAssistantMode.INSTRUCTOR);
      const generated = await this.instructor.respond({ userId, conversationId: response.conversation.id, currentMessageId: response.userMessage.id, message: response.userMessage.content, sources });
      const assistantMessage = await this.persistAssistantMessage(response.conversation.id, response.userMessage.id, generated.query, generated);
      void this.refreshConversationMemory(userId, response.conversation.id);
      return { ...response, assistantMessage, instructorQuery: generated.query, conversation: { ...response.conversation, lastMessageAt: assistantMessage.createdAt } };
    }
    let learnerQuery = this.storedLearnerQuery(response.userMessage.metadata);
    let userMessage = response.userMessage;
    if (!learnerQuery) {
      learnerQuery = await this.intentClassification.classify(
        userId,
        response.conversation.id,
        response.userMessage.content,
        input.trustedSourcesToAdd ?? [],
      );
      const existingMetadata =
        response.userMessage.metadata &&
        typeof response.userMessage.metadata === 'object' &&
        !Array.isArray(response.userMessage.metadata)
          ? response.userMessage.metadata
          : {};
      const metadata = {
        ...existingMetadata,
        learnerQuery: learnerQuery as unknown as Prisma.InputJsonObject,
      } as Prisma.InputJsonObject;
      await this.prisma.aiChatMessage.update({
        where: { id: response.userMessage.id },
        data: { metadata },
      });
      userMessage = { ...response.userMessage, metadata };
    }

    if (response.assistantMessage) {
      return { ...response, userMessage, learnerQuery };
    }

    const generated = await this.orchestration.respond({
      userId,
      conversationId: response.conversation.id,
      currentMessageId: response.userMessage.id,
      learnerMessage: response.userMessage.content,
      learnerQuery,
    });
    const assistantMessage = await this.persistAssistantMessage(
      response.conversation.id,
      response.userMessage.id,
      learnerQuery,
      generated,
    );
    void this.refreshConversationMemory(userId, response.conversation.id);

    return {
      ...response,
      conversation: {
        ...response.conversation,
        lastMessageAt: assistantMessage.createdAt,
      },
      userMessage,
      assistantMessage,
      learnerQuery,
    };
  }

  private async persistAssistantMessage(
    conversationId: string,
    responseToMessageId: string,
    learnerQuery: { intent: string },
    generated: Awaited<ReturnType<AiChatOrchestrationService['respond']>> | Awaited<ReturnType<InstructorAssistantService['respond']>>,
  ) {
    try {
      return await this.prisma.$transaction(async (transaction) => {
        const assistantMessage = await transaction.aiChatMessage.create({
          data: {
            conversationId,
            responseToMessageId,
            role: AiChatMessageRole.ASSISTANT,
            content: generated.content,
            model: this.configuredResponseModel(),
            tokenCount: generated.assistantTokenCount,
            citations: generated.citations as unknown as Prisma.InputJsonValue,
            metadata: {
              intent: learnerQuery.intent,
              answer: generated.answer,
              followUpQuestion: generated.followUpQuestion,
              citedReferences: generated.citedReferences,
              retrievalWarnings: generated.retrievalWarnings,
              evidenceTokenCount: generated.evidenceTokenCount,
              ...('proposal' in generated ? { proposal: generated.proposal as unknown as Prisma.InputJsonValue, instructorQuery: generated.query as unknown as Prisma.InputJsonValue } : {}),
            } satisfies Prisma.InputJsonObject,
          },
          select: messageSelect,
        });
        await transaction.aiChatConversation.update({
          where: { id: conversationId },
          data: { lastMessageAt: assistantMessage.createdAt },
        });
        return assistantMessage;
      });
    } catch (error) {
      if ((error as { code?: string })?.code !== 'P2002') throw error;
      const existing = await this.prisma.aiChatMessage.findUnique({
        where: { responseToMessageId },
        select: messageSelect,
      });
      if (existing) return existing;
      throw error;
    }
  }

  private async refreshConversationMemory(
    userId: string,
    conversationId: string,
  ): Promise<void> {
    try {
      await this.conversationMemory.refreshAfterAssistantResponse(
        userId,
        conversationId,
      );
    } catch (error) {
      this.logger.warn(
        `Conversation memory refresh failed for ${conversationId}: ${this.errorMessage(error)}`,
      );
    }
  }

  private configuredResponseModel(): string | null {
    return process.env[AiModelEnvironmentVariable.RESPONSE]?.trim() || null;
  }

  private errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'unknown error';
  }

  private storedLearnerQuery(metadata: unknown): LearnerQuery | null {
    if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
      return null;
    }
    try {
      return parseLearnerQuery(
        (metadata as Record<string, unknown>).learnerQuery,
      );
    } catch {
      return null;
    }
  }

  private async assertConversationOwner(userId: string, id: string, mode: AiAssistantMode = AiAssistantMode.LEARNER) {
    const conversation = await this.prisma.aiChatConversation.findFirst({
      where: { id, userId, mode },
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

  private requestSignature(input: SendMessageInput) {
    return createHash('sha256').update(JSON.stringify({ mode: input.mode, content: input.content,
      sources: [...new Set((input.trustedSourcesToAdd ?? []).map(s => `${s.sourceType}:${s.sourceId}`))].sort() })).digest('hex');
  }
  private assertReplayMatches(input: SendMessageInput, message: { content: string; metadata: unknown }) {
    const metadata = message.metadata as { requestSignature?: string } | null;
    if (message.content !== input.content || (metadata?.requestSignature && metadata.requestSignature !== this.requestSignature(input))) {
      throw new ConflictException('clientRequestId belongs to a different message or source selection');
    }
  }
}
