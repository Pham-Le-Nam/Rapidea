import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  LEARNING_ASSISTANT_RESPONSE_PORT,
  AiTextModelPurpose,
  LearningAssistantResponsePort,
} from '../ports/learning-assistant-response.port';
import { FINAL_ANSWER_OUTPUT } from './final-answer.schema';
import {
  FinalAnswerGenerationInput,
  FinalAnswerGenerationResult,
} from './final-answer.types';
import {
  RAPIDEIA_FINAL_ANSWER_PROMPT,
  RAPIDEIA_FINAL_ANSWER_RETRY_PROMPT,
} from './prompts/final-answer.prompt';
import { RapideiaEvidenceService } from './rapideia-evidence.service';
import { ConversationMemoryService } from './conversation-memory.service';
import { ConversationMemoryContext } from './conversation-memory.types';
import { EvidenceAuthority } from './rapideia-evidence.types';

type ModelFinalAnswer = {
  answer: string;
  citations: string[];
  followUpQuestion: string;
};

const MAX_OUTPUT_TOKENS = 2_500;
const REFERENCE_PATTERN = /^R[1-9]\d*$/;
const REFERENCE_IN_TEXT_PATTERN = /\bR[1-9]\d*\b/g;

class InvalidModelFinalAnswerError extends Error {
  constructor(readonly reason: string) {
    super(reason);
    this.name = InvalidModelFinalAnswerError.name;
  }
}

@Injectable()
export class FinalAnswerGenerationService {
  private readonly logger = new Logger(FinalAnswerGenerationService.name);

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
    const available = new Map(
      input.evidence.citationMap
        .filter((citation) => citation.source !== null)
        .map((citation) => [citation.reference, citation]),
    );
    const modelInput = this.modelInput(input, conversationContext, [
      ...available.keys(),
    ]);
    const parsed = await this.generateValidatedAnswer(modelInput);
    const answer = this.normalizeReferenceMarkers(
      this.withoutInternalEvidenceLabels(
        available.size === 0
          ? this.withoutReferences(parsed.answer)
          : parsed.answer,
      ),
    ).trim();
    if (!answer) throw this.invalidOutput();
    const mentionedReferences = this.referencesIn(answer);
    const citedReferences = [
      ...new Set([
        ...(available.size === 0 ? [] : parsed.citations),
        ...mentionedReferences,
      ]),
    ];
    const unknownReferences = citedReferences.filter(
      (reference) => !available.has(reference),
    );
    if (unknownReferences.length > 0) {
      throw new InternalServerErrorException(
        'Rapideia final answer referenced unavailable evidence',
      );
    }

