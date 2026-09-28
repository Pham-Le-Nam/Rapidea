import { AiChatOrchestrationService } from '../../application/ai-chat/ai-chat-orchestration.service';
import { FinalAnswerGenerationService } from '../../application/ai-chat/final-answer-generation.service';
import { ContentChunkSourceType } from '../../application/ai-chat/hybrid-content-search.types';
import { IntentRetrievalRouterService } from '../../application/ai-chat/intent-retrieval-router.service';
import {
  LearnerIntent,
  LearnerQuery,
} from '../../application/ai-chat/learner-query.types';
import { RapideiaEvidenceService } from '../../application/ai-chat/rapideia-evidence.service';
import { HybridContentSearchService } from './hybrid-content-search.service';
import { QueryEmbeddingService } from './query-embedding.service';

function rankedChunk(
  id: string,
  sourceId: string,
  content: string,
  score: number,
) {
  return {
    id,
    sourceType: ContentChunkSourceType.POST,
    sourceId,
    courseId: null,
    sequence: 0,
    content,
    tokenCount: 8,
    metadata: { title: sourceId },
    score,
  };
}

const query: LearnerQuery = {
  intent: LearnerIntent.FIND_CONTENT,
  targets: [],
  courseScope: null,
  desiredSkills: [],
  existingSkills: [],
  desiredOutcomes: [],
  difficulty: null,
  constraints: { maxDurationHours: null, language: null },
  searchQuery: 'dependency injection',
  explanationLevel: null,
  includeDiscussions: false,
};

describe('AI chat authorization boundary', () => {
  beforeEach(() => {
    process.env.TEXT_EMBEDDING_MODEL = 'test-embedding-model';
    process.env.TEXT_EMBEDDING_DIMENSIONS = '1536';
  });

  afterEach(() => {
    delete process.env.TEXT_EMBEDDING_MODEL;
    delete process.env.TEXT_EMBEDDING_DIMENSIONS;
  });

  it('never includes an unauthorized retrieved chunk in final model input', async () => {
    const publicText = 'Authorized explanation of dependency injection.';
    const privateText = 'PRIVATE MATERIAL THAT MUST NEVER REACH THE MODEL.';
    const prisma = {
      $queryRaw: jest
        .fn()
        .mockResolvedValueOnce([
          rankedChunk('private-semantic', 'private-post', privateText, 0.99),
          rankedChunk('public-semantic', 'public-post', publicText, 0.8),
        ])
        .mockResolvedValueOnce([
          rankedChunk('private-keyword', 'private-post', privateText, 0.95),
          rankedChunk('public-keyword', 'public-post', publicText, 0.7),
        ]),
    };
    const embeddingAi = {
      createEmbeddings: jest.fn().mockResolvedValue([Array(1536).fill(0.1)]),
    };
    const authorization = {
      canAccess: jest.fn((_userId, resource) =>
        Promise.resolve(resource.id === 'public-post'),
      ),
    };
    const hybridSearch = new HybridContentSearchService(
      prisma as any,
      new QueryEmbeddingService(embeddingAi as any),
      authorization as any,
    );
    const content = {
      search: jest.fn((userId, input) => hybridSearch.search(userId, input)),
      getPost: jest.fn(),
      getFile: jest.fn(),
      getDiscussion: jest.fn(),
      getPostDiscussions: jest.fn(),
      getCourseReviews: jest.fn(),
    };
    const retrieval = new IntentRetrievalRouterService(
      {
        searchSummaries: jest.fn(),
        getSummary: jest.fn(),
        getSummaries: jest.fn(),
        getDetails: jest.fn(),
      },
      content,
      { getForUser: jest.fn() },
      { enrich: jest.fn() } as any,
    );
    const tokenCounter = {
      count: (text: string) => Math.ceil(text.length / 4),
      truncate: (text: string, maxTokens: number) =>
        text.slice(0, maxTokens * 4),
    };
    const evidence = new RapideiaEvidenceService(tokenCounter);
    const learningAssistant = {
      createResponse: jest.fn().mockResolvedValue(
        JSON.stringify({
          answer: 'Dependency injection separates construction from use [R1].',
          citations: ['R1'],
          followUpQuestion: 'Would you like an example?',
        }),
      ),
    };
    const finalAnswers = new FinalAnswerGenerationService(
      learningAssistant,
      evidence,
      {
        getContextForFinalResponse: jest.fn().mockResolvedValue({
          summary: null,
          recentConversation: [],
        }),
      } as any,
    );
    const orchestration = new AiChatOrchestrationService(
      retrieval,
      evidence,
      finalAnswers,
      tokenCounter,
    );

    await orchestration.respond({
      userId: 'learner-1',
      conversationId: 'conversation-1',
      currentMessageId: 'message-1',
      learnerMessage: 'Find material about dependency injection.',
      learnerQuery: query,
    });

    const finalModelInput = learningAssistant.createResponse.mock.calls[0][0]
      .input as string;
    expect(finalModelInput).toContain(publicText);
    expect(finalModelInput).not.toContain(privateText);
    expect(authorization.canAccess).toHaveBeenCalledWith(
      'learner-1',
      expect.objectContaining({ id: 'private-post' }),
      expect.any(String),
    );
  });
});
