import { LearnerContextService } from './learner-context.service';

it('preserves assumed status and excludes stale JSON skills from learner context', async () => {
    const skills = [{ skillId: 1, status: 'ASSUMED', source: 'COURSE_SUBSCRIPTION' }];
    const prisma = {
        userSkill: { findMany: jest.fn().mockResolvedValue(skills) },
        userLearningProfile: { findUnique: jest.fn().mockResolvedValue({ knownSkills: ['stale'], interests: ['art'] }) },
    };
    const result = await new LearnerContextService(prisma as any).getForUser('learner');
    expect(result.skills).toEqual(skills);
    expect(result.profile).toEqual({ interests: ['art'] });
    expect(result.instructions).toContain('not verified learning or mastery');
    expect(prisma.userSkill.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { userId: 'learner' } }));
});
