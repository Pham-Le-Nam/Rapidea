import { AiContentAccessMode } from './ai-content-authorization.types';
import { ContentChunkSourceType } from './hybrid-content-search.types';
import { IntentRetrievalRouterService } from './intent-retrieval-router.service';
import { IntentEvidenceKind } from './intent-retrieval.types';
import {
  LearnerIntent,
  LearnerQuery,
  LearnerQueryTarget,
} from './learner-query.types';

function target(
  type: LearnerQueryTarget['type'],
  id: string,
): LearnerQueryTarget {
  return { type, id, name: `${type} name` };
}

function query(
  intent: LearnerIntent,
  targets: LearnerQueryTarget[] = [],
  overrides: Partial<LearnerQuery> = {},
): LearnerQuery {
  return {
    intent,
    targets,
    courseScope: null,
    desiredSkills: ['TypeScript'],
    existingSkills: [],
    desiredOutcomes: ['Build an application'],
    difficulty: null,
    constraints: { maxDurationHours: null, language: null },
    searchQuery: 'dependency injection',
    explanationLevel: null,
    includeDiscussions: false,
    ...overrides,
  };
}

function createFixture() {
  const courses = {
    searchSummaries: jest.fn().mockResolvedValue([]),
    getSummary: jest.fn().mockResolvedValue({}),
    getSummaries: jest.fn().mockResolvedValue([]),
    getDetails: jest.fn().mockResolvedValue({}),
  };
  const content = {
    search: jest.fn().mockResolvedValue([]),
    getPost: jest.fn().mockResolvedValue({}),
    getFile: jest.fn().mockResolvedValue({}),
    getDiscussion: jest.fn().mockResolvedValue({}),
    getPostDiscussions: jest.fn().mockResolvedValue({ discussions: [] }),
    getCourseReviews: jest.fn().mockResolvedValue([]),
  };
  const learnerContext = {
    getForUser: jest.fn().mockResolvedValue({ skills: [] }),
  };
  return {
    courses,
    content,
    learnerContext,
    service: new IntentRetrievalRouterService(courses, content, learnerContext),
  };
}

