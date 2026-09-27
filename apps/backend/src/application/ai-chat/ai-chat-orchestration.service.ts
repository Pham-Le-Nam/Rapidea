import { Inject, Injectable } from '@nestjs/common';
import {
  TOKEN_COUNTER_PORT,
  TokenCounterPort,
} from '../ports/token-counter.port';
import { FinalAnswerGenerationService } from './final-answer-generation.service';
import { IntentRetrievalRouterService } from './intent-retrieval-router.service';
import { RapideiaEvidenceService } from './rapideia-evidence.service';
import {
  AiChatOrchestrationInput,
  AiChatOrchestrationResult,
} from './ai-chat-orchestration.types';

@Injectable()
export class AiChatOrchestrationService {
  constructor(
    private readonly retrieval: IntentRetrievalRouterService,
    private readonly evidence: RapideiaEvidenceService,
    private readonly finalAnswers: FinalAnswerGenerationService,
    @Inject(TOKEN_COUNTER_PORT)
    private readonly tokenCounter: TokenCounterPort,
  ) {}

  async respond(
    input: AiChatOrchestrationInput,
  ): Promise<AiChatOrchestrationResult> {
    const retrieval = await this.retrieval.retrieve(
      input.userId,
      input.learnerQuery,
    );
    const evidence = this.evidence.build(retrieval);
    const answer = await this.finalAnswers.generate({
      userId: input.userId,
      conversationId: input.conversationId,
      currentMessageId: input.currentMessageId,
      learnerMessage: input.learnerMessage,
      evidence,
    });

    return {
      ...answer,
      retrievalWarnings: [...retrieval.warnings],
      evidenceTokenCount: evidence.tokenCount,
      assistantTokenCount: this.tokenCounter.count(answer.content),
    };
  }
}
