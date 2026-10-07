import { InstructorContentAuthorizationService } from './instructor-content-authorization.service';
import { HybridContentSearchService } from './hybrid-content-search.service';
import { ContentChunkSourceType } from '../../application/ai-chat/hybrid-content-search.types';

function fixture() {
  const prisma = {
    users: {
      findUnique: jest
        .fn()
        .mockResolvedValue({ role: 'INSTRUCTOR', isBanned: false }),
    },
    course: { findFirst: jest.fn() },
    post: { findFirst: jest.fn() },
    file: { findFirst: jest.fn() },
    discussion: { findFirst: jest.fn() },
    subscribe: { findFirst: jest.fn() },
  };
  return {
    prisma,
    service: new InstructorContentAuthorizationService(prisma as any),
  };
}
describe('Instructor ownership authorization', () => {
  it.each(['LEARNER', 'UNKNOWN'])(
    'denies %s even with a valid session',
    async (role) => {
      const f = fixture();
      f.prisma.users.findUnique.mockResolvedValue({ role, isBanned: false });
      await expect(f.service.assertInstructor('user')).rejects.toThrow(
        'Instructor access required',
      );
    },
  );
  it.each(['INSTRUCTOR', 'ADMIN'])(
    'allows %s without giving a cross-owner bypass',
    async (role) => {
      const f = fixture();
      f.prisma.users.findUnique.mockResolvedValue({ role, isBanned: false });
      await expect(
        f.service.assertInstructor('owner'),
      ).resolves.toBeUndefined();
      f.prisma.course.findFirst.mockResolvedValue(null);
      expect(await f.service.canAccess('owner', 'COURSE', 'other-course')).toBe(
        false,
      );
      expect(f.prisma.course.findFirst).toHaveBeenCalledWith({
        where: { id: 'other-course', userId: 'owner' },
        select: { id: true },
      });
    },
  );
  it('denies a banned instructor', async () => {
    const f = fixture();
    f.prisma.users.findUnique.mockResolvedValue({
      role: 'INSTRUCTOR',
      isBanned: true,
    });
    await expect(f.service.assertInstructor('owner')).rejects.toThrow();
  });
  it.each(['COURSE', 'POST', 'FILE', 'DISCUSSION', 'REVIEW'] as const)(
    'denies foreign %s, including public, preview or subscribed material',
    async (type) => {
      const f = fixture();
      const delegate = type === 'REVIEW' ? 'subscribe' : type.toLowerCase();
      (f.prisma as any)[delegate].findFirst.mockResolvedValue(null);
      expect(await f.service.canAccess('owner', type as any, 'foreign')).toBe(
        false,
      );
      const where = (f.prisma as any)[delegate].findFirst.mock.calls[0][0]
        .where;
      expect(JSON.stringify(where)).not.toMatch(
        /isPreview|subscribers|isFree|isPublic/,
      );
      expect(JSON.stringify(where)).toContain('owner');
    },
  );
  it('never returns a foreign raw chunk, even if the database candidate fixture includes it', async () => {
    const f = fixture();
    f.prisma.post.findFirst.mockImplementation(({ where }) =>
      Promise.resolve(where.id === 'owned' ? { id: 'owned' } : null),
    );
    const raw = (id: string, content: string) => ({
      id,
      sourceType: ContentChunkSourceType.POST,
      sourceId: id,
      courseId: null,
      sequence: 0,
      content,
      tokenCount: 3,
      metadata: {},
      score: 0.8,
    });
    const prisma = {
      $queryRaw: jest
        .fn()
        .mockResolvedValue([
          raw('owned', 'Authorized explanation.'),
          raw('foreign', 'SECRET unauthorized material'),
        ]),
    };
    const embeddings = {
      create: jest
        .fn()
        .mockResolvedValue({
          embedding: Array(1536).fill(0.1),
          model: 'test-model',
        }),
    };
    const learnerAuthorization = {
      canAccess: jest.fn().mockResolvedValue(true),
    };
    const search = new HybridContentSearchService(
      prisma as any,
      embeddings as any,
      learnerAuthorization as any,
      f.service,
    );
    const results = await search.search('owner', {
      query: 'explanation',
      instructorOnly: true,
    });
    expect(JSON.stringify(results)).not.toContain('SECRET');
    expect(results.map((r) => r.sourceId)).toEqual(['owned']);
    expect(learnerAuthorization.canAccess).not.toHaveBeenCalled();
    for (const [sql] of prisma.$queryRaw.mock.calls as any[]) {
      expect(sql.sql).toContain('EXISTS');
      expect(sql.values).toContain('owner');
    }
  });
});
