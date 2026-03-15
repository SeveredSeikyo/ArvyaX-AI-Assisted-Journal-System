# ArvyaX Architecture

## 1) Current Architecture
The app is a 3-tier TypeScript stack:

1. Frontend (Next.js App Router)
   - UI pages in `frontend/src/app` and components in `frontend/src/components`
   - Calls backend API via `frontend/src/services/api.ts`
2. Backend (Express API)
   - `backend/server.ts` config
   - Routes in `backend/routes/journal.routes.ts`
   - Controllers in `backend/controllers/journal.controller.ts`
   - Services for journals and insights in `backend/services/*`
3. Data layer
   - SQLite local DB in `backend/db/db.ts`
   - Schema in `backend/db/schema.sql`

### Data flow
1. User posts journal entry from frontend.
2. Backend stores entry in DB and returns created journal.
3. User requests analysis; backend calls OpenAI and stores results.
4. Insights page aggregates journal/emotion/keywords.

## 2) How would you scale this to 100k users?
1. **Move to managed database**: Use PostgreSQL (Azure Database for PostgreSQL / AWS RDS) and add connection pooling.
2. **Separate API services**: Deploy backend as scaled containers or serverless functions behind a load balancer.
3. **Use caching layer**: Cache frequent analytics results in Redis (for dashboard and repeated queries).
4. **Horizontal frontend**: Host frontend in CDN-backed static hosting (Vercel/Azure Static Web Apps).
5. **Asynchronous analysis**: Use queue workers (Celery, Azure Queue, AWS SQS) to process LLM calls and write results, reducing request time.
6. **Observability**: Add monitoring/tracing (Application Insights, Prometheus, Grafana).

## 3) How would you reduce LLM cost?
1. **Batch processing**: Analyze new journals in batches and reuse common analysis templates.
2. **Use lower-cost models**: Route simple summarization/emotion detection to cheaper models (e.g., GPT-4o-mini, text-embedding-3-small) where quality can be acceptable.
3. **Rate-limit analysis**: Prevent duplicate calls by caching previous analysis per identical journal text.
4. **Use prompt templates and token limits**: Trim input and output lengths, avoid verbose instructions.
5. **Cache analysis results**: Store results by `journal_id` and return cached data for repeated requests.

## 4) How would you cache repeated analysis?
1. **Persistent DB store**: Keep analysis result in `analysis_results` table with `journal_id`, `emotion`, `summary`, `keywords`, `updated_at`.
2. **Check before call**: Backend analysis endpoint checks if `journal_id` already has analysis; returns existing record instead of calling LLM.
3. **In-memory/Redis cache**: Cache analysis results by key `analysis:journal:<journal_id>`; use TTL and update when journal text changes.
4. **Cache invalidation**: If the user edits journal text, invalidate cached analysis and re-analyze on demand.

## 5) How would you protect sensitive journal data?
1. **Encryption at rest**: Use DB encryption (Transparent Data Encryption or encrypted columns) for journal text and analysis.
2. **Encryption in transit**: Enforce HTTPS/TLS between frontend, backend, API gateway, and AI service.
3. **Auth & authorization**: Add user authentication (JWT/OAuth) and per-user access checks in every journal API.
4. **Principle of least privilege**: Limit DB account permissions and restrict app credentials in secrets manager.
5. **Secret management**: Store OpenAI keys and DB credentials in environment secrets (Azure Key Vault, AWS Secrets Manager).
6. **Logging hygiene**: Do not log full journal text or PII; sanitize logs.

## 6) Production Implementation Notes
- Deploy backend as containerized microservice (`Dockerfile` exists in backend).
- Use `docker-compose` for local integration; production should use Kubernetes/App Service with environment secrets.
- Add CI/CD pipeline to run tests and lint on PRs.

## 7) Additional Considerations
- Add a proper user model and authentication (e.g., Auth0 or NextAuth) before scaling.
- Add automated tests for API and UI snapshots.
- Use OpenAI response validation and fallback to default messaging if the model fails.
