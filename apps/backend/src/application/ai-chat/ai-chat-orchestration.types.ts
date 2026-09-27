import { LearnerQuery } from './learner-query.types';
import { EvidenceCitationTarget } from './rapideia-evidence.types';

export type AiChatOrchestrationInput = {
  userId: string;
  conversationId: string;
  currentMessageId: string;
  learnerMessage: string;
  learnerQuery: LearnerQuery;
};

export type AiChatOrchestrationResult = {
  content: string;
  answer: string;
  followUpQuestion: string;
  citations: EvidenceCitationTarget[];
  citedReferences: string[];
  retrievalWarnings: string[];
  evidenceTokenCount: number;
  assistantTokenCount: number;
};
