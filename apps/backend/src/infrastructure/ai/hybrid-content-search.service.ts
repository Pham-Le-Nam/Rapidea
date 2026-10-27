import { Injectable, Logger, Optional } from '@nestjs/common';
import { InstructorContentAuthorizationService } from './instructor-content-authorization.service';
import { Prisma } from '../../../generated/prisma/client';
import { reciprocalRankFuse } from '../../application/ai-chat/reciprocal-rank-fusion';
import {
  AiContentAccessMode,
  AiContentResourceType,
} from '../../application/ai-chat/ai-content-authorization.types';
import {
  ContentChunkSourceType,
  HybridContentSearchInput,
  HybridContentSearchResult,
} from '../../application/ai-chat/hybrid-content-search.types';
import { AiContentAuthorizationService } from './ai-content-authorization.service';
import { QueryEmbeddingService } from './query-embedding.service';
import { PrismaService } from '../database/prisma/prisma.service';

type RankedChunk = {
  id: string;
  sourceType: ContentChunkSourceType;
  sourceId: string;
  courseId: string | null;
  sequence: number;
  content: string;
  tokenCount: number;
  metadata: unknown;
  score: number;
  titleScore?: number;
};

type FusedChunk = HybridContentSearchResult & {
  semanticRank: number | null;
  keywordRank: number | null;
};

const DEFAULT_RESULT_LIMIT = 8;
const MAX_RESULT_LIMIT = 50;
const CANDIDATE_MULTIPLIER = 4;
const MAX_CANDIDATE_LIMIT = 200;
@Injectable()
export class HybridContentSearchService {
  private readonly logger = new Logger(HybridContentSearchService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly queryEmbedding: QueryEmbeddingService,
    private readonly authorization: AiContentAuthorizationService,
    @Optional()
    private readonly instructorAuthorization?: InstructorContentAuthorizationService,
  ) {}

  async search(
    userId: string,
    input: HybridContentSearchInput,
  ): Promise<HybridContentSearchResult[]> {
    const query = input.query.trim();
    if (!query) return [];

    const limit = this.resultLimit(input.limit);
    const candidateLimit = Math.min(
      limit * CANDIDATE_MULTIPLIER,
      MAX_CANDIDATE_LIMIT,
    );
    if (input.instructorOnly && !this.instructorAuthorization)
      throw new Error('Instructor authorization is not configured');
    let queryVector:
      | Awaited<ReturnType<QueryEmbeddingService['create']>>
      | undefined;
    try {
      queryVector = await this.queryEmbedding.create(query);
    } catch {
      this.logger.warn(
        'Semantic content search unavailable; using keyword and live post search.',
      );
    }
    const scope = Prisma.sql`${this.scopeSql(input)} ${input.instructorOnly ? this.instructorAuthorization!.chunkOwnershipSql(userId) : Prisma.empty}`;
    const queries = [
      ...new Set(
        [query, ...(input.keywordQueries ?? [])]
          .map((text) => text.trim())
          .filter(Boolean),
      ),
    ];

    const [semantic, keyword, posts] = await Promise.all([
      queryVector
        ? this.semanticCandidates(
            queryVector.embedding,
            queryVector.model,
            scope,
            candidateLimit,
          )
        : Promise.resolve([]),
      this.keywordCandidates(queries, scope, candidateLimit),
      this.postCandidates(userId, input, queries, candidateLimit),
    ]);

    const titleMatches = new Set(
      posts
        .filter((post) => Number(post.titleScore) >= 0.75)
        .map((post) => post.sourceId),
    );
    // Prefer current post text over potentially stale indexed copies when its
    // title directly matches the request, then retain hybrid passage ranking.
    const keepIndexed = (chunk: RankedChunk) =>
      chunk.sourceType !== ContentChunkSourceType.POST ||
      !titleMatches.has(chunk.sourceId);
    const fused = this.fuse(semantic.filter(keepIndexed), [
      ...posts,
      ...keyword.filter(keepIndexed),
    ]);
    fused.sort(
      (left, right) =>
        Number(
          right.sourceType === ContentChunkSourceType.POST &&
            titleMatches.has(right.sourceId),
        ) -
        Number(
          left.sourceType === ContentChunkSourceType.POST &&
            titleMatches.has(left.sourceId),
        ),
    );
    const authorized = await this.authorizedResults(
      userId,
      fused,
      input.accessMode ?? AiContentAccessMode.DETAILS,
      input.instructorOnly,
    );
    const results = await this.withSourceLabels(authorized.slice(0, limit));
    return results.map((result) => {
      const {
        semanticRank: _semanticRank,
        keywordRank: _keywordRank,
        ...safe
      } = result;
      return safe;
    });
  }

