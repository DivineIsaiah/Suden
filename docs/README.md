# SUDEN Documentation

This directory is the documentation source of truth for SUDEN, an online learning platform focused on affordable, practical Software Engineering and Computer Science education.

## Document map

| Document | Authority |
| --- | --- |
| [SRS](SRS.md) | Product scope, requirements, roles, workflows, business rules, and acceptance criteria |
| [Architecture](ARCHITECTURE.md) | System boundaries, modules, infrastructure, and technical architecture |
| [API](API.md) | REST and JSON conventions and only confirmed API contracts |
| [Database](DATABASE.md) | Data modelling, integrity, migration, and financial-record rules |
| [Security](SECURITY.md) | Security requirements and operational controls |
| [Development](DEVELOPMENT.md) | Local setup, tools, environments, and developer workflow |
| [Contributing](CONTRIBUTING.md) | Branching, pull requests, review, and documentation expectations |
| [Deployment](DEPLOYMENT.md) | CI/CD, environments, AWS deployment, rollback, and recovery |
| [Testing](TESTING.md) | Test strategy, tools, critical journeys, and quality gates |
| [Decisions](DECISIONS.md) | Architectural decisions and explicitly unresolved product/technical decisions |

## How to use this documentation

- Start with [SRS.md](SRS.md) to understand what SUDEN must do.
- Use [ARCHITECTURE.md](ARCHITECTURE.md) and [DATABASE.md](DATABASE.md) before designing backend modules or migrations.
- Use [API.md](API.md) for frontend/backend contracts.
- Use [SECURITY.md](SECURITY.md) for security-sensitive work.
- Treat `TBD` and `DECISION REQUIRED` as unresolved. Do not implement them as if they were settled.

Requirements are authoritative over implementation recommendations. Confirmed product requirements are distinct from recommendations, and [DECISIONS.md](DECISIONS.md) records the rationale for decisions that have actually been made.

## Current repository state

The repository currently contains a Vite-powered, multi-page HTML/CSS/JavaScript frontend prototype. It has public, student, instructor, and admin page areas, but no backend source, API implementation, automated tests, or PostgreSQL/Redis configuration. The existing frontend remains in place; these documents do not replace it.

The repository currently deploys the Vite build to GitHub Pages through [.github/workflows/deploy.yml](../.github/workflows/deploy.yml). That is the current prototype deployment, not the planned production AWS architecture.
