import { OpenAiClientService } from './openai-client.service';

describe('OpenAiClientService', () => {
    const originalEmbeddingModel = process.env.TEXT_EMBEDDING_MODEL;
    const originalEmbeddingDimensions = process.env.TEXT_EMBEDDING_DIMENSIONS;
    const originalTranscriptionModel = process.env.VIDEO_TRANSCRIPTION_MODEL;
    const originalResponseModel = process.env.RESPONSE_MODEL;
    const originalApiKey = process.env.OPENAI_API_KEY;
    const service = new OpenAiClientService();

    afterEach(() => {
        jest.restoreAllMocks();
        restoreEnvironmentVariable(
            'TEXT_EMBEDDING_MODEL',
            originalEmbeddingModel,
        );
        restoreEnvironmentVariable(
            'TEXT_EMBEDDING_DIMENSIONS',
            originalEmbeddingDimensions,
        );
        restoreEnvironmentVariable(
            'VIDEO_TRANSCRIPTION_MODEL',
            originalTranscriptionModel,
        );
        restoreEnvironmentVariable('RESPONSE_MODEL', originalResponseModel);
        restoreEnvironmentVariable('OPENAI_API_KEY', originalApiKey);
    });

    it('creates text with the Responses API and extracts output text', async () => {
        process.env.RESPONSE_MODEL = 'test-response-model';
        process.env.OPENAI_API_KEY = 'test-api-key';
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                output: [
                    {
                        type: 'message',
                        content: [
                            { type: 'output_text', text: 'Generated content' },
                        ],
                    },
                ],
            }),
        } as unknown as Response);

        await expect(
            service.createTextResponse({
                instructions: 'Generate content.',
                input: 'Source material',
                failureLabel: 'Generation',
                maxOutputTokens: 500,
            }),
        ).resolves.toBe('Generated content');

        expect(fetchMock).toHaveBeenCalledWith(
            'https://api.openai.com/v1/responses',
            expect.objectContaining({ method: 'POST' }),
        );
        const request = fetchMock.mock.calls[0][1] as RequestInit;
        expect(JSON.parse(request.body as string)).toEqual({
            model: 'test-response-model',
            instructions: 'Generate content.',
            input: 'Source material',
            store: false,
            max_output_tokens: 500,
        });
    });

    it('rejects text generation without RESPONSE_MODEL', async () => {
        delete process.env.RESPONSE_MODEL;

        await expect(
            service.createTextResponse({
                instructions: 'Generate content.',
                input: 'Source material',
                failureLabel: 'Generation',
            }),
        ).rejects.toThrow('RESPONSE_MODEL is not configured');
    });

    it('rejects embedding requests without TEXT_EMBEDDING_MODEL', async () => {
        delete process.env.TEXT_EMBEDDING_MODEL;

        await expect(service.createEmbeddings(['content'])).rejects.toThrow(
            'TEXT_EMBEDDING_MODEL is not configured',
        );
    });

    it('requests embeddings with the configured dimensions', async () => {
        process.env.TEXT_EMBEDDING_MODEL = 'text-embedding-3-small';
        process.env.TEXT_EMBEDDING_DIMENSIONS = '1536';
        process.env.OPENAI_API_KEY = 'test-api-key';
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                data: [{ embedding: Array(1536).fill(0.1) }],
            }),
        } as unknown as Response);

        await service.createEmbeddings(['content']);

        const request = fetchMock.mock.calls[0][1] as RequestInit;
        expect(JSON.parse(request.body as string)).toEqual({
            model: 'text-embedding-3-small',
            input: ['content'],
            dimensions: 1536,
        });
    });

    it('rejects embedding requests without valid dimensions', async () => {
        process.env.TEXT_EMBEDDING_MODEL = 'text-embedding-3-small';
        delete process.env.TEXT_EMBEDDING_DIMENSIONS;

        await expect(service.createEmbeddings(['content'])).rejects.toThrow(
            'TEXT_EMBEDDING_DIMENSIONS must be configured as a positive integer',
        );
    });

    it('rejects dimensions that do not match the database vector columns', async () => {
        process.env.TEXT_EMBEDDING_MODEL = 'text-embedding-3-small';
        process.env.TEXT_EMBEDDING_DIMENSIONS = '1024';

        await expect(service.createEmbeddings(['content'])).rejects.toThrow(
            'TEXT_EMBEDDING_DIMENSIONS must be 1536',
        );
    });

    it('rejects transcription requests without VIDEO_TRANSCRIPTION_MODEL', async () => {
        delete process.env.VIDEO_TRANSCRIPTION_MODEL;

        await expect(
            service.transcribeMedia({
                originalname: 'lesson.mp4',
                mimetype: 'video/mp4',
                buffer: Buffer.from('media'),
            }),
        ).rejects.toThrow('VIDEO_TRANSCRIPTION_MODEL is not configured');
    });
});

function restoreEnvironmentVariable(
    name: string,
    originalValue: string | undefined,
): void {
    if (originalValue === undefined) {
        delete process.env[name];
    } else {
        process.env[name] = originalValue;
    }
}
