/** Opt-in live compatibility smoke checks. Synthetic data only; no DB writes. */
import 'dotenv/config';
import { AiTextModelPurpose } from '../src/application/ports/learning-assistant-response.port';
import { OpenAiClientService } from '../src/infrastructure/ai/openai-client.service';
import { LearningAssistantAiService } from '../src/infrastructure/ai/learning-assistant-ai.service';
import { LearningAssistantPromptService } from '../src/infrastructure/ai/learning-assistant-prompt.service';
import { IntentClassificationService } from '../src/infrastructure/ai/intent-classification.service';
import { AiChatTrustedSourceService } from '../src/infrastructure/ai/ai-chat-trusted-source.service';
import {
  LearnerIntent,
  LearnerQueryTrustedContext,
} from '../src/application/ai-chat/learner-query.types';
import { FINAL_ANSWER_OUTPUT } from '../src/application/ai-chat/final-answer.schema';
import { RAPIDEIA_FINAL_ANSWER_PROMPT } from '../src/application/ai-chat/prompts/final-answer.prompt';
import {
  InstructorIntent,
  parseInstructorQuery,
} from '../src/application/instructor-ai/instructor-query';
import { parseInstructorProposal } from '../src/application/instructor-ai/instructor-proposal';
import {
  INSTRUCTOR_QUERY_OUTPUT,
  INSTRUCTOR_PLANNING_OUTPUT,
  instructorAnswerOutput,
} from '../src/application/instructor-ai/instructor-ai.schema';
import {
  INSTRUCTOR_QUERY_PROMPT,
  INSTRUCTOR_COURSE_PLANNING_PROMPT,
  INSTRUCTOR_ANSWER_PROMPT,
} from '../src/application/instructor-ai/instructor-ai.prompts';

