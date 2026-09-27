export const CONVERSATION_SUMMARY_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    topics: { type: 'array', items: { type: 'string' } },
    decisions: { type: 'array', items: { type: 'string' } },
    openQuestions: { type: 'array', items: { type: 'string' } },
    nextSteps: { type: 'array', items: { type: 'string' } },
    salientFacts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fact: { type: 'string' },
          attribution: {
            type: 'string',
            enum: ['LEARNER', 'ASSISTANT', 'MIXED'],
          },
        },
        required: ['fact', 'attribution'],
        additionalProperties: false,
      },
    },
    currentLearningPath: { type: 'array', items: { type: 'string' } },
    interests: { type: 'array', items: { type: 'string' } },
    learningGoals: { type: 'array', items: { type: 'string' } },
    learnerPreferences: { type: 'array', items: { type: 'string' } },
    skills: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          status: {
            type: 'string',
            enum: ['EXPLICIT', 'ASSUMED', 'DEMONSTRATED'],
          },
          context: { type: 'string' },
        },
        required: ['name', 'status', 'context'],
        additionalProperties: false,
      },
    },
    resourceReferences: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['COURSE', 'POST', 'FILE'],
          },
          name: { type: 'string' },
        },
        required: ['type', 'name'],
        additionalProperties: false,
      },
    },
  },
  required: [
    'summary',
    'topics',
    'decisions',
    'openQuestions',
    'nextSteps',
    'salientFacts',
    'currentLearningPath',
    'interests',
    'learningGoals',
    'learnerPreferences',
    'skills',
    'resourceReferences',
  ],
  additionalProperties: false,
} as const;

export const CONVERSATION_SUMMARY_OUTPUT = {
  name: 'rapideia_conversation_summary',
  schema: CONVERSATION_SUMMARY_SCHEMA,
} as const;
