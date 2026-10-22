# Computer Architecture course discovery

Target site: https://main.d3ny40c8g1pbmw.amplifyapp.com/

The reported course is titled **Computer Architechture**. Its description covers computer architecture, but the earlier chatbot search returned an unrelated basic IT course.

Two failure paths were identified in the retrieval code:

- Title discovery required an exact normalized title or whole-title substring. Correctly spelled `computer architecture` could not find `Computer Architechture` through this branch.
- Keyword discovery joined the topic, inferred skills and desired outcomes into one PostgreSQL web-search query. Ordinary terms are combined with AND, so a course could match the topic but be excluded for missing an inferred term. The router also duplicated these inferred phrases into the topic.

The fix adds normalized trigram title matching, orders exact matches before approximate matches, and retains title discovery independently of AI profiles and embeddings. Keyword phrases are now alternatives, with the core topic kept separate from inferred skills/outcomes. Explicit difficulty constraints still apply.

## Verification

`apps/backend/scripts/verify-course-discovery.ts` executes the actual retrieval SQL against local PostgreSQL with synthetic course rows supplied through CTEs. It does not modify course data or call model providers. Its 17 checks cover the original natural-language request, the misspelled title, unrelated topics, description-only discovery with extra inferred terms, accents, embedding outages and difficulty constraints.

Validation passed: all 431 backend tests across 60 suites, the backend build, and all 17 PostgreSQL checks.

From `apps/backend`:

```powershell
node node_modules/jest/bin/jest.js --runInBand
npm run build
node -r ts-node/register scripts/verify-course-discovery.ts
```

The SQL verifier requires the development schema, pgvector, and the new `pg_trgm` extension migration. The migration SQL was applied only to the local development database for verification.

## Production status

These are repository changes; production has not been deployed or verified. The browser tool found the user's Chrome window but stopped because it could not confidently determine its URL. Public web-tool access to the supplied Amplify URL also failed. These failures do not establish the production service's health or the exact runtime retrieval trace.

Deploy the backend together with `20261022000000_fuzzy_course_title_discovery`. The normal backend startup runs Prisma migrations before starting the application. Then retest the original request in a fresh learner conversation on the production site, without attaching the course, and confirm that the answer recommends the relevant course with its course link.
