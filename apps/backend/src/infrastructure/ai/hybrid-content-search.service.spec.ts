import { Prisma } from '../../../generated/prisma/client';
import { AiContentAccessMode } from '../../application/ai-chat/ai-content-authorization.types';
import { ContentChunkSourceType } from '../../application/ai-chat/hybrid-content-search.types';
import { HybridContentSearchService } from './hybrid-content-search.service';
import { QueryEmbeddingService } from './query-embedding.service';

function chunk(id: string, sourceId: string, score: number, sequence = 0) {
  return {
    id,
    sourceType: ContentChunkSourceType.POST,
    sourceId,
    courseId: 'course-1',
    sequence,
    content: `Content for ${sourceId}`,
    tokenCount: 4,
    metadata: { title: sourceId },
    score,
  };
}

const RETRIEVAL_QUALITY_FIXTURES = [
  {
    name: 'promotes content supported by both semantic and keyword retrieval',
    semantic: [
      chunk('semantic-only', 'post-semantic', 0.95),
      chunk('both', 'post-both', 0.88),
    ],
    keyword: [chunk('both', 'post-both', 0.72)],
    expectedSourceOrder: ['post-both', 'post-semantic'],
  },
  {
    name: 'lets an exact keyword match rescue a lower semantic result',
    semantic: [
      chunk('conceptual', 'post-conceptual', 0.92),
      chunk('exact', 'post-exact', 0.75),
    ],
    keyword: [chunk('exact', 'post-exact', 0.98)],
    expectedSourceOrder: ['post-exact', 'post-conceptual'],
  },
] as const;

function createFixture() {
  const prisma = {
    $queryRaw: jest.fn().mockResolvedValue([]),
    post: { findMany: jest.fn().mockResolvedValue([]) },
  };
  const aiService = {
    createEmbeddings: jest.fn().mockResolvedValue([Array(1536).fill(0.1)]),
  };
  const authorization = {
    canAccess: jest.fn().mockResolvedValue(true),
    postAccessSql: () => Prisma.sql`true`,
  };
  const queryEmbedding = new QueryEmbeddingService(aiService as any);
  return {
    prisma,
    aiService,
    authorization,
    service: new HybridContentSearchService(
      prisma as any,
      queryEmbedding,
      authorization as any,
    ),
  };
}

