import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConversationMemoryService } from '../ai-chat/conversation-memory.service';
import {
  AiTextModelPurpose,
  LEARNING_ASSISTANT_RESPONSE_PORT,
  LearningAssistantResponsePort,
} from '../ports/learning-assistant-response.port';
import {
  INSTRUCTOR_CONTENT_PORT,
  InstructorContentPort,
  InstructorEvidenceKind,
} from '../ports/instructor-content.port';
import {
  TOKEN_COUNTER_PORT,
  TokenCounterPort,
} from '../ports/token-counter.port';
import {
  INSTRUCTOR_QUERY_OUTPUT,
  instructorAnswerOutput,
  INSTRUCTOR_PLANNING_OUTPUT,
} from './instructor-ai.schema';
import {
  INSTRUCTOR_QUERY_PROMPT,
  INSTRUCTOR_ANSWER_PROMPT,
  INSTRUCTOR_COURSE_PLANNING_PROMPT,
} from './instructor-ai.prompts';
import {
  instructorIntentFamily,
  InstructorIntent,
  InstructorIntentFamily,
  InstructorSource,
  parseInstructorQuery,
} from './instructor-query';
import {
  InstructorProposalKind,
  parseInstructorProposal,
  StoredInstructorProposal,
  INSTRUCTOR_PROPOSAL_KIND_BY_INTENT as proposalIntents,
} from './instructor-proposal';
import { InstructorIntentRetrievalRouterService } from './instructor-intent-retrieval-router.service';

@Injectable()
export class InstructorAssistantService {
  constructor(
    @Inject(LEARNING_ASSISTANT_RESPONSE_PORT)
    private readonly model: LearningAssistantResponsePort,
    @Inject(INSTRUCTOR_CONTENT_PORT)
    private readonly content: InstructorContentPort,
    private readonly memory: ConversationMemoryService,
    @Inject(TOKEN_COUNTER_PORT) private readonly tokens: TokenCounterPort,
    private readonly retrieval: InstructorIntentRetrievalRouterService,
  ) {}

