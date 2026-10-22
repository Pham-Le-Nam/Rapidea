import { Injectable, Logger } from '@nestjs/common';
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
const TITLE_SIMILARITY_THRESHOLD = 0.75;
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
  learningOutcomes: {
    orderBy: { sequence: 'asc' as const },
    select: { text: true },
  },
  prerequisiteSkills: {
    select: { reason: true, skill: { select: { id: true, name: true } } },
  },
} as const;

type CourseSummaryRecord = Prisma.CourseGetPayload<{
  select: typeof courseSummarySelect;
}>;

@Injectable()
export class CourseRetrievalService {
  private readonly logger = new Logger(CourseRetrievalService.name);

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
    const difficultyConstraint =
      input.difficultyMode === 'CONSTRAINT' ? (input.difficulty ?? null) : null;
    // Each phrase is an alternative discovery signal. Requiring every inferred
    // skill/outcome as well as the topic excludes otherwise relevant courses.
    const keywordQueries = [
      ...new Set(
        [
          input.query,
          ...(input.courseNames ?? []),
          ...(input.desiredSkills ?? []),
          ...(input.desiredOutcomes ?? []),
        ]
          .map((text) => text.trim())
          .filter(Boolean),
      ),
    ];

    const [semantic, keyword] = await Promise.all([
      this.semanticCandidates(searchText, difficultyConstraint, candidateLimit),
      this.prisma.$queryRaw<RankedCourse[]>(Prisma.sql`
                WITH "query" AS (
                    SELECT string_agg('(' || phrase || ')', ' | ')::tsquery AS "value"
                    FROM (
                        SELECT NULLIF(websearch_to_tsquery('english', text)::text, '') AS phrase
                        FROM unnest(${keywordQueries}::text[]) AS requested(text)
                    ) AS phrases
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
                LEFT JOIN "course_ai_profile" AS "profile"
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

    // Title discovery is independent of AI profiles. Trigram word similarity
    // also finds misspelled titles inside natural-language requests.
    const names = [
      ...new Set(
        [input.query, ...(input.courseNames ?? [])]
          .map((name) => this.normalizeTitle(name))
          .filter(Boolean),
      ),
    ];
    const titleMatches = await this.prisma.$queryRaw<RankedCourse[]>(Prisma.sql`
      WITH normalized_courses AS (
        SELECT "course"."id",
          trim(regexp_replace(translate(regexp_replace(
            normalize(lower("course"."title"), NFD), ${'[\u0300-\u036f]'}, '', 'g'
          ), 'đ', 'd'), '[^[:alnum:]]+', ' ', 'g')) AS title
        FROM "course" AS "course"
        LEFT JOIN "course_ai_profile" AS "profile" ON "profile"."courseId" = "course"."id"
        WHERE (${difficultyConstraint}::"Difficulty" IS NULL OR "profile"."difficulty" = ${difficultyConstraint}::"Difficulty")
      ), title_scores AS (
        SELECT id, max(CASE
          WHEN title = requested.name THEN 3::float8
          WHEN length(title) >= 3 AND strpos(' ' || requested.name || ' ', ' ' || title || ' ') > 0 THEN 2::float8
          WHEN length(requested.name) >= 3 AND strpos(' ' || title || ' ', ' ' || requested.name || ' ') > 0 THEN 2::float8
          WHEN least(length(title), length(requested.name)) >= 5 THEN greatest(
            word_similarity(title, requested.name),
            word_similarity(requested.name, title)
          )::float8
          ELSE 0::float8
        END) AS score
        FROM normalized_courses
        CROSS JOIN unnest(${names}::text[]) AS requested(name)
        WHERE title <> ''
        GROUP BY id
      )
      SELECT id, score FROM title_scores
      WHERE score >= ${TITLE_SIMILARITY_THRESHOLD}
      ORDER BY score DESC, id
      LIMIT ${candidateLimit}
    `);
    const fused = this.fuse(semantic, keyword);
    const titleIds = new Set(titleMatches.map((course) => course.id));
    const ranked = [
      ...this.fuse([], titleMatches),
      ...fused.filter((ranking) => !titleIds.has(ranking.item.id)),
    ].slice(0, limit);
    if (ranked.length === 0) return [];
    const courses = await this.prisma.course.findMany({
      where: { id: { in: ranked.map(({ item }) => item.id) } },
      select: courseSummarySelect,
    });
    const byId = new Map(courses.map((course) => [course.id, course]));

    const results = ranked.flatMap((ranking) => {
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

  private normalizeTitle(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .trim();
  }

  private async semanticCandidates(
    text: string,
    difficulty: CourseSearchInput['difficulty'] | null,
    limit: number,
  ): Promise<RankedCourse[]> {
    try {
      const { embedding, model } = await this.queryEmbedding.create(text);
      const vector = `[${embedding.join(',')}]`;
      return await this.prisma.$queryRaw<RankedCourse[]>(Prisma.sql`
        SELECT "profile"."courseId" AS "id",
          1 - ("profile"."embedding" <=> ${vector}::vector) AS "score"
        FROM "course_ai_profile" AS "profile"
        WHERE "profile"."embedding" IS NOT NULL
          AND "profile"."embeddingModel" = ${model}
          AND (${difficulty}::"Difficulty" IS NULL OR "profile"."difficulty" = ${difficulty}::"Difficulty")
        ORDER BY "profile"."embedding" <=> ${vector}::vector
        LIMIT ${limit}
      `);
    } catch {
      this.logger.warn(
        'Semantic course search unavailable; using keyword and title search.',
      );
      return [];
    }
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
      learningOutcomes: (course.learningOutcomes ?? []).map((o) => o.text),
      prerequisites: (course.prerequisiteSkills ?? []).map((p) => ({
        ...p.skill,
        reason: p.reason,
      })),
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
