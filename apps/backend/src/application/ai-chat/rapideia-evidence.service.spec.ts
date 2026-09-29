import { IntentEvidenceKind } from './intent-retrieval.types';
import { LearnerIntent, LearnerQuery } from './learner-query.types';
import {
  LearningPathStepCoverage,
  LearningPathStepNecessity,
} from './learning-path-plan.types';
import {
  EvidenceAuthority,
  RapideiaEvidencePackage,
} from './rapideia-evidence.types';
import { RapideiaEvidenceService } from './rapideia-evidence.service';

const baseQuery: LearnerQuery = {
  intent: LearnerIntent.ASK_FILE,
  targets: [
    {
      type: 'FILE',
      id: 'private-file-id',
      name: 'Architecture.pdf',
    },
  ],
  courseScope: 'private-course-id',
  desiredSkills: [],
  existingSkills: [],
  desiredOutcomes: [],
  difficulty: null,
  constraints: { maxDurationHours: null, language: null },
  searchQuery: 'dependency injection',
  explanationLevel: 'BEGINNER',
  includeDiscussions: false,
};

function createService() {
  return new RapideiaEvidenceService({
    count: (text: string) => Math.ceil(text.length / 4),
    truncate: (text: string, maxTokens: number) => text.slice(0, maxTokens * 4),
  });
}

