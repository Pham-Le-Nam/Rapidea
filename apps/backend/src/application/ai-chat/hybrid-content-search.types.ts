import { ContentSourceType } from '../../../generated/prisma/enums';
import { AiContentAccessMode } from './ai-content-authorization.types';

export type HybridContentSearchSource = {
    sourceType: ContentSourceType;
    sourceId: string;
};

export type HybridContentSearchInput = {
    query: string;
    courseIds?: readonly string[];
    sources?: readonly HybridContentSearchSource[];
    sourceTypes?: readonly ContentSourceType[];
    accessMode?: AiContentAccessMode;
    limit?: number;
};

export type HybridContentSearchResult = {
    chunkId: string;
    sourceType: ContentSourceType;
    sourceId: string;
    courseId: string | null;
    sequence: number;
    content: string;
    tokenCount: number;
    metadata: unknown;
    semanticScore: number | null;
    keywordScore: number | null;
    combinedScore: number;
};
