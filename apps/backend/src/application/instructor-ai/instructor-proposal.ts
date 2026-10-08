import { InstructorIntent } from './instructor-query';

export enum InstructorProposalKind {
  COURSE_STRUCTURE = 'COURSE_STRUCTURE',
  LEARNING_OUTCOMES = 'LEARNING_OUTCOMES',
  COURSE_SKILLS = 'COURSE_SKILLS',
  PREREQUISITES = 'PREREQUISITES',
  POST_DRAFT = 'POST_DRAFT',
  POST_REVISION = 'POST_REVISION',
}
/** Single policy shared by generation schemas and defensive result validation. */
export const INSTRUCTOR_PROPOSAL_KIND_BY_INTENT: Partial<
  Record<InstructorIntent, InstructorProposalKind>
> = {
  CREATE_COURSE_STRUCTURE: InstructorProposalKind.COURSE_STRUCTURE,
  CREATE_LEARNING_OUTCOMES: InstructorProposalKind.LEARNING_OUTCOMES,
  DEFINE_COURSE_SKILLS: InstructorProposalKind.COURSE_SKILLS,
  DEFINE_PREREQUISITES: InstructorProposalKind.PREREQUISITES,
  DRAFT_POST: InstructorProposalKind.POST_DRAFT,
  IMPROVE_CONTENT: InstructorProposalKind.POST_REVISION,
};
export type InstructorProposal = {
  kind: InstructorProposalKind;
  title: string;
  body: string;
  items: { title: string; details: string }[];
};
export const INSTRUCTOR_PROPOSAL_LIMITS = {
  title: 250,
  body: 20000,
  items: 40,
  itemTitle: 500,
  itemDetails: 2000,
} as const;
export type StoredInstructorProposal = InstructorProposal & {
  courseId: string | null;
  postId: string | null;
  sourceHash: string;
  sourcePostId?: string | null;
  sourceFileIds?: string[];
  appliedAt?: string;
  resultId?: string;
  canonicalSkills?: {
    suggestedName: string;
    skillId: number | null;
    canonicalName: string | null;
  }[];
};

export function parseInstructorProposal(
  value: unknown,
): InstructorProposal | null {
  if (value === null) return null;
  if (!value || typeof value !== 'object') throw new Error('Invalid proposal');
  const p = value as InstructorProposal;
  if (
    !Object.values(InstructorProposalKind).includes(p.kind) ||
    typeof p.title !== 'string' ||
    !p.title.trim() ||
    p.title.length > INSTRUCTOR_PROPOSAL_LIMITS.title ||
    typeof p.body !== 'string' ||
    p.body.length > INSTRUCTOR_PROPOSAL_LIMITS.body ||
    !Array.isArray(p.items) ||
    p.items.length > INSTRUCTOR_PROPOSAL_LIMITS.items ||
    p.items.some(
      (i) =>
        !i ||
        typeof i.title !== 'string' ||
        !i.title.trim() ||
        i.title.length > INSTRUCTOR_PROPOSAL_LIMITS.itemTitle ||
        typeof i.details !== 'string' ||
        i.details.length > INSTRUCTOR_PROPOSAL_LIMITS.itemDetails,
    ) ||
    (p.kind === InstructorProposalKind.POST_DRAFT ||
    p.kind === InstructorProposalKind.POST_REVISION
      ? !p.body.trim()
      : p.items.length === 0)
  ) {
    throw new Error('Invalid instructor proposal');
  }
  // Strip any unexpected fields, especially model-supplied IDs/status.
  return {
    kind: p.kind,
    title: p.title.trim(),
    body: p.body,
    items: p.items.map((i) => ({ title: i.title.trim(), details: i.details })),
  };
}
