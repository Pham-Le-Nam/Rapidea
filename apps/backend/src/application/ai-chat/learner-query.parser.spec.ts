import {
  constrainLearnerQueryReferences,
  parseLearnerQuery,
} from './learner-query.parser';
import {
  LearnerIntent,
  LearnerQuery,
  LearnerQueryTrustedContext,
} from './learner-query.types';

const POST_ID = '1b9de72e-8fd2-43bd-8cb2-a9a4889bd40c';
const COURSE_ID = '48dbc99b-b0c2-4e3a-84ba-96e498796992';
const INVENTED_ID = '684f1632-1cf5-40d6-85b4-ddc02499bc3f';

function query(overrides: Partial<LearnerQuery> = {}): LearnerQuery {
  return {
    intent: LearnerIntent.ASK_POST,
    targets: [{ type: 'POST', id: POST_ID, name: 'this post' }],
    courseScope: COURSE_ID,
    desiredSkills: [],
    existingSkills: [],
    desiredOutcomes: [],
    difficulty: null,
    constraints: { maxDurationHours: null, language: null },
    searchQuery: 'closures',
    explanationLevel: null,
    includeDiscussions: false,
    ...overrides,
  };
}

const context: LearnerQueryTrustedContext[] = [
  {
    type: 'POST',
    id: POST_ID,
    name: 'Understanding Closures',
    courseScope: COURSE_ID,
    current: true,
  },
];

describe('LearnerQuery parsing and trusted target resolution', () => {
  it.each([
    [
      'target ID',
      query({ targets: [{ type: 'POST', id: 'not-a-uuid', name: null }] }),
    ],
    ['course scope', query({ courseScope: 'not-a-uuid' })],
  ])('rejects a malformed UUID in %s', (_label, value) => {
    expect(() => parseLearnerQuery(value)).toThrow(/UUID/);
  });

  it('resolves a valid target only when its type and UUID match backend context', () => {
    const parsed = parseLearnerQuery(query());

    expect(constrainLearnerQueryReferences(parsed, context)).toEqual(
      expect.objectContaining({
        targets: [
          {
            type: 'POST',
            id: POST_ID,
            name: 'Understanding Closures',
          },
        ],
        courseScope: COURSE_ID,
      }),
    );
  });

  it.each([
    ['invented UUID', { type: 'POST' as const, id: INVENTED_ID, name: 'Fake' }],
    [
      'wrong resource type',
      { type: 'FILE' as const, id: POST_ID, name: 'Fake' },
    ],
  ])(
    'removes a model-supplied %s that is not in trusted context',
    (_label, target) => {
      const parsed = parseLearnerQuery(query({ targets: [target] }));
      const resolved = constrainLearnerQueryReferences(parsed, context);

      expect(resolved.targets[0].id).toBeNull();
    },
  );

  it('removes a valid but untrusted course scope UUID', () => {
    const parsed = parseLearnerQuery(query({ courseScope: INVENTED_ID }));

    expect(
      constrainLearnerQueryReferences(parsed, context).courseScope,
    ).toBeNull();
  });
});
