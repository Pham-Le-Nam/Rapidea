import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AiMediaFile } from '../../application/ports/ai.service';
import {
    AiModelEnvironmentVariable,
    requiredAiModel,
    requiredEmbeddingDimensions,
} from './ai-model-config';

type OpenAiResponse = {
    output_text?: string;
    output?: Array<{
        type?: string;
        content?: Array<{
            type?: string;
            text?: string;
        }>;
    }>;
};

export type OpenAiTextResponseInput = {
    instructions: string;
    input: string;
    failureLabel: string;
    maxOutputTokens?: number;
    textFormat?: Record<string, unknown>;
};

@Injectable()
export class OpenAiClientService {
    async createTextResponse(input: OpenAiTextResponseInput): Promise<string> {
        const model = requiredAiModel(AiModelEnvironmentVariable.RESPONSE);
        const apiKey = this.requiredApiKey();
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
                ...(input.maxOutputTokens === undefined
                    ? {}
                    : { max_output_tokens: input.maxOutputTokens }),
                ...(input.textFormat === undefined
                    ? {}
                    : { text: { format: input.textFormat } }),
            }),
        });
        if (!response.ok) {
            throw new InternalServerErrorException(
                `${input.failureLabel} failed (${response.status})`,
            );
        }

        const data = (await response.json()) as OpenAiResponse;
        const value = this.responseText(data);
        if (!value) {
            throw new InternalServerErrorException(
                `${input.failureLabel} returned no content`,
            );
        }
        return value;
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
