# Software Requirements Specification

**Status:** Product baseline; unresolved items are marked `TBD / DECISION REQUIRED`.

## 1. Purpose and scope

SUDEN is an online learning platform for Software Engineering and Computer Science. It takes learners from foundational knowledge to real-world capability through structured courses, practical projects, assessments, guided learning paths, and "build with me" experiences such as building distributed systems or systems-level software from scratch.

The product addresses expensive courses, theory-heavy learning, weak beginner-to-advanced progression, and limited exposure to industry-standard development.

**Vision:** Make advanced and practical Software Engineering and Computer Science education affordable and accessible online.

**Mission:** SUDEN helps learners go from foundational knowledge to real-world capability through structured courses, practical projects, and guided build-with-me learning paths.

## 2. Scope and exclusions

### In scope

- Free lessons and subscription-gated learning.
- Monthly and yearly subscription plans; no individual course purchases.
- Courses, sections, lessons, resources, quizzes, assignments, and final assessments.
- Enrollment, learning progress, resume position, certificates, search, notifications, instructor workflows, payments, administration, and auditability.
- Instructor/student questions and help, with messaging details still unresolved.

### Current exclusions

- No course reviews.
- No community feature.
- No wishlist as a product requirement, although the current frontend contains a wishlist page; see [DECISIONS.md](DECISIONS.md#repository-inconsistencies).
- No unsafe arbitrary code execution for coding assessments.
- No microservices at the start.

## 3. Users and roles

Primary roles are `STUDENT`, `INSTRUCTOR`, and `ADMIN`. A user may potentially have multiple roles; exact combinations are `TBD / DECISION REQUIRED`.

- **Student:** registers, learns, enrolls, tracks progress, attempts assessments, receives certificates, and may apply to become an instructor. Students cannot create or publish courses or administer the platform.
- **Instructor:** creates and edits courses, quizzes, and materials; submits courses for review; views earnings and course analytics; messages students. Instructors cannot publish or directly delete courses, issue certificates, or view individual student progress. Course deletion requires an admin-approved request.
- **Admin:** manages users, instructors, courses, payments, subscriptions, certificates, reports, settings, and roles. Admin actions are server-authorized and audited. Admin view-as-student impersonation must be explicit, authenticated, time-limited, clearly identified, and fully audited.

## 4. Authentication and account requirements

Registration collects first name, last name, email, username, learning interests, phone, and password. Registration is followed by email verification, then login and dashboard access.

Login supports email/password, username/password, Google, and GitHub. OAuth may follow local authentication but the architecture must allow it. Password recovery uses a random, single-use, time-limited secure token. Passwords use Argon2id or an approved equivalent; plaintext passwords are forbidden.

Two-factor authentication is required, with TOTP/Google Authenticator as the preferred initial direction. Brute-force, credential-stuffing, and relevant endpoint rate limits are required. Sensitive account changes require re-authentication.

Sessions use server-side state where practical, secure unpredictable IDs, `Secure`, `HttpOnly`, and `SameSite=Lax` cookies, inactivity expiry, absolute expiry where appropriate, and invalidation on password changes. Exact timeout and multi-device policy are `TBD / DECISION REQUIRED`.

## 5. Course and content requirements

A course contains sections; sections contain lessons, quizzes, and assignments; a course may also contain a final assessment. Lessons may contain video, text, images, PDFs, downloads, code, links, quizzes, assignments, and audio.

Instructors and admins can create courses. Students cannot. Course lifecycle:

```text
DRAFT -> SUBMITTED -> UNDER_REVIEW -> APPROVED -> PUBLISHED
```

Rejected courses return to `DRAFT`. A course may be submitted before it is complete, including with one lesson. Instructors cannot publish directly. Published changes require administrative review before the changed version is published. Exact minor/major version rules are `TBD / DECISION REQUIRED`. Instructors request deletion; admins approve it.

All course content is property of SUDEN. Multiple instructors may teach a course.

## 6. Enrollment and access

An active subscription grants access to all courses, learning paths, assessments, instructor questions, live calls, and instructor help on personal projects. A student with an active subscription can enroll immediately. Without an active subscription, the flow is choose plan -> pay -> provider confirms -> subscription activates -> access is granted.

Students can unenroll. Unenrolling does not cancel the subscription and removes progress for that course. Issued certificate records remain independently verifiable.

## 7. Learning progress

For video lessons, watching at least 70% completes the lesson. Resume position is persisted; a learner returning after stopping at 63% should resume at approximately 63%.

Course progress is completed lessons divided by total lessons, for example 7/10 = 70%. Non-video completion mechanics and whether quizzes/assignments affect the displayed percentage are `TBD / DECISION REQUIRED`.

## 8. Assessments

Supported question types are multiple choice, true/false, short answer, and coding questions. The default passing score is 80%, adjustable by an instructor. Courses may contain quizzes, assignments, and final assessments.

Certificate eligibility requires at least 80% course completion, every quiz attempted, and a passed final assessment. “Attempted” means submitted/attempted, not necessarily passed, unless changed by a later decision.

The final assessment passing score, retakes, maximum attempts, time limits, assignment grading, short-answer grading, coding execution environment, sandbox security, and manual versus automatic grading are unresolved. Coding execution must not be implemented without a separately approved security architecture.

## 9. Certificates

Certificates are automatically generated; instructors cannot issue them manually. A certificate contains at least the student name, course name, instructor, completion date, certificate ID, verification URL, grade, and duration. Certificates are publicly verifiable, for example `suden.com/verify/ABC123`, and student-visible certificate records are immutable.

Certificate pricing and the payment/issuance workflow are `TBD / DECISION REQUIRED`.

## 10. Instructor system and finances

Students may apply to become instructors; admins review and approve applications. Instructors can manage their course content, submit for review, view analytics and earnings, upload videos/PDFs, and communicate with students, subject to the restrictions above.

Compensation is intended to use percentage splits and monthly payouts, with automatic payout when a minimum balance threshold is reached, using bank transfer. Paystack and Stripe are candidate providers. Revenue-share percentage, attribution, threshold, currency, schedule, failed payouts, reversals, and withholding are unresolved.

Financial data must use an auditable ledger supporting earnings, payouts, adjustments, and reversals, rather than one mutable balance.

## 11. Search, notifications, and messaging

Search covers course title, instructor, category, topic, and skill. Filters cover category, duration, and instructor. PostgreSQL capabilities and indexes are preferred initially; Elasticsearch is not required.

Email notifications include welcome, verification, password reset, payment confirmation, enrollment, certificate, new lesson, inactivity, course reminder, subscription expiry warning, and subscription confirmation. In-app notifications include new course, course update, instructor message, and subscription expiry. Notification preferences and unsubscribe rules are `TBD / DECISION REQUIRED`.

Messaging is intended for instructor questions, project help, and live calls. One-to-one versus group conversations, attachments, ownership, editing/deletion, moderation, blocking/reporting, provider, and scheduling are `TBD / DECISION REQUIRED`. Do not over-engineer messaging before core learning flows.

## 12. Payments and subscriptions

SUDEN uses a provider abstraction with Paystack and Stripe adapters as the preferred direction; Flutterwave is not preferred. Conceptual flow:

```text
Student -> SUDEN API -> Provider -> Webhook -> Server verification
        -> database transaction -> payment recorded -> entitlement activated
        -> notification
```

The server verifies transactions and webhook signatures, prevents replay and duplicate processing, uses idempotency, and records an audit trail. Raw card numbers and CVV are never stored. No-refund is the current product policy, while disputes, chargebacks, reversals, failed payments, and duplicate payments require implementation handling. Subscription price, currency, renewal, auto-renewal, cancellation, grace period, expiry, and upgrade/downgrade rules are unresolved.

## 13. Non-functional requirements

- **Security:** confidentiality, integrity, availability, accountability, least privilege, defence in depth, server-side authorization, secure defaults, auditability.
- **Reliability:** transactional financial state, idempotent webhooks, recoverable jobs, backups, and tested restoration.
- **Performance:** pagination and query limits for APIs; indexes for common course/search access; expensive work should be asynchronous where appropriate.
- **Maintainability:** modular monolith, isolated modules, migrations through Flyway, documented contracts, automated tests, and meaningful logs.
- **Observability:** Actuator, structured logs, correlation/request IDs, metrics, traces where useful, and operational alerts.
- **Accessibility and compatibility:** frontend work must preserve the existing architecture while progressively moving toward the planned React/Vite stack; concrete accessibility targets are `TBD / DECISION REQUIRED`.
- **Privacy and compliance:** legal/privacy/terms requirements and launch countries are unresolved.

## 14. Core user journeys and acceptance criteria

- **Registration:** valid registration -> verification email -> verified account can log in; unverified account cannot use protected learning features.
- **Authentication:** valid email or username credentials authenticate; invalid/repeated attempts are safely rejected and rate limited; 2FA is required.
- **Enrollment:** active subscriber enrolls and accesses course; inactive subscriber is directed through plan/payment; unenrollment removes course progress but leaves subscription unchanged.
- **Learning:** video reaches 70% -> lesson completes; stopping and returning restores the saved position.
- **Assessment:** submitted quiz/assessment records an attempt and score; certificate eligibility evaluates completion, quiz attempts, and final pass rules.
- **Course review:** instructor submits draft -> admin can review; only admin approval can publish; rejection returns to draft.
- **Certificate:** eligible learner receives an automatically generated immutable certificate with a public verification record.
- **Payments:** verified provider event is recorded once; repeated webhook delivery does not duplicate payment, entitlement, or ledger entries.
- **Administration:** privileged changes are server-enforced, explicit, and audited; impersonation is time-limited and visibly distinct.

## 15. Recommended implementation sequence

1. Foundation: Spring Boot/Gradle, PostgreSQL, Flyway, Redis, Docker Compose, configuration, logging, RFC 9457 errors, validation, tests, security, CI.
2. Authentication and users: registration, hashing, verification, login/logout, sessions, reset, RBAC, account management, 2FA foundation.
3. Instructors and courses: applications, approval, authoring, content, submission, review, publication, update workflow.
4. Learning: enrollment, subscription access checks, progress, resume, quizzes, assessments.
5. Subscriptions and payments: plans, Paystack, verification, webhooks, idempotency, state/history; add Stripe through the abstraction later.
6. Certificates: eligibility, generation, storage, verification.
7. Instructor financials: ledger, payouts, workflow, admin controls.
8. Notifications and messaging.
9. Admin and observability: dashboards, audit, monitoring, reporting, operational tools.
10. Hardening: security/performance tests, dependency scans, backups, recovery, production deployment, and CI/CD hardening.

Every feature should have a requirement, domain model, migration, service logic, authorization, API, tests, and documentation.

## 16. Explicit unresolved decisions

See [DECISIONS.md](DECISIONS.md#unresolved-decisions) for the canonical list, including subscription terms, certificates, instructor finances, role combinations, session policy, course versioning, assessment rules, messaging, notification preferences, account lifecycle, retention, analytics, uploads/video, email, launch geography, legal requirements, 2FA recovery, and OAuth details.
