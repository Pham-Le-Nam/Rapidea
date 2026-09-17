import { PostSummaryService } from './post-summary.service';

describe('PostSummaryService', () => {
    const openAiClient = {
        createTextResponse: jest.fn(),
    };
    const service = new PostSummaryService(openAiClient as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('generates a summary and normalized skills from all post material', async () => {
        openAiClient.createTextResponse.mockResolvedValue(
            JSON.stringify({
                summary: '## Overview\n\nA learner-facing summary.',
                skills: [
                    {
                        name: ' TypeScript ',
                        description:
                            'Use static typing in JavaScript applications.',
                        outcome: 'Apply TypeScript types to application code.',
                        importance: 0.9,
                        confidence: 0.8,
                    },
                    {
                        name: 'typescript',
                        description: 'Duplicate with stronger evidence.',
                        outcome: 'Create type-safe application features.',
                        importance: 1,
                        confidence: 0.95,
                    },
                ],
            }),
        );

        const result = await service.generate({
            title: 'TypeScript basics',
            description: 'Learn the type system.',
            files: [
                {
                    id: 'file-1',
                    name: 'lesson.pdf',
                    mimeType: 'application/pdf',
                    summary: '## Overview\n\nThe file explains interfaces.',
                },
            ],
        });

        expect(result).toEqual({
            summary: '## Overview\n\nA learner-facing summary.',
            skills: [
                {
                    name: 'typescript',
                    description: 'Duplicate with stronger evidence.',
                    outcome: 'Create type-safe application features.',
                    importance: 1,
                    confidence: 0.95,
                },
            ],
        });

        const request = openAiClient.createTextResponse.mock.calls[0][0];
        expect(request.textFormat).toMatchObject({
            type: 'json_schema',
            name: 'post_ai_profile',
            strict: true,
        });
        expect(request.input).toContain('TypeScript basics');
        expect(request.input).toContain('Learn the type system.');
        expect(request.input).toContain('lesson.pdf');
        expect(request.input).toContain('The file explains interfaces.');
    });

    it('rejects an invalid structured response', async () => {
        openAiClient.createTextResponse.mockResolvedValue('not json');

        await expect(
            service.generate({
                title: 'Post',
                description: 'Description',
                files: [],
            }),
        ).rejects.toThrow('Post profile generation returned invalid JSON');
    });

    it('rejects posts without text or attached files', async () => {
        await expect(
            service.generate({
                title: ' ',
                description: '\n',
                files: [],
            }),
        ).rejects.toThrow(
            'Post profile cannot be generated from empty content',
        );
        expect(openAiClient.createTextResponse).not.toHaveBeenCalled();
    });
});
