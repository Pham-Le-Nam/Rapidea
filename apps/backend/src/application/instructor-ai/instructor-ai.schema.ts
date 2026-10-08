import { InstructorIntent } from './instructor-query';
import {
  InstructorProposalKind,
  INSTRUCTOR_PROPOSAL_KIND_BY_INTENT,
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
  return {
    anyOf: [
      { type: 'null' },
      object({
        kind: { type: 'string', enum: kinds },
        title: string,
        body: string,
        items: {
          type: 'array',
          items: object({ title: string, details: string }),
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
export function instructorAnswerOutput(intent: InstructorIntent) {
  const kind = INSTRUCTOR_PROPOSAL_KIND_BY_INTENT[intent];
  return {
    name: INSTRUCTOR_ANSWER_OUTPUT.name,
    schema: object({
      answer: string,
      followUpQuestion: string,
      citedReferences: strings,
      proposal: kind ? proposalSchema([kind]) : { type: 'null' },
    }),
  };
}
