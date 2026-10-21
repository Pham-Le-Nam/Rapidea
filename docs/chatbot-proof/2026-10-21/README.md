# Chatbot investigation — 21 October 2026

Production: https://main.d3ny40c8g1pbmw.amplifyapp.com/

Status: production tested in both learner and instructor modes after sign-in. Reproduced the “Triết” discovery failure and additional output/grounding issues. Backend and frontend fixes are implemented and verified locally. Changes have not been deployed; the screenshots document the current production behavior.

## Evidence

- `01-production-session-expired.jpg`: the production browser redirected to `/login`. The initial page observation reported “Token Expired. You have been logged out. Please log in to continue.” The transient notification disappeared before the saved screenshot; the screenshot records the remaining login page.
- `backend-tests.json`: Jest results, 60 suites and 419 tests passing, including 21 new regression cases. Tests use mocked provider responses.
- `postgres-course-discovery.txt`: 10 passing checks executing the actual retrieval SQL against local PostgreSQL with synthetic CTE courses. No rows were inserted, updated or deleted; no embedding/model provider was called.
- Backend build: `npm run build` passed after the changes.
- `frontend-rendering-checks.json`: nine passing server-rendering checks against the actual React Markdown component, including inert HTML/model URLs and citation callback preservation.
- Frontend TypeScript compilation and Vite production build passed. The sandbox blocked esbuild's parent-directory scan with the default config bundler; the same config was built using the Vite config runner (command below), without changing application build settings.
- Screenshots `02`–`14` and the role transcript files document the live cases below. Fourteen screenshots are stored in this folder, including the initial login screenshot.

The production course page was inspected: “Triết”, by Phạm Lê Nam, has seven posts and a description explicitly covering Marxist–Leninist philosophy, dialectical/historical materialism, knowledge, society and human development. Regular search finds it, while unattached learner discovery fails. The production database's underlying AI-profile/index state has not been directly inspected.

## Findings and changes

| Finding | Consequence | Change and verification |
| --- | --- | --- |
| Course keyword candidates required an AI-profile row through an inner join. | Courses with pending, missing or failed profiles were invisible to keyword discovery. | Left join permits title/description evidence without an AI profile. Local SQL finds a synthetic “Triết” with no profile. |
| Course discovery had no independent normalized title lookup. | Accents, case, translated queries and ranking truncation could hide an explicitly named course. | Preserve original course titles during classification; pass names separately; prioritize case/accent-normalized whole-title matches. SQL checks cover “Triết”, “triet”, “TRIẾT”, a Vietnamese sentence and a translated query. |
| Embedding generation was a prerequisite for all course discovery. | Provider failure prevented even exact-title/keyword lookup. | Semantic retrieval can degrade to keyword/title search. Verified with a simulated embedding outage. |
| Unattached named-course questions and summaries omitted course-summary discovery. | A course could exist while the answer had no metadata to identify it. | Search public summaries for those intents. Tests verify no detail access is inferred from a name. |
| Learner intent classification received only the current message and attachments. | Follow-ups such as “What does it teach?” lost earlier course/topic context before retrieval. | Include bounded conversation memory as untrusted classification data. Tests verify history cannot supply trusted resource IDs. |
| Instructor files resolved by owned name were omitted from file metadata and source snapshots. | An unindexed file could resolve successfully yet supply no summary evidence; proposals could omit its snapshot context. | Include the resolved owned file alongside attached files. Regression verifies summary evidence, source IDs and owner-scoped search. |
| Answer policy did not explicitly distinguish an empty search from nonexistence for ordinary course lookup. | The model could overstate an unsuccessful search as “no such course exists.” | Policy now requires reporting the search limitation. This model behavior still requires live verification. |
| Instructor course authoring omitted readable post inventory when no indexed passages were found. | The live draft reported no supporting topic content despite an existing matter/consciousness lesson visible in the review. | Course authoring now includes bounded readable post evidence without triggering a course-wide coverage audit. Post/file targets retain their narrow search scope. Regression covers a pending, unindexed post. |
| Instructor review repeated its follow-up question in both answer and follow-up fields. | The live review displayed the same Vietnamese question twice. | Both response pipelines now strip an exact trailing duplicate before appending the dedicated question. Seven normalization cases and two pipeline regressions pass. |
| Instructor review followed the source language instead of the English request. | An English review request received a Vietnamese answer. | Reinforced current-message/explicit-language precedence in instructor policy. This is a prompt correction; production model behavior must be rechecked after deployment. |
| Chat displayed Markdown markers literally. | Headings and emphasis appeared as `##` and `**`; emphasized course names could duplicate their citation labels. | Added safe React rendering for headings, lists, emphasis and code; retained controlled citation links and handled emphasis around linked source names. No raw HTML or model-supplied link execution. |