  private semanticCandidates(
    embedding: number[],
    embeddingModel: string,
    scope: Prisma.Sql,
    limit: number,
  ): Promise<RankedChunk[]> {
    const vector = `[${embedding.join(',')}]`;
    return this.prisma.$queryRaw<RankedChunk[]>(Prisma.sql`
            SELECT
                "id",
                "sourceType",
                "sourceId",
                "courseId",
                "sequence",
                "content",
                "tokenCount",
                "metadata",
                1 - ("embedding" <=> ${vector}::vector) AS "score"
            FROM "content_chunk" AS "chunk"
            WHERE "embedding" IS NOT NULL
              AND "embeddingModel" = ${embeddingModel}
              ${scope}
            ORDER BY "embedding" <=> ${vector}::vector
            LIMIT ${limit}
        `);
  }

  private keywordCandidates(
    queries: string[],
    scope: Prisma.Sql,
    limit: number,
  ): Promise<RankedChunk[]> {
    return this.prisma.$queryRaw<RankedChunk[]>(Prisma.sql`
            WITH "query" AS (
                ${this.keywordQuerySql(queries)}
            )
            SELECT
                "chunk"."id",
                "chunk"."sourceType",
                "chunk"."sourceId",
                "chunk"."courseId",
                "chunk"."sequence",
                "chunk"."content",
                "chunk"."tokenCount",
                "chunk"."metadata",
                ts_rank_cd(
                    to_tsvector('english', "chunk"."content"),
                    "query"."value"
                ) AS "score"
            FROM "content_chunk" AS "chunk"
            CROSS JOIN "query"
            WHERE to_tsvector('english', "chunk"."content") @@ "query"."value"
              ${scope}
            ORDER BY "score" DESC
            LIMIT ${limit}
        `);
  }

  private keywordQuerySql(queries: string[]): Prisma.Sql {
    return Prisma.sql`SELECT string_agg('(' || phrase || ')', ' | ')::tsquery AS "value"
      FROM (SELECT nullif(websearch_to_tsquery('english', text)::text, '') AS phrase
        FROM unnest(${queries}::text[]) AS requested(text)) AS phrases`;
  }

