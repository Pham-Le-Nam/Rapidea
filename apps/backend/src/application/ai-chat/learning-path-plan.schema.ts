export const LEARNING_PATH_PLAN_SCHEMA = {
  type: 'object',
  properties: {
    steps: {
      type: 'array',
      minItems: 1,
      maxItems: 8,
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          objective: { type: 'string' },
          requiredSkills: {
            type: 'array',
            items: { type: 'string' },
          },
          rationale: { type: 'string' },
          necessity: {
            type: 'string',
            enum: ['REQUIRED', 'RECOMMENDED', 'UNCERTAIN'],
          },
          matchedCourseReferences: {
            type: 'array',
            items: { type: 'string', pattern: '^C[1-9]\\d*$' },
          },
          searchQuery: {
            anyOf: [{ type: 'string' }, { type: 'null' }],
          },
        },
        required: [
          'title',
          'objective',
          'requiredSkills',
          'rationale',
          'necessity',
          'matchedCourseReferences',
          'searchQuery',
        ],
        additionalProperties: false,
      },
    },
  },
  required: ['steps'],
  additionalProperties: false,
} as const;

export const LEARNING_PATH_PLAN_OUTPUT = {
  name: 'rapideia_learning_path_plan',
  schema: LEARNING_PATH_PLAN_SCHEMA,
} as const;
