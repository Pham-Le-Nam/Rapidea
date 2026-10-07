import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CONVERSATION_MEMORY_OPTIONS,
  ConversationMemoryOptions,
} from '../ports/conversation-memory-options.port';
import {
  CONVERSATION_MEMORY_REPOSITORY,
  ConversationMemoryRepository,
} from '../ports/conversation-memory-repository.port';
import {
  LEARNING_ASSISTANT_RESPONSE_PORT,
  AiTextModelPurpose,
  LearningAssistantResponsePort,
} from '../ports/learning-assistant-response.port';
import {
  TOKEN_COUNTER_PORT,
  TokenCounterPort,
} from '../ports/token-counter.port';
import { CONVERSATION_SUMMARY_OUTPUT } from './conversation-summary.schema';
import {
  ConversationMemoryContext,
  ConversationMemoryMessage,
  ConversationMemoryState,
  ConversationSummaryData,
} from './conversation-memory.types';
import { RAPIDEIA_CONVERSATION_SUMMARY_PROMPT } from './prompts/conversation-summary.prompt';
import { INSTRUCTOR_MEMORY_POLICY } from '../instructor-ai/instructor-ai.prompts';

@Injectable()
export class ConversationMemoryService {
  private readonly logger = new Logger(ConversationMemoryService.name);

  constructor(
    @Inject(CONVERSATION_MEMORY_REPOSITORY)
    private readonly repository: ConversationMemoryRepository,
    @Inject(LEARNING_ASSISTANT_RESPONSE_PORT)
    private readonly learningAssistant: LearningAssistantResponsePort,
    @Inject(TOKEN_COUNTER_PORT)
    private readonly tokenCounter: TokenCounterPort,
    @Inject(CONVERSATION_MEMORY_OPTIONS)
    private readonly options: ConversationMemoryOptions,
  ) {}

  async getContextForFinalResponse(
    userId: string,
    conversationId: string,
    currentMessageId: string,
  ): Promise<ConversationMemoryContext> {
    let state = await this.repository.load(
      userId,
      conversationId,
      currentMessageId,
    );
    if (this.shouldSummarize(state.messages)) {
      try {
        const updated = await this.rollUp(userId, conversationId, state);
        if (updated) {
          state = await this.repository.load(
            userId,
            conversationId,
            currentMessageId,
          );
        }
      } catch (error) {
        this.logger.warn(
          `Conversation summary update failed for ${conversationId}: ${this.errorMessage(error)}`,
        );
      }
    }

    return this.context(state);
  }

  async refreshAfterAssistantResponse(
    userId: string,
    conversationId: string,
  ): Promise<boolean> {
    const state = await this.repository.load(userId, conversationId);
    if (!this.shouldSummarize(state.messages)) return false;
    return this.rollUp(userId, conversationId, state);
  }

  private async rollUp(
    userId: string,
    conversationId: string,
    state: ConversationMemoryState,
  ): Promise<boolean> {
    const messages = this.messagesToSummarize(state.messages);
    const lastMessage = messages.at(-1);
    if (!lastMessage) return false;

    const response = await this.learningAssistant.createResponse({
      modelPurpose: AiTextModelPurpose.PROCESSING,
      assistantMode: state.assistantMode,
      additionalPolicyLayers: [RAPIDEIA_CONVERSATION_SUMMARY_PROMPT, ...(state.assistantMode === 'INSTRUCTOR' ? [INSTRUCTOR_MEMORY_POLICY] : [])],
      input: this.summaryInput(state, messages),
      structuredOutput: CONVERSATION_SUMMARY_OUTPUT,
      maxOutputTokens: this.options.summaryMaxOutputTokens,
      failureLabel: 'AI conversation summary generation',
    });
    const summary = this.parseSummary(response);
    if (state.assistantMode === 'INSTRUCTOR') {
      // Teaching context must never become an inferred learner skill/profile.
      summary.currentLearningPath = [];
      summary.interests = [];
      summary.learningGoals = [];
      summary.learnerPreferences = [];
      summary.skills = [];
    }

    return this.repository.saveSummary({
      userId,
      conversationId,
      expectedSummarizedThroughMessageId:
        state.summary?.summarizedThroughMessageId ?? null,
      summarizedThroughMessage: {
        id: lastMessage.id,
        createdAt: lastMessage.createdAt,
      },
      sourceMessageCount:
        (state.summary?.sourceMessageCount ?? 0) + messages.length,
      summary,
    });
  }

  private shouldSummarize(
    messages: readonly ConversationMemoryMessage[],
  ): boolean {
    return (
      messages.length >= this.options.summaryTriggerMessages ||
      this.messageTokens(messages) >= this.options.summaryTriggerTokens
    );
  }

  private messagesToSummarize(
    messages: readonly ConversationMemoryMessage[],
  ): ConversationMemoryMessage[] {
    const retainedMessages = this.options.retainRecentTurns * 2;
    let end = Math.max(0, messages.length - retainedMessages);
    while (end > 0 && messages[end - 1].role !== 'ASSISTANT') end -= 1;

    if (end === 0 && messages.length > 2) {
      end = messages.length - 2;
      while (end > 0 && messages[end - 1].role !== 'ASSISTANT') end -= 1;
    }
    return messages.slice(0, end);
  }

