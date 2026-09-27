import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AI_SERVICE, AiService } from '../../application/ports/ai.service';
import {
    AiModelEnvironmentVariable,
    requiredAiModel,
    requiredEmbeddingDimensions,
} from './ai-model-config';

export type QueryEmbedding = {
    embedding: number[];
    model: string;
};

@Injectable()
export class QueryEmbeddingService {
    constructor(@Inject(AI_SERVICE) private readonly aiService: AiService) {}

    async create(text: string): Promise<QueryEmbedding> {
        const model = requiredAiModel(
            AiModelEnvironmentVariable.TEXT_EMBEDDING,
        );
        const dimensions = requiredEmbeddingDimensions();
        const embeddings = await this.aiService.createEmbeddings([text]);
        const embedding = embeddings?.[0];

        if (
            !embedding ||
            embedding.length !== dimensions ||
            embedding.some((value) => !Number.isFinite(value))
        ) {
            throw new InternalServerErrorException(
                'Embedding model returned an invalid query vector',
            );
        }

        return { embedding, model };
    }
}
