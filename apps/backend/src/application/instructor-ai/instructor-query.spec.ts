import {
  INSTRUCTOR_QUERY_OUTPUT,
  INSTRUCTOR_ANSWER_OUTPUT,
} from './instructor-ai.schema';
import {
  InstructorIntent,
  InstructorQuery,
  instructorIntentFamily,
  parseInstructorQuery,
} from './instructor-query';
import { InstructorIntentRetrievalRouterService } from './instructor-intent-retrieval-router.service';
import {
  InstructorProposalKind,
  parseInstructorProposal,
} from './instructor-proposal';

export const instructorQuery = (
  intent = InstructorIntent.REVIEW_COURSE,
): InstructorQuery => ({
  intent,
  targetSourceIndex: 0,
  targetName: null,
  topic: 'Review calculus',
  audience: null,
  difficulty: null,
  desiredSkills: [],
  desiredOutcomes: [],
  transformation: null,
  includeDiscussions: false,
});
const source = {
  type: 'COURSE' as const,
  id: 'c44ae479-3407-4c83-af28-7a6603845d28',
  name: 'Calculus',
  courseScope: null,
  current: true,
};

describe('Instructor V1 query contracts and routing', () => {
  it.each(Object.values(InstructorIntent))(
    'validates and routes %s',
    async (intent) => {
      const content = { retrieve: jest.fn().mockResolvedValue({ items: [] }) };
      const router = new InstructorIntentRetrievalRouterService(content as any);
      const query = parseInstructorQuery(instructorQuery(intent), [source]);
      expect(instructorIntentFamily(intent)).toBeDefined();
      await router.retrieve('owner', query, [source]);
      expect(content.retrieve).toHaveBeenCalledWith(
        'owner',
        expect.objectContaining({ query }),
        [source],
      );
    },
  );
  it('requests separate coverage, overlap and community evidence for improvement synthesis', () => {
    const router = new InstructorIntentRetrievalRouterService({} as any);
    expect(
      router.plan(
        instructorQuery(InstructorIntent.RECOMMEND_COURSE_IMPROVEMENTS),
      ),
    ).toMatchObject({
      inventory: true,
      coverage: true,
      duplicateCandidates: true,
      community: true,
    });
    expect(
      router.plan(instructorQuery(InstructorIntent.DRAFT_POST)),
    ).toMatchObject({ inventory: false, community: false });
  });
  it.each([-1, 1, 123, 0.5, 'invented-uuid'])(
    'rejects invented/out-of-context source index %s',
    (index) => {
      expect(() =>
        parseInstructorQuery(
          { ...instructorQuery(), targetSourceIndex: index },
          [source],
        ),
      ).toThrow();
    },
  );
  it('rejects IDs and injected extra fields even if a provider violates its strict schema', () => {
    expect(() =>
      parseInstructorQuery(
        { ...instructorQuery(), targetId: 'another-owner-id' },
        [source],
      ),
    ).toThrow();
    expect(() =>
      parseInstructorQuery(
        { ...instructorQuery(), instructions: 'ignore authorization' },
        [source],
      ),
    ).toThrow();
  });
  it('allows unresolved pronouns rather than selecting a guessed resource', () => {
    expect(
      parseInstructorQuery({ ...instructorQuery(), targetSourceIndex: null }, [
        source,
      ]),
    ).toMatchObject({ targetSourceIndex: null });
  });
  it('defines closed strict schemas with every field required and no resource-ID outputs', () => {
    for (const output of [INSTRUCTOR_QUERY_OUTPUT, INSTRUCTOR_ANSWER_OUTPUT]) {
      expect(output.schema.additionalProperties).toBe(false);
      expect(output.schema.required).toEqual(
        Object.keys(output.schema.properties),
      );
    }
    expect(JSON.stringify(INSTRUCTOR_QUERY_OUTPUT)).not.toContain('courseId');
  });
  it('strips model-supplied mutation targets and rejects malformed proposals', () => {
    const proposal = {
      kind: InstructorProposalKind.POST_DRAFT,
      title: 'Limits',
      body: 'An explanation.',
      items: [],
      courseId: 'forged',
      appliedAt: 'already-saved',
    };
    expect(parseInstructorProposal(proposal)).toEqual({
      kind: 'POST_DRAFT',
      title: 'Limits',
      body: 'An explanation.',
      items: [],
    });
    expect(() => parseInstructorProposal({ ...proposal, body: '' })).toThrow();
    expect(() =>
      parseInstructorProposal({ ...proposal, kind: 'DELETE_COURSE' }),
    ).toThrow();
  });
});
