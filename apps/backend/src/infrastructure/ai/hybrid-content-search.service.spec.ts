import { InternalServerErrorException } from '@nestjs/common';
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

function createFixture() {
  const prisma = {
    $queryRaw: jest.fn(),
  };
  const aiService = {
    createEmbeddings: jest.fn().mockResolvedValue([Array(1536).fill(0.1)]),
  };
  const authorization = {
    canAccess: jest.fn().mockResolvedValue(true),
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

  it('rejects an invalid query embedding', async () => {
    const fixture = createFixture();
    fixture.aiService.createEmbeddings.mockResolvedValue([[Number.NaN]]);

    await expect(
      fixture.service.search('learner-1', { query: 'typescript' }),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
    expect(fixture.prisma.$queryRaw).not.toHaveBeenCalled();
  });
});
