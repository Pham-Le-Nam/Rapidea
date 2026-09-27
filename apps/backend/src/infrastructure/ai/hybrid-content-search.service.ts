import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import { ContentSourceType } from '../../../generated/prisma/enums';
import { reciprocalRankFuse } from '../../application/ai-chat/reciprocal-rank-fusion';
import {
    AiContentAccessMode,
    AiContentResourceType,
} from '../../application/ai-chat/ai-content-authorization.types';
import {
    HybridContentSearchInput,
    HybridContentSearchResult,
} from '../../application/ai-chat/hybrid-content-search.types';
import { AiContentAuthorizationService } from './ai-content-authorization.service';
import { QueryEmbeddingService } from './query-embedding.service';
import { PrismaService } from '../database/prisma/prisma.service';

type RankedChunk = {
    id: string;
    sourceType: ContentSourceType;
    sourceId: string;
    courseId: string | null;
    sequence: number;
    content: string;
    tokenCount: number;
    metadata: unknown;
    score: number;
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
    constructor(
        private readonly prisma: PrismaService,
        private readonly queryEmbedding: QueryEmbeddingService,
        private readonly authorization: AiContentAuthorizationService,
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
        const { embedding, model } = await this.queryEmbedding.create(query);
        const scope = this.scopeSql(input);

        const [semantic, keyword] = await Promise.all([
            this.semanticCandidates(
                embedding,
                model,
                scope,
                candidateLimit,
            ),
            this.keywordCandidates(query, scope, candidateLimit),
        ]);

        const fused = this.fuse(semantic, keyword);
        const authorized = await this.authorizedResults(
            userId,
            fused,
            input.accessMode ?? AiContentAccessMode.DETAILS,
        );
        return authorized.slice(0, limit).map((result) => {
            const { semanticRank: _semanticRank, keywordRank: _keywordRank, ...safe } = result;
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
            FROM "content_chunk"
            WHERE "embedding" IS NOT NULL
              AND "embeddingModel" = ${embeddingModel}
              ${scope}
            ORDER BY "embedding" <=> ${vector}::vector
            LIMIT ${limit}
        `);
    }

    private keywordCandidates(
        query: string,
        scope: Prisma.Sql,
        limit: number,
    ): Promise<RankedChunk[]> {
        return this.prisma.$queryRaw<RankedChunk[]>(Prisma.sql`
            WITH "query" AS (
                SELECT websearch_to_tsquery('english', ${query}) AS "value"
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

    private fuse(
        semantic: readonly RankedChunk[],
        keyword: readonly RankedChunk[],
    ): FusedChunk[] {
        return reciprocalRankFuse(
            semantic,
            keyword,
            (candidate) => this.logicalChunkKey(candidate),
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
    ): Promise<FusedChunk[]> {
        const decisions = new Map<string, Promise<boolean>>();
        const checks = candidates.map(async (candidate) => {
            const sourceKey = `${candidate.sourceType}:${candidate.sourceId}`;
            let decision = decisions.get(sourceKey);
            if (!decision) {
                decision = this.authorization.canAccess(
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
            filters.push(
                Prisma.sql`"sourceType" IN (${Prisma.join(sourceTypes)})`,
            );
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
            scopeParts.push(
                Prisma.sql`"courseId" IN (${Prisma.join(courseIds)})`,
            );
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
        sourceType: ContentSourceType,
    ): AiContentResourceType {
        switch (sourceType) {
            case ContentSourceType.FILE:
                return AiContentResourceType.FILE;
            case ContentSourceType.POST:
                return AiContentResourceType.POST;
            case ContentSourceType.DISCUSSION:
                return AiContentResourceType.DISCUSSION;
            case ContentSourceType.REVIEW:
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
