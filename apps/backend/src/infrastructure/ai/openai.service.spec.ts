import { OpenAiService } from './openai.service';

describe('OpenAiService', () => {
    const openAiClient = {
        createTextResponse: jest.fn(),
        createEmbeddings: jest.fn(),
        transcribeMedia: jest.fn(),
    };
    const service = new OpenAiService(openAiClient as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('uses the text client for post generation', async () => {
        openAiClient.createTextResponse.mockResolvedValue('Generated title');

        await expect(
            service.generatePostContent({
                target: 'title',
                systemPrompt: 'Generate a title.',
                context: '{"materials":[]}',
            }),
        ).resolves.toBe('Generated title');

        expect(openAiClient.createTextResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                instructions: 'Generate a title.',
                input: '{"materials":[]}',
                failureLabel: 'Post generation',
            }),
        );
    });

    it('requests structured TipTap JSON for post details', async () => {
        openAiClient.createTextResponse.mockResolvedValue(
            '{"type":"doc","content":[]}',
        );

        await service.generatePostContent({
            target: 'details',
            systemPrompt: 'Generate details.',
            context: '{}',
        });

        expect(
            openAiClient.createTextResponse.mock.calls[0][0].textFormat,
        ).toMatchObject({
            type: 'json_schema',
            name: 'tiptap_document',
            strict: true,
            schema: {
                type: 'object',
                required: ['type', 'content'],
                additionalProperties: false,
            },
        });
    });

    it('delegates embeddings and transcription to the client', async () => {
        const media = {
            originalname: 'lesson.mp4',
            mimetype: 'video/mp4',
            buffer: Buffer.from('media'),
        };
        openAiClient.createEmbeddings.mockResolvedValue([[0.1, 0.2]]);
        openAiClient.transcribeMedia.mockResolvedValue('Transcript');

        await expect(service.createEmbeddings(['content'])).resolves.toEqual([
            [0.1, 0.2],
        ]);
        await expect(service.transcribeMedia(media)).resolves.toBe(
            'Transcript',
        );
        expect(openAiClient.createEmbeddings).toHaveBeenCalledWith(['content']);
        expect(openAiClient.transcribeMedia).toHaveBeenCalledWith(media);
    });
});
