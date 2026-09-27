export const FINAL_ANSWER_SCHEMA = {
  type: 'object',
  properties: {
    answer: { type: 'string' },
    citations: {
      type: 'array',
      items: { type: 'string' },
    },
    followUpQuestion: { type: 'string' },
  },
  required: ['answer', 'citations', 'followUpQuestion'],
  additionalProperties: false,
} as const;

export const FINAL_ANSWER_OUTPUT = {
  name: 'rapideia_final_answer',
  schema: FINAL_ANSWER_SCHEMA,
} as const;
