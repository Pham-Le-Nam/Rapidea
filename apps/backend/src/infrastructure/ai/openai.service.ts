import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AiMediaFile, AiService } from '../../application/ports/ai.service';
import {
    AiModelEnvironmentVariable,
    requiredAiModel,
} from './ai-model-config';

const TIPTAP_DOCUMENT_FORMAT = {
    type: 'json_schema',
    name: 'tiptap_document',
    strict: true,
    schema: {
        type: 'object',
        properties: {
            type: { type: 'string', enum: ['doc'] },
            content: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        type: { type: 'string', enum: ['paragraph'] },
                        content: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    type: { type: 'string', enum: ['text'] },
                                    text: { type: 'string' },
                                },
                                required: ['type', 'text'],
                                additionalProperties: false,
                            },
                        },
                    },
                    required: ['type', 'content'],
                    additionalProperties: false,
                },
            },
        },
        required: ['type', 'content'],
        additionalProperties: false,
    },
} as const;

type OpenAiResponse = {
    output?: Array<{
        type?: string;
        content?: Array<{
            type?: string;
            text?: string;
        }>;
    }>;
};

@Injectable()
export class OpenAiService implements AiService {
    async generatePostContent(input: {
        target: 'title' | 'details';
        systemPrompt: string;
        context: string;
    }) {
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
                instructions: input.systemPrompt,
                input: input.context,
                store: false,
                text: input.target === 'details'
                    ? { format: TIPTAP_DOCUMENT_FORMAT }
                    : undefined,
            }),
        });
        if (!response.ok) {
            throw new InternalServerErrorException(`Post generation failed (${response.status})`);
        }

        const data = await response.json() as OpenAiResponse;
        const value = data.output
            ?.flatMap((item) => item.type === 'message' ? item.content ?? [] : [])
            .filter((content) => content.type === 'output_text')
            .map((content) => content.text ?? '')
            .join('')
            .trim();
        if (!value) throw new InternalServerErrorException('Post generation returned no content');
        return value;
    }

    async createEmbeddings(input: string[]) {
        const model = requiredAiModel(
            AiModelEnvironmentVariable.TEXT_EMBEDDING,
        );
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) return null;

        try {
            const response = await fetch('https://api.openai.com/v1/embeddings', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model,
                    input,
                }),
            });
            if (!response.ok) return null;

            const data = await response.json() as { data?: { embedding: number[] }[] };
            return data.data?.map((item) => item.embedding) ?? null;
        } catch {
            return null;
        }
    }

    async transcribeMedia(file: AiMediaFile) {
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

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}` },
            body: formData,
        });
        if (!response.ok) throw new Error(`Transcription failed with status ${response.status}`);

        const data = await response.json() as { text?: string };
        return data.text ?? '';
    }

    private requiredApiKey() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new InternalServerErrorException('OPENAI_API_KEY is not configured');
        return apiKey;
    }
}
