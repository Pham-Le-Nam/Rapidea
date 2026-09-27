import { AiChatOrchestrationService } from './ai-chat-orchestration.service';
import { LearnerIntent, LearnerQuery } from './learner-query.types';

const learnerQuery: LearnerQuery = {
  intent: LearnerIntent.FIND_COURSE,
  targets: [],
  courseScope: null,
  desiredSkills: ['TypeScript'],
  existingSkills: [],
  desiredOutcomes: ['Build an application'],
  difficulty: null,
  constraints: { maxDurationHours: null, language: null },
  searchQuery: 'TypeScript application development',
  explanationLevel: null,
  includeDiscussions: false,
};

describe('AiChatOrchestrationService', () => {
  it('runs retrieval, evidence construction, and final generation in order', async () => {
    const retrievalResult = {
      intent: LearnerIntent.FIND_COURSE,
      query: learnerQuery,
      evidence: [],
      warnings: ['duration unavailable'],
    };
    const evidenceResult = {
      evidence: {
        schemaVersion: 1 as const,
        intent: LearnerIntent.FIND_COURSE,
        learnerRequest: {
          targets: [],
          desiredSkills: ['TypeScript'],
          existingSkills: [],
          desiredOutcomes: ['Build an application'],
          difficulty: null,
          constraints: { maxDurationHours: null, language: null },
          searchQuery: 'TypeScript application development',
          explanationLevel: null,
          includeDiscussions: false,
        },
        items: [],
        warnings: ['duration unavailable'],
        truncation: { truncated: false, omittedItems: 0 },
      },
      citationMap: [],
      tokenCount: 321,
    };
    const retrieval = {
      retrieve: jest.fn().mockResolvedValue(retrievalResult),
    };
    const evidence = {
      build: jest.fn().mockReturnValue(evidenceResult),
    };
    const finalAnswers = {
      generate: jest.fn().mockResolvedValue({
        content: 'Answer\n\nFollow up?',
        answer: 'Answer',
        followUpQuestion: 'Follow up?',
        citations: [],
        citedReferences: [],
      }),
    };
    const tokenCounter = { count: jest.fn().mockReturnValue(8) };
    const service = new AiChatOrchestrationService(
      retrieval as any,
      evidence as any,
      finalAnswers as any,
      tokenCounter,
    );

    const result = await service.respond({
      userId: 'learner-1',
      conversationId: 'conversation-1',
      currentMessageId: 'message-1',
      learnerMessage: 'Find a TypeScript course.',
      learnerQuery,
    });

    expect(retrieval.retrieve).toHaveBeenCalledWith('learner-1', learnerQuery);
    expect(evidence.build).toHaveBeenCalledWith(retrievalResult);
    expect(finalAnswers.generate).toHaveBeenCalledWith({
      userId: 'learner-1',
      conversationId: 'conversation-1',
      currentMessageId: 'message-1',
      learnerMessage: 'Find a TypeScript course.',
      evidence: evidenceResult,
    });
    expect(tokenCounter.count).toHaveBeenCalledWith('Answer\n\nFollow up?');
    expect(result).toEqual(
      expect.objectContaining({
        content: 'Answer\n\nFollow up?',
        retrievalWarnings: ['duration unavailable'],
        evidenceTokenCount: 321,
        assistantTokenCount: 8,
      }),
    );
  });
});
