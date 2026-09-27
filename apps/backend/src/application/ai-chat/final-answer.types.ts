import {
  EvidenceCitationTarget,
  RapideiaEvidenceBuildResult,
} from './rapideia-evidence.types';
export type FinalAnswerGenerationInput = {
  userId: string;
  conversationId: string;
  currentMessageId: string;
  learnerMessage: string;
  evidence: RapideiaEvidenceBuildResult;
};

export type FinalAnswerGenerationResult = {
  content: string;
  answer: string;
  followUpQuestion: string;
  citedReferences: string[];
  citations: EvidenceCitationTarget[];
};
