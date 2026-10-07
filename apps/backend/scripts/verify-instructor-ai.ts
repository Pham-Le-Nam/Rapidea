/** Read-only local database smoke test. No model calls, uploads or publishing. */
import 'dotenv/config';
import { PrismaService } from '../src/infrastructure/database/prisma/prisma.service';
import { InstructorContentAuthorizationService } from '../src/infrastructure/ai/instructor-content-authorization.service';
import { HybridContentSearchService } from '../src/infrastructure/ai/hybrid-content-search.service';
import { AiContentAuthorizationService } from '../src/infrastructure/ai/ai-content-authorization.service';
import { PrismaInstructorContentRepository } from '../src/infrastructure/ai/prisma-instructor-content.repository';
import { PrismaInstructorProposalRepository } from '../src/infrastructure/ai/prisma-instructor-proposal.repository';
import { QueryEmbeddingService } from '../src/infrastructure/ai/query-embedding.service';
import { OpenAiClientService } from '../src/infrastructure/ai/openai-client.service';
import { SkillResolverService } from '../src/infrastructure/content-processing/skill-resolver.service';
import {
  InstructorIntent,
  InstructorQuery,
} from '../src/application/instructor-ai/instructor-query';
import { InstructorIntentRetrievalRouterService } from '../src/application/instructor-ai/instructor-intent-retrieval-router.service';

async function main() {
  if (!['localhost', '127.0.0.1', '::1'].includes(process.env.DB_HOST ?? ''))
    throw new Error('This smoke test is restricted to localhost');
  const db = new PrismaService();
  try {
    const owner =
      (await db.users.findFirst({
        where: {
          role: { in: ['INSTRUCTOR', 'ADMIN'] },
          isBanned: false,
          course: { some: {} },
        },
        select: { id: true },
      })) ??
      (await db.users.findFirst({
        where: { role: { in: ['INSTRUCTOR', 'ADMIN'] }, isBanned: false },
        select: { id: true },
      }));
    if (!owner) {
      console.log(
        'Skipped retrieval smoke: no local instructor account exists.',
      );
      return;
    }
    const auth = new InstructorContentAuthorizationService(db);
    const fakeEmbeddings = {
      create: async () => ({
        embedding: Array(1536).fill(0.001),
        model: process.env.TEXT_EMBEDDING_MODEL ?? 'smoke-test',
      }),
    } as unknown as QueryEmbeddingService;
    const search = new HybridContentSearchService(
      db,
      fakeEmbeddings,
      new AiContentAuthorizationService(db),
      auth,
    );
    const chunks = await search.search(owner.id, {
      query: 'calculus',
      instructorOnly: true,
      limit: 3,
    });
    console.log(
      `Owner-scoped vector/FTS SQL passed (${chunks.length} results).`,
    );
    const repo = new PrismaInstructorContentRepository(
      db,
      search,
      auth,
      new PrismaInstructorProposalRepository(
        db,
        auth,
        new SkillResolverService(new OpenAiClientService()),
      ),
    );
    const sources = await repo.listSources(owner.id);
    console.log(`Owned-source picker passed (${sources.length} sources).`);
    const course = await db.course.findFirst({
      where: { userId: owner.id },
      select: { id: true, title: true },
    });
    if (!course) {
      console.log(
        'Skipped course analysis smoke: local instructor has no course.',
      );
      return;
    }
    const router = new InstructorIntentRetrievalRouterService(repo);
    for (const intent of [
      InstructorIntent.CHECK_COURSE_COVERAGE,
      InstructorIntent.DETECT_DUPLICATE_CONTENT,
      InstructorIntent.ANALYZE_LEARNER_FEEDBACK,
    ]) {
      const query: InstructorQuery = {
        intent,
        targetSourceIndex: 0,
        targetName: null,
        topic: 'course content',
        audience: null,
        difficulty: null,
        desiredSkills: [],
        desiredOutcomes: [],
        transformation: null,
        includeDiscussions: false,
      };
      const result = await router.retrieve(owner.id, query, [
        {
          type: 'COURSE',
          id: course.id,
          name: course.title,
          courseScope: course.id,
          current: true,
        },
      ]);
      console.log(
        `${intent}: SQL passed (${result.items.length} evidence items).`,
      );
    }
  } finally {
    await db.$disconnect();
  }
}
void main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Smoke test failed');
  process.exitCode = 1;
});
