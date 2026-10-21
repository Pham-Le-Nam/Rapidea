# Production retest — 21 October 2026

Retested after the user reported deployment. The browser was reloaded before testing and loaded `/assets/index-_DKqjO69.js`. Tests used the existing signed-in instructor-capable account in both chat modes. No proposal was published and no course/post edits were applied.

## Results

| Scenario | Result | Evidence |
| --- | --- | --- |
| Exact unattached learner query: “Find the course Triết. What does it teach?” | **PASS.** Finds the actual philosophy course and links to `/course/9f124b4e-528f-4ecf-a277-bf4a12b4859f`; no unrelated Calculus recommendation. | `01-learner-triet-found.jpg` and `.txt` |
| Follow-up: “What does it teach, and is it suitable for a beginner?” | **PASS.** Retains Triết without an attachment; states uncertainty about difficulty instead of inventing a level. | `02-learner-follow-up.jpg` and `.txt` |
| Fresh learner session: “Find triet, the philosophy course.” | **PASS.** Unaccented title resolves to Triết. | `04-learner-unaccented-found.jpg` and `.txt` |
| Vietnamese request for Marxist–Leninist philosophy and Triết | **PASS.** Recommends the correct course in Vietnamese. | `06-learner-Vietnamese-found.jpg` and `.txt` |
| Nonexistent title QA-ZZ-482910 | **PASS.** Reports no matching result and makes no unrelated recommendation. | `07-learner-nonexistent.jpg` |
| Instructor review by owned course name | **PASS for retrieval, formatting and question deduplication.** Finds the real course/posts, renders headings/lists/emphasis and asks one follow-up. | `03-instructor-review-language-still-vietnamese.txt` |
| Automatic instructor response language | **FAIL.** An English request still receives a Vietnamese review. | `03-instructor-review-language-still-vietnamese.jpg` and `.txt` |
| Explicit “Please give that review in English.” | **PASS.** The follow-up review is in English. | `05-instructor-explicit-English.txt` |
| Grounded English lesson draft about matter and consciousness | **PASS.** Uses and cites the existing “Vật chất, Ý thức và Mối quan hệ Biện chứng” post. The earlier false absence of supporting topic content was not reproduced. | `08-instructor-grounded-draft.jpg` and `.txt` |
| Proposal review and cancellation | **PASS.** Editable proposal opens; Cancel returns to the unsaved proposal. Publish was not invoked. | `09-instructor-reviewable-not-published.jpg`, `09-instructor-proposal.json` |
| Foreign instructor private notes/feedback request | **PASS.** Requests an owned source and discloses none of the requested private material. | `10-instructor-ownership-boundary.jpg` and `.txt` |
| Switch learner → instructor → learner | **PASS.** Fresh panels, correct mode labels and no old attachment carried over. | Browser observations; ownership test ran in the fresh instructor session. |
| Reopen saved instructor and learner histories | **PASS.** Original modes and turns restore; the instructor proposal remains reviewable and unsaved. | `11-instructor-history-restored.jpg`, `12-learner-history-restored.jpg` |

The review still correctly reports that some resources are processing and that coverage conclusions are limited by the retrieved evidence. This is a stated evidence limitation, not a claim that indexing is complete.

## Remaining language fix — local, not deployed

The previous general language instruction was insufficient with a Vietnamese course/source context. The new patch makes language a separate classification decision before source-heavy response generation:

- The strict classifier schema now requires a validated BCP 47 `responseLanguage` tag.
- Explicit language requests override message language; otherwise the classifier uses the current instructions and ignores quoted course titles/source language.
- Planning and final generation receive a separate application-controlled language policy based on that validated tag, ahead of source/history/style language.
- Historical instructor query objects without the new field remain supported. Invalid tags and instruction-like values are rejected. No migration or dependency change is needed.

Validation of this **local follow-up patch**:

- **429 tests passed across 60 suites**, including ten new language-schema/policy cases. See `backend-tests-with-language-fix.json`.
- Backend `npm run build` passed.
- `scripts/verify-instructor-language.ts` passed three calls through the complete classifier/generator flow against the actual configured model provider, using synthetic Vietnamese course evidence and a Vietnamese style preference: English instructions → English, Vietnamese instructions → Vietnamese, and mixed instructions explicitly requesting English → English. See `language-provider-verification-summary.json`.
- The provider check uses no database access or publishing. Its language assertions check the classified tag and follow-up language; the returned answers were also inspected.

Run from `apps/backend`:

```powershell
node node_modules/jest/bin/jest.js --runInBand
npm run build
node -r ts-node/register scripts/verify-instructor-language.ts
```

The language patch needs a backend deployment and another production check before that failing row can be marked passed. This retest did not deploy code.
