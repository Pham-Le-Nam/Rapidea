import { AiService } from '../../application/ports/ai.service';
import { ChunkingEmbeddingService } from './chunking-embedding.service';

describe('ChunkingEmbeddingService', () => {
    const originalEmbeddingModel = process.env.TEXT_EMBEDDING_MODEL;
    const aiService = {
        createEmbeddings: jest.fn(),
    } as unknown as AiService;
    const service = new ChunkingEmbeddingService(aiService);

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.TEXT_EMBEDDING_MODEL = 'test-embedding-model';
    });

    afterAll(() => {
        if (originalEmbeddingModel === undefined) {
            delete process.env.TEXT_EMBEDDING_MODEL;
        } else {
            process.env.TEXT_EMBEDDING_MODEL = originalEmbeddingModel;
        }
    });

    it('creates ordered, overlapping chunks within the token limit', () => {
        const chunks = service.chunk(
            'One two three four five six seven eight nine ten eleven twelve.',
            { maxTokens: 5, overlapTokens: 2, metadata: { sourceId: 'source-1' } },
        );

        expect(chunks.length).toBeGreaterThan(1);
        expect(chunks.map((chunk) => chunk.sequence)).toEqual(
            chunks.map((_, index) => index),
        );
        expect(chunks.every((chunk) => chunk.tokenCount <= 5)).toBe(true);
        expect(chunks.every((chunk) => chunk.metadata.sourceId === 'source-1')).toBe(true);
        expect(Number(chunks[1].metadata.tokenStart)).toBeLessThan(
            Number(chunks[0].metadata.tokenEnd),
        );
    });

    it('embeds chunks in batches and records the model', async () => {
        jest.mocked(aiService.createEmbeddings)
            .mockImplementation(async (input) => input.map((_, index) => [index, 1]));

        const chunks = await service.chunkAndEmbed(
            'One two three four five six seven eight nine ten eleven twelve.',
            { maxTokens: 4, overlapTokens: 1, embeddingBatchSize: 2 },
        );

        expect(chunks.length).toBeGreaterThan(2);
        expect(aiService.createEmbeddings).toHaveBeenCalledTimes(
            Math.ceil(chunks.length / 2),
        );
        expect(chunks.every((chunk) => chunk.embeddingModel === 'test-embedding-model')).toBe(true);
        expect(chunks.every((chunk) => chunk.embedding.length === 2)).toBe(true);
    });

    it('returns no chunks or embedding calls for blank text', async () => {
        await expect(service.chunkAndEmbed('  \n ')).resolves.toEqual([]);
        expect(aiService.createEmbeddings).not.toHaveBeenCalled();
    });

    it('rejects overlap that is not smaller than the chunk size', () => {
        expect(() => service.chunk('content', { maxTokens: 10, overlapTokens: 10 }))
            .toThrow('overlapTokens must be smaller than maxTokens');
    });

    it('rejects embedding when TEXT_EMBEDDING_MODEL is missing', async () => {
        delete process.env.TEXT_EMBEDDING_MODEL;

        await expect(service.chunkAndEmbed('content')).rejects
            .toThrow('TEXT_EMBEDDING_MODEL is not configured');
        expect(aiService.createEmbeddings).not.toHaveBeenCalled();
    });
});
