import {
  INSTRUCTOR_QUERY_OUTPUT,
  INSTRUCTOR_ANSWER_OUTPUT,
  instructorAnswerOutput,
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
  INSTRUCTOR_PROPOSAL_KIND_BY_INTENT,
  INSTRUCTOR_PROPOSAL_LIMITS,
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
  it('restricts citations to actual evidence, including a source-free course outline', () => {
    const empty = instructorAnswerOutput(
      InstructorIntent.CREATE_COURSE_STRUCTURE,
      [],
    ).schema.properties.citedReferences as any;
    expect(empty.maxItems).toBe(0);
    const sourced = instructorAnswerOutput(InstructorIntent.REVIEW_COURSE, [
      'R1',
      'R2',
      'R1',
    ]).schema.properties.citedReferences as any;
    expect(sourced.items.enum).toEqual(['R1', 'R2']);
  });
  it('matches proposal validator limits and prevents empty course outlines', () => {
    const structure = instructorAnswerOutput(
      InstructorIntent.CREATE_COURSE_STRUCTURE,
    ).schema.properties.proposal as any;
    const fields = structure.anyOf[1].properties;
    expect(fields.title.maxLength).toBe(INSTRUCTOR_PROPOSAL_LIMITS.title);
    expect(fields.body.maxLength).toBe(INSTRUCTOR_PROPOSAL_LIMITS.body);
    expect(fields.items.minItems).toBe(1);
    expect(fields.items.maxItems).toBe(INSTRUCTOR_PROPOSAL_LIMITS.items);
    expect(fields.items.items.properties.details.maxLength).toBe(
      INSTRUCTOR_PROPOSAL_LIMITS.itemDetails,
    );
    const post = instructorAnswerOutput(InstructorIntent.DRAFT_POST).schema
      .properties.proposal as any;
    expect(post.anyOf[1].properties.body.pattern).toBe('\\S');
    expect(post.anyOf[1].properties.items.minItems).toBeUndefined();
  });
  it.each(Object.values(InstructorIntent))(
    'constrains final proposals to the approved action for %s',
    (intent) => {
      const output = instructorAnswerOutput(intent);
      const proposal = output.schema.properties.proposal as any;
      const kind = INSTRUCTOR_PROPOSAL_KIND_BY_INTENT[intent];
      if (kind) expect(proposal.anyOf[1].properties.kind.enum).toEqual([kind]);
      else expect(proposal).toEqual({ type: 'null' });
      expect(output.schema.additionalProperties).toBe(false);
      expect(output.schema.required).toEqual([
        'answer',
        'followUpQuestion',
        'citedReferences',
        'proposal',
      ]);
    },
  );
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
