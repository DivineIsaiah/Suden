# Development

## Current frontend

The repository currently runs a Vite multi-page frontend using HTML, CSS, and JavaScript. The entry point is `index.html`; pages live under `pages/`, styles under `css/`, scripts under `js/`, and static material under `assets/`. `npm run dev` starts Vite, `npm run build` creates the production artifact, and `npm run preview` serves the built artifact locally.

The current `package.json` contains Vite only. There is no backend project, automated test script, PostgreSQL configuration, Redis configuration, or API implementation yet. Do not rewrite the existing frontend merely because React is planned; migration is a later project phase.

## Planned backend tools

- Java 25 and Gradle Wrapper.
- Spring Boot 4.1.x, Spring MVC, Spring Security, Spring Data JPA/Hibernate.
- Jakarta Bean Validation, Spring Session, Spring Actuator, Flyway.
- PostgreSQL 18 and Redis.
- Docker/Docker Compose.
- JUnit 5, Mockito, Spring Boot Test, Testcontainers.
- OpenAPI 3 through springdoc-openapi or approved equivalent.

Exact compatible patch versions belong in the backend build when it is created.

## Local setup direction

1. Install Node.js compatible with the repository workflow (the current GitHub Actions workflow uses Node 22) and npm.
2. Run `npm ci` for the existing frontend.
3. Run `npm run dev` and inspect the Vite URL.
4. For backend development, provide PostgreSQL and Redis through Docker Compose once the backend project exists.
5. Configure environment variables from a non-secret example file; never commit real credentials.
6. Run Flyway migrations through the backend process or approved Gradle task, never Hibernate auto-DDL in production.
7. Run unit, integration, and security tests before opening a pull request.

The exact backend repository layout, ports, database name, Redis namespace, email provider, and environment variable names are `TBD / DECISION REQUIRED` until the backend is scaffolded.

## Configuration

Configuration should cover database connection, Redis, session settings, payment providers, AWS/S3, email, encryption, observability, and application behavior. Development, staging, and production values must be separate. Local secrets use environment variables or an ignored `.env` mechanism; production secrets use AWS Secrets Manager where appropriate.

## API documentation

The backend should publish OpenAPI 3 documentation for implemented `/api/v1` contracts. Documentation must identify authentication, authorization, validation, idempotency, status codes, and error responses. Do not document unimplemented endpoints as available.

## Development order

Follow the phases in [SRS.md](SRS.md#15-recommended-implementation-sequence): foundation, authentication/users, instructors/courses, learning, payments/subscriptions, certificates, instructor financials, notifications/messaging, administration/observability, and hardening.

Each feature requires requirements, domain model, Flyway migration, business logic, authorization, API contract, tests, and documentation.
