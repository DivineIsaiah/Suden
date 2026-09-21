# SUDEN

SUDEN is an online learning platform focused on Software Engineering and Computer Science. It is designed to help learners move from foundational knowledge to real-world capability through structured courses, practical projects, assessments, learning paths, certificates, and guided "Build with me" experiences.

SUDEN is intended for university students, self-taught developers, career changers, professionals, beginners, and advanced learners. Its learning philosophy is practice-oriented rather than purely theoretical, with experiences such as building a distributed system or systems-level software from scratch.

> **Vision:** Make advanced and practical Software Engineering and Computer Science education affordable and accessible online.
>
> **Mission:** SUDEN helps learners go from foundational knowledge to real-world capability through structured courses, practical projects, and guided "build with me" learning paths.

## Status

🚧 **Status: In active development**

The repository is currently a Vite-powered, multi-page frontend foundation built with HTML, CSS, and JavaScript. It includes public, student, instructor, and admin page areas, along with shared styles, assets, and frontend utilities. A backend, API, database, automated test suite, and production infrastructure are planned but are not implemented in this repository yet.

The current frontend build is deployed to GitHub Pages through the workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml). This is prototype deployment, not the planned production architecture.

## Product Direction

The intended platform will support:

### Learning

- Structured courses with sections, lessons, resources, and practical projects.
- Guided learning paths and "Build with me" engineering experiences.
- Progress tracking and resume learning.
- Free learning content and subscription-based access to courses and learning paths.

### Assessments and certificates

- Quizzes, assignments, and final assessments.
- Multiple question types and course completion requirements.
- Automatically generated certificates with public verification.

### Instructor platform

- Instructor applications and administrator approval.
- Course creation, content management, submission, and review.
- Instructor analytics, earnings, and student communication.

### Administration

- User, instructor, course, subscription, payment, certificate, and platform management.
- Administrative review workflows and auditability.

### Security

- Secure authentication, role-based access control, and two-factor authentication.
- Secure server-side sessions, rate limiting, protected file handling, and audit logging.

These are product capabilities and direction, not claims that the features are already production-ready. Subscription terms, certificate pricing, assessment details, messaging behavior, and several operational policies remain documented decisions to be resolved.

## Technology

### Current implementation

- HTML5, CSS3, and JavaScript.
- Vite for the current multi-page frontend build.
- npm scripts for development, production builds, and local preview.

### Planned frontend

- React and Vite.
- JavaScript initially, with TypeScript later.
- React Router, TanStack Query, fetch or Axios, React Hook Form, and Zod.
- Vitest, React Testing Library, and Playwright.

### Planned backend

- Java 25 and Spring Boot 4.1.x.
- Spring MVC, Spring Security, Spring Data JPA, Hibernate, and Jakarta Bean Validation.
- Spring Session, Spring Actuator, Flyway, and Gradle Wrapper.
- JUnit 5, Mockito, and Testcontainers.

### Planned data and infrastructure

- PostgreSQL 18 and Redis.
- Docker and Docker Compose.
- Amazon S3 and CloudFront for protected asset delivery where appropriate.
- AWS infrastructure, Cloudflare, GitHub Actions, OpenTelemetry, structured logging, and AWS Secrets Manager.

### Planned payments

- Paystack and Stripe through an internal provider abstraction.

Technologies in the planned sections are architectural direction, not evidence that they are already configured or running in this repository. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full technical direction.

## Architecture Summary

The intended production system uses a React frontend and a Java/Spring Boot backend organized as a modular monolith. PostgreSQL is the permanent source of truth, Redis supports sessions and temporary state, and S3/CloudFront handle protected files and content delivery where appropriate. Development is Docker-based, with AWS as the planned production platform.

SUDEN is intentionally **not** starting as a microservices system. The backend modules are designed to remain reasonably isolated so they can evolve independently later if scale justifies it.

## Repository Structure

```text
SUDEN/
├── .github/
│   └── workflows/
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── css/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── responsive/
│   └── variables/
├── js/
│   ├── components/
│   ├── data/
│   ├── pages/
│   └── utils/
├── pages/
│   ├── admin/
│   ├── instructor/
│   ├── public/
│   └── student/
├── docs/
│   ├── README.md
│   ├── SRS.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   ├── DEVELOPMENT.md
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   ├── TESTING.md
│   └── DECISIONS.md
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Documentation

The `docs/` directory is the project documentation source of truth. Start with the [Documentation Index](docs/README.md), then use the detailed document relevant to the work:

| Document | Purpose |
| --- | --- |
| [SRS](docs/SRS.md) | Product and software requirements |
| [Architecture](docs/ARCHITECTURE.md) | System architecture and technical design |
| [API](docs/API.md) | REST API conventions and confirmed contracts |
| [Database](docs/DATABASE.md) | Data modelling, integrity, and migrations |
| [Security](docs/SECURITY.md) | Security requirements and controls |
| [Development](docs/DEVELOPMENT.md) | Local development setup and workflow |
| [Contributing](docs/CONTRIBUTING.md) | Git and contribution workflow |
| [Deployment](docs/DEPLOYMENT.md) | Deployment, infrastructure, rollback, and recovery |
| [Testing](docs/TESTING.md) | Testing strategy and quality gates |
| [Decisions](docs/DECISIONS.md) | Architectural decisions and unresolved questions |

`TBD / DECISION REQUIRED` items in the documentation are intentionally unresolved and should not be implemented as settled product behavior.

## Quick Start

The current repository supports the frontend workflow below:

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
```

The repository currently has no backend setup or automated test command. See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for the planned development environment and [docs/TESTING.md](docs/TESTING.md) for the testing direction.

## Contributing

The intended branch workflow uses `main`, `develop`, `feature/*`, `fix/*`, and `hotfix/*`.

- No direct pushes to `main`.
- Use pull requests and required CI checks.
- Run relevant tests and builds before merge.
- Keep commits focused and meaningful.
- Update documentation when behavior or decisions change.

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for the complete contribution workflow.

## Engineering Principles

- Security by default and least privilege.
- Server-side authorization for every protected operation.
- Maintainable, modular, testable software.
- Practical learning over theory alone.
- Documented decisions and explicit unresolved requirements.
- Production-minded engineering without premature complexity.
- Incremental development that keeps each milestone useful and verifiable.

SUDEN is developed through a simple loop: **Learn -> Apply -> Practice -> Debug -> Fix -> Document**.
