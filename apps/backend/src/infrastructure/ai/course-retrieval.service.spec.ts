import { Difficulty } from '../../../generated/prisma/enums';
import {
  AiContentAccessMode,
  AiContentResourceType,
} from '../../application/ai-chat/ai-content-authorization.types';
import { CourseRetrievalService } from './course-retrieval.service';
import { QueryEmbeddingService } from './query-embedding.service';

function course(id: string, title: string) {
  return {
    id,
    title,
    description: `${title} description`,
    price: 10,
    currency: 'AUD',
    rating: 4.5,
    ratingCount: 12,
    subscribersCount: 30,
    user: {
      username: 'instructor',
      firstname: 'Course',
      middlename: null,
      lastname: 'Creator',
    },
    aiProfile: {
      summary: `${title} summary`,
      difficulty: Difficulty.INTERMEDIATE,
      profileText: `${title} profile`,
      profileVersion: 1,
      generatedAt: new Date('2026-09-01T00:00:00Z'),
    },
    skills: [
      {
        outcome: 'Build an application.',
        importance: 0.9,
        skill: {
          id: 1,
          name: 'TypeScript',
          description: 'Typed JavaScript development.',
        },
      },
    ],
    tags: [{ tag: { name: 'web-development' } }],
  };
}

function createFixture() {
  const prisma = {
    $queryRaw: jest.fn(),
    course: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
    },
  };
  const aiService = {
    createEmbeddings: jest.fn().mockResolvedValue([Array(1536).fill(0.1)]),
  };
  const authorization = {
    assertCanAccess: jest.fn().mockResolvedValue(undefined),
  };
  const queryEmbedding = new QueryEmbeddingService(aiService as any);
  return {
    prisma,
    aiService,
    authorization,
    service: new CourseRetrievalService(
      prisma as any,
      queryEmbedding,
      authorization as any,
    ),
  };
}

describe('CourseRetrievalService', () => {
  beforeEach(() => {
    process.env.TEXT_EMBEDDING_MODEL = 'test-embedding-model';
    process.env.TEXT_EMBEDDING_DIMENSIONS = '1536';
  });

  afterEach(() => {
    delete process.env.TEXT_EMBEDDING_MODEL;
    delete process.env.TEXT_EMBEDDING_DIMENSIONS;
  });

  it('hybrid-ranks course summaries and hydrates learner-facing evidence', async () => {
    const fixture = createFixture();
    fixture.prisma.$queryRaw
      .mockResolvedValueOnce([
        { id: 'course-a', score: 0.9 },
        { id: 'course-b', score: 0.8 },
      ])
      .mockResolvedValueOnce([{ id: 'course-b', score: 0.7 }]);
    fixture.prisma.course.findMany.mockResolvedValue([
      course('course-a', 'Course A'),
      course('course-b', 'Course B'),
    ]);

    const result = await fixture.service.searchSummaries({
      query: 'build web applications',
      desiredSkills: ['TypeScript'],
      desiredOutcomes: ['Create a production application'],
      difficulty: Difficulty.INTERMEDIATE,
      difficultyMode: 'CONSTRAINT',
    });

    expect(fixture.aiService.createEmbeddings).toHaveBeenCalledWith([
      'build web applications TypeScript Create a production application',
    ]);
    expect(result.map((item) => item.id)).toEqual(['course-b', 'course-a']);
    expect(result[0]).toEqual(
      expect.objectContaining({
        title: 'Course B',
        skills: [
          expect.objectContaining({
            name: 'TypeScript',
            outcome: 'Build an application.',
          }),
        ],
        semanticScore: 0.8,
        keywordScore: 0.7,
      }),
    );
  });

  it('prefers the requested difficulty without excluding other matches', async () => {
    const fixture = createFixture();
    fixture.prisma.$queryRaw
      .mockResolvedValueOnce([
        { id: 'advanced', score: 0.9 },
        { id: 'beginner', score: 0.8 },
      ])
      .mockResolvedValueOnce([]);
    fixture.prisma.course.findMany.mockResolvedValue([
      {
        ...course('advanced', 'Advanced Course'),
        aiProfile: {
          ...course('advanced', 'Advanced Course').aiProfile,
          difficulty: Difficulty.ADVANCED,
        },
      },
      {
        ...course('beginner', 'Beginner Course'),
        aiProfile: {
          ...course('beginner', 'Beginner Course').aiProfile,
          difficulty: Difficulty.BEGINNER,
        },
      },
    ]);

    const result = await fixture.service.searchSummaries({
      query: 'web development',
      difficulty: Difficulty.BEGINNER,
      difficultyMode: 'PREFERENCE',
    });

    expect(result.map((item) => item.id)).toEqual(['beginner', 'advanced']);
    for (const [statement] of fixture.prisma.$queryRaw.mock.calls) {
      expect(statement.values).not.toContain(Difficulty.BEGINNER);
    }
  });

  it('loads public course summaries through summary authorization', async () => {
    const fixture = createFixture();
    const value = course('course-1', 'Course');
    fixture.prisma.course.findUniqueOrThrow.mockResolvedValue(value);

    await expect(
      fixture.service.getSummary('learner-1', 'course-1'),
    ).resolves.toBe(value);
    expect(fixture.authorization.assertCanAccess).toHaveBeenCalledWith(
      'learner-1',
      { type: AiContentResourceType.COURSE, id: 'course-1' },
      AiContentAccessMode.SUMMARY,
    );
  });

  it('loads several course summaries in the requested comparison order', async () => {
    const fixture = createFixture();
    fixture.prisma.course.findMany.mockResolvedValue([
      course('course-a', 'Course A'),
      course('course-b', 'Course B'),
    ]);

    const result = await fixture.service.getSummaries('learner-1', [
      'course-b',
      'course-a',
      'course-b',
    ]);

    expect(result.map((item) => item.id)).toEqual(['course-b', 'course-a']);
    expect(fixture.authorization.assertCanAccess).toHaveBeenCalledTimes(2);
  });

  it('requires detail authorization before loading course materials', async () => {
    const fixture = createFixture();
    fixture.prisma.course.findUniqueOrThrow.mockResolvedValue({
      ...course('course-1', 'Course'),
      posts: [],
      files: [],
    });

    await fixture.service.getDetails('learner-1', 'course-1');

    expect(fixture.authorization.assertCanAccess).toHaveBeenCalledWith(
      'learner-1',
      { type: AiContentResourceType.COURSE, id: 'course-1' },
      AiContentAccessMode.DETAILS,
    );
  });
});
