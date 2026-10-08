import { Logger } from '@nestjs/common';
import { AiTextModelPurpose } from '../../application/ports/learning-assistant-response.port';
import { OpenAiClientService } from './openai-client.service';

describe('OpenAiClientService', () => {
    const originalEmbeddingModel = process.env.TEXT_EMBEDDING_MODEL;
    const originalEmbeddingDimensions = process.env.TEXT_EMBEDDING_DIMENSIONS;
    const originalTranscriptionModel = process.env.VIDEO_TRANSCRIPTION_MODEL;
    const originalProcessingModel = process.env.PROCESSING_MODEL;
    const originalPlanningModel = process.env.PLANNING_MODEL;
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
        restoreEnvironmentVariable('PROCESSING_MODEL', originalProcessingModel);
        restoreEnvironmentVariable('PLANNING_MODEL', originalPlanningModel);
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
                modelPurpose: AiTextModelPurpose.RESPONSE,
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
            reasoning: { effort: 'low' },
            max_output_tokens: 500,
            text: { verbosity: 'medium' },
        });
    });

    it.each([
        [
            AiTextModelPurpose.PROCESSING,
            'PROCESSING_MODEL',
            'test-processing-model',
            'low',
            'low',
        ],
        [
            AiTextModelPurpose.PLANNING,
            'PLANNING_MODEL',
            'test-planning-model',
            'low',
            'low',
        ],
        [
            AiTextModelPurpose.RESPONSE,
            'RESPONSE_MODEL',
            'test-response-model',
            'low',
            'medium',
        ],
    ] as const)(
        'uses the configured model for %s requests',
        async (
            modelPurpose,
            environmentVariable,
            configuredModel,
            reasoningEffort,
            verbosity,
        ) => {
            process.env[environmentVariable] = configuredModel;
            process.env.OPENAI_API_KEY = 'test-api-key';
            const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ output_text: 'ok' }),
            } as unknown as Response);

            await service.createTextResponse({
                modelPurpose,
                instructions: 'Generate content.',
                input: 'Source material',
                failureLabel: 'Generation',
            });

            const request = fetchMock.mock.calls[0][1] as RequestInit;
            const body = JSON.parse(request.body as string);
            expect(body.model).toBe(configuredModel);
            expect(body.reasoning).toEqual({ effort: reasoningEffort });
            expect(body.text).toEqual({ verbosity });
        },
    );

    it('retries an incomplete response with more output-token headroom', async () => {
        process.env.PROCESSING_MODEL = 'gpt-5-nano';
        process.env.OPENAI_API_KEY = 'test-api-key';
        const fetchMock = jest
            .spyOn(global, 'fetch')
            .mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValue({
                    id: 'response-1',
                    status: 'incomplete',
                    incomplete_details: { reason: 'max_output_tokens' },
                    usage: {
                        output_tokens: 500,
                        output_tokens_details: { reasoning_tokens: 500 },
                    },
                    output: [],
                }),
            } as unknown as Response)
            .mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValue({
                    id: 'response-2',
                    status: 'completed',
                    output_text: '{"intent":"GENERAL"}',
                }),
            } as unknown as Response);

        await expect(
            service.createTextResponse({
                modelPurpose: AiTextModelPurpose.PROCESSING,
                instructions: 'Classify the learner request.',
                input: 'I want to learn calculus',
                failureLabel: 'Learner intent classification',
                maxOutputTokens: 500,
            }),
        ).resolves.toBe('{"intent":"GENERAL"}');

        expect(fetchMock).toHaveBeenCalledTimes(2);
        const firstBody = JSON.parse(
            (fetchMock.mock.calls[0][1] as RequestInit).body as string,
        );
        const retryBody = JSON.parse(
            (fetchMock.mock.calls[1][1] as RequestInit).body as string,
        );
        expect(firstBody.max_output_tokens).toBe(500);
        expect(retryBody.max_output_tokens).toBe(4_000);
        expect(retryBody.reasoning).toEqual({ effort: 'low' });
    });

    it('retries a completed response that unexpectedly contains no content', async () => {
        process.env.PLANNING_MODEL = 'gpt-5-nano';
        process.env.OPENAI_API_KEY = 'test-api-key';
        const fetchMock = jest
            .spyOn(global, 'fetch')
            .mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValue({
                    id: 'response-1',
                    status: 'completed',
                    output: [],
                }),
            } as unknown as Response)
            .mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValue({
                    id: 'response-2',
                    status: 'completed',
                    output_text: 'Recovered plan',
                }),
            } as unknown as Response);

        await expect(
            service.createTextResponse({
                modelPurpose: AiTextModelPurpose.PLANNING,
                instructions: 'Plan.',
                input: 'Calculus',
                failureLabel: 'Planning',
                maxOutputTokens: 2_500,
            }),
        ).resolves.toBe('Recovered plan');

        expect(fetchMock).toHaveBeenCalledTimes(2);
        const retryBody = JSON.parse(
            (fetchMock.mock.calls[1][1] as RequestInit).body as string,
        );
        expect(retryBody.max_output_tokens).toBe(2_500);
    });

    it('reports refusals without retrying them', async () => {
        process.env.PROCESSING_MODEL = 'gpt-5-nano';
        process.env.OPENAI_API_KEY = 'test-api-key';
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                id: 'response-1',
                status: 'completed',
                output: [
                    {
                        type: 'message',
                        content: [
                            { type: 'refusal', refusal: 'Cannot comply.' },
                        ],
                    },
                ],
            }),
        } as unknown as Response);

        await expect(
            service.createTextResponse({
                modelPurpose: AiTextModelPurpose.PROCESSING,
                instructions: 'Classify.',
                input: 'Request',
                failureLabel: 'Classification',
            }),
        ).rejects.toThrow('Classification was refused by the model');
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it.each(Object.values(AiTextModelPurpose))(
        'uses GPT-6 Luna-compatible reasoning for %s',
        async (purpose) => {
            process.env.PROCESSING_MODEL = 'gpt-6-luna';
            process.env.PLANNING_MODEL = 'gpt-6-luna';
            process.env.RESPONSE_MODEL = 'gpt-6-luna';
            process.env.OPENAI_API_KEY = 'test-api-key';
            const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: jest
                    .fn()
                    .mockResolvedValue({
                        status: 'completed',
                        output_text: 'OK',
                    }),
            } as unknown as Response);
            await service.createTextResponse({
                modelPurpose: purpose,
                instructions: 'Return OK.',
                input: 'Test.',
                failureLabel: 'Generation',
            });
            const body = JSON.parse(fetchMock.mock.calls[0][1]!.body as string);
            expect(body.model).toBe('gpt-6-luna');
            expect(body.reasoning).toEqual({ effort: 'low' });
            expect(body).not.toHaveProperty('temperature');
            expect(body).not.toHaveProperty('top_p');
        },
    );

    it('logs actionable provider configuration details without secrets or private request text', async () => {
        process.env.PROCESSING_MODEL = 'gpt-6-luna';
        process.env.OPENAI_API_KEY = 'sk-proj-private-key';
        const logger = jest
            .spyOn(Logger.prototype, 'error')
            .mockImplementation(() => undefined);
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            status: 400,
            headers: new Headers({ 'x-request-id': 'req-test-123' }),
            json: jest.fn().mockResolvedValue({
                error: {
                    code: 'unsupported_value',
                    param: 'reasoning.effort',
                    message:
                        'Unsupported value: minimal. sk-proj-private-key Private course material Private instructions',
                },
            }),
        } as unknown as Response);
        await expect(
            service.createTextResponse({
                modelPurpose: AiTextModelPurpose.PROCESSING,
                instructions: 'Private instructions',
                input: 'Private course material',
                failureLabel: 'Classification',
            }),
        ).rejects.toThrow('AI model configuration was rejected');
        const logged = logger.mock.calls.flat().join(' ');
        expect(logged).toContain(
            'code=unsupported_value param=reasoning.effort',
        );
        expect(logged).toContain('requestId=req-test-123');
        expect(logged).toContain('Unsupported value: minimal');
        expect(logged).not.toContain('sk-proj-private-key');
        expect(logged).not.toContain('Private course material');
        expect(logged).not.toContain('Private instructions');
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('does not log provider authentication messages that could contain keys', async () => {
        process.env.PROCESSING_MODEL = 'gpt-6-luna';
        process.env.OPENAI_API_KEY = 'private-key';
        const logger = jest
            .spyOn(Logger.prototype, 'error')
            .mockImplementation(() => undefined);
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            status: 401,
            json: jest.fn().mockResolvedValue({
                error: {
                    code: 'invalid_api_key',
                    param: null,
                    message: 'Incorrect API key: private-key; secret input',
                },
            }),
        } as unknown as Response);
        await expect(
            service.createTextResponse({
                modelPurpose: AiTextModelPurpose.PROCESSING,
                instructions: 'Classify.',
                input: 'secret input',
                failureLabel: 'Classification',
            }),
        ).rejects.toThrow('Classification failed (401)');
        const logged = logger.mock.calls.flat().join(' ');
        expect(logged).toContain('code=invalid_api_key');
        expect(logged).not.toContain('private-key');
        expect(logged).not.toContain('secret input');
    });

    it('preserves non-JSON HTTP errors instead of throwing a JSON parsing error', async () => {
        process.env.PROCESSING_MODEL = 'gpt-6-luna';
        process.env.OPENAI_API_KEY = 'test-api-key';
        jest.spyOn(Logger.prototype, 'error').mockImplementation(
            () => undefined,
        );
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            status: 502,
            json: jest.fn().mockRejectedValue(new SyntaxError('Not JSON')),
        } as unknown as Response);
        await expect(
            service.createTextResponse({
                modelPurpose: AiTextModelPurpose.PROCESSING,
                instructions: 'Classify.',
                input: 'Test.',
                failureLabel: 'Classification',
            }),
        ).rejects.toThrow('Classification failed (502)');
    });

    it('rejects processing without PROCESSING_MODEL', async () => {
        delete process.env.PROCESSING_MODEL;

        await expect(
            service.createTextResponse({
                modelPurpose: AiTextModelPurpose.PROCESSING,
                instructions: 'Generate content.',
                input: 'Source material',
                failureLabel: 'Generation',
            }),
        ).rejects.toThrow('PROCESSING_MODEL is not configured');
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
