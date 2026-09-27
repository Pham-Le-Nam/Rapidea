import { reciprocalRankFuse } from './reciprocal-rank-fusion';

describe('reciprocalRankFuse', () => {
    it('promotes candidates supported by semantic and keyword rankings', () => {
        const semantic = [
            { id: 'semantic-only', score: 0.95 },
            { id: 'both', score: 0.8 },
        ];
        const keyword = [{ id: 'both', score: 0.7 }];

        const result = reciprocalRankFuse(
            semantic,
            keyword,
            (candidate) => candidate.id,
        );

        expect(result.map(({ item }) => item.id)).toEqual([
            'both',
            'semantic-only',
        ]);
        expect(result[0]).toEqual(
            expect.objectContaining({
                semanticScore: 0.8,
                keywordScore: 0.7,
                semanticRank: 2,
                keywordRank: 1,
            }),
        );
    });

    it('keeps the best rank when physical rows share a logical key', () => {
        const result = reciprocalRankFuse(
            [
                { id: 'copy-1', logicalId: 'post-1', score: 0.9 },
                { id: 'copy-2', logicalId: 'post-1', score: 0.8 },
            ],
            [],
            (candidate) => candidate.logicalId,
        );

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(
            expect.objectContaining({
                item: expect.objectContaining({ id: 'copy-1' }),
                semanticScore: 0.9,
                semanticRank: 1,
            }),
        );
    });
});