  async respond(input: {
    userId: string;
    conversationId: string;
    currentMessageId: string;
    message: string;
    sources: readonly InstructorSource[];
  }) {
    const history = await this.memory.getContextForFinalResponse(
      input.userId,
      input.conversationId,
      input.currentMessageId,
    );
    const classification = await this.model.createResponse({
      assistantMode: 'INSTRUCTOR',
      modelPurpose: AiTextModelPurpose.PROCESSING,
      additionalPolicyLayers: [INSTRUCTOR_QUERY_PROMPT],
      structuredOutput: INSTRUCTOR_QUERY_OUTPUT,
      input: JSON.stringify({
        message: input.message,
        sources: input.sources.map((s, index) => ({
          index,
          type: s.type,
          name: s.name,
          current: s.current,
        })),
        history,
      }),
      maxOutputTokens: 4000,
      failureLabel: 'Instructor intent classification',
    });
    let query;
    try {
      query = parseInstructorQuery(JSON.parse(classification), input.sources);
    } catch (cause) {
      throw new InternalServerErrorException(
        'Instructor intent classification returned an invalid query',
        { cause },
      );
    }
    const evidence = await this.retrieval.retrieve(
      input.userId,
      query,
      input.sources,
    );
    const family = instructorIntentFamily(query.intent);
    // Course-scoped analyses need a selected owned course; a broad corpus search
    // cannot truthfully stand in for a review of an unspecified course.
    if (
      [
        InstructorIntentFamily.CONTENT_ANALYSIS,
        InstructorIntentFamily.LEARNER_INSIGHT,
        InstructorIntentFamily.COURSE_IMPROVEMENT,
      ].includes(family) &&
      !evidence.courseId &&
      !evidence.postId
    ) {
      const answer = 'Please attach the course or post you want me to analyze.';
      return this.result(
        query,
        answer,
        'Which of your courses should I use?',
        [],
        null,
        evidence.warnings,
        0,
      );
    }
    // Bound context by tokens, never stringify an unlimited inventory into a request.
    const boundedItems: typeof evidence.items = [];
    let budget = 18000;
    const priority = (kind?: InstructorEvidenceKind) =>
      kind === InstructorEvidenceKind.INVENTORY
        ? 3
        : [
              InstructorEvidenceKind.COURSE_OVERVIEW,
              InstructorEvidenceKind.SELECTED_SOURCE,
            ].includes(kind!)
          ? 0
          : [
                InstructorEvidenceKind.COVERAGE_SUPPORT,
                InstructorEvidenceKind.STATISTICS,
              ].includes(kind!)
            ? 1
            : 2;
    for (const item of [...evidence.items].sort(
      (a, b) => priority(a.kind) - priority(b.kind),
    )) {
      const cost = this.tokens.count(JSON.stringify(item));
      if (cost > budget) {
        evidence.warnings.push(
          'Some evidence was omitted to fit the context budget.',
        );
        continue;
      }
      boundedItems.push(item);
      budget -= cost;
    }
    const availableRefs = new Set(boundedItems.map((i) => i.ref));
    let plannedProposal: ReturnType<typeof parseInstructorProposal> = null;
    if (family === InstructorIntentFamily.COURSE_DESIGN) {
      const planning = await this.model.createResponse({
        assistantMode: 'INSTRUCTOR',
        modelPurpose: AiTextModelPurpose.PLANNING,
        additionalPolicyLayers: [INSTRUCTOR_COURSE_PLANNING_PROMPT],
        structuredOutput: INSTRUCTOR_PLANNING_OUTPUT,
        input: JSON.stringify({
          message: input.message,
          query,
          history,
          creatorStylePreferences: evidence.creatorStyle,
          evidence: boundedItems,
        }),
        maxOutputTokens: 6000,
        failureLabel: 'Instructor course planning',
      });
      try {
        plannedProposal = parseInstructorProposal(
          JSON.parse(planning).proposal,
        );
        if (
          plannedProposal &&
          plannedProposal.kind !== proposalIntents[query.intent]
        )
          throw new Error('Unexpected planned action');
      } catch (cause) {
        throw new InternalServerErrorException(
          'Instructor planning returned an invalid proposal',
          { cause },
        );
      }
    }
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await this.model.createResponse({
        assistantMode: 'INSTRUCTOR',
        modelPurpose: AiTextModelPurpose.RESPONSE,
        additionalPolicyLayers: [
          INSTRUCTOR_ANSWER_PROMPT,
          ...(attempt
            ? [
                'Your previous output failed validation. Return only the supplied schema. Cite only supplied R-number references; use an empty list when no evidence supports a claim. Do not invent links, IDs or an unrequested proposal.',
              ]
            : []),
        ],
        structuredOutput: instructorAnswerOutput(query.intent),
        input: JSON.stringify({
          message: input.message,
          query,
          history,
          plannedProposal,
          creatorStylePreferences: evidence.creatorStyle,
          INSTRUCTOR_EVIDENCE: {
            items: boundedItems,
            citations: evidence.citations.filter((c) =>
              availableRefs.has(c.ref),
            ),
            warnings: evidence.warnings,
          },
        }),
        maxOutputTokens: 8000,
        failureLabel: 'Instructor final answer',
      });
      try {
        const parsed = JSON.parse(response) as {
          answer: string;
          followUpQuestion: string;
          citedReferences: string[];
          proposal: unknown;
        };
        if (
          typeof parsed.answer !== 'string' ||
          !parsed.answer.trim() ||
          typeof parsed.followUpQuestion !== 'string' ||
          !parsed.followUpQuestion.trim() ||
          !Array.isArray(parsed.citedReferences)
        )
          throw new Error('Invalid answer/citation');
        const normalizedRefs: string[] = [];
        for (const reference of parsed.citedReferences) {
          if (typeof reference !== 'string')
            throw new Error('Invalid citation type');
          const refs = reference.match(/\bR[1-9]\d*\b/g) ?? [];
          if (
            !refs.length ||
            reference
              .replace(/\bR[1-9]\d*\b/g, '')
              .replace(/[\s,;()[\]]/g, '') ||
            refs.some((r) => !availableRefs.has(r))
          )
            throw new Error('Unknown reference');
          normalizedRefs.push(...refs);
        }
        const draft = parseInstructorProposal(parsed.proposal);
        let proposal: StoredInstructorProposal | null = null;
        if (draft) {
          if (proposalIntents[query.intent] !== draft.kind)
            throw new Error('Proposal does not match requested intent');
          proposal = {
            ...draft,
            courseId: evidence.courseId,
            postId:
              draft.kind === InstructorProposalKind.POST_REVISION
                ? evidence.postId
                : null,
            sourcePostId: evidence.postId,
            sourceHash: evidence.sourceHash,
            sourceFileIds: evidence.sourceFileIds ?? [],
          };
          if (
            [
              InstructorProposalKind.COURSE_SKILLS,
              InstructorProposalKind.PREREQUISITES,
            ].includes(draft.kind)
          )
            proposal.canonicalSkills =
              await this.content.resolveProposalSkills(draft);
        }
        const refs = [...new Set(normalizedRefs)];
        // The shared chat renderer resolves reference markers to application URLs.
        // Validate generated links and convert them to that existing rendering contract.
        const links = new Map(
          evidence.citations
            .filter((c) => availableRefs.has(c.ref) && c.url)
            .map((c) => [c.url!, c.ref]),
        );
        const linkText = (text: string) =>
          text.replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            (_match, label: string, url: string) => {
              const ref = links.get(url);
              if (!ref) throw new Error('Unknown resource hyperlink');
              if (!refs.includes(ref)) refs.push(ref);
              return `${label} [${ref}]`;
            },
          );
        const linkedAnswer = linkText(parsed.answer);
        const linkedFollowUp = linkText(parsed.followUpQuestion);
        if (/https?:\/\//i.test(`${linkedAnswer} ${linkedFollowUp}`))
          throw new Error('Unsupplied URL');
        const markers = [
          ...`${linkedAnswer} ${linkedFollowUp}`.matchAll(/\bR[1-9]\d*\b/g),
        ].map((m) => m[0]);
        if (markers.some((r) => !availableRefs.has(r)))
          throw new Error('Unknown inline citation');
        for (const ref of markers) if (!refs.includes(ref)) refs.push(ref);
        const citations = evidence.citations
          .filter((c) => refs.includes(c.ref))
          .map((c) => ({ reference: c.ref, source: c.source }));
        return this.result(
          query,
          linkedAnswer,
          linkedFollowUp,
          citations,
          proposal,
          evidence.warnings,
          18000 - budget,
        );
      } catch (cause) {
        if (attempt === 1)
          throw new InternalServerErrorException(
            'Instructor final answer returned an invalid response',
            { cause },
          );
      }
    }
    throw new InternalServerErrorException(
      'Instructor final answer generation failed',
    );
  }

  applyProposal(userId: string, messageId: string, edited: unknown) {
    let proposal;
    try {
      proposal = parseInstructorProposal(edited);
    } catch {
      throw new BadRequestException('Invalid reviewed proposal');
    }
    if (!proposal)
      throw new BadRequestException('A reviewed proposal is required');
    return this.content.applyProposal(userId, messageId, proposal);
  }

  listSources(userId: string, query = '') {
    return this.content.listSources(userId, query.trim().slice(0, 200));
  }

  private result(
    query: ReturnType<typeof parseInstructorQuery>,
    answer: string,
    followUpQuestion: string,
    citations: {
      reference: string;
      source: { type: string; id: string; label: string };
    }[],
    proposal: StoredInstructorProposal | null,
    retrievalWarnings: string[],
    evidenceTokenCount: number,
  ) {
    return {
      query,
      answer,
      followUpQuestion,
      content: `${answer}\n\n${followUpQuestion}`,
      citations,
      citedReferences: citations.map((c) => c.reference),
      proposal,
      retrievalWarnings,
      evidenceTokenCount,
      assistantTokenCount: this.tokens.count(
        `${answer}\n\n${followUpQuestion}`,
      ),
    };
  }
}
