# Instructor AI V1

## Usage

Open **Messages → Rapideia AI → +**. Instructor accounts can use **Switch to instructor** at the bottom of the chat, attach their own course, post or file, then send a message. Learner and instructor histories appear in one newest-first AI section, with each conversation retaining its original mode. Switching modes starts a fresh chat (and asks before discarding an unsent draft); it does not change an existing conversation's permissions or carry sources across modes. Conversations are created on the first message, not when opening the panel. Person-to-person chats remain separate.

Examples:

- “Create a beginner course structure for backend development.”
- “Generate measurable learning outcomes for this course.”
- “What skills does this course teach, and what are its prerequisites?”
- “Draft a lesson about limits using this file.”
- “Make this post clearer for beginners.”
- “Review my course for missing outcome coverage and duplicated material.”
- “What questions or problems recur in this course's discussions?”

Generated course structures, outcomes, skills, prerequisites and post text are **proposals**. Open **Review and edit** to inspect them. Saving requires confirmation; a new post requires **Publish reviewed post**. No chat request silently publishes or changes a resource.

Saving a structure records a reviewed teaching plan; it does not create modules, reorder existing posts or create an entire course automatically. Create the course normally, attach it, then save the proposed plan. Generated examples and analyses are chat responses rather than automatic resource mutations.

## Architecture and functions

### Application layer

- `application/ai-chat/ai-assistant-mode.ts`: shared `LEARNER`/`INSTRUCTOR` mode contract.
- `application/instructor-ai/instructor-query.ts`: `InstructorIntent` and `InstructorIntentFamily`; `instructorIntentFamily()` maps detailed intents into families. `parseInstructorQuery()` validates closed output and an index into backend-resolved sources. The classifier has no resource-ID output fields.
- `instructor-ai.schema.ts`: closed, required-field JSON schemas for classification and final answers/proposals.
- `instructor-ai.prompts.ts`: independent instructor system policy, intent definitions, evidence-grounded answer policy and instructor memory policy. Source text and personal style preferences are data, not policy layers.
- `instructor-intent-retrieval-router.service.ts`: `plan()` chooses inventory, per-outcome support, discussion/feedback and duplication retrieval. `retrieve()` delegates to an infrastructure-independent content port.
- `instructor-assistant.service.ts`: `respond()` loads summary plus unsummarized recent messages, classifies, retrieves authorized evidence, bounds/prioritizes it, generates and validates the answer, and binds proposals to backend-owned targets. It retries malformed final output once. `applyProposal()` validates reviewed input before delegating the approved write; `listSources()` serves the owned-source picker through the content port.
- `instructor-proposal.ts`: action-kind enum and `parseInstructorProposal()` validation. It strips model-provided targets and approval state. Stored targets, source snapshots and acceptance receipts are assigned by the backend.
- `application/ports/instructor-content.port.ts`: repository contract for reads, taxonomy lookup and approved writes; `InstructorEvidenceKind` distinguishes inventory, retrieved support, discussions, statistics and other evidence.

### Infrastructure layer

