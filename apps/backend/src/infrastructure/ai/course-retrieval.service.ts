import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import {
  ReciprocalRankFusionResult,
  reciprocalRankFuse,
} from '../../application/ai-chat/reciprocal-rank-fusion';
import {
  AiContentAccessMode,
  AiContentResourceType,
} from '../../application/ai-chat/ai-content-authorization.types';
import {
  CourseSearchInput,
  CourseSearchResult,
} from '../../application/ai-chat/retrieval-primitives.types';
import { PrismaService } from '../database/prisma/prisma.service';
import { AiContentAuthorizationService } from './ai-content-authorization.service';
import { QueryEmbeddingService } from './query-embedding.service';

type RankedCourse = {
  id: string;
  score: number;
};

type FusedCourse = ReciprocalRankFusionResult<RankedCourse>;

const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 20;
const CANDIDATE_MULTIPLIER = 4;
const courseSummarySelect = {
  id: true,
  title: true,
  description: true,
  price: true,
  currency: true,
  rating: true,
  ratingCount: true,
  subscribersCount: true,
  user: {
    select: {
      username: true,
      firstname: true,
      middlename: true,
      lastname: true,
    },
  },
  aiProfile: {
    select: {
      summary: true,
      difficulty: true,
      profileText: true,
      profileVersion: true,
      generatedAt: true,
    },
  },
  skills: {
    orderBy: { importance: 'desc' as const },
    select: {
      outcome: true,
      importance: true,
      skill: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
  },
  tags: {
    select: { tag: { select: { name: true } } },
  },
} as const;

type CourseSummaryRecord = Prisma.CourseGetPayload<{
  select: typeof courseSummarySelect;
}>;

@Injectable()
export class CourseRetrievalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queryEmbedding: QueryEmbeddingService,
    private readonly authorization: AiContentAuthorizationService,
  ) {}

  async searchSummaries(
    input: CourseSearchInput,
  ): Promise<CourseSearchResult[]> {
    const searchText = this.searchText(input);
    if (!searchText) return [];

    const limit = this.limit(input.limit);
    const candidateLimit = limit * CANDIDATE_MULTIPLIER;
    const { embedding, model: embeddingModel } =
      await this.queryEmbedding.create(searchText);
    const vector = `[${embedding.join(',')}]`;
    const difficultyConstraint =
      input.difficultyMode === 'CONSTRAINT' ? (input.difficulty ?? null) : null;

    const [semantic, keyword] = await Promise.all([
      this.prisma.$queryRaw<RankedCourse[]>(Prisma.sql`
                SELECT
                    "profile"."courseId" AS "id",
                    1 - ("profile"."embedding" <=> ${vector}::vector) AS "score"
                FROM "course_ai_profile" AS "profile"
                WHERE "profile"."embedding" IS NOT NULL
                  AND "profile"."embeddingModel" = ${embeddingModel}
                  AND (${difficultyConstraint}::"Difficulty" IS NULL OR "profile"."difficulty" = ${difficultyConstraint}::"Difficulty")
                ORDER BY "profile"."embedding" <=> ${vector}::vector
                LIMIT ${candidateLimit}
            `),
      this.prisma.$queryRaw<RankedCourse[]>(Prisma.sql`
                WITH "query" AS (
                    SELECT websearch_to_tsquery('english', ${searchText}) AS "value"
                )
                SELECT
                    "course"."id",
                    ts_rank_cd(
                        to_tsvector(
                            'english',
                            concat_ws(
                                ' ',
                                "course"."title",
                                "course"."description",
                                "profile"."summary",
                                "profile"."profileText"
                            )
                        ),
                        "query"."value"
                    ) AS "score"
                FROM "course" AS "course"
                INNER JOIN "course_ai_profile" AS "profile"
                    ON "profile"."courseId" = "course"."id"
                CROSS JOIN "query"
                WHERE to_tsvector(
                    'english',
                    concat_ws(
                        ' ',
                        "course"."title",
                        "course"."description",
                        "profile"."summary",
                        "profile"."profileText"
                    )
                ) @@ "query"."value"
                  AND (${difficultyConstraint}::"Difficulty" IS NULL OR "profile"."difficulty" = ${difficultyConstraint}::"Difficulty")
                ORDER BY "score" DESC
                LIMIT ${candidateLimit}
            `),
    ]);

    const fused = this.fuse(semantic, keyword).slice(0, limit);
    if (fused.length === 0) return [];
    const courses = await this.prisma.course.findMany({
      where: { id: { in: fused.map(({ item }) => item.id) } },
      select: courseSummarySelect,
    });
    const byId = new Map(courses.map((course) => [course.id, course]));

    const results = fused.flatMap((ranking) => {
      const course = byId.get(ranking.item.id);
      if (!course) return [];
      return [this.toSearchResult(course, ranking)];
    });
    if (input.difficultyMode !== 'PREFERENCE' || !input.difficulty) {
      return results;
    }

    return results.sort((left, right) => {
      const leftMatches = left.profile?.difficulty === input.difficulty;
      const rightMatches = right.profile?.difficulty === input.difficulty;
      return Number(rightMatches) - Number(leftMatches);
    });
  }

  async getSummary(userId: string, courseId: string) {
    await this.authorization.assertCanAccess(
      userId,
      { type: AiContentResourceType.COURSE, id: courseId },
      AiContentAccessMode.SUMMARY,
    );
    return this.prisma.course.findUniqueOrThrow({
      where: { id: courseId },
      select: courseSummarySelect,
    });
  }

  async getSummaries(userId: string, courseIds: readonly string[]) {
    const uniqueIds = [...new Set(courseIds)];
    await Promise.all(
      uniqueIds.map((courseId) =>
        this.authorization.assertCanAccess(
          userId,
          { type: AiContentResourceType.COURSE, id: courseId },
          AiContentAccessMode.SUMMARY,
        ),
      ),
    );
    const courses = await this.prisma.course.findMany({
      where: { id: { in: uniqueIds } },
      select: courseSummarySelect,
    });
    const byId = new Map(courses.map((course) => [course.id, course]));
    return uniqueIds.flatMap((courseId) => {
      const course = byId.get(courseId);
      return course ? [course] : [];
    });
  }

  async getDetails(userId: string, courseId: string) {
    await this.authorization.assertCanAccess(
      userId,
      { type: AiContentResourceType.COURSE, id: courseId },
      AiContentAccessMode.DETAILS,
    );
    return this.prisma.course.findUniqueOrThrow({
      where: { id: courseId },
      select: {
        ...courseSummarySelect,
        posts: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            title: true,
            summary: true,
            isPreview: true,
            createdAt: true,
            lastUpdated: true,
            skills: {
              orderBy: { importance: 'desc' },
              select: {
                outcome: true,
                importance: true,
                confidence: true,
                skill: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
        files: {
          orderBy: { createdAt: 'asc' },
          select: {
            file: {
              select: {
                id: true,
                name: true,
                mimeType: true,
                summary: true,
              },
            },
          },
        },
      },
    });
  }

  private fuse(
    semantic: readonly RankedCourse[],
    keyword: readonly RankedCourse[],
  ): FusedCourse[] {
    return reciprocalRankFuse(semantic, keyword, (candidate) => candidate.id);
  }

  private toSearchResult(
    course: CourseSummaryRecord,
    ranking: FusedCourse,
  ): CourseSearchResult {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      currency: course.currency,
      rating: course.rating,
      ratingCount: course.ratingCount,
      subscribersCount: course.subscribersCount,
      creator: course.user,
      profile: course.aiProfile,
      skills: course.skills.map((item) => ({
        ...item.skill,
        outcome: item.outcome,
        importance: item.importance,
      })),
      tags: course.tags.map((item) => item.tag.name),
      semanticScore: ranking.semanticScore,
      keywordScore: ranking.keywordScore,
      combinedScore: ranking.combinedScore,
    };
  }

  private searchText(input: CourseSearchInput): string {
    return [
      input.query,
      ...(input.desiredSkills ?? []),
      ...(input.desiredOutcomes ?? []),
    ]
      .map((value) => value.trim())
      .filter(Boolean)
      .join(' ');
  }

  private limit(value?: number): number {
    if (!Number.isInteger(value)) return DEFAULT_LIMIT;
    return Math.min(Math.max(value as number, 1), MAX_LIMIT);
  }
}
