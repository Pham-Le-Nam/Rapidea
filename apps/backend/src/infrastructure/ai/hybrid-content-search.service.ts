import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import { ContentSourceType } from '../../../generated/prisma/enums';
import {
    AiContentAccessMode,
    AiContentResourceType,
} from '../../application/ai-chat/ai-content-authorization.types';
import {
    HybridContentSearchInput,
    HybridContentSearchResult,
} from '../../application/ai-chat/hybrid-content-search.types';
import { AI_SERVICE, AiService } from '../../application/ports/ai.service';
import {
    AiModelEnvironmentVariable,
    requiredAiModel,
    requiredEmbeddingDimensions,
} from './ai-model-config';
import { AiContentAuthorizationService } from './ai-content-authorization.service';
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
const RRF_RANK_CONSTANT = 60;

@Injectable()
export class HybridContentSearchService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(AI_SERVICE) private readonly aiService: AiService,
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
        const embeddingModel = requiredAiModel(
            AiModelEnvironmentVariable.TEXT_EMBEDDING,
        );
        const queryEmbedding = await this.queryEmbedding(query);
        const scope = this.scopeSql(input);

        const [semantic, keyword] = await Promise.all([
            this.semanticCandidates(
                queryEmbedding,
                embeddingModel,
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

    private async queryEmbedding(query: string): Promise<number[]> {
        const dimensions = requiredEmbeddingDimensions();
        const embeddings = await this.aiService.createEmbeddings([query]);
        const embedding = embeddings?.[0];
        if (
            !embedding ||
            embedding.length !== dimensions ||
            embedding.some((value) => !Number.isFinite(value))
        ) {
            throw new InternalServerErrorException(
                'Embedding model returned an invalid search vector',
            );
        }
        return embedding;
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
        const fused = new Map<string, FusedChunk>();
        this.addRankedCandidates(fused, semantic, 'semantic');
        this.addRankedCandidates(fused, keyword, 'keyword');
        return [...fused.values()].sort(
            (left, right) => right.combinedScore - left.combinedScore,
        );
    }

    private addRankedCandidates(
        fused: Map<string, FusedChunk>,
        candidates: readonly RankedChunk[],
        kind: 'semantic' | 'keyword',
    ): void {
        candidates.forEach((candidate, index) => {
            const rank = index + 1;
            const key = this.logicalChunkKey(candidate);
            const existing = fused.get(key) ?? {
                chunkId: candidate.id,
                sourceType: candidate.sourceType,
                sourceId: candidate.sourceId,
                courseId: candidate.courseId,
                sequence: candidate.sequence,
                content: candidate.content,
                tokenCount: candidate.tokenCount,
                metadata: candidate.metadata,
                semanticScore: null,
                keywordScore: null,
                semanticRank: null,
                keywordRank: null,
                combinedScore: 0,
            };

            if (kind === 'semantic') {
                existing.semanticScore = Number(candidate.score);
                existing.semanticRank = rank;
            } else {
                existing.keywordScore = Number(candidate.score);
                existing.keywordRank = rank;
            }
            existing.combinedScore =
                this.reciprocalRank(existing.semanticRank) +
                this.reciprocalRank(existing.keywordRank);
            fused.set(key, existing);
        });
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

    private reciprocalRank(rank: number | null): number {
        return rank === null ? 0 : 1 / (RRF_RANK_CONSTANT + rank);
    }

    private resultLimit(value?: number): number {
        if (!Number.isInteger(value)) return DEFAULT_RESULT_LIMIT;
        return Math.min(Math.max(value as number, 1), MAX_RESULT_LIMIT);
    }
}