  private async postCandidates(
    userId: string,
    input: HybridContentSearchInput,
    queries: string[],
    limit: number,
  ): Promise<RankedChunk[]> {
    if (
      input.sourceTypes?.length &&
      !input.sourceTypes.includes(ContentChunkSourceType.POST)
    )
      return [];
    const access = input.instructorOnly
      ? Prisma.sql`("post"."userId" = ${userId} OR "course"."userId" = ${userId})`
      : this.authorization.postAccessSql(userId);
    const names = queries
      .map((text) =>
        text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^\p{L}\p{N}]+/gu, ' ')
          .trim(),
      )
      .filter(Boolean);
    const posts = await this.prisma.$queryRaw<RankedChunk[]>(Prisma.sql`
      WITH "query" AS (${this.keywordQuerySql(queries)}), live_posts AS (
        SELECT 'post:' || "post"."id" AS id, 'POST'::"ContentSourceType" AS "sourceType",
          "post"."id" AS "sourceId", "post"."courseId", -1 AS sequence,
          "post"."title", "post"."summary",
          CASE WHEN jsonb_typeof("post"."content") = 'string' THEN "post"."content" #>> '{}'
            ELSE (SELECT string_agg(value #>> '{}', E'\n')
              FROM jsonb_path_query("post"."content", 'strict $.** ? (@.text.type() == "string").text') AS fragments(value)) END AS body,
          jsonb_build_object('title', "post"."title", 'summary', "post"."summary", 'courseTitle', "course"."title") AS metadata,
          trim(regexp_replace(regexp_replace(normalize(lower(coalesce("post"."title", '')), NFD), ${'[\u0300-\u036f]'}, '', 'g'), '[^[:alnum:]]+', ' ', 'g')) AS normalized_title,
          setweight(to_tsvector('english', coalesce("post"."title", '')), 'A') ||
          setweight(to_tsvector('english', coalesce("post"."summary", '')), 'B') ||
          setweight(jsonb_to_tsvector('english', coalesce("post"."content", '{}'::jsonb), '["string"]'::jsonb), 'C') ||
          setweight(to_tsvector('english', coalesce("course"."title", '')), 'D') AS document
        FROM "post" AS "post"
        LEFT JOIN "course" AS "course" ON "course"."id" = "post"."courseId"
        WHERE ${access}
      ), post_rankings AS (
        SELECT "chunk".*, "query"."value", ts_rank_cd(document, "query"."value") AS keyword_score,
          coalesce((SELECT max(CASE WHEN normalized_title = name THEN 1::float8
            WHEN length(normalized_title) >= 5 AND strpos(' ' || name || ' ', ' ' || normalized_title || ' ') > 0 THEN 1::float8
            WHEN least(length(normalized_title), length(name)) >= 5 THEN word_similarity(normalized_title, name)::float8
            ELSE 0::float8 END) FROM unnest(${names}::text[]) AS requested(name)), 0) AS "titleScore"
        FROM live_posts AS "chunk" CROSS JOIN "query"
        WHERE true ${this.scopeSql(input)}
      )
      SELECT id, "sourceType", "sourceId", "courseId", sequence, metadata, "titleScore",
        concat_ws(E'\n\n', title, summary, ts_headline('english', coalesce(body, ''), "value", 'MaxWords=150, MinWords=50, MaxFragments=3')) AS content,
        0 AS "tokenCount", ("titleScore" + coalesce(keyword_score, 0))::float8 AS score
      FROM post_rankings
      WHERE document @@ "value" OR "titleScore" >= 0.75
      ORDER BY "titleScore" DESC, keyword_score DESC NULLS LAST, "sourceId"
      LIMIT ${limit}
    `);
    return posts.map((post) => ({
      ...post,
      tokenCount: Math.ceil(post.content.length / 4),
    }));
  }

  private async withSourceLabels(results: FusedChunk[]): Promise<FusedChunk[]> {
    const postIds = [
      ...new Set(
        results
          .filter((r) => r.sourceType === ContentChunkSourceType.POST)
          .map((r) => r.sourceId),
      ),
    ];
    const posts = postIds.length
      ? await this.prisma.post.findMany({
          where: { id: { in: postIds } },
          select: { id: true, title: true, summary: true },
        })
      : [];
    const byId = new Map(posts.map((post) => [post.id, post]));
    return results.map((result) => {
      const post =
        result.sourceType === ContentChunkSourceType.POST
          ? byId.get(result.sourceId)
          : undefined;
      if (!post) return result;
      const metadata =
        result.metadata &&
        typeof result.metadata === 'object' &&
        !Array.isArray(result.metadata)
          ? result.metadata
          : {};
      return {
        ...result,
        metadata: { ...metadata, title: post.title, summary: post.summary },
      };
    });
  }

  private fuse(
    semantic: readonly RankedChunk[],
    keyword: readonly RankedChunk[],
  ): FusedChunk[] {
    return reciprocalRankFuse(semantic, keyword, (candidate) =>
      this.logicalChunkKey(candidate),
    ).map(
      ({
        item: candidate,
        semanticScore,
        keywordScore,
        semanticRank,
        keywordRank,
        combinedScore,
      }) => ({
        chunkId: candidate.id,
        sourceType: candidate.sourceType,
        sourceId: candidate.sourceId,
        courseId: candidate.courseId,
        sequence: candidate.sequence,
        content: candidate.content,
        tokenCount: candidate.tokenCount,
        metadata: candidate.metadata,
        semanticScore,
        keywordScore,
        semanticRank,
        keywordRank,
        combinedScore,
      }),
    );
  }

  private async authorizedResults(
    userId: string,
    candidates: readonly FusedChunk[],
    mode: AiContentAccessMode,
    instructorOnly = false,
  ): Promise<FusedChunk[]> {
    const decisions = new Map<string, Promise<boolean>>();
    const checks = candidates.map(async (candidate) => {
      const sourceKey = `${candidate.sourceType}:${candidate.sourceId}`;
      let decision = decisions.get(sourceKey);
      if (!decision) {
        decision = instructorOnly
          ? this.instructorAuthorization!.canAccess(
              userId,
              this.authorizationType(candidate.sourceType),
              candidate.sourceId,
            )
          : this.authorization.canAccess(
              userId,
              {
                type: this.authorizationType(candidate.sourceType),
                id: candidate.sourceId,
              },
              mode,
            );
        decisions.set(sourceKey, decision);
      }
      return (await decision) ? candidate : null;
    });

    return (await Promise.all(checks)).filter(
      (candidate): candidate is FusedChunk => candidate !== null,
    );
  }

  private scopeSql(input: HybridContentSearchInput): Prisma.Sql {
    const filters: Prisma.Sql[] = [];
    const sourceTypes = [...new Set(input.sourceTypes ?? [])];
    if (sourceTypes.length > 0) {
      filters.push(Prisma.sql`"sourceType" IN (${Prisma.join(sourceTypes)})`);
    }

    const courseIds = [...new Set(input.courseIds ?? [])];
    const sources = [
      ...new Map(
        (input.sources ?? []).map((source) => [
          `${source.sourceType}:${source.sourceId}`,
          source,
        ]),
      ).values(),
    ];
    const scopeParts: Prisma.Sql[] = [];
    if (courseIds.length > 0) {
      scopeParts.push(Prisma.sql`"courseId" IN (${Prisma.join(courseIds)})`);
    }
    if (sources.length > 0) {
      scopeParts.push(
        Prisma.sql`(${Prisma.join(
          sources.map(
            (source) =>
              Prisma.sql`("sourceType" = ${source.sourceType}::"ContentSourceType" AND "sourceId" = ${source.sourceId})`,
          ),
          ' OR ',
        )})`,
      );
    }
    if (scopeParts.length > 0) {
      filters.push(Prisma.sql`(${Prisma.join(scopeParts, ' OR ')})`);
    }

    return filters.length > 0
      ? Prisma.sql`AND ${Prisma.join(filters, ' AND ')}`
      : Prisma.empty;
  }

  private authorizationType(
    sourceType: ContentChunkSourceType,
  ): AiContentResourceType {
    switch (sourceType) {
      case ContentChunkSourceType.FILE:
        return AiContentResourceType.FILE;
      case ContentChunkSourceType.POST:
        return AiContentResourceType.POST;
      case ContentChunkSourceType.DISCUSSION:
        return AiContentResourceType.DISCUSSION;
      case ContentChunkSourceType.REVIEW:
        return AiContentResourceType.REVIEW;
    }
  }

  private logicalChunkKey(chunk: RankedChunk): string {
    return `${chunk.sourceType}:${chunk.sourceId}:${chunk.sequence}`;
  }

  private resultLimit(value?: number): number {
    if (!Number.isInteger(value)) return DEFAULT_RESULT_LIMIT;
    return Math.min(Math.max(value as number, 1), MAX_RESULT_LIMIT);
  }
}