  private context(state: ConversationMemoryState): ConversationMemoryContext {
    return {
      summary: state.summary
        ? {
            summary: state.summary.summary,
            topics: state.summary.topics,
            decisions: state.summary.decisions,
            openQuestions: state.summary.openQuestions,
            nextSteps: state.summary.nextSteps,
            salientFacts: state.summary.salientFacts,
            currentLearningPath: state.summary.currentLearningPath,
            interests: state.summary.interests,
            learningGoals: state.summary.learningGoals,
            learnerPreferences: state.summary.learnerPreferences,
            skills: state.summary.skills,
            resourceReferences: state.summary.resourceReferences,
          }
        : null,
      recentConversation: this.boundedRecentMessages(state.messages),
    };
  }

  private boundedRecentMessages(
    messages: readonly ConversationMemoryMessage[],
  ): ConversationMemoryContext['recentConversation'] {
    const selected: ConversationMemoryContext['recentConversation'] = [];
    let remaining = this.options.recentTokenBudget;

    for (let index = messages.length - 1; index >= 0; index -= 1) {
      const message = messages[index];
      const cost = this.messageTokenCount(message);
      if (cost <= remaining) {
        selected.unshift({ role: message.role, content: message.content });
        remaining -= cost;
        continue;
      }
      if (remaining > 20) {
        selected.unshift({
          role: message.role,
          content: this.tokenCounter.truncate(
            message.content,
            Math.max(remaining - 10, 1),
          ),
        });
      }
      break;
    }
    return selected;
  }

  private summaryInput(
    state: ConversationMemoryState,
    messages: readonly ConversationMemoryMessage[],
  ): string {
    return [
      '<PREVIOUS_CONVERSATION_SUMMARY>',
      JSON.stringify(state.summary ? this.context(state).summary : null),
      '</PREVIOUS_CONVERSATION_SUMMARY>',
      '<NEW_CONVERSATION_MESSAGES>',
      JSON.stringify(messages.map(({ role, content }) => ({ role, content }))),
      '</NEW_CONVERSATION_MESSAGES>',
    ].join('\n');
  }

  private parseSummary(value: string): ConversationSummaryData {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Conversation summary returned an invalid response');
    }
    const record = parsed as Record<string, unknown>;
    const summary: ConversationSummaryData = {
      summary: this.requiredString(record.summary, 'summary'),
      topics: this.stringArray(record.topics, 'topics'),
      decisions: this.stringArray(record.decisions, 'decisions'),
      openQuestions: this.stringArray(record.openQuestions, 'openQuestions'),
      nextSteps: this.stringArray(record.nextSteps, 'nextSteps'),
      salientFacts: this.objectArray(record.salientFacts, 'salientFacts').map(
        (item) => ({
          fact: this.requiredString(item.fact, 'salientFacts.fact'),
          attribution: this.enumValue(
            item.attribution,
            ['LEARNER', 'ASSISTANT', 'MIXED'] as const,
            'salientFacts.attribution',
          ),
        }),
      ),
      currentLearningPath: this.stringArray(
        record.currentLearningPath,
        'currentLearningPath',
      ),
      interests: this.stringArray(record.interests, 'interests'),
      learningGoals: this.stringArray(record.learningGoals, 'learningGoals'),
      learnerPreferences: this.stringArray(
        record.learnerPreferences,
        'learnerPreferences',
      ),
      skills: this.objectArray(record.skills, 'skills').map((item) => ({
        name: this.requiredString(item.name, 'skills.name'),
        status: this.enumValue(
          item.status,
          ['EXPLICIT', 'ASSUMED', 'DEMONSTRATED'] as const,
          'skills.status',
        ),
        context: this.requiredString(item.context, 'skills.context'),
      })),
      resourceReferences: this.objectArray(
        record.resourceReferences,
        'resourceReferences',
      ).map((item) => ({
        type: this.enumValue(
          item.type,
          ['COURSE', 'POST', 'FILE'] as const,
          'resourceReferences.type',
        ),
        name: this.requiredString(item.name, 'resourceReferences.name'),
      })),
    };
    return summary;
  }

  private messageTokens(
    messages: readonly ConversationMemoryMessage[],
  ): number {
    return messages.reduce(
      (total, message) => total + this.messageTokenCount(message),
      0,
    );
  }

  private messageTokenCount(message: ConversationMemoryMessage): number {
    return (
      message.tokenCount ??
      this.tokenCounter.count(`${message.role}\n${message.content}`)
    );
  }

  private requiredString(value: unknown, field: string): string {
    if (typeof value !== 'string' || !value.trim()) {
      throw new Error(`Conversation summary field ${field} is invalid`);
    }
    return value.trim();
  }

  private stringArray(value: unknown, field: string): string[] {
    if (
      !Array.isArray(value) ||
      value.some((item) => typeof item !== 'string')
    ) {
      throw new Error(`Conversation summary field ${field} is invalid`);
    }
    return [...new Set(value.map((item) => item.trim()).filter(Boolean))];
  }

  private objectArray(
    value: unknown,
    field: string,
  ): Array<Record<string, unknown>> {
    if (
      !Array.isArray(value) ||
      value.some(
        (item) => !item || typeof item !== 'object' || Array.isArray(item),
      )
    ) {
      throw new Error(`Conversation summary field ${field} is invalid`);
    }
    return value as Array<Record<string, unknown>>;
  }

  private enumValue<T extends string>(
    value: unknown,
    allowed: readonly T[],
    field: string,
  ): T {
    if (typeof value !== 'string' || !allowed.includes(value as T)) {
      throw new Error(`Conversation summary field ${field} is invalid`);
    }
    return value as T;
  }

  private errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'unknown error';
  }
}
