# Architecture

**Status:** Planned backend architecture aligned with the current frontend prototype.

## 1. System shape

SUDEN should begin as a modular monolith, not microservices. A single Spring Boot application owns business transactions while modules remain isolated by package, service, persistence, and API boundaries. This keeps delivery and operations manageable while leaving room to extract modules later if scale requires it.

The current repository is a Vite multi-page HTML/CSS/JavaScript frontend. The planned frontend is React + Vite + JavaScript initially, with TypeScript later, React Router, TanStack Query, fetch or Axios, React Hook Form, Zod, Vitest, React Testing Library, and Playwright. The current HTML/CSS architecture must continue evolving until a deliberate migration is approved.

```text
Browser frontend
  -> HTTPS REST/JSON /api/v1
  -> Spring Boot modular monolith
      -> PostgreSQL (system of record)
      -> Redis (sessions, rate limits, cache, temporary state)
      -> S3/CloudFront (protected file/video delivery)
      -> Payment providers (Paystack, Stripe adapters)
      -> Email provider (TBD)
      -> Background jobs / Redis-backed mechanism
```

## 2. Backend modules

Suggested root package: `com.suden`.

```text
com.suden
├── auth
├── users
├── courses
├── learning
├── assessments
├── certificates
├── payments
├── subscriptions
├── instructors
├── notifications
├── messaging
├── administration
├── files
├── audit
└── shared
```

Modules should expose deliberate application services and DTOs rather than sharing persistence internals. `shared` should remain small and contain cross-cutting concerns such as errors, IDs, time, security context, and common API infrastructure.

## 3. Technology baseline

- Java 25, Spring Boot 4.1.x, Spring MVC, Spring Security.
- Spring Data JPA/Hibernate with developers competent in SQL, indexes, transactions, isolation, locking, and query plans.
- Jakarta Bean Validation, Spring Session, Spring Actuator, Flyway.
- PostgreSQL 18; Redis for server-side sessions and temporary/distributed support.
- Gradle Wrapper, JUnit 5, Mockito, Spring Boot Test, Testcontainers.
- Docker and Docker Compose for local development.

Versions should be verified against the approved build configuration before implementation; this document records the requested baseline, not a generated project.

## 4. Data and request flow

A request enters through Spring MVC, is authenticated by Spring Security, validated at the API boundary, authorized against the acting user and resource, and passed to a module application service. The service coordinates domain rules and a transaction. Repositories persist through JPA/SQL. Side effects such as email, certificates, notifications, and provider follow-up should be dispatched as reliable background work after the business transaction commits where appropriate.

Payment webhooks are treated as untrusted input: verify provider signature and transaction server-side, check replay/idempotency keys, then update payment, subscription/entitlement, and ledger state in one database transaction.

## 5. Infrastructure and environments

Planned production uses Cloudflare plus AWS: ECS Fargate, RDS PostgreSQL, S3, CloudFront, ElastiCache Redis, Secrets Manager, ECR, Route 53, ACM, and SQS when justified. Development, staging, and production are separate environments with separate credentials. Docker Compose should provide local PostgreSQL and Redis.

The current deployment is GitHub Pages for the Vite artifact. It is suitable for the prototype only and must not be confused with the planned backend production deployment.

## 6. Files and media

Uploaded assets belong in S3 with generated storage names, authorization checks, and pre-signed URLs where appropriate. Private files must not be exposed through public static paths. CloudFront can front S3; advanced HLS/DASH processing is optional future work and the exact pipeline is `TBD / DECISION REQUIRED`.

## 7. Background processing

Initially use a Redis-backed job mechanism where appropriate for email, certificates, notifications, payment follow-up, payouts, video processing, and analytics. Jobs must be idempotent, observable, retry-aware, and safe around duplicate delivery. SQS can be introduced when scale or delivery guarantees justify it.

## 8. Security architecture

Spring Security and server-side Spring Session are the preferred foundation. Cookie authentication requires CSRF protection. Redis stores session and temporary security state, never permanent business truth. Authorization is enforced server-side in every protected use case. Administrative actions and impersonation are audited. See [SECURITY.md](SECURITY.md).

## 9. Observability

Use Actuator, SLF4J/Logback, structured logging, correlation/request IDs, and OpenTelemetry where adopted. Production logs should preferably be JSON and must exclude credentials, tokens, payment credentials, and sensitive authentication data. Metrics and traces should support authentication, payments, webhooks, jobs, errors, latency, and resource health.

## 10. Architectural boundaries

- PostgreSQL is the source of truth for permanent business data.
- Redis is not a permanent business database.
- Provider adapters isolate payment-specific APIs.
- API DTOs isolate external contracts from entities.
- Flyway migrations, not Hibernate automatic schema generation, manage production schema.
- No arbitrary code execution for coding assessments without an approved isolated execution design.

See [DATABASE.md](DATABASE.md), [API.md](API.md), and [DECISIONS.md](DECISIONS.md).
