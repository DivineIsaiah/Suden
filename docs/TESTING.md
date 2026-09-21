# Testing

## Strategy

Testing follows the risk of each feature. Authorization, payments, subscriptions, progress, assessments, certificates, file access, and administration need focused unit and integration coverage plus end-to-end coverage for critical journeys. Tests must verify server behavior, not only frontend visibility.

## Backend

- **Unit:** JUnit 5 and Mockito for domain rules, validators, services, entitlement decisions, progress thresholds, assessment eligibility, and provider adapters.
- **Integration:** Spring Boot Test with PostgreSQL and Redis; test Flyway migrations, repositories, transactions, locking, security filters, Problem Details, and webhook idempotency.
- **Testcontainers:** use real PostgreSQL/Redis/provider substitutes where behavior depends on database, cache, or infrastructure semantics.
- **Contract:** verify OpenAPI-described request/response shapes, status codes, validation, pagination, and error fields.
- **Security:** authentication, 2FA, session invalidation, RBAC, IDOR, privilege escalation, CSRF, uploads, rate limits, and safe error handling.

## Frontend

The planned React stack uses Vitest and React Testing Library for components, forms, routing states, and API/error states. The current static frontend has no test scripts yet; adding tests should follow the planned migration rather than disrupting the current prototype.

## End-to-end

Playwright should cover registration, verification, login, password reset, enrollment, subscription/payment, course access, lesson progress/resume, quiz, final assessment, certificate issuance and public verification, instructor application, course submission, admin approval, and publication.

Use provider sandbox/test modes for payments. Never use real card credentials or production payment accounts in automated tests.

## Acceptance tests

Acceptance criteria are defined in [SRS.md](SRS.md#14-core-user-journeys-and-acceptance-criteria). Each feature should trace from requirement to test and documentation. Boundary cases include exactly 70% video watched, exactly 80% passing score, duplicate webhook delivery, unenrollment progress removal, rejected course resubmission, expired sessions, and unauthorized access to private files.

## Performance and resilience

Before production, test search and course browsing pagination, concurrent progress/assessment updates, payment webhook retries, job retries, rate limits, database connection exhaustion, and backup restoration. Exact performance objectives, load profile, and recovery objectives are `TBD / DECISION REQUIRED`.

## Quality gates

A pull request should pass compilation/build, focused tests, integration tests for changed persistence/security/payment behavior, static analysis, dependency scanning, and relevant Playwright journeys. Flaky tests must be tracked and fixed rather than ignored.