    const followUpQuestion = parsed.followUpQuestion.trim();
    return {
      content: `${answer}\n\n${followUpQuestion}`,
      answer,
      followUpQuestion,
      citedReferences,
      citations: citedReferences.map((reference) => available.get(reference)!),
    };
  }

  private async generateValidatedAnswer(
    input: string,
  ): Promise<ModelFinalAnswer> {
    try {
      return this.parse(await this.requestAnswer(input, false));
    } catch (error) {
      if (!(error instanceof InvalidModelFinalAnswerError)) throw error;
      this.logger.warn(
        `Final answer validation failed; retrying once: reason=${error.reason}`,
      );
    }

    try {
      return this.parse(await this.requestAnswer(input, true));
    } catch (error) {
      if (!(error instanceof InvalidModelFinalAnswerError)) throw error;
      this.logger.error(
        `Final answer validation failed after retry: reason=${error.reason}`,
      );
      throw this.invalidOutput();
    }
  }

  private requestAnswer(input: string, retry: boolean): Promise<string> {
    return this.learningAssistant.createResponse({
      modelPurpose: AiTextModelPurpose.RESPONSE,
      additionalPolicyLayers: [
        RAPIDEIA_FINAL_ANSWER_PROMPT,
        ...(retry ? [RAPIDEIA_FINAL_ANSWER_RETRY_PROMPT] : []),
      ],
      input,
      structuredOutput: FINAL_ANSWER_OUTPUT,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      failureLabel: 'Rapideia final answer generation',
    });
  }

  private modelInput(
    input: FinalAnswerGenerationInput,
    context: ConversationMemoryContext,
    availableCitationReferences: readonly string[],
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
    sections.push(
      '<AVAILABLE_CITATION_REFERENCES>',
      JSON.stringify(availableCitationReferences),
      '</AVAILABLE_CITATION_REFERENCES>',
      this.evidenceService.toPromptBlock(input.evidence.evidence),
    );
    return sections.join('\n');
  }

  private parse(value: string): ModelFinalAnswer {
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new InvalidModelFinalAnswerError('invalid_json');
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new InvalidModelFinalAnswerError('not_an_object');
    }

    const record = parsed as Record<string, unknown>;
    if (typeof record.answer !== 'string' || !record.answer.trim()) {
      throw new InvalidModelFinalAnswerError('empty_answer');
    }
    if (
      typeof record.followUpQuestion !== 'string' ||
      !record.followUpQuestion.trim()
    ) {
      throw new InvalidModelFinalAnswerError('empty_follow_up_question');
    }
    const citations = this.parseCitations(record.citations);

    return {
      answer: record.answer,
      followUpQuestion: record.followUpQuestion,
      citations,
    };
  }

  private parseCitations(value: unknown): string[] {
    if (!Array.isArray(value)) {
      throw new InvalidModelFinalAnswerError('citations_not_an_array');
    }

    const citations: string[] = [];
    for (const item of value) {
      if (typeof item !== 'string') {
        throw new InvalidModelFinalAnswerError('citation_not_a_string');
      }
      if (REFERENCE_PATTERN.test(item)) {
        citations.push(item);
        continue;
      }

      const references = item.match(REFERENCE_IN_TEXT_PATTERN) ?? [];
      const remainder = item
        .replace(REFERENCE_IN_TEXT_PATTERN, '')
        .replace(/[\s,;()[\]]/g, '');
      if (references.length === 0 || remainder.length > 0) {
        throw new InvalidModelFinalAnswerError('invalid_citation_reference');
      }
      citations.push(...references);
    }

    return [...new Set(citations)];
  }

  private referencesIn(answer: string): string[] {
    return [...answer.matchAll(/\bR[1-9]\d*\b/g)].map((match) => match[0]);
  }

  private normalizeReferenceMarkers(answer: string): string {
    return answer.replace(
      /\[(R[1-9]\d*(?:\s*,\s*R[1-9]\d*)*)\]|\(\s*(R[1-9]\d*)\s*\)|\b(R[1-9]\d*)\b/g,
      (_match, bracketed: string, parenthesized: string, bare: string) =>
        `[${bracketed ?? parenthesized ?? bare}]`,
    );
  }

  private withoutInternalEvidenceLabels(answer: string): string {
    const labels = Object.values(EvidenceAuthority).join('|');
    const parenthetical = new RegExp(
      `\\s*\\([^)]*\\b(?:${labels})\\b[^)]*\\)`,
      'gi',
    );
    const remainingLabel = new RegExp(`\\b(?:${labels})\\b`, 'g');
    return answer
      .replace(parenthetical, '')
      .replace(remainingLabel, '')
      .replace(/[ \t]+([,.;:!?])/g, '$1')
      .replace(/[ \t]{2,}/g, ' ');
  }

  private withoutReferences(answer: string): string {
    return answer
      .replace(/\bR[1-9]\d*\b/g, '')
      .replace(/\[\s*(?:,\s*)*\]/g, '')
      .replace(/\(\s*\)/g, '')
      .replace(/[ \t]+([,.;:!?])/g, '$1')
      .replace(/[ \t]{2,}/g, ' ');
  }

  private invalidOutput(): InternalServerErrorException {
    return new InternalServerErrorException(
      'Rapideia final answer returned an invalid response',
    );
  }
}
