import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import {
  ConversationMemoryState,
  ConversationSummaryData,
  SaveConversationSummaryInput,
  StoredConversationSummary,
} from '../../application/ai-chat/conversation-memory.types';
import { ConversationMemoryRepository } from '../../application/ports/conversation-memory-repository.port';
import { PrismaService } from '../database/prisma/prisma.service';

const summarySelect = {
  summary: true,
  topics: true,
  decisions: true,
  openQuestions: true,
  nextSteps: true,
  salientFacts: true,
  currentLearningPath: true,
  interests: true,
  learningGoals: true,
  learnerPreferences: true,
  skills: true,
  resourceReferences: true,
  summarizedThroughAt: true,
  summarizedThroughMessageId: true,
  sourceMessageCount: true,
  summaryVersion: true,
  generatedAt: true,
  updatedAt: true,
} as const;

type SummaryRecord = Prisma.AiChatConversationSummaryGetPayload<{
  select: typeof summarySelect;
}>;

@Injectable()
export class PrismaConversationMemoryRepository implements ConversationMemoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async load(
    userId: string,
    conversationId: string,
    beforeMessageId?: string,
  ): Promise<ConversationMemoryState> {
    const conversation = await this.prisma.aiChatConversation.findFirst({
      where: { id: conversationId, userId },
      select: { id: true, mode: true, summary: { select: summarySelect } },
    });
    if (!conversation) throw new NotFoundException('AI conversation not found');

    const boundary = beforeMessageId
      ? await this.prisma.aiChatMessage.findFirst({
          where: { id: beforeMessageId, conversationId },
          select: { id: true, createdAt: true },
        })
      : null;
    if (beforeMessageId && !boundary) {
      throw new NotFoundException('AI conversation message not found');
    }

    const summary = conversation.summary;
    const messages = await this.prisma.aiChatMessage.findMany({
      where: {
        conversationId,
        ...(boundary
          ? {
              OR: [
                { createdAt: { lt: boundary.createdAt } },
                {
                  createdAt: boundary.createdAt,
                  id: { lt: boundary.id },
                },
              ],
            }
          : {}),
        ...(!summary?.summarizedThroughMessageId && summary?.summarizedThroughAt
          ? { createdAt: { gt: summary.summarizedThroughAt } }
          : {}),
      },
      ...(summary?.summarizedThroughMessageId
        ? {
            cursor: { id: summary.summarizedThroughMessageId },
            skip: 1,
          }
        : {}),
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
      select: {
        id: true,
        role: true,
        content: true,
        tokenCount: true,
        createdAt: true,
      },
    });

    return {
      assistantMode: conversation.mode,
      summary: summary ? this.toStoredSummary(summary) : null,
      messages,
    };
  }

  async saveSummary(input: SaveConversationSummaryInput): Promise<boolean> {
    const conversation = await this.prisma.aiChatConversation.findFirst({
      where: { id: input.conversationId, userId: input.userId },
      select: { id: true },
    });
    if (!conversation) throw new NotFoundException('AI conversation not found');

    const data = this.summaryData(input);
    const existing = await this.prisma.aiChatConversationSummary.findUnique({
      where: { conversationId: input.conversationId },
      select: { summarizedThroughMessageId: true },
    });
    if (
      (existing?.summarizedThroughMessageId ?? null) !==
      input.expectedSummarizedThroughMessageId
    ) {
      return false;
    }

    if (existing) {
      const updated = await this.prisma.aiChatConversationSummary.updateMany({
        where: {
          conversationId: input.conversationId,
          summarizedThroughMessageId: input.expectedSummarizedThroughMessageId,
        },
        data,
      });
      return updated.count === 1;
    }

    try {
      await this.prisma.aiChatConversationSummary.create({
        data: { conversationId: input.conversationId, ...data },
      });
      return true;
    } catch (error) {
      if ((error as { code?: string })?.code === 'P2002') return false;
      throw error;
    }
  }

  private summaryData(input: SaveConversationSummaryInput) {
    return {
      summary: input.summary.summary,
      topics: input.summary.topics,
      decisions: input.summary.decisions,
      openQuestions: input.summary.openQuestions,
      nextSteps: input.summary.nextSteps,
      salientFacts: input.summary.salientFacts,
      currentLearningPath: input.summary.currentLearningPath,
      interests: input.summary.interests,
      learningGoals: input.summary.learningGoals,
      learnerPreferences: input.summary.learnerPreferences,
      skills: input.summary.skills,
      resourceReferences: input.summary.resourceReferences,
      summarizedThroughAt: input.summarizedThroughMessage.createdAt,
      summarizedThroughMessageId: input.summarizedThroughMessage.id,
      sourceMessageCount: input.sourceMessageCount,
      summaryVersion: 1,
      generatedAt: new Date(),
    } satisfies Prisma.AiChatConversationSummaryUncheckedUpdateInput;
  }

  private toStoredSummary(record: SummaryRecord): StoredConversationSummary {
    return {
      summary: record.summary,
      topics: this.json<ConversationSummaryData['topics']>(record.topics, []),
      decisions: this.json<ConversationSummaryData['decisions']>(
        record.decisions,
        [],
      ),
      openQuestions: this.json<ConversationSummaryData['openQuestions']>(
        record.openQuestions,
        [],
      ),
      nextSteps: this.json<ConversationSummaryData['nextSteps']>(
        record.nextSteps,
        [],
      ),
      salientFacts: this.json<ConversationSummaryData['salientFacts']>(
        record.salientFacts,
        [],
      ),
      currentLearningPath: this.json<
        ConversationSummaryData['currentLearningPath']
      >(record.currentLearningPath, []),
      interests: this.json<ConversationSummaryData['interests']>(
        record.interests,
        [],
      ),
      learningGoals: this.json<ConversationSummaryData['learningGoals']>(
        record.learningGoals,
        [],
      ),
      learnerPreferences: this.json<
        ConversationSummaryData['learnerPreferences']
      >(record.learnerPreferences, []),
      skills: this.json<ConversationSummaryData['skills']>(record.skills, []),
      resourceReferences: this.json<
        ConversationSummaryData['resourceReferences']
      >(record.resourceReferences, []),
      summarizedThroughAt: record.summarizedThroughAt,
      summarizedThroughMessageId: record.summarizedThroughMessageId,
      sourceMessageCount: record.sourceMessageCount,
      summaryVersion: record.summaryVersion,
      generatedAt: record.generatedAt,
      updatedAt: record.updatedAt,
    };
  }

  private json<T>(value: unknown, fallback: T): T {
    return value === null || value === undefined ? fallback : (value as T);
  }
}
