/** Read-only PostgreSQL regression: synthetic courses in CTEs, no stored data changes. */
import 'dotenv/config';
import assert from 'node:assert/strict';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../src/infrastructure/database/prisma/prisma.service';
import { CourseRetrievalService } from '../src/infrastructure/ai/course-retrieval.service';
import { QueryEmbeddingService } from '../src/infrastructure/ai/query-embedding.service';

async function main() {
  if (!['localhost', '127.0.0.1', '::1'].includes(process.env.DB_HOST ?? '')) {
    throw new Error('This verification is restricted to localhost');
  }
  const db = new PrismaService();
  const metadata = {
    id: 'philosophy',
    title: 'Triết',
    description: 'Marxist philosophy and dialectical materialism',
    price: 0,
    currency: 'AUD',
    rating: 0,
    ratingCount: 0,
    subscribersCount: 0,
    user: {
      username: 'synthetic-instructor',
      firstname: 'Test',
      middlename: null,
      lastname: 'Instructor',
    },
    aiProfile: null,
    skills: [],
    tags: [],
    learningOutcomes: [],
    prerequisiteSkills: [],
  };
  const architecture = {
    ...metadata,
    id: 'architecture',
    title: 'Computer Architechture',
    description:
      'Computer architecture: digital representation, instruction sets, processors, datapaths and control, memory hierarchies and caches, I/O, and performance.',
  };
  const foundations = {
    ...metadata,
    id: 'foundations',
    title: 'Hardware Foundations',
    description: 'Processor datapaths and digital logic.',
  };
  const catalog = [metadata, architecture, foundations];
  let embeddingAvailable = true;
  const queryEmbedding = {
    create: async () => {
      if (!embeddingAvailable) throw new Error('Synthetic provider outage');
      return { embedding: [0.1, 0.2, 0.3], model: 'synthetic-model' };
    },
  } as unknown as QueryEmbeddingService;
  const statements: string[] = [];
  const adapter = {
    $queryRaw: (statement: Prisma.Sql) => {
      statements.push(statement.sql);
      return db.$queryRaw(Prisma.sql`
        WITH "course" AS (
          SELECT * FROM (VALUES
            (${metadata.id}::text, ${metadata.title}::text, ${metadata.description}::text),
            (${architecture.id}::text, ${architecture.title}::text, ${architecture.description}::text),
            (${foundations.id}::text, ${foundations.title}::text, ${foundations.description}::text)
          ) AS courses(id, title, description)
        ), "course_ai_profile" AS (
          SELECT NULL::text AS "courseId", NULL::text AS summary,
            NULL::text AS "profileText", NULL::"Difficulty" AS difficulty,
            NULL::vector AS embedding, NULL::text AS "embeddingModel"
          WHERE false
        )
        SELECT * FROM (${statement}) AS verified
      `);
    },
    course: {
      findMany: async ({ where }: { where: { id: { in: string[] } } }) =>
        catalog.filter((course) => where.id.in.includes(course.id)),
    },
  };
  const service = new CourseRetrievalService(
    adapter as any,
    queryEmbedding,
    {} as any,
  );
  const checks: Array<{ name: string; status: string }> = [];
  try {
    for (const query of [
      'Triết',
      'triet',
      'TRIẾT',
      'Tôi muốn học khóa Triết',
      'Marxist philosophy',
    ]) {
      const results = await service.searchSummaries({ query });
      assert.equal(results[0]?.id, 'philosophy', query);
      assert.equal(results[0]?.profile, null);
      checks.push({ name: `Unindexed course: ${query}`, status: 'passed' });
    }
    const translated = await service.searchSummaries({
      query: 'political theory',
      courseNames: ['Triết'],
    });
    assert.equal(translated[0]?.id, 'philosophy');
    checks.push({
      name: 'Translated topic preserves named title',
      status: 'passed',
    });

    for (const query of [
      'computer architecture',
      'I want to learn about computer architecture, is there any course teaching that?',
      'Computer Architechture',
    ]) {
      const results = await service.searchSummaries({
        query,
        desiredSkills: ['CPU design'],
        desiredOutcomes: ['Build a processor'],
        limit: 1,
      });
      assert.equal(results[0]?.id, 'architecture', query);
      assert.equal(results[0]?.profile, null);
      checks.push({
        name: `Misspelled title discovery: ${query}`,
        status: 'passed',
      });
    }

    const keywordOnly = await service.searchSummaries({
      query: 'processor datapaths',
      desiredSkills: ['CPU design'],
      desiredOutcomes: ['Build a processor'],
    });
    assert.ok(keywordOnly.some((course) => course.id === 'foundations'));
    checks.push({
      name: 'Inferred skills/outcomes do not exclude a matching description',
      status: 'passed',
    });
    assert.deepEqual(
      await service.searchSummaries({ query: 'computer networks' }),
      [],
    );
    checks.push({
      name: 'Shared computer keyword is not a title match',
      status: 'passed',
    });

    // Single quotes and web-search operators remain bound SQL parameters.
    assert.deepEqual(
      await service.searchSummaries({ query: "zzqv' OR zzqv -unknown" }),
      [],
    );
    checks.push({
      name: 'Search syntax is safely parameterized',
      status: 'passed',
    });

    embeddingAvailable = false;
    assert.equal(
      (
        await service.searchSummaries({
          query: 'computer architecture',
          limit: 1,
        })
      )[0]?.id,
      'architecture',
    );
    checks.push({
      name: 'Misspelled title survives embedding outage',
      status: 'passed',
    });
    assert.equal(
      (await service.searchSummaries({ query: 'triet' }))[0]?.id,
      'philosophy',
    );
    checks.push({
      name: 'Embedding outage retains title discovery',
      status: 'passed',
    });
    embeddingAvailable = true;

    assert.deepEqual(
      await service.searchSummaries({ query: 'nonexistent zzqv course' }),
      [],
    );
    checks.push({
      name: 'Absent course returns no fabricated result',
      status: 'passed',
    });
    assert.deepEqual(
      await service.searchSummaries({
        query: 'Triết',
        difficulty: 'BEGINNER',
        difficultyMode: 'CONSTRAINT',
      }),
      [],
    );
    checks.push({
      name: 'Unknown difficulty does not satisfy a hard constraint',
      status: 'passed',
    });
    assert.equal(
      (
        await service.searchSummaries({
          query: 'Triết',
          difficulty: 'BEGINNER',
          difficultyMode: 'PREFERENCE',
        })
      )[0]?.id,
      'philosophy',
    );
    checks.push({
      name: 'Difficulty preference retains unindexed course',
      status: 'passed',
    });
    console.log(
      JSON.stringify(
        {
          scope:
            'Local PostgreSQL; synthetic CTE metadata; actual retrieval SQL; no writes or model calls',
          checks,
          sqlStatements: statements.length,
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
