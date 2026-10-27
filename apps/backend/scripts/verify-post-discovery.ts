/** Actual retrieval SQL over synthetic CTE rows; no stored data or model calls. */
import 'dotenv/config';
import assert from 'node:assert/strict';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../src/infrastructure/database/prisma/prisma.service';
import { AiContentAuthorizationService } from '../src/infrastructure/ai/ai-content-authorization.service';
import { InstructorContentAuthorizationService } from '../src/infrastructure/ai/instructor-content-authorization.service';
import { HybridContentSearchService } from '../src/infrastructure/ai/hybrid-content-search.service';
import { ContentChunkSourceType as Source } from '../src/application/ai-chat/hybrid-content-search.types';
import { RapideiaEvidenceService } from '../src/application/ai-chat/rapideia-evidence.service';
import { IntentEvidenceKind } from '../src/application/ai-chat/intent-retrieval.types';
import { LearnerIntent } from '../src/application/ai-chat/learner-query.types';

async function main() {
  if (!['localhost', '127.0.0.1', '::1'].includes(process.env.DB_HOST ?? '')) {
    throw new Error('This verifier is restricted to localhost');
  }
  const db = new PrismaService();
  const posts = [
    {
      id: 'memory',
      title: 'Memory Hierarchy',
      courseId: 'architecture',
      userId: 'collaborator',
      isPreview: false,
      text: 'Registers, caches, main memory and storage form the memory hierarchy.',
    },
    {
      id: 'notes',
      title: 'Learning notes',
      courseId: 'architecture',
      userId: 'collaborator',
      isPreview: false,
      text: 'Memory hierarchy uses CPU caches, RAM and secondary storage.',
    },
    {
      id: 'preview',
      title: 'Preview lesson',
      courseId: 'foreign',
      userId: 'other',
      isPreview: true,
      text: 'Memory hierarchy preview.',
    },
    {
      id: 'private',
      title: 'Memory Hierarchy',
      courseId: 'foreign',
      userId: 'other',
      isPreview: false,
      text: 'PRIVATE FOREIGN MATERIAL',
    },
    {
      id: 'subscribed',
      title: 'Subscribed lesson',
      courseId: 'subscription',
      userId: 'other',
      isPreview: false,
      text: 'Memory hierarchy subscription material.',
    },
    {
      id: 'database',
      title: 'Introduction to Database System Concepts and Architecture',
      courseId: null,
      userId: 'other',
      isPreview: false,
      text: 'Database schemas and architecture.',
    },
  ];
  const values = Prisma.join(
    posts.map(
      (post) => Prisma.sql`(
    ${post.id}::text, ${post.title}::text, NULL::text,
    ${JSON.stringify({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: post.text }] }] })}::jsonb,
    ${post.courseId}::text, ${post.userId}::text, ${post.isPreview}::boolean
  )`,
    ),
  );
  const raw = <T>(statement: Prisma.Sql): Promise<T> =>
    db.$queryRaw<T>(Prisma.sql`
    WITH "course" AS (
      SELECT * FROM (VALUES
        ('architecture', 'Computer Architechture', 'owner'),
        ('foreign', 'Other course', 'other'),
        ('subscription', 'Subscribed course', 'other')
      ) AS courses(id, title, "userId")
    ), "post" AS (
      SELECT * FROM (VALUES ${values}) AS posts(id, title, summary, content, "courseId", "userId", "isPreview")
      UNION ALL SELECT 'aaa-private-' || n, 'Memory Hierarchy', NULL::text,
        '"PRIVATE CROWDING MATERIAL"'::jsonb, 'foreign', 'other', false
      FROM generate_series(1, 50) AS n
    ), "subscribe" AS (
      SELECT 'subscription-row'::text AS id, 'subscription'::text AS "courseId", 'subscriber'::text AS "userId"
    ), "content_chunk" AS (
      SELECT 'database-index'::text AS id, 'POST'::"ContentSourceType" AS "sourceType",
        'database'::text AS "sourceId", NULL::text AS "courseId", 0::int AS sequence,
        'Database schemas and architecture.'::text AS content, 6::int AS "tokenCount",
        '{}'::jsonb AS metadata, '[0.1,0.2,0.3]'::vector AS embedding,
        'synthetic-model'::text AS "embeddingModel"
    ) SELECT * FROM (${statement}) AS verified
  `);
  const learner = new AiContentAuthorizationService({} as any);
  const canRead = async (
    userId: string,
    resource: { id: string },
    instructor = false,
  ) => {
    const condition = instructor
      ? Prisma.sql`("post"."userId" = ${userId} OR "course"."userId" = ${userId})`
      : learner.postAccessSql(userId);
    const rows = await raw<Array<{ id: string }>>(Prisma.sql`
      SELECT "post"."id" FROM "post" AS "post"
      LEFT JOIN "course" AS "course" ON "course"."id" = "post"."courseId"
      WHERE "post"."id" = ${resource.id} AND ${condition}
    `);
    return rows.length > 0;
  };
  const instructor = new InstructorContentAuthorizationService({} as any);
  instructor.canAccess = (userId, _type, id) => canRead(userId, { id }, true);
  let embeddingAvailable = true;
  const search = new HybridContentSearchService(
    {
      $queryRaw: raw,
      post: {
        findMany: async ({ where }: { where: { id: { in: string[] } } }) =>
          posts
            .filter((post) => where.id.in.includes(post.id))
            .map((post) => ({ ...post, summary: null })),
      },
    } as any,
    {
      create: async () => {
        if (!embeddingAvailable) throw new Error('Synthetic outage');
        return { embedding: [0.1, 0.2, 0.3], model: 'synthetic-model' };
      },
    } as any,
    {
      postAccessSql: learner.postAccessSql.bind(learner),
      canAccess: (userId, resource) => canRead(userId, resource),
    } as any,
    instructor,
  );
  const checks: string[] = [];
  const input = { query: 'memory hierarchy', sourceTypes: [Source.POST] };
  try {
    const original = await search.search('owner', {
      ...input,
      query:
        'find me a post talks about memory hierarchy as in computer architecture',
      limit: 1,
    });
    assert.equal(original[0]?.sourceId, 'memory');
    assert.match(original[0].content, /Registers/);
    assert.doesNotMatch(JSON.stringify(original), /PRIVATE/);
    checks.push(
      'Original request finds the unindexed course-owner post before unrelated database evidence',
    );

    const all = await search.search('owner', input);
    assert.ok(all.some((result) => result.sourceId === 'notes'));
    assert.ok(all.some((result) => result.sourceId === 'preview'));
    assert.doesNotMatch(JSON.stringify(all), /PRIVATE/);
    checks.push(
      'Current rich-text body and public preview discovery; no private crowding before LIMIT',
    );

    const scope = await search.search('owner', {
      ...input,
      courseIds: ['architecture'],
    });
    assert.ok(scope.length > 0);
    assert.ok(scope.every((result) => result.courseId === 'architecture'));
    checks.push('Explicit course scope is preserved');

    const one = await search.search('owner', {
      ...input,
      sources: [{ sourceType: Source.POST, sourceId: 'notes' }],
    });
    assert.deepEqual(
      one.map((result) => result.sourceId),
      ['notes'],
    );
    checks.push('Explicit post scope is preserved');

    const focused = await search.search('owner', {
      ...input,
      query: 'memory hierarchy computer architecture',
      keywordQueries: ['memory hierarchy', 'nonexistent outcome'],
      courseIds: ['architecture'],
    });
    assert.ok(focused.some((result) => result.sourceId === 'notes'));
    checks.push(
      'Context and inferred outcomes do not exclude a body-only topic match',
    );

    const foreign = await search.search('stranger', {
      ...input,
      courseIds: ['architecture'],
    });
    assert.deepEqual(foreign, []);
    checks.push('Unsubscribed users cannot discover private course posts');

    const subscribed = await search.search('subscriber', {
      ...input,
      courseIds: ['subscription'],
    });
    assert.equal(subscribed[0]?.sourceId, 'subscribed');
    checks.push('Subscribers can discover their private course posts');

    const owned = await search.search('owner', {
      ...input,
      instructorOnly: true,
    });
    assert.ok(owned.length > 0);
    assert.ok(owned.every((result) => result.courseId === 'architecture'));
    checks.push(
      'Instructor search remains owner-only, including public previews',
    );

    const files = await search.search('owner', {
      ...input,
      sourceTypes: [Source.FILE],
    });
    assert.deepEqual(files, []);
    checks.push('File-only requests do not return posts');

    embeddingAvailable = false;
    const fallback = await search.search('owner', { ...input, limit: 1 });
    assert.equal(fallback[0]?.sourceId, 'memory');
    checks.push('Live post discovery survives an embedding outage');
    assert.deepEqual(
      await search.search('owner', { ...input, query: 'zzqv nonexistent' }),
      [],
    );
    checks.push('Unknown topics do not fabricate a result');

    const evidence = new RapideiaEvidenceService({
      count: (text) => text.length / 4,
      truncate: (text, max) => text.slice(0, max * 4),
    });
    const packaged = evidence.build({
      intent: LearnerIntent.FIND_CONTENT,
      query: {
        intent: LearnerIntent.FIND_CONTENT,
        targets: [],
        courseScope: null,
        desiredSkills: [],
        existingSkills: [],
        desiredOutcomes: [],
        difficulty: null,
        constraints: { maxDurationHours: null, language: null },
        searchQuery: input.query,
        explanationLevel: null,
        includeDiscussions: false,
      },
      evidence: [{ kind: IntentEvidenceKind.CONTENT_CHUNKS, data: original }],
      warnings: [],
    });
    assert.equal(packaged.citationMap[0]?.source?.label, 'Memory Hierarchy');
    assert.equal(packaged.citationMap[0]?.source?.id, 'memory');
    checks.push('The evidence citation carries the actual post title and ID');
    console.log(
      JSON.stringify(
        {
          scope:
            'Local PostgreSQL, synthetic CTEs, actual retrieval and authorization SQL, no stored data changes or model calls',
          checks: checks.map((name) => ({ name, status: 'passed' })),
        },
        null,
        2,
      ),
    );
  } finally {
    await db.$disconnect();
  }
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