describe('IntentRetrievalRouterService', () => {
  it.each([
    LearnerIntent.FIND_COURSE,
    LearnerIntent.COMPARE_COURSES,
    LearnerIntent.CREATE_LEARNING_PATH,
    LearnerIntent.NEXT_LEARNING_STEP,
    LearnerIntent.CHECK_PREREQUISITES,
  ])('loads learner context for personalized intent %s', async (intent) => {
    const fixture = createFixture();
    const targets =
      intent === LearnerIntent.COMPARE_COURSES ||
      intent === LearnerIntent.CHECK_PREREQUISITES
        ? [target('COURSE', 'course-1')]
        : [];

    const result = await fixture.service.retrieve(
      'learner-1',
      query(intent, targets),
    );

    expect(fixture.learnerContext.getForUser).toHaveBeenCalledWith('learner-1');
    expect(result.evidence[0].kind).toBe(IntentEvidenceKind.LEARNER_CONTEXT);
  });

  it.each([
    [LearnerIntent.FIND_COURSE, 'courseSearch'],
    [LearnerIntent.COMPARE_COURSES, 'courseSummaries'],
    [LearnerIntent.CREATE_LEARNING_PATH, 'courseSearch'],
    [LearnerIntent.NEXT_LEARNING_STEP, 'courseSearch'],
    [LearnerIntent.CHECK_PREREQUISITES, 'courseSummaries'],
    [LearnerIntent.ASK_COURSE, 'courseDetails'],
    [LearnerIntent.ASK_POST, 'postDetails'],
    [LearnerIntent.ASK_FILE, 'fileDetails'],
    [LearnerIntent.FIND_CONTENT, 'contentSearch'],
    [LearnerIntent.EXPLAIN_CONTENT, 'contentSearch'],
    [LearnerIntent.SUMMARIZE_CONTENT, 'postDetails'],
    [LearnerIntent.SUMMARIZE_DISCUSSION, 'discussionThread'],
    [LearnerIntent.SEARCH_DISCUSSION, 'discussionThread'],
    [LearnerIntent.GENERAL, 'none'],
  ] as const)('routes %s through %s', async (intent, expected) => {
    const fixture = createFixture();
    const targets = (() => {
      switch (intent) {
        case LearnerIntent.COMPARE_COURSES:
        case LearnerIntent.CHECK_PREREQUISITES:
        case LearnerIntent.ASK_COURSE:
          return [target('COURSE', 'course-1')];
        case LearnerIntent.ASK_FILE:
          return [target('FILE', 'file-1')];
        case LearnerIntent.ASK_POST:
        case LearnerIntent.EXPLAIN_CONTENT:
        case LearnerIntent.SUMMARIZE_CONTENT:
        case LearnerIntent.SUMMARIZE_DISCUSSION:
        case LearnerIntent.SEARCH_DISCUSSION:
          return [target('POST', 'post-1')];
        default:
          return [];
      }
    })();

    await fixture.service.retrieve('learner-1', query(intent, targets));

    const calls = {
      courseSearch: fixture.courses.searchSummaries,
      courseSummaries: fixture.courses.getSummaries,
      courseDetails: fixture.courses.getDetails,
      postDetails: fixture.content.getPost,
      fileDetails: fixture.content.getFile,
      contentSearch: fixture.content.search,
      discussionThread: fixture.content.getPostDiscussions,
      none: null,
    };
    if (expected === 'none') {
      expect(fixture.courses.searchSummaries).not.toHaveBeenCalled();
      expect(fixture.content.search).not.toHaveBeenCalled();
    } else {
      expect(calls[expected]).toHaveBeenCalled();
    }
  });

  it('uses only the selected post as the official search scope', async () => {
    const fixture = createFixture();

    await fixture.service.retrieve(
      'learner-1',
      query(LearnerIntent.ASK_POST, [target('POST', 'post-1')], {
        courseScope: 'course-1',
      }),
    );

    expect(fixture.content.search).toHaveBeenCalledWith('learner-1', {
      query: expect.any(String),
      courseIds: [],
      sources: [
        {
          sourceType: ContentChunkSourceType.POST,
          sourceId: 'post-1',
        },
      ],
      sourceTypes: [ContentChunkSourceType.POST, ContentChunkSourceType.FILE],
      accessMode: AiContentAccessMode.DETAILS,
    });
  });

  it('adds community evidence once when another intent requests it', async () => {
    const fixture = createFixture();

    const result = await fixture.service.retrieve(
      'learner-1',
      query(LearnerIntent.ASK_POST, [target('POST', 'post-1')], {
        includeDiscussions: true,
        courseScope: 'course-1',
      }),
    );

    expect(fixture.content.getPostDiscussions).toHaveBeenCalledTimes(1);
    expect(fixture.content.getCourseReviews).not.toHaveBeenCalled();
    expect(
      result.evidence.filter(
        (item) => item.kind === IntentEvidenceKind.COMMUNITY_CHUNKS,
      ),
    ).toHaveLength(1);
  });

  it('does not treat a target name without a trusted ID as a resource ID', async () => {
    const fixture = createFixture();
    const untrustedTarget: LearnerQueryTarget = {
      type: 'FILE',
      id: null,
      name: 'architecture.pdf',
    };

    const result = await fixture.service.retrieve(
      'learner-1',
      query(LearnerIntent.ASK_FILE, [untrustedTarget]),
    );

    expect(fixture.content.getFile).not.toHaveBeenCalled();
    expect(result.warnings).toContain(
      'No trusted file ID was available for the file question.',
    );
  });

  it('reports constraints that current course data cannot enforce', async () => {
    const fixture = createFixture();

    const result = await fixture.service.retrieve(
      'learner-1',
      query(LearnerIntent.FIND_COURSE, [], {
        constraints: { maxDurationHours: 10, language: 'English' },
      }),
    );

    expect(result.warnings).toHaveLength(2);
  });
});
