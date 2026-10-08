import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { AiMediaFile } from '../../application/ports/ai.service';
import { AiTextModelPurpose } from '../../application/ports/learning-assistant-response.port';
import {
    AiModelEnvironmentVariable,
    aiTextGenerationProfile,
    requiredAiModel,
    requiredAiTextModel,
    requiredEmbeddingDimensions,
} from './ai-model-config';

type OpenAiResponseStatus =
    | 'completed'
    | 'failed'
    | 'in_progress'
    | 'cancelled'
    | 'queued'
    | 'incomplete';

type OpenAiResponse = {
    id?: string;
    status?: OpenAiResponseStatus;
    incomplete_details?: { reason?: string } | null;
    error?: { code?: string; message?: string } | null;
    usage?: {
        output_tokens?: number;
        output_tokens_details?: { reasoning_tokens?: number };
    } | null;
    output_text?: string;
    output?: Array<{
        type?: string;
        content?: Array<{
            type?: string;
            text?: string;
            refusal?: string;
        }>;
    }>;
};

const MAX_TEXT_RESPONSE_ATTEMPTS = 2;
const MIN_RETRY_OUTPUT_TOKENS = 4_000;

export type OpenAiTextResponseInput = {
    instructions: string;
    input: string;
    failureLabel: string;
    modelPurpose: AiTextModelPurpose;
    maxOutputTokens?: number;
    textFormat?: Record<string, unknown>;
};

@Injectable()
export class OpenAiClientService {
    private readonly logger = new Logger(OpenAiClientService.name);

    async createTextResponse(input: OpenAiTextResponseInput): Promise<string> {
        const model = requiredAiTextModel(input.modelPurpose);
        const apiKey = this.requiredApiKey();
        const profile = aiTextGenerationProfile(input.modelPurpose);
        let maxOutputTokens = input.maxOutputTokens;

        for (
            let attempt = 1;
            attempt <= MAX_TEXT_RESPONSE_ATTEMPTS;
            attempt++
        ) {
            const data = await this.requestTextResponse(
                input,
                model,
                apiKey,
                profile,
                maxOutputTokens,
            );
            const value = this.responseText(data);
            const refusal = this.responseRefusal(data);

            if (
                (data.status === undefined || data.status === 'completed') &&
                value
            ) {
                return value;
            }

            if (refusal) {
                this.logUnusableResponse(input, model, data, 'refusal');
                throw new InternalServerErrorException(
                    `${input.failureLabel} was refused by the model`,
                );
            }

            const canRetry = this.canRetryTextResponse(
                data,
                value,
                attempt,
                maxOutputTokens,
            );
            if (canRetry) {
                maxOutputTokens = this.retryOutputTokenLimit(
                    data,
                    maxOutputTokens,
                );
                this.logUnusableResponse(input, model, data, 'retrying');
                continue;
            }

            this.logUnusableResponse(input, model, data, 'failed');
            throw new InternalServerErrorException(
                `${input.failureLabel} could not be completed`,
            );
        }

        throw new InternalServerErrorException(
            `${input.failureLabel} could not be completed`,
        );
    }

