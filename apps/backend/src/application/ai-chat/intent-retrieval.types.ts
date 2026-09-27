import { LearnerIntent, LearnerQuery } from './learner-query.types';
import { LearningPathPlan } from './learning-path-plan.types';

export enum IntentEvidenceKind {
  LEARNER_CONTEXT = 'LEARNER_CONTEXT',
  COURSE_SEARCH_RESULTS = 'COURSE_SEARCH_RESULTS',
  COURSE_SUMMARY = 'COURSE_SUMMARY',
  COURSE_DETAILS = 'COURSE_DETAILS',
  POST_DETAILS = 'POST_DETAILS',
  FILE_DETAILS = 'FILE_DETAILS',
  CONTENT_CHUNKS = 'CONTENT_CHUNKS',
  DISCUSSION_THREAD = 'DISCUSSION_THREAD',
  COURSE_REVIEWS = 'COURSE_REVIEWS',
  COMMUNITY_CHUNKS = 'COMMUNITY_CHUNKS',
}

export type IntentEvidenceSource = {
  type: 'COURSE' | 'POST' | 'FILE';
  id: string;
};

export type IntentRetrievalEvidence = {
  kind: IntentEvidenceKind;
  source?: IntentEvidenceSource;
  data: unknown;
};

export type IntentRetrievalResult = {
  intent: LearnerIntent;
  query: LearnerQuery;
  evidence: IntentRetrievalEvidence[];
  warnings: string[];
  learningPathPlan?: LearningPathPlan;
};
