import {
  LearnerQueryConstraints,
  LearnerQueryDifficulty,
  LearnerResourceType,
  LearnerIntent,
  LearnerLevel,
} from './learner-query.types';
import { LearningPathPlan } from './learning-path-plan.types';

export enum EvidenceAuthority {
  COURSE_OFFICIAL = 'COURSE_OFFICIAL',
  RESOURCE_SPECIFIC = 'RESOURCE_SPECIFIC',
  COMMUNITY = 'COMMUNITY',
  LEARNER_CONTEXT = 'LEARNER_CONTEXT',
}

export type EvidenceResourceType =
  | LearnerResourceType
  | 'DISCUSSION'
  | 'REVIEW'
  | 'LEARNER';

export type RapideiaEvidenceItem = {
  reference: string;
  kind: string;
  authority: EvidenceAuthority;
  source: {
    type: EvidenceResourceType;
    label: string | null;
  };
  data: unknown;
};

export type RapideiaEvidencePackage = {
  schemaVersion: 1;
  intent: LearnerIntent;
  learnerRequest: {
    targets: Array<{ type: LearnerResourceType; name: string | null }>;
    desiredSkills: string[];
    existingSkills: string[];
    desiredOutcomes: string[];
    difficulty: LearnerQueryDifficulty | null;
    constraints: LearnerQueryConstraints;
    searchQuery: string | null;
    explanationLevel: LearnerLevel | null;
    includeDiscussions: boolean;
  };
  learningPathPlan?: LearningPathPlan;
  items: RapideiaEvidenceItem[];
  warnings: string[];
  truncation: {
    truncated: boolean;
    omittedItems: number;
  };
};

export type EvidenceCitationTarget = {
  reference: string;
  source: {
    type: EvidenceResourceType;
    id: string;
  } | null;
};

export type RapideiaEvidenceBuildResult = {
  evidence: RapideiaEvidencePackage;
  citationMap: EvidenceCitationTarget[];
  tokenCount: number;
};
