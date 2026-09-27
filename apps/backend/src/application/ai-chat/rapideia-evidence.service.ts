import { Inject, Injectable } from '@nestjs/common';
import {
  TOKEN_COUNTER_PORT,
  TokenCounterPort,
} from '../ports/token-counter.port';
import {
  IntentEvidenceKind,
  IntentRetrievalEvidence,
  IntentRetrievalResult,
} from './intent-retrieval.types';
import {
  EvidenceAuthority,
  EvidenceCitationTarget,
  EvidenceResourceType,
  RapideiaEvidenceBuildResult,
  RapideiaEvidenceItem,
  RapideiaEvidencePackage,
} from './rapideia-evidence.types';

export type EvidenceBuildOptions = {
  maxTokens?: number;
  maxItemTokens?: number;
};

type Candidate = {
  kind: IntentEvidenceKind;
  authority: EvidenceAuthority;
  sourceType: EvidenceResourceType;
  sourceLabel: string | null;
  internalSource: { type: EvidenceResourceType; id: string } | null;
  data: unknown;
};

const DEFAULT_MAX_TOKENS = 12_000;
const DEFAULT_MAX_ITEM_TOKENS = 2_500;
const MIN_MAX_TOKENS = 500;
const MAX_MAX_TOKENS = 50_000;
const MAX_ARRAY_ITEMS = 25;
const MAX_OBJECT_DEPTH = 12;

const INTERNAL_KEYS = new Set([
  'embedding',
  'embeddingModel',
  'semanticScore',
  'keywordScore',
  'combinedScore',
  'tokenCount',
  'sequence',
  'tokenStart',
  'tokenEnd',
  'sourceHash',
  'profileVersion',
  'instructions',
  'systemPrompt',
  'prompt',
]);

@Injectable()
export class RapideiaEvidenceService {
  constructor(
    @Inject(TOKEN_COUNTER_PORT)
    private readonly tokenCounter: TokenCounterPort,
  ) {}

  build(
    retrieval: IntentRetrievalResult,
    options: EvidenceBuildOptions = {},
  ): RapideiaEvidenceBuildResult {
    const maxTokens = this.boundedInteger(
      options.maxTokens,
      DEFAULT_MAX_TOKENS,
      MIN_MAX_TOKENS,
      MAX_MAX_TOKENS,
    );
    const maxItemTokens = this.boundedInteger(
      options.maxItemTokens,
      DEFAULT_MAX_ITEM_TOKENS,
      100,
      maxTokens,
    );
    const candidates = retrieval.evidence.flatMap((evidence) =>
      this.expand(evidence),
    );
    const evidencePackage = this.basePackage(retrieval);
    const citationMap: EvidenceCitationTarget[] = [];
    let omittedItems = 0;

    for (const candidate of candidates) {
      const reference = `R${evidencePackage.items.length + 1}`;
      const item = this.toItem(candidate, reference, maxItemTokens);
      const prospective = {
        ...evidencePackage,
        items: [...evidencePackage.items, item],
      };
      if (this.countPackage(prospective) > maxTokens) {
        omittedItems += 1;
        continue;
      }

      evidencePackage.items.push(item);
      citationMap.push({ reference, source: candidate.internalSource });
    }

    evidencePackage.truncation = {
      truncated: omittedItems > 0,
      omittedItems,
    };

    return {
      evidence: evidencePackage,
      citationMap,
      tokenCount: this.countPackage(evidencePackage),
    };
  }

  toPromptBlock(evidence: RapideiaEvidencePackage): string {
    return [
      '<RAPIDEIA_EVIDENCE>',
      JSON.stringify(evidence),
      '</RAPIDEIA_EVIDENCE>',
    ].join('\n');
  }

  private basePackage(
    retrieval: IntentRetrievalResult,
  ): RapideiaEvidencePackage {
    return {
      schemaVersion: 1,
      intent: retrieval.intent,
      learnerRequest: {
        targets: retrieval.query.targets.map(({ type, name }) => ({
          type,
          name,
        })),
        desiredSkills: retrieval.query.desiredSkills,
        existingSkills: retrieval.query.existingSkills,
        desiredOutcomes: retrieval.query.desiredOutcomes,
        difficulty: retrieval.query.difficulty,
        constraints: retrieval.query.constraints,
        searchQuery: retrieval.query.searchQuery,
        explanationLevel: retrieval.query.explanationLevel,
        includeDiscussions: retrieval.query.includeDiscussions,
      },
      ...(retrieval.learningPathPlan
        ? { learningPathPlan: retrieval.learningPathPlan }
        : {}),
      items: [],
      warnings: [...retrieval.warnings],
      truncation: { truncated: false, omittedItems: 0 },
    };
  }

  private expand(evidence: IntentRetrievalEvidence): Candidate[] {
    if (evidence.kind === IntentEvidenceKind.DISCUSSION_THREAD) {
      return this.expandDiscussionThread(evidence);
    }

    const values = Array.isArray(evidence.data)
      ? evidence.data
      : [evidence.data];
    return values.map((data) => this.candidate(evidence.kind, data, evidence));
  }

  private expandDiscussionThread(
    evidence: IntentRetrievalEvidence,
  ): Candidate[] {
    const record = this.record(evidence.data);
    const post = this.record(record?.post);
    const discussions = Array.isArray(record?.discussions)
      ? record.discussions
      : [];
    const threadContext = post
      ? this.candidate(
          evidence.kind,
          { post, discussionCount: discussions.length },
          evidence,
        )
      : [];
    const comments = discussions.map((discussion) =>
      this.candidate(evidence.kind, discussion, evidence, 'DISCUSSION'),
    );
    return [threadContext, ...comments].flat();
  }

