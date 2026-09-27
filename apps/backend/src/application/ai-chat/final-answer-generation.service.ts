import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  LEARNING_ASSISTANT_RESPONSE_PORT,
  LearningAssistantResponsePort,
} from '../ports/learning-assistant-response.port';
import { FINAL_ANSWER_OUTPUT } from './final-answer.schema';
import {
  FinalAnswerGenerationInput,
  FinalAnswerGenerationResult,
} from './final-answer.types';
import { RAPIDEIA_FINAL_ANSWER_PROMPT } from './prompts/final-answer.prompt';
import { RapideiaEvidenceService } from './rapideia-evidence.service';
import { ConversationMemoryService } from './conversation-memory.service';
import { ConversationMemoryContext } from './conversation-memory.types';

type ModelFinalAnswer = {
  answer: string;
  citations: string[];
  followUpQuestion: string;
};

const MAX_OUTPUT_TOKENS = 2_500;
const REFERENCE_PATTERN = /^R[1-9]\d*$/;

@Injectable()
export class FinalAnswerGenerationService {
  constructor(
    @Inject(LEARNING_ASSISTANT_RESPONSE_PORT)
    private readonly learningAssistant: LearningAssistantResponsePort,
    private readonly evidenceService: RapideiaEvidenceService,
    private readonly conversationMemory: ConversationMemoryService,
  ) {}

  async generate(
    input: FinalAnswerGenerationInput,
  ): Promise<FinalAnswerGenerationResult> {
    const conversationContext =
      await this.conversationMemory.getContextForFinalResponse(
        input.userId,
        input.conversationId,
        input.currentMessageId,
      );
    const response = await this.learningAssistant.createResponse({
      additionalPolicyLayers: [RAPIDEIA_FINAL_ANSWER_PROMPT],
      input: this.modelInput(input, conversationContext),
      structuredOutput: FINAL_ANSWER_OUTPUT,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      failureLabel: 'Rapideia final answer generation',
    });
    const parsed = this.parse(response);
    const available = new Map(
      input.evidence.citationMap
        .filter((citation) => citation.source !== null)
        .map((citation) => [citation.reference, citation]),
    );
    const mentionedReferences = this.referencesIn(parsed.answer);
    const citedReferences = [
      ...new Set([...parsed.citations, ...mentionedReferences]),
    ];
    const unknownReferences = citedReferences.filter(
      (reference) => !available.has(reference),
    );
    if (unknownReferences.length > 0) {
      throw new InternalServerErrorException(
        'Rapideia final answer referenced unavailable evidence',
      );
    }

    const answer = parsed.answer.trim();
    const followUpQuestion = parsed.followUpQuestion.trim();
    return {
      content: `${answer}\n\n${followUpQuestion}`,
      answer,
      followUpQuestion,
      citedReferences,
      citations: citedReferences.map((reference) => available.get(reference)!),
    };
  }

  private modelInput(
    input: FinalAnswerGenerationInput,
    context: ConversationMemoryContext,
  ): string {
    const sections = [
      '<LEARNER_MESSAGE>',
      JSON.stringify(input.learnerMessage),
      '</LEARNER_MESSAGE>',
    ];
    if (context.summary) {
      sections.push(
        '<CONVERSATION_SUMMARY>',
        JSON.stringify(context.summary),
        '</CONVERSATION_SUMMARY>',
      );
    }
    if (context.recentConversation.length) {
      sections.push(
        '<RECENT_CONVERSATION>',
        JSON.stringify(context.recentConversation),
        '</RECENT_CONVERSATION>',
      );
    }
    sections.push(this.evidenceService.toPromptBlock(input.evidence.evidence));
    return sections.join('\n');
  }

  private parse(value: string): ModelFinalAnswer {
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new InternalServerErrorException(
        'Rapideia final answer returned invalid JSON',
      );
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw this.invalidOutput();
    }

    const record = parsed as Record<string, unknown>;
    if (
      typeof record.answer !== 'string' ||
      !record.answer.trim() ||
      typeof record.followUpQuestion !== 'string' ||
      !record.followUpQuestion.trim() ||
      !Array.isArray(record.citations) ||
      record.citations.some(
        (reference) =>
          typeof reference !== 'string' || !REFERENCE_PATTERN.test(reference),
      )
    ) {
      throw this.invalidOutput();
    }

    return {
      answer: record.answer,
      followUpQuestion: record.followUpQuestion,
      citations: [...new Set(record.citations as string[])],
    };
  }

  private referencesIn(answer: string): string[] {
    return [...answer.matchAll(/\bR[1-9]\d*\b/g)].map((match) => match[0]);
  }

  private invalidOutput(): InternalServerErrorException {
    return new InternalServerErrorException(
      'Rapideia final answer returned an invalid response',
    );
  }
}