    private async requestTextResponse(
        input: OpenAiTextResponseInput,
        model: string,
        apiKey: string,
        profile: ReturnType<typeof aiTextGenerationProfile>,
        maxOutputTokens: number | undefined,
    ): Promise<OpenAiResponse> {
        const response = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                instructions: input.instructions,
                input: input.input,
                store: false,
                reasoning: { effort: profile.reasoningEffort },
                ...(maxOutputTokens === undefined
                    ? {}
                    : { max_output_tokens: maxOutputTokens }),
                text: {
                    verbosity: profile.verbosity,
                    ...(input.textFormat === undefined
                        ? {}
                        : { format: input.textFormat }),
                },
            }),
        });
        if (!response.ok) {
            const configurationError = await this.logHttpFailure(
                response,
                input,
                model,
                apiKey,
            );
            throw new InternalServerErrorException(
                `${input.failureLabel} failed (${response.status})${configurationError ? '. The AI model configuration was rejected; check the backend logs.' : ''}`,
            );
        }

        return (await response.json()) as OpenAiResponse;
    }

    private async logHttpFailure(
        response: Response,
        input: OpenAiTextResponseInput,
        model: string,
        apiKey: string,
    ): Promise<boolean> {
        let error: Record<string, unknown> = {};
        try {
            const body = (await response.json()) as { error?: unknown } | null;
            if (
                body?.error &&
                typeof body.error === 'object' &&
                !Array.isArray(body.error)
            ) {
                error = body.error as Record<string, unknown>;
            }
        } catch {
            // Preserve the HTTP failure even when a proxy returns HTML/no JSON.
        }
        const safeField = (value: unknown): string =>
            typeof value === 'string' &&
            /^[a-zA-Z0-9_.:[\]-]{1,120}$/.test(value) &&
            !value.includes(apiKey)
                ? value
                : 'unknown';
        const code = safeField(error.code);
        const param = safeField(error.param);
        const configurationError =
            response.status === 400 &&
            [
                'unsupported_value',
                'unsupported_parameter',
                'invalid_json_schema',
            ].includes(code) &&
            /^(model|reasoning(?:\.[a-z_]+)?|text\.(?:format|verbosity)(?:\.[a-z_.]+)?|max_output_tokens)$/.test(
                param,
            );
        // Only allow provider message text for configuration/schema failures.
        // Authentication and input errors may echo credentials or private content.
        let detail = 'Provider error message omitted to protect request data.';
        if (configurationError && typeof error.message === 'string') {
            detail = error.message;
            for (const secret of [apiKey, input.input, input.instructions]) {
                if (secret) detail = detail.replaceAll(secret, '[REDACTED]');
            }
            detail = detail
                .replace(/Bearer\s+\S+/gi, 'Bearer [REDACTED]')
                .replace(/\bsk-[a-zA-Z0-9_-]+/g, '[REDACTED]')
                .replace(/[\r\n\t]/g, ' ')
                .slice(0, 500);
        }
        this.logger.error(
            `${input.failureLabel} HTTP failure: model=${model} purpose=${input.modelPurpose} status=${response.status} ` +
                `requestId=${safeField(response.headers?.get('x-request-id'))} code=${code} param=${param} detail=${detail}`,
        );
        return configurationError;
    }

    async createEmbeddings(input: string[]): Promise<number[][] | null> {
        const model = requiredAiModel(
            AiModelEnvironmentVariable.TEXT_EMBEDDING,
        );
        const dimensions = requiredEmbeddingDimensions();
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) return null;

        try {
            const response = await fetch(
                'https://api.openai.com/v1/embeddings',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ model, input, dimensions }),
                },
            );
            if (!response.ok) return null;

            const data = (await response.json()) as {
                data?: { embedding: number[] }[];
            };
            const embeddings = data.data?.map((item) => item.embedding);
            if (
                !embeddings ||
                embeddings.length !== input.length ||
                embeddings.some(
                    (embedding) =>
                        embedding.length !== dimensions ||
                        embedding.some((value) => !Number.isFinite(value)),
                )
            ) {
                return null;
            }
            return embeddings;
        } catch {
            return null;
        }
    }

    async transcribeMedia(file: AiMediaFile): Promise<string> {
        const model = requiredAiModel(
            AiModelEnvironmentVariable.VIDEO_TRANSCRIPTION,
        );
        const apiKey = this.requiredApiKey();
        const formData = new FormData();
        formData.append('model', model);
        formData.append(
            'file',
            new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }),
            file.originalname,
        );

        const response = await fetch(
            'https://api.openai.com/v1/audio/transcriptions',
            {
                method: 'POST',
                headers: { Authorization: `Bearer ${apiKey}` },
                body: formData,
            },
        );
        if (!response.ok) {
            throw new Error(
                `Transcription failed with status ${response.status}`,
            );
        }

        const data = (await response.json()) as { text?: string };
        return data.text ?? '';
    }

    private responseText(data: OpenAiResponse): string {
        return (
            data.output_text ??
            data.output
                ?.flatMap((item) =>
                    item.type === 'message' ? (item.content ?? []) : [],
                )
                .filter((content) => content.type === 'output_text')
                .map((content) => content.text ?? '')
                .join('') ??
            ''
        ).trim();
    }

    private responseRefusal(data: OpenAiResponse): string {
        return (
            data.output
                ?.flatMap((item) =>
                    item.type === 'message' ? (item.content ?? []) : [],
                )
                .filter((content) => content.type === 'refusal')
                .map((content) => content.refusal ?? '')
                .join('') ?? ''
        ).trim();
    }

    private canRetryTextResponse(
        data: OpenAiResponse,
        value: string,
        attempt: number,
        maxOutputTokens: number | undefined,
    ): boolean {
        if (attempt >= MAX_TEXT_RESPONSE_ATTEMPTS) return false;
        if (
            data.status === 'incomplete' &&
            data.incomplete_details?.reason === 'max_output_tokens'
        ) {
            return maxOutputTokens !== undefined;
        }

        return (
            !value && (data.status === undefined || data.status === 'completed')
        );
    }

    private retryOutputTokenLimit(
        data: OpenAiResponse,
        maxOutputTokens: number | undefined,
    ): number | undefined {
        if (
            data.status !== 'incomplete' ||
            data.incomplete_details?.reason !== 'max_output_tokens' ||
            maxOutputTokens === undefined
        ) {
            return maxOutputTokens;
        }

        return Math.max(maxOutputTokens * 2, MIN_RETRY_OUTPUT_TOKENS);
    }

    private logUnusableResponse(
        input: OpenAiTextResponseInput,
        model: string,
        data: OpenAiResponse,
        outcome: 'retrying' | 'failed' | 'refusal',
    ): void {
        const details = [
            `model=${model}`,
            `purpose=${input.modelPurpose}`,
            `responseId=${data.id ?? 'unknown'}`,
            `status=${data.status ?? 'unknown'}`,
            `reason=${data.incomplete_details?.reason ?? 'none'}`,
            `outputTokens=${data.usage?.output_tokens ?? 'unknown'}`,
            `reasoningTokens=${data.usage?.output_tokens_details?.reasoning_tokens ?? 'unknown'}`,
        ].join(' ');
        const message = `${input.failureLabel} ${outcome}: ${details}`;
        if (outcome === 'retrying') {
            this.logger.warn(message);
        } else {
            this.logger.error(message);
        }
    }

    private requiredApiKey(): string {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new InternalServerErrorException(
                'OPENAI_API_KEY is not configured',
            );
        }
        return apiKey;
    }
}
