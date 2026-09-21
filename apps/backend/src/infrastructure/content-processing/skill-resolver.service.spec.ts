import { SkillResolverService } from './skill-resolver.service';

describe('SkillResolverService', () => {
    function transaction() {
        return {
            skill: {
                findFirst: jest.fn(),
                findMany: jest.fn(),
                upsert: jest.fn(),
            },
            skillAlias: {
                upsert: jest.fn(),
            },
        } as any;
    }

    it('returns an existing canonical or alias match without AI', async () => {
        const tx = transaction();
        tx.skill.findFirst.mockResolvedValue({ id: 1 });
        const openAiClient = { createTextResponse: jest.fn() };
        const service = new SkillResolverService(openAiClient as any);

        await expect(
            service.resolve(tx, {
                name: 'react',
                description: 'Build user interfaces.',
            }),
        ).resolves.toEqual({ id: 1 });

        expect(tx.skill.findMany).not.toHaveBeenCalled();
        expect(openAiClient.createTextResponse).not.toHaveBeenCalled();
    });

    it('learns a new punctuation alias from a unique normalized match', async () => {
        const tx = transaction();
        tx.skill.findFirst.mockResolvedValue(null);
        tx.skill.findMany.mockResolvedValue([
            { id: 2, name: 'ReactJS', aliases: [{ alias: 'React.js' }] },
        ]);
        tx.skillAlias.upsert.mockResolvedValue({ skillId: 2 });
        const openAiClient = { createTextResponse: jest.fn() };
        const service = new SkillResolverService(openAiClient as any);

        await expect(
            service.resolve(tx, {
                name: 'React JS',
                description: 'Build user interfaces.',
            }),
        ).resolves.toEqual({ id: 2 });

        expect(tx.skillAlias.upsert).toHaveBeenCalledWith({
            where: { alias: 'React JS' },
            update: {},
            create: { skillId: 2, alias: 'React JS' },
            select: { skillId: true },
        });
        expect(openAiClient.createTextResponse).not.toHaveBeenCalled();
    });

    it('stores an AI-confirmed semantic alias', async () => {
        const tx = transaction();
        tx.skill.findFirst.mockResolvedValue(null);
        tx.skill.findMany.mockResolvedValue([
            { id: 3, name: 'JavaScript', aliases: [{ alias: 'JS' }] },
            { id: 4, name: 'Java', aliases: [] },
        ]);
        tx.skillAlias.upsert.mockResolvedValue({ skillId: 3 });
        const openAiClient = {
            createTextResponse: jest
                .fn()
                .mockResolvedValue(JSON.stringify({ matchedSkillId: 3 })),
        };
        const service = new SkillResolverService(openAiClient as any);

        await expect(
            service.resolve(tx, {
                name: 'JS Programming',
                description: 'Programming for the web.',
            }),
        ).resolves.toEqual({ id: 3 });

        expect(tx.skillAlias.upsert).toHaveBeenCalledWith(
            expect.objectContaining({
                create: { skillId: 3, alias: 'JS Programming' },
            }),
        );
        expect(openAiClient.createTextResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                textFormat: expect.objectContaining({
                    type: 'json_schema',
                    strict: true,
                }),
            }),
        );
    });

    it('creates a new canonical skill when no equivalent exists', async () => {
        const tx = transaction();
        tx.skill.findFirst.mockResolvedValue(null);
        tx.skill.findMany.mockResolvedValue([
            { id: 3, name: 'JavaScript', aliases: [{ alias: 'JS' }] },
        ]);
        tx.skill.upsert.mockResolvedValue({ id: 10 });
        const openAiClient = {
            createTextResponse: jest
                .fn()
                .mockResolvedValue(JSON.stringify({ matchedSkillId: 0 })),
        };
        const service = new SkillResolverService(openAiClient as any);

        await expect(
            service.resolve(tx, {
                name: 'Quantum Error Correction',
                description: 'Protect quantum information from noise.',
            }),
        ).resolves.toEqual({ id: 10 });

        expect(tx.skill.upsert).toHaveBeenCalledWith({
            where: { name: 'Quantum Error Correction' },
            update: {},
            create: {
                name: 'Quantum Error Correction',
                description: 'Protect quantum information from noise.',
            },
            select: { id: true },
        });
    });
});
