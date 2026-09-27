export type RankedSearchCandidate = {
    score: number;
};

export type ReciprocalRankFusionResult<T> = {
    item: T;
    semanticScore: number | null;
    keywordScore: number | null;
    semanticRank: number | null;
    keywordRank: number | null;
    combinedScore: number;
};

const DEFAULT_RANK_CONSTANT = 60;

/**
 * Combines independently ranked semantic and keyword results without coupling
 * the application ranking policy to a database or embedding provider.
 */
export function reciprocalRankFuse<T extends RankedSearchCandidate>(
    semantic: readonly T[],
    keyword: readonly T[],
    keyOf: (candidate: T) => string,
    rankConstant = DEFAULT_RANK_CONSTANT,
): ReciprocalRankFusionResult<T>[] {
    const fused = new Map<string, ReciprocalRankFusionResult<T>>();
    addCandidates(fused, semantic, 'semantic', keyOf, rankConstant);
    addCandidates(fused, keyword, 'keyword', keyOf, rankConstant);

    return [...fused.values()].sort(
        (left, right) => right.combinedScore - left.combinedScore,
    );
}

function addCandidates<T extends RankedSearchCandidate>(
    fused: Map<string, ReciprocalRankFusionResult<T>>,
    candidates: readonly T[],
    channel: 'semantic' | 'keyword',
    keyOf: (candidate: T) => string,
    rankConstant: number,
): void {
    candidates.forEach((candidate, index) => {
        const key = keyOf(candidate);
        const existing = fused.get(key);

        // A query can return duplicate physical rows for one logical resource.
        // Keep its best (first) position in each ranked channel.
        if (
            existing &&
            (channel === 'semantic'
                ? existing.semanticRank !== null
                : existing.keywordRank !== null)
        ) {
            return;
        }

        const result = existing ?? {
            item: candidate,
            semanticScore: null,
            keywordScore: null,
            semanticRank: null,
            keywordRank: null,
            combinedScore: 0,
        };
        const rank = index + 1;

        if (channel === 'semantic') {
            result.semanticScore = Number(candidate.score);
            result.semanticRank = rank;
        } else {
            result.keywordScore = Number(candidate.score);
            result.keywordRank = rank;
        }

        result.combinedScore =
            reciprocalRank(result.semanticRank, rankConstant) +
            reciprocalRank(result.keywordRank, rankConstant);
        fused.set(key, result);
    });
}

function reciprocalRank(rank: number | null, rankConstant: number): number {
    return rank === null ? 0 : 1 / (rankConstant + rank);
}
