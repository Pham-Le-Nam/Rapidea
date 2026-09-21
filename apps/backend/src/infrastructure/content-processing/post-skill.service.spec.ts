import { PostSkillService } from './post-skill.service';

describe('PostSkillService', () => {
    it('resolves shared skills and replaces post links', async () => {
        const skillResolver = {
            resolve: jest
                .fn()
                .mockResolvedValueOnce({ id: 10 })
                .mockResolvedValueOnce({ id: 20 }),
        };
        const service = new PostSkillService(skillResolver as any);
        const transaction: any = {
            postSkill: {
                deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
                createMany: jest.fn().mockResolvedValue({ count: 1 }),
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
        expect(skillResolver.resolve).toHaveBeenCalledTimes(2);
        expect(skillResolver.resolve).toHaveBeenNthCalledWith(
            1,
            transaction,
            expect.objectContaining({ name: 'TypeScript' }),
        );
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
        const skillResolver = { resolve: jest.fn() };
        const service = new PostSkillService(skillResolver as any);
        const transaction: any = {
            postSkill: {
                deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
                createMany: jest.fn(),
            },
        };

        await service.replace(transaction, 'post-1', []);

        expect(transaction.postSkill.deleteMany).toHaveBeenCalledWith({
            where: { postId: 'post-1' },
        });
        expect(transaction.postSkill.createMany).not.toHaveBeenCalled();
        expect(skillResolver.resolve).not.toHaveBeenCalled();
    });
});
