# Decisions

This file uses a lightweight ADR-style register. A decision is not final merely because it appears in a plan. Unresolved items remain explicitly marked.

## Decision record format

- **Status:** Proposed, Accepted, Superseded, or `TBD / DECISION REQUIRED`.
- **Context:** The problem or constraint.
- **Decision:** The chosen direction, if accepted.
- **Consequences:** Trade-offs and follow-up work.

## Accepted directions

### ADR-001: Start with a modular monolith

- **Status:** Accepted
- **Context:** SUDEN needs many related workflows and is still being established.
- **Decision:** Use a Java/Spring Boot modular monolith with isolated domain modules under `com.suden`.
- **Consequences:** Simpler deployment and transactions now; preserve boundaries so later extraction remains possible. See [ARCHITECTURE.md](ARCHITECTURE.md).

### ADR-002: PostgreSQL is the permanent system of record

- **Status:** Accepted
- **Context:** Learning, access, financial, and audit state require durable relational integrity.
- **Decision:** Use PostgreSQL 18, JPA/Hibernate with SQL expertise, and Flyway migrations. Do not use Hibernate auto-DDL for production.
- **Consequences:** Constraints, transactions, indexes, locking, and migration review are part of feature work. See [DATABASE.md](DATABASE.md).

### ADR-003: Prefer server-side sessions

- **Status:** Accepted direction
- **Context:** SUDEN needs secure browser authentication, revocation, and administrative controls.
- **Decision:** Use Spring Security and Spring Session backed by Redis, with secure cookies and CSRF protection.
- **Consequences:** Redis availability and session policy must be operated carefully; exact timeout and device rules remain open.

### ADR-004: Isolate payment providers

- **Status:** Accepted direction
- **Context:** Paystack is preferred initially and Stripe may follow.
- **Decision:** Implement an internal `PaymentProvider` abstraction with provider adapters; verify webhooks and update financial state transactionally and idempotently.
- **Consequences:** Provider-specific behavior is isolated, but reconciliation and dispute handling still require product decisions.

### ADR-005: Use a ledger for instructor finances

- **Status:** Accepted
- **Context:** A mutable balance cannot adequately represent earnings, payouts, adjustments, reversals, and disputes.
- **Decision:** Use append-oriented ledger-style financial records with audit references.
- **Consequences:** Balance is derived/reconciled from records; attribution, revenue share, thresholds, and payout policies remain open.

### ADR-006: Keep the existing frontend during backend foundation work

- **Status:** Accepted
- **Context:** The repository is an active Vite HTML/CSS/JavaScript frontend prototype while React is planned later.
- **Decision:** Do not rewrite existing frontend files as part of backend documentation or foundation work.
- **Consequences:** API integration and React migration are staged later. Existing frontend/product mismatches must be resolved deliberately.

## Unresolved decisions

The following must be resolved before the affected feature is treated as fully specified:

1. Subscription prices, currency, renewal, auto-renewal, cancellation, grace period, expiry, and upgrade/downgrade behavior.
2. Certificate price and certificate payment timing/workflow.
3. Instructor revenue-share percentage, attribution formula, payout threshold, currency, schedule, failed payout handling, reversals, and withholding.
4. Exact user role combinations and role transition rules.
5. Session inactivity timeout, absolute timeout, and multi-device behavior.
6. Course versioning and review behavior for minor versus major published changes.
7. Non-video lesson completion and whether quizzes/assignments affect displayed progress.
8. Assignment grading, final assessment passing score, retakes, attempt limits, time limits, short-answer grading, and manual versus automatic grading.
9. Secure coding-question execution architecture and sandbox boundaries.
10. Instructor application fields and review requirements.
11. Messaging model, attachments, ownership, editing/deletion, moderation, blocking/reporting, live-call provider, and scheduling.
12. Notification preferences, unsubscribe behavior, and mandatory transactional messages.
13. Account deletion, suspension, data retention, analytics scope, and legal/privacy/terms requirements.
14. Upload limits, video processing pipeline, and delivery format.
15. Email provider.
16. Launch countries and supported currencies.
17. 2FA recovery codes/recovery process and OAuth implementation details.
18. Production AWS regions/topology, scaling, backup retention, RPO/RTO, and alert ownership.
19. API pagination parameter convention and exact endpoint/resource DTO contracts.

## Repository inconsistencies to resolve

- The current README and frontend contain a student wishlist page, but the product requirements explicitly say there is no wishlist. Treat wishlist as prototype-only until product scope decides otherwise; do not create backend wishlist APIs or tables by assumption.
- The frontend repository is HTML/CSS/JavaScript with Vite, while the planned frontend is React/Vite. This is a migration plan, not an instruction to rewrite the current project now.
- The current GitHub Pages workflow deploys only the Vite artifact. It does not deploy a backend and should not be treated as production infrastructure.
- The current `package.json` has no test script and the repository has no backend source, database migrations, or Redis configuration. These are expected gaps at the current frontend-foundation phase.

Before implementing subscriptions, payments, certificates, instructor payouts, assessment execution, account lifecycle, or messaging, product owners should resolve the corresponding items above and update this register plus the authoritative document.
