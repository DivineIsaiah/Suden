# Contributing

## Workflow

Branches are named `main`, `develop`, `feature/*`, `fix/*`, and `hotfix/*`. Do not push directly to `main`; changes arrive through pull requests. CI must pass before merge, and production-sensitive changes require appropriate review.

The current repository deploys the frontend from `main` to GitHub Pages. Backend CI/CD and the role of `develop` must be finalized when the backend repository/build is introduced.

## Pull requests

A pull request should explain the problem, scope, behavior, migration impact, security impact, testing performed, and any unresolved decision. Keep changes focused. Include screenshots or API examples when behavior is user-facing. Never include secrets or real personal/payment data.

Reviewers should check requirements, authorization, validation, transaction boundaries, failure handling, accessibility/user impact, tests, migrations, observability, and documentation. No frontend restriction substitutes for server-side authorization.

## Commits

Use meaningful, focused commits that describe the change. Avoid unrelated formatting churn. A commit that changes a database schema must include its migration and compatible application behavior. A security or payment change should be easy to review independently.

## Before requesting review

- Run the relevant frontend build or backend compile.
- Run focused unit/integration tests and relevant end-to-end tests.
- Run static analysis and dependency checks when available.
- Review generated API/schema changes.
- Verify no secrets, credentials, tokens, or generated artifacts are included.
- Update the relevant documentation and [DECISIONS.md](DECISIONS.md) when a decision changed.

## Documentation rule

Requirements belong in [SRS.md](SRS.md), technical structure in [ARCHITECTURE.md](ARCHITECTURE.md), API behavior in [API.md](API.md), data rules in [DATABASE.md](DATABASE.md), security controls in [SECURITY.md](SECURITY.md), and rationale/decision status in [DECISIONS.md](DECISIONS.md). Mark unresolved behavior `TBD / DECISION REQUIRED`; do not silently decide it in code.