describe('RapideiaEvidenceService', () => {
  it('keeps internal IDs in the citation map but removes them and ranking data from model evidence', () => {
    const service = createService();
    const result = service.build({
      intent: LearnerIntent.ASK_FILE,
      query: baseQuery,
      warnings: [],
      evidence: [
        {
          kind: IntentEvidenceKind.CONTENT_CHUNKS,
          data: [
            {
              chunkId: 'private-chunk-id',
              sourceType: 'FILE',
              sourceId: 'private-file-id',
              courseId: 'private-course-id',
              content: 'Dependency injection separates construction from use.',
              semanticScore: 0.91,
              keywordScore: 0.72,
              combinedScore: 0.03,
              embedding: [0.1, 0.2],
              metadata: { name: 'Architecture.pdf', tokenStart: 0 },
            },
          ],
        },
      ],
    });
    const modelEvidence = JSON.stringify(result.evidence);

    expect(result.citationMap).toEqual([
      {
        reference: 'R1',
        source: {
          type: 'FILE',
          id: 'private-file-id',
          label: 'Architecture.pdf',
        },
      },
    ]);
    expect(modelEvidence).not.toContain('private-file-id');
    expect(modelEvidence).not.toContain('private-course-id');
    expect(modelEvidence).not.toContain('private-chunk-id');
    expect(modelEvidence).not.toContain('semanticScore');
    expect(modelEvidence).not.toContain('embedding');
    expect(result.evidence.items[0]).toEqual(
      expect.objectContaining({
        reference: 'R1',
        authority: EvidenceAuthority.RESOURCE_SPECIFIC,
        source: { type: 'FILE', label: 'Architecture.pdf' },
      }),
    );
  });

  it('labels course, learner, and community evidence by authority', () => {
    const service = createService();
    const result = service.build({
      intent: LearnerIntent.COMPARE_COURSES,
      query: { ...baseQuery, intent: LearnerIntent.COMPARE_COURSES },
      warnings: [],
      evidence: [
        {
          kind: IntentEvidenceKind.LEARNER_CONTEXT,
          data: {
            instructions: 'hidden internal guidance',
            skills: [{ name: 'TypeScript' }],
          },
        },
        {
          kind: IntentEvidenceKind.COURSE_SUMMARY,
          data: [{ id: 'course-1', title: 'Architecture' }],
        },
        {
          kind: IntentEvidenceKind.COURSE_REVIEWS,
          source: { type: 'COURSE', id: 'course-1' },
          data: [{ id: 'review-1', review: 'Helpful examples.' }],
        },
      ],
    });

    expect(result.evidence.items.map((item) => item.authority)).toEqual([
      EvidenceAuthority.LEARNER_CONTEXT,
      EvidenceAuthority.COURSE_OFFICIAL,
      EvidenceAuthority.COMMUNITY,
    ]);
    expect(JSON.stringify(result.evidence)).not.toContain(
      'hidden internal guidance',
    );
    expect(result.citationMap[2].source).toEqual({
      type: 'COURSE',
      id: 'course-1',
      label: null,
    });
  });

  it('adds a short authorized description to citation metadata', () => {
    const service = createService();
    const result = service.build({
      intent: LearnerIntent.FIND_COURSE,
      query: { ...baseQuery, intent: LearnerIntent.FIND_COURSE },
      warnings: [],
      evidence: [
        {
          kind: IntentEvidenceKind.COURSE_SEARCH_RESULTS,
          data: [
            {
              id: 'course-1',
              title: 'Calculus',
              description:
                'Limits, derivatives, integrals, and their applications.',
            },
          ],
        },
      ],
    });

    expect(result.citationMap[0].source).toEqual({
      type: 'COURSE',
      id: 'course-1',
      label: 'Calculus',
      description: 'Limits, derivatives, integrals, and their applications.',
    });
  });

  it('splits discussion comments into separately referenceable evidence', () => {
    const service = createService();
    const result = service.build({
      intent: LearnerIntent.SUMMARIZE_DISCUSSION,
      query: {
        ...baseQuery,
        intent: LearnerIntent.SUMMARIZE_DISCUSSION,
      },
      warnings: [],
      evidence: [
        {
          kind: IntentEvidenceKind.DISCUSSION_THREAD,
          source: { type: 'POST', id: 'post-1' },
          data: {
            post: { id: 'post-1', title: 'Dependency Injection' },
            discussions: [
              { id: 'discussion-1', discussion: 'Comment one' },
              { id: 'discussion-2', discussion: 'Comment two' },
            ],
          },
        },
      ],
    });

    expect(result.evidence.items).toHaveLength(3);
    expect(result.evidence.items.slice(1)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          authority: EvidenceAuthority.COMMUNITY,
          source: expect.objectContaining({ type: 'DISCUSSION' }),
        }),
      ]),
    );
    expect(
      result.citationMap.every((item) => item.source?.id === 'post-1'),
    ).toBe(true);
  });

  it('enforces the evidence budget and reports omitted items', () => {
    const service = createService();
    const result = service.build(
      {
        intent: LearnerIntent.FIND_CONTENT,
        query: { ...baseQuery, intent: LearnerIntent.FIND_CONTENT },
        warnings: [],
        evidence: [
          {
            kind: IntentEvidenceKind.CONTENT_CHUNKS,
            data: Array.from({ length: 20 }, (_, index) => ({
              sourceType: 'POST',
              sourceId: `post-${index}`,
              content: 'content '.repeat(100),
            })),
          },
        ],
      },
      { maxTokens: 500, maxItemTokens: 100 },
    );

    expect(result.tokenCount).toBeLessThanOrEqual(500);
    expect(result.evidence.truncation.truncated).toBe(true);
    expect(result.evidence.truncation.omittedItems).toBeGreaterThan(0);
    expect(result.citationMap).toHaveLength(result.evidence.items.length);
  });

  it('serializes evidence inside an explicit untrusted-data boundary', () => {
    const service = createService();
    const evidence = {
      schemaVersion: 1,
      intent: LearnerIntent.GENERAL,
      learnerRequest: {
        targets: [],
        desiredSkills: [],
        existingSkills: [],
        desiredOutcomes: [],
        difficulty: null,
        constraints: { maxDurationHours: null, language: null },
        searchQuery: null,
        explanationLevel: null,
        includeDiscussions: false,
      },
      items: [],
      warnings: [],
      truncation: { truncated: false, omittedItems: 0 },
    } satisfies RapideiaEvidencePackage;

    expect(service.toPromptBlock(evidence)).toBe(
      `<RAPIDEIA_EVIDENCE>\n${JSON.stringify(evidence)}\n</RAPIDEIA_EVIDENCE>`,
    );
  });

  it('includes derived learning-path coverage without turning it into a citation', () => {
    const service = createService();
    const learningPathPlan = {
      steps: [
        {
          sequence: 1,
          title: 'Mathematics foundations',
          objective: 'Learn prerequisite mathematics',
          requiredSkills: ['Linear Algebra'],
          rationale: 'Required by later machine-learning work.',
          necessity: LearningPathStepNecessity.REQUIRED,
          coverage: LearningPathStepCoverage.UNCOVERED,
          courseTitles: [],
          searchQuery: 'linear algebra for machine learning',
          supplementalSearchPerformed: true,
        },
      ],
    };

    const result = service.build({
      intent: LearnerIntent.CREATE_LEARNING_PATH,
      query: { ...baseQuery, intent: LearnerIntent.CREATE_LEARNING_PATH },
      warnings: [],
      evidence: [],
      learningPathPlan,
    });

    expect(result.evidence.learningPathPlan).toEqual(learningPathPlan);
    expect(result.citationMap).toEqual([]);
  });
});
