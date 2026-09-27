import { InternalServerErrorException } from '@nestjs/common';
import { QueryEmbeddingService } from './query-embedding.service';

describe('QueryEmbeddingService', () => {
    const validEmbedding = Array(1536).fill(0.1);

    beforeEach(() => {
        process.env.TEXT_EMBEDDING_MODEL = 'test-embedding-model';
        process.env.TEXT_EMBEDDING_DIMENSIONS = '1536';
    });

    afterEach(() => {
        delete process.env.TEXT_EMBEDDING_MODEL;
        delete process.env.TEXT_EMBEDDING_DIMENSIONS;
    });

    it('returns the configured model with a validated query embedding', async () => {
        const aiService = {
            createEmbeddings: jest.fn().mockResolvedValue([validEmbedding]),
        };
        const service = new QueryEmbeddingService(aiService as any);

        await expect(service.create('dependency injection')).resolves.toEqual({
            embedding: validEmbedding,
            model: 'test-embedding-model',
        });
        expect(aiService.createEmbeddings).toHaveBeenCalledWith([
            'dependency injection',
        ]);
    });

    it('rejects an embedding that cannot fit the database vector columns', async () => {
        const aiService = {
            createEmbeddings: jest.fn().mockResolvedValue([[0.1, 0.2]]),
        };
        const service = new QueryEmbeddingService(aiService as any);

        await expect(service.create('typescript')).rejects.toBeInstanceOf(
            InternalServerErrorException,
        );
    });

    it('fails before calling the provider when no model is configured', async () => {
        delete process.env.TEXT_EMBEDDING_MODEL;
        const aiService = { createEmbeddings: jest.fn() };
        const service = new QueryEmbeddingService(aiService as any);

        await expect(service.create('typescript')).rejects.toThrow(
            'TEXT_EMBEDDING_MODEL is not configured',
        );
        expect(aiService.createEmbeddings).not.toHaveBeenCalled();
    });
});
