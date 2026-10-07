import { PrismaInstructorContentRepository } from './prisma-instructor-content.repository';
import { PrismaInstructorProposalRepository } from './prisma-instructor-proposal.repository';
import { InstructorContentAuthorizationService } from './instructor-content-authorization.service';
import {
  InstructorIntent,
  InstructorQuery,
} from '../../application/instructor-ai/instructor-query';
import { InstructorIntentRetrievalRouterService } from '../../application/instructor-ai/instructor-intent-retrieval-router.service';
import { InstructorProposalKind } from '../../application/instructor-ai/instructor-proposal';

function fixture() {
  const course = {
    id: 'course',
    title: 'Calculus',
    description: 'Limits',
    lastUpdated: new Date('2026-10-01'),
    aiStatus: 'READY',
    aiProfile: { summary: 'Math', difficulty: 'BEGINNER' },
    skills: [
      {
        skillId: 7,
        outcome: 'Differentiate functions',
        skill: { name: 'Calculus' },
      },
    ],
    learningOutcomes: [{ text: 'Evaluate limits', sequence: 0 }],
    prerequisiteSkills: [],
    teachingPlan: null,
    _count: { posts: 0, files: 0 },
  };
  let metadata: unknown;
  const db: any = {
    users: {
      findUnique: jest.fn().mockResolvedValue({
        role: 'INSTRUCTOR',
        isBanned: false,
        creatorPrompt: 'Use concrete examples',
      }),
      update: jest.fn(),
    },
    course: {
      findFirst: jest.fn().mockImplementation(() => Promise.resolve(course)),
      findMany: jest.fn().mockResolvedValue([]),
      update: jest.fn(),
    },
    post: {
      findFirst: jest.fn().mockResolvedValue(null),
      findMany: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({ id: 'new-post' }),
      update: jest.fn(),
    },
    file: {
      findFirst: jest.fn(),
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
    },
    discussion: {
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
    },
    subscribe: {
      groupBy: jest.fn().mockResolvedValue([]),
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
    },
    skill: {
      findMany: jest
        .fn()
        .mockResolvedValue([
          { id: 7, name: 'Calculus', aliases: [{ alias: 'calculus math' }] },
        ]),
    },
    courseTeachingPlan: { upsert: jest.fn() },
    courseLearningOutcome: { deleteMany: jest.fn(), createMany: jest.fn() },
    courseSkill: { deleteMany: jest.fn(), createMany: jest.fn() },
    coursePrerequisiteSkill: { deleteMany: jest.fn(), createMany: jest.fn() },
    contentChunk: { deleteMany: jest.fn() },
    aiChatMessage: {
      findFirst: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ metadata, conversationId: 'conversation' }),
        ),
      update: jest.fn().mockImplementation(({ data }) => {
        metadata = data.metadata;
        return Promise.resolve({});
      }),
      create: jest
        .fn()
        .mockImplementation(({ data }) =>
          Promise.resolve({
            ...data,
            id: data.role === 'USER' ? 'approval' : 'acknowledgment',
          }),
        ),
    },
    aiChatConversation: { update: jest.fn() },
    $queryRaw: jest.fn().mockResolvedValue([]),
    $executeRaw: jest.fn(),
  };
  // Simulate the row-lock serialization used by PostgreSQL acceptance transactions.
  let tail: Promise<unknown> = Promise.resolve();
  db.$transaction = jest.fn((callback: (tx: any) => Promise<unknown>) => {
    const next = tail.then(() => callback(db));
    tail = next.catch(() => {});
    return next;
  });
  const search = { search: jest.fn().mockResolvedValue([]) };
  const resolver = { resolve: jest.fn().mockResolvedValue({ id: 7 }) };
  const authorization = new InstructorContentAuthorizationService(db);
  const repository = new PrismaInstructorContentRepository(
    db,
    search as any,
    authorization,
    new PrismaInstructorProposalRepository(db, authorization, resolver as any),
  );
  const router = new InstructorIntentRetrievalRouterService(repository);
  return {
    db,
    course,
    search,
    resolver,
    repository,
    router,
    storeProposal: (proposal: unknown) => {
      metadata = { proposal };
    },
  };
}
const query: InstructorQuery = {
  intent: InstructorIntent.CHECK_COURSE_COVERAGE,
  targetSourceIndex: 0,
  targetName: null,
  topic: 'Coverage',
  audience: null,
  difficulty: null,
  desiredSkills: [],
  desiredOutcomes: [],
  transformation: null,
  includeDiscussions: false,
};
const source = {
  type: 'COURSE' as const,
  id: 'course',
  name: 'Calculus',
  courseScope: 'course',
  current: true,
};
const edited = {
  kind: InstructorProposalKind.LEARNING_OUTCOMES,
  title: 'Outcomes',
  body: '',
  items: [{ title: 'Evaluate limits', details: '' }],
};

