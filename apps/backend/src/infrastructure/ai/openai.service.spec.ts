import { OpenAiService } from './openai.service';

describe('OpenAiService model configuration', () => {
    const originalEmbeddingModel = process.env.TEXT_EMBEDDING_MODEL;
    const originalTranscriptionModel = process.env.VIDEO_TRANSCRIPTION_MODEL;
    const originalResponseModel = process.env.RESPONSE_MODEL;
    const originalApiKey = process.env.OPENAI_API_KEY;
    const service = new OpenAiService();

    afterEach(() => {
        jest.restoreAllMocks();

        if (originalEmbeddingModel === undefined) {
            delete process.env.TEXT_EMBEDDING_MODEL;
        } else {
            process.env.TEXT_EMBEDDING_MODEL = originalEmbeddingModel;
        }

        if (originalTranscriptionModel === undefined) {
            delete process.env.VIDEO_TRANSCRIPTION_MODEL;
        } else {
            process.env.VIDEO_TRANSCRIPTION_MODEL = originalTranscriptionModel;
        }

        if (originalResponseModel === undefined) {
            delete process.env.RESPONSE_MODEL;
        } else {
            process.env.RESPONSE_MODEL = originalResponseModel;
        }

        if (originalApiKey === undefined) {
            delete process.env.OPENAI_API_KEY;
        } else {
            process.env.OPENAI_API_KEY = originalApiKey;
        }
    });

    it('generates post content with the Responses API', async () => {
        process.env.RESPONSE_MODEL = 'test-response-model';
        process.env.OPENAI_API_KEY = 'test-api-key';
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                output: [{
                    type: 'message',
                    content: [{ type: 'output_text', text: 'Generated title' }],
                }],
            }),
        } as unknown as Response);

        await expect(service.generatePostContent({
            target: 'title',
            systemPrompt: 'Generate a title.',
            context: '{"materials":[]}',
        })).resolves.toBe('Generated title');

        expect(fetchMock).toHaveBeenCalledWith(
            'https://api.openai.com/v1/responses',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    model: 'test-response-model',
                    instructions: 'Generate a title.',
                    input: '{"materials":[]}',
                    store: false,
                }),
            }),
        );
    });

    it('requests structured TipTap JSON for post details', async () => {
        process.env.RESPONSE_MODEL = 'test-response-model';
        process.env.OPENAI_API_KEY = 'test-api-key';
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                output: [{
                    type: 'message',
                    content: [{
                        type: 'output_text',
                        text: '{"type":"doc","content":[]}',
                    }],
                }],
            }),
        } as unknown as Response);

        await service.generatePostContent({
            target: 'details',
            systemPrompt: 'Generate details.',
            context: '{}',
        });

        const request = fetchMock.mock.calls[0][1] as RequestInit;
        const body = JSON.parse(request.body as string);
        expect(body.text.format).toMatchObject({
            type: 'json_schema',
            name: 'tiptap_document',
            strict: true,
        });
        expect(body.text.format.schema).toMatchObject({
            type: 'object',
            required: ['type', 'content'],
            additionalProperties: false,
        });
    });

    it('rejects embedding requests without TEXT_EMBEDDING_MODEL', async () => {
        delete process.env.TEXT_EMBEDDING_MODEL;

        await expect(service.createEmbeddings(['content'])).rejects
            .toThrow('TEXT_EMBEDDING_MODEL is not configured');
    });

    it('rejects transcription requests without VIDEO_TRANSCRIPTION_MODEL', async () => {
        delete process.env.VIDEO_TRANSCRIPTION_MODEL;

        await expect(service.transcribeMedia({
            originalname: 'lesson.mp4',
            mimetype: 'video/mp4',
            buffer: Buffer.from('media'),
        })).rejects.toThrow('VIDEO_TRANSCRIPTION_MODEL is not configured');
    });
});
