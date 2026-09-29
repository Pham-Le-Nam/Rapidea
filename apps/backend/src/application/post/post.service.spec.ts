import { InternalServerErrorException } from '@nestjs/common';
import { PostService } from './post.service';

function detailsDocument(text: string) {
    return JSON.stringify({
        type: 'doc',
        content: [
            {
                type: 'paragraph',
                content: [{ type: 'text', text }],
            },
        ],
    });
}

function setup(generatedValues: string[]) {
    const postRepo = {
        findGenerationContext: jest.fn().mockResolvedValue({
            user: { creatorPrompt: 'Use clear explanations.' },
            course: { title: 'Calculus' },
            files: [
                {
                    name: 'Function of One Variable.pdf',
                    mimeType: 'application/pdf',
                    summary:
                        'Introduces single-variable functions, domains, ranges, limits, and graphical interpretation.',
                    aiStatus: 'READY',
                    transcript: { text: 'A function maps each input to one output.' },
                    tags: [{ tag: { name: 'calculus' } }],
                    moderationStatus: 'PASSED',
                },
            ],
        }),
    };
    const aiService = {
        generatePostContent: jest
            .fn()
            .mockImplementation(() => Promise.resolve(generatedValues.shift())),
    };
    const service = new PostService(
        postRepo as any,
        {} as any,
        {} as any,
        aiService as any,
    );
    return { service, postRepo, aiService };
}

describe('PostService post-field generation', () => {
    it('uses authorized course and attached-file summaries to generate details', async () => {
        const generated = detailsDocument(
            'Learn how single-variable functions connect inputs and outputs, then examine domains, ranges, limits, and graphical behavior through the supplied material.',
        );
        const { service, postRepo, aiService } = setup([generated]);

        const result = await service.generatePostField('creator-1', 'details', {
            title: 'Function of One Variable',
            tags: ['calculus', 'function'],
            fileIds: ['file-1'],
            courseId: 'course-1',
        });

        expect(result.value).toEqual(JSON.parse(generated));
        expect(postRepo.findGenerationContext).toHaveBeenCalledWith(
            'creator-1',
            ['file-1'],
            'course-1',
        );
        const context = JSON.parse(
            aiService.generatePostContent.mock.calls[0][0].context,
        );
        expect(context.courseTitle).toBe('Calculus');
        expect(context.materials[0]).toEqual(
            expect.objectContaining({
                summary: expect.stringContaining('domains, ranges, limits'),
                extractedText: expect.stringContaining('maps each input'),
                aiStatus: 'READY',
            }),
        );
    });

    it('retries when generated details merely repeat the title', async () => {
        const corrected = detailsDocument(
            'Explore the behavior of functions with one independent variable, including how domains and ranges describe valid inputs and outputs. The attached material also introduces limits and graphical interpretation.',
        );
        const { service, aiService } = setup([
            detailsDocument('Function of One Variable'),
            corrected,
        ]);

        const result = await service.generatePostField('creator-1', 'details', {
            title: 'Function of One Variable',
            fileIds: ['file-1'],
        });

        expect(result.value).toEqual(JSON.parse(corrected));
        expect(aiService.generatePostContent).toHaveBeenCalledTimes(2);
        expect(
            aiService.generatePostContent.mock.calls[1][0].systemPrompt,
        ).toContain('previous details draft was rejected');
    });

    it('does not report success when both details attempts are inadequate', async () => {
        const { service } = setup([
            detailsDocument('Function of One Variable'),
            detailsDocument('Function of One Variable'),
        ]);

        await expect(
            service.generatePostField('creator-1', 'details', {
                title: 'Function of One Variable',
            }),
        ).rejects.toBeInstanceOf(InternalServerErrorException);
    });
});
