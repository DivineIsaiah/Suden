# Database

**Status:** Confirmed technology and integrity requirements with candidate entities. Final schema follows implemented requirements and approved decisions.

## 1. Technology and ownership

Use PostgreSQL 18 as the permanent system of record. Use JPA/Hibernate for ordinary persistence, while retaining SQL expertise for indexes, query plans, locking, constraints, and performance. Production schema changes are managed by Flyway migrations. Do not use Hibernate automatic schema generation as the production migration strategy.

Redis supports sessions, rate limiting, caching, and temporary security state; it is not the source of truth for permanent business data.

## 2. Modelling principles

Model business invariants in database constraints and service logic. Prefer immutable event/history records for payments, subscriptions, audits, and certificates. Use opaque IDs where appropriate, explicit timestamps, UTC storage, foreign keys, unique constraints, check constraints, and deliberate nullability. Avoid premature tables: candidate entities are not an instruction to create every table immediately.

Potential areas include users/roles/permissions, profiles and instructor applications, courses/sections/lessons/resources/submissions, enrollments/progress, assessments/attempts/answers, certificates/verification, subscriptions/events, payments/events, earnings/payouts/adjustments/reversals, notifications/preferences, conversations/messages, taxonomy, file assets, and audit logs.

There must be no `CourseReview` entity under the current product scope.

## 3. Relationships and invariants

- A user may have roles; exact role combinations are unresolved.
- A course has ordered sections and content items.
- Enrollment belongs to a student and course; active subscription controls access.
- Lesson progress belongs to an enrollment and lesson and stores completion plus resume position.
- Assessment attempts identify the learner, assessment, attempt state, score, and timestamps.
- A certificate references its learner/course/instructor context and has an immutable verification identity.
- Payment provider events are retained with provider identifiers and idempotency/replay data.
- Ledger entries are append-oriented and support earnings, payouts, adjustments, and reversals.
- Audit entries identify actor, action, resource, timestamp, result, and request/correlation data where appropriate.

## 4. Indexing

Index foreign keys and common access paths: active sessions/lookups, verified login identifiers, role assignments, course publication/status, course taxonomy, enrollment by learner/course, progress by enrollment/lesson, assessment attempts, certificate verification ID, provider event IDs/idempotency keys, subscription status, payment dates/status, audit actor/resource/time, and notification recipient/unread state. Validate indexes with real query plans; avoid indexing every column.

Course search should initially use PostgreSQL indexes/full-text capabilities as appropriate. Exact search design is an implementation decision.

## 5. Transactions and concurrency

Use explicit transaction boundaries around enrollment/access changes, assessment submissions, certificate issuance, payment verification, subscription entitlement changes, and ledger entries. Apply appropriate isolation and locking for competing financial or state transitions. Provider webhooks must be idempotent so retries cannot duplicate payments, entitlements, or financial records.

## 6. Financial integrity

Never represent instructor earnings as a single mutable balance. Record ledger entries for earnings, payouts, adjustments, and reversals, with source references and immutable audit context. Provider disputes, chargebacks, failed payments, duplicate payments, and reversals must be represented without rewriting history.

The revenue-share formula, attribution model, payout threshold/currency/schedule, and withholding rules are `TBD / DECISION REQUIRED`.

## 7. Deletion, retention, and privacy

Use soft deletion only where history, auditability, or legal retention requires it; do not hide ordinary data-quality problems behind soft deletion. Preserve issued certificate verification records independently from learner UI state. Account deletion, suspension, retention periods, analytics scope, and legal/privacy requirements are unresolved and must be decided before irreversible data workflows are built.

## 8. Migration practice

Each schema change gets a forward-only Flyway migration, a reviewable name, compatible application rollout considerations, and tests. Destructive changes require a staged migration and rollback/recovery plan even when the migration itself is not reversible. Seed data must be environment-appropriate and must not contain production secrets.
