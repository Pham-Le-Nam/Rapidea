import { InstructorIntent } from './instructor-query';
import {
  InstructorProposalKind,
  INSTRUCTOR_PROPOSAL_KIND_BY_INTENT,
  INSTRUCTOR_PROPOSAL_LIMITS as limits,
} from './instructor-proposal';
const string = { type: 'string' };
const strings = { type: 'array', items: string };
const nullableString = { type: ['string', 'null'] };
function object(properties: Record<string, unknown>) {
  return {
    type: 'object',
    additionalProperties: false,
    properties,
    required: Object.keys(properties),
  };
}
export const INSTRUCTOR_QUERY_OUTPUT = {
  name: 'instructor_query',
  schema: object({
    intent: { type: 'string', enum: Object.values(InstructorIntent) },
    targetSourceIndex: { type: ['integer', 'null'] },
    targetName: nullableString,
    topic: string,
    audience: nullableString,
    difficulty: {
      type: ['string', 'null'],
      enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', null],
    },
    desiredSkills: strings,
    desiredOutcomes: strings,
    transformation: {
      type: ['string', 'null'],
      enum: ['SIMPLIFY', 'SHORTEN', 'EXPAND', 'RESTRUCTURE', 'CLARIFY', null],
    },
    includeDiscussions: { type: 'boolean' },
  }),
};
function proposalSchema(kinds: InstructorProposalKind[]) {
  const postOnly = kinds.every(
    (kind) =>
      kind === InstructorProposalKind.POST_DRAFT ||
      kind === InstructorProposalKind.POST_REVISION,
  );
  const structuredOnly = kinds.every(
    (kind) =>
      kind !== InstructorProposalKind.POST_DRAFT &&
      kind !== InstructorProposalKind.POST_REVISION,
  );
  return {
    anyOf: [
      { type: 'null' },
      object({
        kind: { type: 'string', enum: kinds },
        title: { ...string, pattern: '\\S', maxLength: limits.title },
        body: {
          ...string,
          maxLength: limits.body,
          ...(postOnly ? { pattern: '\\S' } : {}),
        },
        items: {
          type: 'array',
          maxItems: limits.items,
          ...(structuredOnly ? { minItems: 1 } : {}),
          items: object({
            title: { ...string, pattern: '\\S', maxLength: limits.itemTitle },
            details: { ...string, maxLength: limits.itemDetails },
          }),
        },
      }),
    ],
  };
}
export const INSTRUCTOR_PLANNING_OUTPUT = {
  name: 'instructor_course_plan',
  schema: object({
    proposal: proposalSchema(Object.values(InstructorProposalKind)),
  }),
};
export const INSTRUCTOR_ANSWER_OUTPUT = {
  name: 'instructor_answer',
  schema: object({
    answer: string,
    followUpQuestion: string,
    citedReferences: strings,
    proposal: proposalSchema(Object.values(InstructorProposalKind)),
  }),
};

/** The model cannot offer an unrelated write action for a read-only request. */
export function instructorAnswerOutput(
  intent: InstructorIntent,
  availableReferences?: readonly string[],
) {
  const kind = INSTRUCTOR_PROPOSAL_KIND_BY_INTENT[intent];
  return {
    name: INSTRUCTOR_ANSWER_OUTPUT.name,
    schema: object({
      answer: { ...string, pattern: '\\S' },
      followUpQuestion: { ...string, pattern: '\\S' },
      citedReferences:
        availableReferences === undefined
          ? strings
          : availableReferences.length
            ? {
                type: 'array',
                items: {
                  type: 'string',
                  enum: [...new Set(availableReferences)],
                },
              }
            : { ...strings, maxItems: 0 },
      proposal: kind ? proposalSchema([kind]) : { type: 'null' },
    }),
  };
}
