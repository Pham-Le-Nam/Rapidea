# Memory hierarchy post discovery

Production reference: https://main.d3ny40c8g1pbmw.amplifyapp.com/course/90ba3fdd-0a94-4b14-bb77-6a2c0748c0bc

Reported request: `find me a post talks about memory hierarchy as in computer architecture`

## Findings

The authorization policy already permits both post authors and course owners to read course posts without subscribing. The retrieval code had separate discovery gaps:

- Content search queried only `content_chunk`, so posts without indexed chunks were invisible. Post indexing waits for attached files to finish processing; an existing readable post can therefore have no search entry.
- The router appended course names, inferred skills and outcomes to the keyword query. PostgreSQL then required every ordinary term to match the same passage.
- Embedding creation happened before lexical retrieval and could prevent it from running.
- Post chunk metadata did not include the title, explaining why citation labels could fall back to “Learning material.”

These are verified code-level failure paths. The exact production post's indexing state and classifier output have not been inspected: Windows Computer Use stopped because it could not confidently determine Chrome's current URL, and the public web reader could not access the supplied page.

## Changes

Post discovery now searches current post titles, summaries and rich text alongside indexed passages. Strong title matches take priority over unrelated semantic candidates, and current text replaces stale indexed copies for those title matches. The database applies ownership/public-preview/subscription access before limiting live post candidates, followed by the existing per-source authorization check.

The main discovery topic and alternate keyword phrases stay separate. Explicit post/file requests preserve their resource type. Embedding failures retain lexical discovery. Current titles are loaded for authorized post citations, and future post indexing also records titles.

No new migration is introduced. Approximate title matching uses `pg_trgm` from the existing course-discovery migration.

## Validation

- All 435 backend tests across 60 suites passed.
- Backend build passed.
- `scripts/verify-post-discovery.ts` passed 12 checks using actual retrieval and authorization SQL over synthetic CTE rows in local PostgreSQL. No stored course/post data changed and no model provider was called.
- Checks include the original request with an unindexed post and indexed database distractor, current rich text, course ownership, public previews, subscribers, private-candidate crowding, explicit course/post scopes, instructor isolation, file-only requests, embedding outages, absent topics and citation titles.

From `apps/backend`:

```powershell
node node_modules/jest/bin/jest.js --runInBand
npm run build
node -r ts-node/register scripts/verify-post-discovery.ts
```

## Production status

The fix is in the repository and has not been deployed. After backend deployment, repeat the reported request in a fresh learner conversation without attaching the course. Check that the relevant post is recommended with its actual title and post URL, then repeat with the course attached. Production model behavior and the specific course's records still require this live verification.