- `instructor-content-authorization.service.ts`: `assertInstructor()` checks the current database role and ban status. `courseWhere()`, `postWhere()`, `fileWhere()` and `canAccess()` implement ownership scope. `chunkOwnershipSql()` enforces it inside both semantic and keyword candidate queries. Instructors can inspect their authored posts or posts in their own courses; files must be owned uploads. Admins receive no cross-owner bypass.
- `prisma-instructor-content.repository.ts`: `listSources()` searches owned sources; `retrieve()` resolves targets by authorized context or unambiguous owned names, loads bounded inventories, invokes the **existing** hybrid engine, retrieves support for each declared outcome/skill, finds sampled overlap candidates, and produces anonymous community evidence. `resolveProposalSkills()` performs read-only canonical/alias matching. `applyProposal()` delegates to the separate approved-write adapter; generation never invokes it.
- `prisma-instructor-proposal.repository.ts`: `applyProposal()` rechecks ownership, locks the proposal/resource, rejects changed snapshots, applies edits and stores the acceptance receipt atomically. It appends an approval/acknowledgment turn so later summaries can distinguish proposed and actually saved decisions. Taxonomy alias/new-skill resolution occurs only after approval.
- `instructor-content-snapshot.ts`: shared database projections, `loadInstructorPost()` and `instructorContentSnapshot()` keep retrieval and stale-proposal validation consistent without duplicating database selections or hashing logic. Text/citation helpers in the retrieval adapter prevent exposing raw embeddings, ranking scores or participant identities.
- `hybrid-content-search.service.ts`: existing vector + FTS + reciprocal-rank fusion engine; instructor mode adds owner filtering in SQL and source authorization after fusion. No second search implementation was created.
- `ai-chat-conversation.service.ts`: shared first-message creation, request-key replay, concurrent reply deduplication and history pagination. Instructor messages dispatch to the new application pipeline. History and retries cannot cross assistant modes. Request fingerprints reject reuse of a key with different message text/source selection.
- `ai-chat-trusted-source.service.ts`: mode-aware source validation/list/deletion. Sources accompany a message; no standalone add endpoint.
- `learning-assistant-prompt.service.ts` / `learning-assistant-ai.service.ts`: select the correct system policy on every model call. Classification uses PROCESSING; course design has a separate structured PLANNING pass; all generated final answers use RESPONSE. Existing required-model configuration and provider retries remain in effect.
- `prisma-conversation-memory.repository.ts` / `conversation-memory.service.ts`: load persisted conversation mode and apply teaching-oriented summary rules. Existing cursor watermarks prevent sending summarized messages again. Instructor summaries preserve proposed versus approved decisions and do not populate inferred learner skills/progress.
- `course-profile.service.ts`: automatic profile regeneration preserves instructor-confirmed course skills. `course-retrieval.service.ts` exposes reviewed outcomes/prerequisites to existing learner retrieval as well.
- `ai-chat.module.ts`: dependency injection wiring for the new controller, guard, application services and content-port adapter.

### HTTP adapters

- `instructor-ai.guard.ts`: current instructor/admin role required after JWT authentication.
- `instructor-proposal.dto.ts`: validated reviewed content plus mandatory explicit `confirmed: true`.
- `instructor-ai.controller.ts`: forwards instructor requests with a server-chosen mode; UUID validation protects parameter identifiers.

