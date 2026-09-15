import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { getEncoding } from 'js-tiktoken';
import { AI_SERVICE, AiService } from '../../application/ports/ai.service';
import {
    AiModelEnvironmentVariable,
    requiredAiModel,
} from '../ai/ai-model-config';

export type ChunkingOptions = {
    maxTokens?: number;
    overlapTokens?: number;
    embeddingBatchSize?: number;
    metadata?: Record<string, unknown>;
};

export type TextChunk = {
    sequence: number;
    content: string;
    tokenCount: number;
    metadata: Record<string, unknown>;
};

export type EmbeddedTextChunk = TextChunk & {
    embedding: number[];
    embeddingModel: string;
};

const DEFAULT_MAX_TOKENS = 800;
const DEFAULT_OVERLAP_TOKENS = 100;
const DEFAULT_EMBEDDING_BATCH_SIZE = 64;

@Injectable()
export class ChunkingEmbeddingService {
    private readonly tokenizer = getEncoding('cl100k_base');

    constructor(@Inject(AI_SERVICE) private readonly aiService: AiService) {}

    chunk(text: string, options: ChunkingOptions = {}): TextChunk[] {
        const normalizedText = this.normalize(text);
        if (!normalizedText) {
            return [];
        }

        const maxTokens = this.positiveInteger(
            options.maxTokens,
            this.environmentInteger('TEXT_CHUNK_SIZE_TOKENS', DEFAULT_MAX_TOKENS),
            'maxTokens',
        );
        const overlapTokens = this.nonNegativeInteger(
            options.overlapTokens,
            this.environmentInteger('TEXT_CHUNK_OVERLAP_TOKENS', DEFAULT_OVERLAP_TOKENS),
            'overlapTokens',
        );
        if (overlapTokens >= maxTokens) {
            throw new RangeError('overlapTokens must be smaller than maxTokens');
        }

        const tokens = this.tokenizer.encode(normalizedText);
        const chunks: TextChunk[] = [];
        const step = maxTokens - overlapTokens;

        for (let tokenStart = 0; tokenStart < tokens.length; tokenStart += step) {
            const tokenEnd = Math.min(tokenStart + maxTokens, tokens.length);
            const content = this.tokenizer.decode(tokens.slice(tokenStart, tokenEnd)).trim();

            if (content) {
                chunks.push({
                    sequence: chunks.length,
                    content,
                    tokenCount: this.tokenizer.encode(content).length,
                    metadata: {
                        ...options.metadata,
                        tokenStart,
                        tokenEnd,
                    },
                });
            }

            if (tokenEnd === tokens.length) {
                break;
            }
        }

        return chunks;
    }

    async chunkAndEmbed(text: string, options: ChunkingOptions = {}): Promise<EmbeddedTextChunk[]> {
        const chunks = this.chunk(text, options);
        if (chunks.length === 0) {
            return [];
        }

        const batchSize = this.positiveInteger(
            options.embeddingBatchSize,
            this.environmentInteger('TEXT_EMBEDDING_BATCH_SIZE', DEFAULT_EMBEDDING_BATCH_SIZE),
            'embeddingBatchSize',
        );
        const embeddingModel = requiredAiModel(
            AiModelEnvironmentVariable.TEXT_EMBEDDING,
        );
        const result: EmbeddedTextChunk[] = [];

        for (let start = 0; start < chunks.length; start += batchSize) {
            const batch = chunks.slice(start, start + batchSize);
            const embeddings = await this.aiService.createEmbeddings(
                batch.map((chunk) => chunk.content),
            );

            if (!embeddings || embeddings.length !== batch.length) {
                throw new InternalServerErrorException(
                    `Embedding model ${embeddingModel} returned an incomplete response`,
                );
            }

            batch.forEach((chunk, index) => {
                const embedding = embeddings[index];
                if (!Array.isArray(embedding) || embedding.some((value) => !Number.isFinite(value))) {
                    throw new InternalServerErrorException(
                        `Embedding model ${embeddingModel} returned an invalid vector`,
                    );
                }

                result.push({
                    ...chunk,
                    embedding,
                    embeddingModel,
                });
            });
        }

        return result;
    }

    private normalize(text: string) {
        return text
            .replace(/^\uFEFF/, '')
            .replace(/\r\n?/g, '\n')
            .replace(/[\t ]+/g, ' ')
            .replace(/ *\n */g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }

    private environmentInteger(name: string, fallback: number) {
        const value = Number(process.env[name]);
        return Number.isInteger(value) ? value : fallback;
    }

    private positiveInteger(value: number | undefined, fallback: number, name: string) {
        const result = value ?? fallback;
        if (!Number.isInteger(result) || result <= 0) {
            throw new RangeError(`${name} must be a positive integer`);
        }
        return result;
    }

    private nonNegativeInteger(value: number | undefined, fallback: number, name: string) {
        const result = value ?? fallback;
        if (!Number.isInteger(result) || result < 0) {
            throw new RangeError(`${name} must be a non-negative integer`);
        }
        return result;
    }
}