describe('PrismaInstructorContentRepository', () => {
  it('searches each declared outcome/skill with the shared owner-scoped hybrid engine', async () => {
    const f = fixture();
    const evidence = await f.router.retrieve('owner', query, [source]);
    expect(
      f.search.search.mock.calls.map(([, request]) => (request as any).query),
    ).toEqual([
      'Coverage',
      'Evaluate limits',
      'Calculus: Differentiate functions',
    ]);
    for (const [user, request] of f.search.search.mock.calls as any[])
      expect({ user, ...request }).toMatchObject({
        user: 'owner',
        instructorOnly: true,
        courseIds: ['course'],
      });
    expect(
      evidence.items.some((i) =>
        JSON.stringify(i.data).includes('supportFound'),
      ),
    ).toBe(true);
    expect(f.db.courseLearningOutcome.createMany).not.toHaveBeenCalled();
  });
  it('resolves canonical taxonomy aliases without writing or creating a skill during generation', async () => {
    const f = fixture();
    expect(
      await f.repository.resolveProposalSkills({
        ...edited,
        kind: InstructorProposalKind.COURSE_SKILLS,
        items: [
          { title: 'calculus math', details: '' },
          { title: 'Unknown topic', details: '' },
        ],
      }),
    ).toEqual([
      { suggestedName: 'calculus math', skillId: 7, canonicalName: 'Calculus' },
      { suggestedName: 'Unknown topic', skillId: null, canonicalName: null },
    ]);
    expect(f.resolver.resolve).not.toHaveBeenCalled();
  });
  it('strips participant identities from community evidence and reports sample statistics', async () => {
    const f = fixture();
    f.db.discussion.findMany.mockResolvedValue([
      {
        id: 'd1',
        discussion: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'How do limits work? me@example.com' },
              ],
            },
          ],
        },
        userId: 'private-user-id',
        parentId: null,
        post: { id: 'post', title: 'Limits' },
      },
    ]);
    f.db.discussion.count.mockResolvedValue(300);
    const evidence = await f.router.retrieve(
      'owner',
      { ...query, intent: InstructorIntent.FIND_COMMON_QUESTIONS },
      [source],
    );
    const community = JSON.stringify(
      evidence.items.filter((i) => i.authority === 'COMMUNITY'),
    );
    expect(community).toContain('Participant 1');
    expect(community).not.toContain('private-user-id');
    expect(community).not.toContain('me@example.com');
    expect(evidence.warnings.join(' ')).toContain('100 comments');
  });
  it('serializes concurrent approvals and applies the reviewed edit only once', async () => {
    const f = fixture();
    const evidence = await f.router.retrieve('owner', query, [source]);
    f.storeProposal({
      ...edited,
      courseId: 'course',
      postId: null,
      sourceHash: evidence.sourceHash,
    });
    const receipts = await Promise.all([
      f.repository.applyProposal('owner', 'message', edited),
      f.repository.applyProposal('owner', 'message', edited),
    ]);
    expect(receipts.map((r) => r.replay)).toEqual([false, true]);
    expect(f.db.courseLearningOutcome.createMany).toHaveBeenCalledTimes(1);
    expect(f.db.aiChatMessage.update).toHaveBeenCalledTimes(1);
    expect(f.db.aiChatMessage.create).toHaveBeenCalledTimes(2);
  });
  it('rejects stale course proposals before any write', async () => {
    const f = fixture();
    const evidence = await f.router.retrieve('owner', query, [source]);
    f.storeProposal({
      ...edited,
      courseId: 'course',
      postId: null,
      sourceHash: evidence.sourceHash,
    });
    f.course.lastUpdated = new Date('2026-10-05');
    await expect(
      f.repository.applyProposal('owner', 'message', edited),
    ).rejects.toThrow('source changed');
    expect(f.db.courseLearningOutcome.createMany).not.toHaveBeenCalled();
  });
  it('rejects changed action kind and missing/foreign stored proposals', async () => {
    const f = fixture();
    f.storeProposal({
      ...edited,
      courseId: 'course',
      postId: null,
      sourceHash: 'hash',
    });
    await expect(
      f.repository.applyProposal('owner', 'message', {
        ...edited,
        kind: InstructorProposalKind.PREREQUISITES,
      }),
    ).rejects.toThrow('kind cannot');
    f.db.aiChatMessage.findFirst.mockResolvedValue(null);
    await expect(
      f.repository.applyProposal('other', 'message', edited),
    ).rejects.toThrow('not found');
    expect(f.db.coursePrerequisiteSkill.createMany).not.toHaveBeenCalled();
  });
  it('publishes an explicitly approved draft and marks its course for reprocessing', async () => {
    const f = fixture();
    const evidence = await f.router.retrieve(
      'owner',
      { ...query, intent: InstructorIntent.DRAFT_POST },
      [source],
    );
    const draft = {
      kind: InstructorProposalKind.POST_DRAFT,
      title: 'Limits',
      body: 'A limit describes approaching a value.',
      items: [],
    };
    f.storeProposal({
      ...draft,
      courseId: 'course',
      postId: null,
      sourceHash: evidence.sourceHash,
    });
    expect(
      await f.repository.applyProposal('owner', 'message', draft),
    ).toMatchObject({ resultId: 'new-post', replay: false });
    expect(f.db.post.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: 'owner',
        courseId: 'course',
        isPreview: false,
        title: 'Limits',
      }),
    });
    expect(f.db.course.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ aiStatus: 'PENDING' }),
      }),
    );
  });
});
