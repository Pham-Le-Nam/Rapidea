import { Injectable } from '@nestjs/common';
import { AiMediaFile, AiService } from '../../application/ports/ai.service';
import { AiTextModelPurpose } from '../../application/ports/learning-assistant-response.port';
import { OpenAiClientService } from './openai-client.service';

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

@Injectable()
export class OpenAiService implements AiService {
    constructor(private readonly openAiClient: OpenAiClientService) {}

    generatePostContent(input: {
        target: 'title' | 'details';
        systemPrompt: string;
        context: string;
    }): Promise<string> {
        return this.openAiClient.createTextResponse({
            modelPurpose: AiTextModelPurpose.PROCESSING,
            instructions: input.systemPrompt,
            input: input.context,
            failureLabel: 'Post generation',
            textFormat:
                input.target === 'details' ? TIPTAP_DOCUMENT_FORMAT : undefined,
        });
    }

    createEmbeddings(input: string[]): Promise<number[][] | null> {
        return this.openAiClient.createEmbeddings(input);
    }

    transcribeMedia(file: AiMediaFile): Promise<string> {
        return this.openAiClient.transcribeMedia(file);
    }
}
