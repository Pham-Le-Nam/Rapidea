import { AiContentAccessMode } from './ai-content-authorization.types';

export enum ContentChunkSourceType {
  FILE = 'FILE',
  POST = 'POST',
  DISCUSSION = 'DISCUSSION',
  REVIEW = 'REVIEW',
}

export type HybridContentSearchSource = {
  sourceType: ContentChunkSourceType;
  sourceId: string;
};

export type HybridContentSearchInput = {
  query: string;
  courseIds?: readonly string[];
  sources?: readonly HybridContentSearchSource[];
  sourceTypes?: readonly ContentChunkSourceType[];
  accessMode?: AiContentAccessMode;
  limit?: number;
};

export type HybridContentSearchResult = {
  chunkId: string;
  sourceType: ContentChunkSourceType;
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
