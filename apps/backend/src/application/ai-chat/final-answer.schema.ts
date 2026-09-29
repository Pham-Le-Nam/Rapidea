export const FINAL_ANSWER_SCHEMA = {
  type: 'object',
  properties: {
    answer: { type: 'string', pattern: '\\S' },
    citations: {
      type: 'array',
      items: { type: 'string', pattern: '^R[1-9][0-9]*$' },
    },
    followUpQuestion: { type: 'string', pattern: '\\S' },
  },
  required: ['answer', 'citations', 'followUpQuestion'],
  additionalProperties: false,
} as const;

export const FINAL_ANSWER_OUTPUT = {
  name: 'rapideia_final_answer',
  schema: FINAL_ANSWER_SCHEMA,
} as const;