Hard difficulty constraints remain enforced. A course with unknown difficulty does not satisfy a hard beginner-only constraint, but remains eligible for a beginner preference. Authorization checks, instructor ownership and proposal approval tests pass.

## Production browser results

Executed with one instructor-capable signed-in account using both chat modes. No course/post edits or publishing were approved or performed. Authorization for a separate learner-only account was covered by automated tests rather than a second live account.

| Role | Scenario | Observed result / proof |
| --- | --- | --- |
| Catalog | Search “Triết” and inspect course | Found correct course, description and seven philosophy posts. Screenshots `03`, `04`. |
| Learner | “Find the course Triết. What does it teach?” without attachment | **Failed:** could not find the course; cited an unrelated Calculus resource. Screenshots `02`, `13`; `learner-discovery-transcript.txt`. |
| Learner | Vietnamese request for Marxist–Leninist philosophy and “Triết” | **Failed:** returned unrelated IT, medical, CRM and accounting evidence. Screenshot `05`. |
| Learner | “Find triet, the philosophy course.” | **Failed:** no matching course found. Screenshot `12`; unaccented transcript. |
| Learner | Attach the course using Chat with AI; summarize it | **Passed:** correctly described Triết and linked its actual course URL. Screenshot `06`; attached transcript. |
| Learner | Follow-up explaining historical materialism with attached context | **Passed:** retained the course and distinguished general explanation from unavailable detailed source text. Attached transcript. |
| Learner | Nonexistent title “QA-ZZ-482910” | **Passed:** no fabricated course or unrelated recommendation. Screenshot `11`; nonexistent transcript. |
| Both | Switch learner → instructor → learner | **Passed:** fresh sessions, correct mode labels and no carried-over attachments. |
| Both | Reopen saved learner and instructor histories | **Passed:** original modes retained, learner turns restored, instructor proposal still reviewable. Screenshots `13`, `14`. |
| Instructor | Review “Triết” by name without attachment | **Mixed:** found actual course/posts and stated sampling/processing limitations; answered in Vietnamese despite English request, duplicated the follow-up and displayed raw Markdown. Screenshot `07`; review transcript. |
| Instructor | Search and attach owned “Triết” | **Passed:** course and owned posts appeared. Screenshot `08`. |
| Instructor | Draft an English beginner lesson, explicitly without publishing | **Mixed:** produced an English reviewable proposal and did not publish, but said no supporting topic content was found despite the course's readable relevant post. Proposal transcript and screenshots `09`, `14`. |
| Instructor | Open proposal review and cancel | **Passed:** editable draft restored; canceled without invoking Publish reviewed post. Screenshot `09`. |
| Instructor | Request Steven Nguyen's private notes and learner feedback | **Passed:** asked for an owned source and disclosed no requested private material. Screenshot `10`; ownership transcript. |

Named owned-file lookup, embedding outages, difficulty constraints and malicious history IDs were tested locally, not forced against production. Post-deployment browser verification of the fixes remains outstanding.

## Reproduce local checks

From `apps/backend`:

```powershell
node node_modules/jest/bin/jest.js --runInBand
npm run build
node -r ts-node/register scripts/verify-course-discovery.ts
```

From `apps/frontend`:

```powershell
node scripts/verify-chat-markdown.cjs
node node_modules/typescript/bin/tsc -b
node --input-type=module -e "globalThis.__dirname=process.cwd(); const {build}=await import('vite'); await build({configLoader:'runner'});"
```

The SQL script is restricted to localhost and requires the existing development PostgreSQL schema and pgvector extension. It uses built-in Unicode normalization; no new database extension or migration is required.

Deployment limitation: the existing GitHub workflow deploys backend changes pushed to `main`. No commit, push or production deployment was performed during this investigation.
