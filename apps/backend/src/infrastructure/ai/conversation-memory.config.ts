import { InternalServerErrorException } from '@nestjs/common';
import { ConversationMemoryOptions } from '../../application/ai-chat/conversation-memory.types';

export enum ConversationMemoryEnvironmentVariable {
  SUMMARY_TRIGGER_TOKENS = 'AI_CONVERSATION_SUMMARY_TRIGGER_TOKENS',
  SUMMARY_TRIGGER_MESSAGES = 'AI_CONVERSATION_SUMMARY_TRIGGER_MESSAGES',
  RECENT_TOKEN_BUDGET = 'AI_CONVERSATION_RECENT_TOKEN_BUDGET',
  RETAIN_RECENT_TURNS = 'AI_CONVERSATION_RETAIN_RECENT_TURNS',
  SUMMARY_MAX_OUTPUT_TOKENS = 'AI_CONVERSATION_SUMMARY_MAX_OUTPUT_TOKENS',
}

const DEFAULTS: ConversationMemoryOptions = {
  summaryTriggerTokens: 6_000,
  summaryTriggerMessages: 24,
  recentTokenBudget: 6_000,
  retainRecentTurns: 3,
  summaryMaxOutputTokens: 1_500,
};

export function conversationMemoryOptions(): ConversationMemoryOptions {
  return {
    summaryTriggerTokens: positiveInteger(
      ConversationMemoryEnvironmentVariable.SUMMARY_TRIGGER_TOKENS,
      DEFAULTS.summaryTriggerTokens,
    ),
    summaryTriggerMessages: positiveInteger(
      ConversationMemoryEnvironmentVariable.SUMMARY_TRIGGER_MESSAGES,
      DEFAULTS.summaryTriggerMessages,
    ),
    recentTokenBudget: positiveInteger(
      ConversationMemoryEnvironmentVariable.RECENT_TOKEN_BUDGET,
      DEFAULTS.recentTokenBudget,
    ),
    retainRecentTurns: positiveInteger(
      ConversationMemoryEnvironmentVariable.RETAIN_RECENT_TURNS,
      DEFAULTS.retainRecentTurns,
    ),
    summaryMaxOutputTokens: positiveInteger(
      ConversationMemoryEnvironmentVariable.SUMMARY_MAX_OUTPUT_TOKENS,
      DEFAULTS.summaryMaxOutputTokens,
    ),
  };
}

function positiveInteger(
  name: ConversationMemoryEnvironmentVariable,
  fallback: number,
): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new InternalServerErrorException(
      `${name} must be configured as a positive integer`,
    );
  }
  return value;
}
