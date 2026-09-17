import { Difficulty } from '../../../generated/prisma/enums';
import { CourseSummaryService } from './course-summary.service';

describe('CourseSummaryService', () => {
    const previousEmbeddingModel = process.env.TEXT_EMBEDDING_MODEL;

    beforeEach(() => {
        process.env.TEXT_EMBEDDING_MODEL = 'test-embedding-model';
    });

    afterAll(() => {
        if (previousEmbeddingModel === undefined) {
            delete process.env.TEXT_EMBEDDING_MODEL;
        } else {
            process.env.TEXT_EMBEDDING_MODEL = previousEmbeddingModel;
        }
    });

    function input() {
        return {
            title: 'Practical TypeScript',
            description: 'Build typed applications.',
            posts: [
                {
                    id: 'post-1',
                    title: 'Type narrowing',
                    summary: 'Learn how to narrow union types.',
                    skills: [
                        {
                            id: 7,
                            name: 'TypeScript',
                            description: 'Develop typed applications.',
                            outcome: 'Apply type narrowing.',
                            importance: 0.9,
                            confidence: 0.95,
                        },
                    ],
                },
            ],
        };
    }

    it('generates and embeds a course profile from post summaries and skills', async () => {
        const openAiClient = {
            createTextResponse: jest.fn().mockResolvedValue(
                JSON.stringify({
                    summary: '## Overview\n\nA practical TypeScript course.',
                    difficulty: 'INTERMEDIATE',
                    profileText:
                        'Intermediate TypeScript course about typed applications and type narrowing.',
                    skills: [
                        {
                            skillId: 7,
                            outcome:
                                'Apply TypeScript narrowing in typed applications.',
                            importance: 0.95,
                        },
                    ],
                }),
            ),
            createEmbeddings: jest.fn().mockResolvedValue([[0.1, 0.2]]),
        };
        const service = new CourseSummaryService(openAiClient as any);

        const result = await service.generate(input());

        expect(result).toEqual({
            summary: '## Overview\n\nA practical TypeScript course.',
            difficulty: Difficulty.INTERMEDIATE,
            profileText:
                'Intermediate TypeScript course about typed applications and type narrowing.',
            skills: [
                {
                    skillId: 7,
                    outcome:
                        'Apply TypeScript narrowing in typed applications.',
                    importance: 0.95,
                },
            ],
            embedding: [0.1, 0.2],
            embeddingModel: 'test-embedding-model',
            sourceHash: expect.stringMatching(/^[a-f0-9]{64}$/),
        });
        const request = openAiClient.createTextResponse.mock.calls[0][0];
        expect(request.textFormat).toMatchObject({
            type: 'json_schema',
            strict: true,
        });
        expect(request.input).toContain('Learn how to narrow union types.');
        expect(request.input).not.toContain('file summary');
        expect(openAiClient.createEmbeddings).toHaveBeenCalledWith([
            result.profileText,
        ]);
    });

    it('rejects a response that omits a post skill', async () => {
        const openAiClient = {
            createTextResponse: jest.fn().mockResolvedValue(
                JSON.stringify({
                    summary: 'Course summary',
                    difficulty: 'BEGINNER',
                    profileText: 'Course profile',
                    skills: [],
                }),
            ),
            createEmbeddings: jest.fn(),
        };
        const service = new CourseSummaryService(openAiClient as any);

        await expect(service.generate(input())).rejects.toThrow(
            'did not return every candidate skill exactly once',
        );
        expect(openAiClient.createEmbeddings).not.toHaveBeenCalled();
    });
});
