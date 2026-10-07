export enum InstructorProposalKind {
  COURSE_STRUCTURE = 'COURSE_STRUCTURE',
  LEARNING_OUTCOMES = 'LEARNING_OUTCOMES',
  COURSE_SKILLS = 'COURSE_SKILLS',
  PREREQUISITES = 'PREREQUISITES',
  POST_DRAFT = 'POST_DRAFT',
  POST_REVISION = 'POST_REVISION',
}
export type InstructorProposal = {
  kind: InstructorProposalKind;
  title: string;
  body: string;
  items: { title: string; details: string }[];
};
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
    p.title.length > 250 ||
    typeof p.body !== 'string' ||
    p.body.length > 20000 ||
    !Array.isArray(p.items) ||
    p.items.length > 40 ||
    p.items.some(
      (i) =>
        !i ||
        typeof i.title !== 'string' ||
        !i.title.trim() ||
        i.title.length > 500 ||
        typeof i.details !== 'string' ||
        i.details.length > 2000,
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
