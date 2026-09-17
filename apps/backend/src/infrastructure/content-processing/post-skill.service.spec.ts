import { PostSkillService } from './post-skill.service';

describe('PostSkillService', () => {
    const service = new PostSkillService();

    it('resolves shared skills and replaces post links', async () => {
        const transaction: any = {
            postSkill: {
                deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
                createMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            skill: {
                findFirst: jest
                    .fn()
                    .mockResolvedValueOnce({ id: 10 })
                    .mockResolvedValueOnce(null),
                upsert: jest.fn().mockResolvedValue({ id: 20 }),
            },
        };

        await service.replace(transaction, 'post-1', [
            {
                name: 'TypeScript',
                description: 'Static typing for JavaScript.',
                outcome: 'Apply TypeScript types.',
                importance: 0.9,
                confidence: 0.95,
            },
            {
                name: 'Testing',
                description: 'Verification of application behavior.',
                outcome: 'Write focused unit tests.',
                importance: 0.8,
                confidence: 0.9,
            },
        ]);

        expect(transaction.postSkill.deleteMany).toHaveBeenCalledWith({
            where: { postId: 'post-1' },
        });
        expect(transaction.skill.findFirst).toHaveBeenCalledWith({
            where: {
                OR: [
                    {
                        name: {
                            equals: 'TypeScript',
                            mode: 'insensitive',
                        },
                    },
                    {
                        aliases: {
                            some: {
                                alias: {
                                    equals: 'TypeScript',
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                ],
            },
            select: { id: true },
        });
        expect(transaction.skill.upsert).toHaveBeenCalledWith({
            where: { name: 'Testing' },
            update: {},
            create: {
                name: 'Testing',
                description: 'Verification of application behavior.',
            },
            select: { id: true },
        });
        expect(transaction.postSkill.createMany).toHaveBeenCalledWith({
            data: [
                {
                    postId: 'post-1',
                    skillId: 10,
                    outcome: 'Apply TypeScript types.',
                    importance: 0.9,
                    confidence: 0.95,
                },
                {
                    postId: 'post-1',
                    skillId: 20,
                    outcome: 'Write focused unit tests.',
                    importance: 0.8,
                    confidence: 0.9,
                },
            ],
        });
    });

    it('removes stale links when no skills are generated', async () => {
        const transaction: any = {
            postSkill: {
                deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
                createMany: jest.fn(),
            },
            skill: {
                findFirst: jest.fn(),
                upsert: jest.fn(),
            },
        };

        await service.replace(transaction, 'post-1', []);

        expect(transaction.postSkill.deleteMany).toHaveBeenCalledWith({
            where: { postId: 'post-1' },
        });
        expect(transaction.postSkill.createMany).not.toHaveBeenCalled();
    });
});