async function main() {
  for (const variable of [
    'PROCESSING_MODEL',
    'PLANNING_MODEL',
    'RESPONSE_MODEL',
  ]) {
    if (process.env[variable]?.trim() !== 'gpt-6-luna')
      throw new Error(
        `${variable} must be gpt-6-luna for this opt-in verification.`,
      );
  }
  const originalFetch = global.fetch;
  global.fetch = (url, options) =>
    originalFetch(url, { ...options, signal: AbortSignal.timeout(45000) });
  const client = new OpenAiClientService();
  const assistant = new LearningAssistantAiService(
    client,
    new LearningAssistantPromptService(),
  );
  const classify = (sources: LearnerQueryTrustedContext[]) =>
    new IntentClassificationService(client, {
      getLearnerQueryContext: async () => sources,
    } as unknown as AiChatTrustedSourceService);
  const history = { summary: null, recentConversation: [] };
  const checks: [string, () => Promise<void>][] = [
    [
      'learner classification',
      async () => {
        const query = await classify([]).classify(
          'synthetic-user',
          'synthetic-conversation',
          'I want to learn calculus',
        );
        if (query.intent !== LearnerIntent.FIND_COURSE)
          throw new Error('Unexpected learner intent');
      },
    ],
    [
      'learner comparison with two attached courses',
      async () => {
        const sources: LearnerQueryTrustedContext[] = [1, 2].map((index) => ({
          type: 'COURSE',
          id: `00000000-0000-4000-8000-00000000000${index}`,
          name: 'Calculus',
          courseScope: `00000000-0000-4000-8000-00000000000${index}`,
          current: true,
        }));
        const query = await classify(sources).classify(
          'synthetic-user',
          'synthetic-conversation',
          'Compare these two calculus courses. Which one should I learn?',
        );
        if (
          query.intent !== LearnerIntent.COMPARE_COURSES ||
          query.targets.length !== 2
        )
          throw new Error(
            'Comparison did not preserve the two authorized targets',
          );
      },
    ],
    [
      'instructor classification',
      async () => {
        const result = await assistant.createResponse({
          assistantMode: 'INSTRUCTOR',
          modelPurpose: AiTextModelPurpose.PROCESSING,
          additionalPolicyLayers: [INSTRUCTOR_QUERY_PROMPT],
          structuredOutput: INSTRUCTOR_QUERY_OUTPUT,
          input: JSON.stringify({
            message:
              'Generate a simple example explaining limits for beginners.',
            sources: [],
            history,
          }),
          maxOutputTokens: 4000,
          failureLabel: 'Instructor intent classification',
        });
        const query = parseInstructorQuery(JSON.parse(result), []);
        if (query.intent !== InstructorIntent.GENERATE_EXAMPLE)
          throw new Error('Unexpected instructor intent');
      },
    ],
    [
      'course planning',
      async () => {
        const result = await assistant.createResponse({
          assistantMode: 'INSTRUCTOR',
          modelPurpose: AiTextModelPurpose.PLANNING,
          additionalPolicyLayers: [INSTRUCTOR_COURSE_PLANNING_PROMPT],
          structuredOutput: INSTRUCTOR_PLANNING_OUTPUT,
          input: JSON.stringify({
            message:
              'Propose a short three-module beginner calculus course outline.',
            query: { intent: InstructorIntent.CREATE_COURSE_STRUCTURE },
            history,
            evidence: [],
          }),
          maxOutputTokens: 6000,
          failureLabel: 'Instructor course planning',
        });
        const proposal = parseInstructorProposal(JSON.parse(result).proposal);
        if (proposal?.kind !== 'COURSE_STRUCTURE')
          throw new Error('Missing course structure proposal');
      },
    ],
    [
      'learner final answer',
      async () => {
        const result = await assistant.createResponse({
          modelPurpose: AiTextModelPurpose.RESPONSE,
          additionalPolicyLayers: [RAPIDEIA_FINAL_ANSWER_PROMPT],
          structuredOutput: FINAL_ANSWER_OUTPUT,
          input: JSON.stringify({
            learnerMessage: 'Briefly explain the mathematical idea of a limit.',
            AVAILABLE_CITATION_REFERENCES: [],
            RAPIDEIA_EVIDENCE: {
              intent: LearnerIntent.GENERAL,
              items: [],
              warnings: [],
            },
            history,
          }),
          maxOutputTokens: 4000,
          failureLabel: 'Learner final answer',
        });
        const answer = JSON.parse(result);
        if (
          !answer.answer?.trim() ||
          !answer.followUpQuestion?.trim() ||
          !Array.isArray(answer.citations) ||
          answer.citations.length
        )
          throw new Error('Invalid learner answer or invented citations');
      },
    ],
    [
      'instructor final answer',
      async () => {
        const result = await assistant.createResponse({
          assistantMode: 'INSTRUCTOR',
          modelPurpose: AiTextModelPurpose.RESPONSE,
          additionalPolicyLayers: [INSTRUCTOR_ANSWER_PROMPT],
          structuredOutput: instructorAnswerOutput(
            InstructorIntent.GENERATE_EXAMPLE,
          ),
          input: JSON.stringify({
            message: 'Generate a short example explaining limits to beginners.',
            query: { intent: InstructorIntent.GENERATE_EXAMPLE },
            INSTRUCTOR_EVIDENCE: { items: [], citations: [], warnings: [] },
            history,
          }),
          maxOutputTokens: 4000,
          failureLabel: 'Instructor final answer',
        });
        const answer = JSON.parse(result);
        if (
          !answer.answer?.trim() ||
          !answer.followUpQuestion?.trim() ||
          !Array.isArray(answer.citedReferences) ||
          answer.citedReferences.length ||
          answer.proposal !== null
        )
          throw new Error(
            'Invalid instructor answer or invented evidence/action',
          );
      },
    ],
  ];
  try {
    const results = await Promise.allSettled(
      checks.map(async ([name, run]) => {
        await run();
        console.log(`PASS: ${name}`);
      }),
    );
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(
          `FAIL: ${checks[index][0]}: ${result.reason instanceof Error ? result.reason.message : 'unknown error'}`,
        );
        process.exitCode = 1;
      }
    });
    if (!process.exitCode)
      console.log(
        'All six live GPT-6 Luna compatibility checks passed. No conversations or resources were created.',
      );
  } finally {
    global.fetch = originalFetch;
  }
}

void main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Live checks failed');
  process.exitCode = 1;
});