  private candidate(
    kind: IntentEvidenceKind,
    data: unknown,
    evidence: IntentRetrievalEvidence,
    forcedType?: EvidenceResourceType,
  ): Candidate {
    const record = this.record(data);
    const sourceType =
      forcedType ??
      this.resourceType(record?.sourceType) ??
      evidence.source?.type ??
      this.defaultResourceType(kind);
    const sourceId =
      this.string(record?.sourceId) ?? this.string(record?.id) ?? null;
    const internalSource = evidence.source
      ? {
          type: evidence.source.type as EvidenceResourceType,
          id: evidence.source.id,
        }
      : sourceId
        ? { type: sourceType, id: sourceId }
        : null;

    return {
      kind,
      authority: this.authority(kind, sourceType),
      sourceType,
      sourceLabel: this.sourceLabel(record),
      internalSource,
      data,
    };
  }

  private toItem(
    candidate: Candidate,
    reference: string,
    maxItemTokens: number,
  ): RapideiaEvidenceItem {
    const sanitized = this.sanitize(candidate.data);
    const serialized = JSON.stringify(sanitized);
    const data =
      this.tokenCounter.count(serialized) <= maxItemTokens
        ? sanitized
        : {
            excerpt: this.tokenCounter.truncate(serialized, maxItemTokens),
            truncated: true,
          };

    return {
      reference,
      kind: candidate.kind,
      authority: candidate.authority,
      source: {
        type: candidate.sourceType,
        label: candidate.sourceLabel,
      },
      data,
    };
  }

  private sanitize(value: unknown, depth = 0): unknown {
    if (depth >= MAX_OBJECT_DEPTH) return '[nested data omitted]';
    if (
      value === null ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      return value;
    }
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) {
      return value
        .slice(0, MAX_ARRAY_ITEMS)
        .map((item) => this.sanitize(item, depth + 1));
    }
    const record = this.record(value);
    if (!record) return String(value);

    return Object.fromEntries(
      Object.entries(record).flatMap(([key, item]) => {
        if (this.isInternalKey(key)) return [];
        return [[key, this.sanitize(item, depth + 1)]];
      }),
    );
  }

  private isInternalKey(key: string): boolean {
    return (
      key === 'id' ||
      key.endsWith('Id') ||
      key.endsWith('Ids') ||
      INTERNAL_KEYS.has(key)
    );
  }

  private authority(
    kind: IntentEvidenceKind,
    sourceType: EvidenceResourceType,
  ): EvidenceAuthority {
    if (kind === IntentEvidenceKind.LEARNER_CONTEXT) {
      return EvidenceAuthority.LEARNER_CONTEXT;
    }
    if (
      kind === IntentEvidenceKind.DISCUSSION_THREAD ||
      kind === IntentEvidenceKind.COURSE_REVIEWS ||
      kind === IntentEvidenceKind.COMMUNITY_CHUNKS ||
      sourceType === 'DISCUSSION' ||
      sourceType === 'REVIEW'
    ) {
      return EvidenceAuthority.COMMUNITY;
    }
    if (sourceType === 'COURSE') {
      return EvidenceAuthority.COURSE_OFFICIAL;
    }
    return EvidenceAuthority.RESOURCE_SPECIFIC;
  }

  private defaultResourceType(kind: IntentEvidenceKind): EvidenceResourceType {
    switch (kind) {
      case IntentEvidenceKind.LEARNER_CONTEXT:
        return 'LEARNER';
      case IntentEvidenceKind.COURSE_SEARCH_RESULTS:
      case IntentEvidenceKind.COURSE_SUMMARY:
      case IntentEvidenceKind.COURSE_DETAILS:
      case IntentEvidenceKind.COURSE_REVIEWS:
        return 'COURSE';
      case IntentEvidenceKind.POST_DETAILS:
      case IntentEvidenceKind.DISCUSSION_THREAD:
        return 'POST';
      case IntentEvidenceKind.FILE_DETAILS:
        return 'FILE';
      case IntentEvidenceKind.COMMUNITY_CHUNKS:
        return 'DISCUSSION';
      case IntentEvidenceKind.CONTENT_CHUNKS:
        return 'POST';
    }
  }

  private resourceType(value: unknown): EvidenceResourceType | null {
    return value === 'COURSE' ||
      value === 'POST' ||
      value === 'FILE' ||
      value === 'DISCUSSION' ||
      value === 'REVIEW' ||
      value === 'LEARNER'
      ? value
      : null;
  }

  private sourceLabel(record: Record<string, unknown> | null): string | null {
    if (!record) return null;
    const metadata = this.record(record.metadata);
    return (
      this.string(record.title) ??
      this.string(record.name) ??
      this.string(metadata?.title) ??
      this.string(metadata?.name) ??
      null
    );
  }

  private countPackage(evidence: RapideiaEvidencePackage): number {
    return this.tokenCounter.count(JSON.stringify(evidence));
  }

  private record(value: unknown): Record<string, unknown> | null {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  }

  private string(value: unknown): string | null {
    return typeof value === 'string' && value.trim() ? value : null;
  }

  private boundedInteger(
    value: number | undefined,
    fallback: number,
    minimum: number,
    maximum: number,
  ): number {
    const selected = Number.isInteger(value) ? (value as number) : fallback;
    return Math.min(Math.max(selected, minimum), maximum);
  }
}