Routes under `/api/instructor-ai`:

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/capabilities` | Check instructor feature access |
| POST | `/messages` | First or subsequent query with optional sources |
| GET | `/conversations` | Cursor-paginated conversation list |
| GET | `/conversations/:id` | One owned instructor conversation |
| GET | `/conversations/:id/messages` | Cursor-paginated messages |
| GET | `/sources?query=...` | Bounded owned-source picker |
| GET | `/conversations/:id/trusted-sources` | List accessible attached sources |
| DELETE | `/conversations/:id/trusted-sources/:sourceId` | Remove an attachment |
| POST | `/proposals/:messageId/apply` | Apply explicitly reviewed/confirmed proposal |

Message input uses the existing `{ clientRequestId, conversationId?, content, trustedSourcesToAdd? }` shape. Apply input is `{ confirmed: true, proposal: { kind, title, body, items } }`. Do not send resource IDs or approval state inside edited proposals; targets come from stored backend metadata. Both history routes accept `limit` (1–50, default 20) and optional `before` cursor.

`/api/ai-chat` remains learner-only and `/api/chat` remains person-to-person. There is no empty-conversation endpoint.

### Frontend

- `RightSidebar.tsx`: one Rapideia AI section combines authorized learner/instructor histories; a single older-conversation button paginates both streams independently. `model/ai-conversations.ts` merges, deduplicates and sorts those streams while retaining the API mode for reopening conversations.
- `SidebarsLayout.tsx`, `events.ts`, `model/types.ts`: carry assistant mode and typed proposal data when opening/reopening chat.
- `api/index.ts`: mode-aware chat/history/source APIs, capability checks and explicit proposal application.
- `ChatBox.tsx`: reuses the existing chat panel, pagination, citations and message sending for both modes. The footer mode-switch button is only available after backend instructor capability verification. It starts a fresh conversation without carrying old sources/context or rewriting history; switching is disabled during sending/loading. Instructor proposals and owned-source picking are additional components, not a separate chat implementation.
- `InstructorSourcePicker.tsx`: debounced search over owned courses/posts/files; selected sources accompany the next query.
- `InstructorProposalCard.tsx`: editable review dialog, item editing/removal/addition, taxonomy match hints, explicit confirmation and saved receipt state. A revision replaces post title/text while preserving attachments; a draft attaches explicitly selected owned files. Newly published/edited content enters the existing PENDING processing pipeline.
- `ChatWithAiButton.tsx`: optional mode supports source-specific launch actions; without an explicit mode, adding a source reuses the active chat's mode (or defaults to learner when there is no active chat).

## Persistence and deployment

Migration `20261005000000_instructor_ai_v1` adds conversation mode, `CourseLearningOutcome`, `CoursePrerequisiteSkill`, `CourseTeachingPlan` and the instructor-confirmed course-skill flag. Existing conversations default to LEARNER. Proposals and their acceptance receipts use existing message metadata, so history restores review cards without a separate draft store.

Prisma client generation and localhost migration were run during implementation. The already-pending `20260928010000_default_new_accounts_to_instructor` migration was also applied locally; it changes only the default for newly created accounts, not existing roles. No cloud database was modified. Production startup already runs `prisma migrate deploy`; deploy the migration together with regenerated backend code.

A read-only schema diff also reports existing manually managed index differences (including pgvector indexes). No index removals, resets or destructive schema reconciliation were performed; these are separate from the additive V1 migration.

## Verification and boundaries

### GPT-6 Luna configuration

Use `PROCESSING_MODEL=gpt-6-luna`, `PLANNING_MODEL=gpt-6-luna` and `RESPONSE_MODEL=gpt-6-luna`. The local configuration already uses these values, and `.env.example` now matches. The shared text profiles use `low` reasoning; GPT-6 Luna does not support `minimal`. This applies to both classifiers, conversation summaries, planning and final responses. Models remain required and independently configurable; embeddings and transcription are unchanged. See [official model documentation](https://developers.openai.com/api/docs/models/gpt-6-luna).

`ai-model-config.ts` selects the compatible defaults. `OpenAiClientService.logHttpFailure()` retains provider error code, rejected parameter, request ID and safe configuration/schema details in backend logs. It redacts credentials and request text, omits authentication/input error messages, and never forwards raw provider details to the frontend. Malformed/non-JSON error responses preserve the original HTTP status.

`instructorAnswerOutput()` narrows the final proposal schema to the classified intent. Examples, summaries, searches and analyses require `proposal: null`; a post draft is only permitted for DRAFT_POST, and each design/revision intent permits only its corresponding action kind. The same policy mapping is used for defensive validation, preventing a model from returning an unrequested draft that causes a validation toast.

Run the opt-in live checks with the existing API key:

```powershell
node -r ts-node/register scripts/verify-ai-models.ts
```

These checks call the actual provider using the application request adapter and schemas. They test learner classification, two-course comparison, instructor classification, course planning and both final-answer formats. They send only synthetic input, use `store: false`, and do not create database conversations or resources. These are model/API compatibility checks, not a browser or database retrieval end-to-end test.

Tests cover every enum intent and family routing, strict schemas/source indexes, UUID DTOs, role/ownership boundaries, prompt-injection data separation, valid/invalid citations, first-message mode routing, request replay, trusted-source handling, instructor memory, anonymous discussion sampling, taxonomy lookup, stale proposals and serialized concurrent approvals.

`scripts/verify-instructor-ai.ts` is a **read-only localhost** PostgreSQL smoke check. It uses synthetic query embeddings, not a paid model call, and exercises source picking, vector/FTS ownership SQL, coverage, overlap candidates and review/discussion queries:

```powershell
node -r ts-node/register scripts/verify-instructor-ai.ts
```

Analysis is intentionally bounded: up to 200 post/file inventory entries, 12 outcome/skill support searches, 100 recent discussion comments/written reviews and 200 duplicate-query anchor excerpts. The evidence budget prioritizes selected sources and relevant support ahead of broad inventory. Results state sampling/truncation limitations. Similarity suggests an overlap candidate; it does not prove duplication, complete coverage or a misconception.

V2 is still needed for native quizzes/exercises, persistent module ordering, live outdated-content/broken-link verification, scheduled scans and dashboards. Deterministic tests mock provider responses; live model/API compatibility is covered separately by the opt-in checks above. Browser and full database-retrieval end-to-end testing remain separate from those checks.