describe('HybridContentSearchService', () => {
  beforeEach(() => {
    process.env.TEXT_EMBEDDING_MODEL = 'test-embedding-model';
    process.env.TEXT_EMBEDDING_DIMENSIONS = '1536';
  });

  afterEach(() => {
    delete process.env.TEXT_EMBEDDING_MODEL;
    delete process.env.TEXT_EMBEDDING_DIMENSIONS;
  });

  it('fuses semantic and keyword ranks and filters unauthorized results', async () => {
    const fixture = createFixture();
    fixture.prisma.$queryRaw
      .mockResolvedValueOnce([
        chunk('chunk-a', 'post-a', 0.95),
        chunk('chunk-b', 'post-b', 0.8),
        chunk('chunk-c', 'post-c', 0.7),
      ])
      .mockResolvedValueOnce([
        chunk('chunk-b', 'post-b', 0.6),
        chunk('chunk-c', 'post-c', 0.5),
      ]);
    fixture.authorization.canAccess.mockImplementation((_userId, resource) =>
      Promise.resolve(resource.id !== 'post-c'),
    );

    const result = await fixture.service.search('learner-1', {
      query: 'dependency injection',
      accessMode: AiContentAccessMode.DETAILS,
      limit: 5,
    });

    expect(result.map((item) => item.sourceId)).toEqual(['post-b', 'post-a']);
    expect(result[0]).toEqual(
      expect.objectContaining({
        semanticScore: 0.8,
        keywordScore: 0.6,
        combinedScore: expect.any(Number),
      }),
    );
    expect(result[0]).not.toHaveProperty('semanticRank');
    expect(result[0]).not.toHaveProperty('keywordRank');
  });

  it('deduplicates course copies and authorizes a source only once', async () => {
    const fixture = createFixture();
    fixture.prisma.$queryRaw
      .mockResolvedValueOnce([
        chunk('course-copy-1', 'post-a', 0.9),
        {
          ...chunk('course-copy-2', 'post-a', 0.8),
          courseId: 'course-2',
        },
        chunk('second-sequence', 'post-a', 0.7, 1),
      ])
      .mockResolvedValueOnce([]);

    const result = await fixture.service.search('learner-1', {
      query: 'closures',
    });

    expect(result).toHaveLength(2);
    expect(fixture.authorization.canAccess).toHaveBeenCalledTimes(1);
  });

  it.each(RETRIEVAL_QUALITY_FIXTURES)(
    '$name',
    async ({ semantic, keyword, expectedSourceOrder }) => {
      const fixture = createFixture();
      fixture.prisma.$queryRaw
        .mockResolvedValueOnce(semantic)
        .mockResolvedValueOnce(keyword);

      const result = await fixture.service.search('learner-1', {
        query: 'quality fixture query',
        limit: expectedSourceOrder.length,
      });

      expect(result.map((item) => item.sourceId)).toEqual(expectedSourceOrder);
    },
  );

  it('adds course, source, and source-type scope through parameterized SQL', async () => {
    const fixture = createFixture();
    fixture.prisma.$queryRaw
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    await fixture.service.search('learner-1', {
      query: 'react state',
      courseIds: ['course-1'],
      sources: [
        {
          sourceType: ContentChunkSourceType.POST,
          sourceId: 'post-1',
        },
      ],
      sourceTypes: [ContentChunkSourceType.POST],
    });

    for (const [statement] of fixture.prisma.$queryRaw.mock.calls) {
      expect(statement.values).toEqual(
        expect.arrayContaining([
          'course-1',
          ContentChunkSourceType.POST,
          'post-1',
        ]),
      );
    }
  });

  it('returns immediately for an empty query', async () => {
    const fixture = createFixture();

    await expect(
      fixture.service.search('learner-1', { query: '   ' }),
    ).resolves.toEqual([]);
    expect(fixture.aiService.createEmbeddings).not.toHaveBeenCalled();
    expect(fixture.prisma.$queryRaw).not.toHaveBeenCalled();
  });

  it('retains lexical discovery when the embedding vector is invalid', async () => {
    const fixture = createFixture();
    fixture.aiService.createEmbeddings.mockResolvedValue([[Number.NaN]]);

    await expect(
      fixture.service.search('learner-1', { query: 'typescript' }),
    ).resolves.toEqual([]);
    expect(fixture.prisma.$queryRaw).toHaveBeenCalledTimes(2);
  });

  it('discovers an unindexed matching title ahead of unrelated hybrid evidence and labels its citation', async () => {
    const fixture = createFixture();
    const direct = {
      ...chunk('post:memory', 'memory', 1),
      sequence: -1,
      titleScore: 1,
      content: 'Memory Hierarchy: caches, RAM and storage.',
    };
    fixture.prisma.$queryRaw
      .mockResolvedValueOnce([chunk('database', 'database', 0.99)])
      .mockResolvedValueOnce([chunk('database', 'database', 0.99)])
      .mockResolvedValueOnce([direct]);
    fixture.prisma.post.findMany.mockResolvedValue([
      {
        id: 'memory',
        title: 'Memory Hierarchy',
        summary: 'Computer architecture memory systems.',
      },
    ]);

    const results = await fixture.service.search('owner', {
      query: 'memory hierarchy computer architecture',
      limit: 1,
    });

    expect(results).toHaveLength(1);
    expect(results[0]).toEqual(
      expect.objectContaining({
        sourceId: 'memory',
        metadata: expect.objectContaining({ title: 'Memory Hierarchy' }),
      }),
    );
    expect(fixture.authorization.canAccess).toHaveBeenCalledWith(
      'owner',
      { type: 'POST', id: 'memory' },
      AiContentAccessMode.DETAILS,
    );
  });

  it('never returns unauthorized live post text or hydrates its title', async () => {
    const fixture = createFixture();
    fixture.prisma.$queryRaw
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          ...chunk('post:private', 'private', 1),
          titleScore: 1,
          content: 'PRIVATE MEMORY POST',
        },
      ]);
    fixture.authorization.canAccess.mockResolvedValue(false);
    const results = await fixture.service.search('stranger', {
      query: 'memory hierarchy',
    });
    expect(results).toEqual([]);
    expect(fixture.prisma.post.findMany).not.toHaveBeenCalled();
  });

  it('does not search posts for file-only requests', async () => {
    const fixture = createFixture();
    await fixture.service.search('owner', {
      query: 'memory hierarchy',
      sourceTypes: [ContentChunkSourceType.FILE],
    });
    expect(fixture.prisma.$queryRaw).toHaveBeenCalledTimes(2);
  });
});
