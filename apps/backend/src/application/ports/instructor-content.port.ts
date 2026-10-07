import {
  InstructorRetrievalPlan,
  InstructorSource,
} from '../instructor-ai/instructor-query';
import {
  InstructorProposal,
  StoredInstructorProposal,
} from '../instructor-ai/instructor-proposal';
export const INSTRUCTOR_CONTENT_PORT = 'INSTRUCTOR_CONTENT_PORT';
export enum InstructorEvidenceKind {
  COURSE_OVERVIEW = 'COURSE_OVERVIEW',
  SELECTED_SOURCE = 'SELECTED_SOURCE',
  INVENTORY = 'INVENTORY',
  COVERAGE_SUPPORT = 'COVERAGE_SUPPORT',
  RETRIEVED_PASSAGE = 'RETRIEVED_PASSAGE',
  DUPLICATE_CANDIDATE = 'DUPLICATE_CANDIDATE',
  DISCUSSION = 'DISCUSSION',
  FEEDBACK = 'FEEDBACK',
  STATISTICS = 'STATISTICS',
}
export type InstructorEvidence = {
  items: {
    ref: string;
    kind?: InstructorEvidenceKind;
    authority: 'COURSE_OFFICIAL' | 'RESOURCE_SPECIFIC' | 'COMMUNITY';
    label: string;
    data: unknown;
  }[];
  citations: {
    ref: string;
    source: { type: string; id: string; label: string };
    url?: string;
  }[];
  warnings: string[];
  courseId: string | null;
  postId: string | null;
  sourceHash: string;
  sourceFileIds?: string[];
  creatorStyle: string | null;
};
export interface InstructorContentPort {
  listSources(
    userId: string,
    query?: string,
  ): Promise<{ sourceType: string; sourceId: string; label: string }[]>;
  retrieve(
    userId: string,
    plan: InstructorRetrievalPlan,
    sources: readonly InstructorSource[],
  ): Promise<InstructorEvidence>;
  resolveProposalSkills(
    proposal: InstructorProposal,
  ): Promise<StoredInstructorProposal['canonicalSkills']>;
  applyProposal(
    userId: string,
    messageId: string,
    edited: InstructorProposal,
  ): Promise<{ resultId: string; appliedAt: string; replay: boolean }>;
}
