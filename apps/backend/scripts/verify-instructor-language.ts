/** Opt-in provider check with synthetic Vietnamese evidence. No database access or writes. */
import 'dotenv/config';
import assert from 'node:assert/strict';
import { OpenAiClientService } from '../src/infrastructure/ai/openai-client.service';
import { LearningAssistantAiService } from '../src/infrastructure/ai/learning-assistant-ai.service';
import { LearningAssistantPromptService } from '../src/infrastructure/ai/learning-assistant-prompt.service';
import { InstructorAssistantService } from '../src/application/instructor-ai/instructor-assistant.service';
import { InstructorIntentRetrievalRouterService } from '../src/application/instructor-ai/instructor-intent-retrieval-router.service';
import { InstructorContentPort, InstructorEvidenceKind } from '../src/application/ports/instructor-content.port';
import { ConversationMemoryService } from '../src/application/ai-chat/conversation-memory.service';

async function main() {
  const originalFetch = global.fetch;
  global.fetch = (url, options) => originalFetch(url, { ...options, signal: AbortSignal.timeout(45000) });
  const model = new LearningAssistantAiService(new OpenAiClientService(), new LearningAssistantPromptService());
  const content: InstructorContentPort = {
    retrieve: async () => ({
      items: [{ ref: 'R1', kind: InstructorEvidenceKind.COURSE_OVERVIEW, authority: 'COURSE_OFFICIAL', label: 'Triết', data: {
        title: 'Triết', description: 'Triết học Mác–Lênin, vật chất và ý thức, phép biện chứng duy vật, nhận thức và chân lý.',
        learningOutcomes: [], prerequisiteSkills: [],
      } }],
      citations: [{ ref: 'R1', source: { type: 'COURSE', id: 'synthetic-course', label: 'Triết' }, url: '/course/synthetic-course' }],
      warnings: ['Only synthetic overview metadata is available.'], courseId: 'synthetic-course', postId: null,
      sourceHash: 'synthetic', sourceFileIds: [], creatorStyle: 'Giải thích rõ ràng bằng tiếng Việt.',
    }),
    listSources: async () => [], resolveProposalSkills: async () => [],
    applyProposal: async () => { throw new Error('Writes are disabled in this verification'); },
  };
  const service = new InstructorAssistantService(
    model, content,
    { getContextForFinalResponse: async () => ({ summary: null, recentConversation: [] }) } as unknown as ConversationMemoryService,
    { count: text => Math.ceil(text.length / 4), truncate: (text, limit) => text.slice(0, limit) },
    new InstructorIntentRetrievalRouterService(content),
  );
  const checks: Array<Record<string, unknown>> = [];
  for (const [message, expectedLanguage] of [
    ['Review my course Triết. What philosophy topics does it cover, and what gaps should I address?', 'en'],
    ['Hãy đánh giá khóa Triết. Khóa học bao gồm những chủ đề nào?', 'vi'],
    ['Hãy đánh giá khóa Triết. Please reply in English.', 'en'],
  ]) {
    const result = await service.respond({ userId: 'synthetic', conversationId: 'synthetic', currentMessageId: 'synthetic', message, sources: [{
      type: 'COURSE', id: 'synthetic-course', name: 'Triết', current: true, courseScope: 'synthetic-course',
    }] });
    assert.equal(result.query.responseLanguage, expectedLanguage);
    const followUp = result.followUpQuestion.replaceAll('Triết', '').normalize('NFD');
    if (expectedLanguage === 'en') assert.doesNotMatch(followUp, /[\u0300-\u036f]/u);
    else assert.match(followUp, /[\u0300-\u036f]/u);
    checks.push({ message, expectedLanguage, actualLanguage: result.query.responseLanguage, answer: result.answer, followUpQuestion: result.followUpQuestion, status: 'passed' });
  }
  console.log(JSON.stringify({ scope: 'Actual configured provider, full instructor classification/generation; synthetic evidence only; no database or publishing', checks }, null, 2));
}
void main().catch(error => { console.error(error); process.exitCode = 1; });
