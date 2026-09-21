# Security

Security is a core requirement. SUDEN protects confidentiality, integrity, availability, and accountability using least privilege, secure defaults, defence in depth, and server-side enforcement.

## Identity and sessions

- Hash passwords with Argon2id; never store plaintext passwords.
- Require email verification, sensible password rules, 2FA, brute-force protection, credential-stuffing controls, and rate limits.
- Password reset tokens are random, single-use, time-limited, and invalidated after use.
- Use Spring Security and preferably server-side Spring Session with Redis.
- Cookies are `Secure`, `HttpOnly`, and `SameSite=Lax`; use unpredictable session IDs.
- Enforce inactivity and absolute expiry, session invalidation, and password-change invalidation.
- Exact timeout, multi-device policy, 2FA recovery codes/process, and OAuth details are `TBD / DECISION REQUIRED`.
- Require re-authentication for sensitive account changes.

## Authorization and administration

Use server-side RBAC for `STUDENT`, `INSTRUCTOR`, and `ADMIN`; prevent IDOR, privilege escalation, unauthorized role changes, and reliance on frontend restrictions. Resource ownership and course workflow rules are checked in the backend.

Admin impersonation must be explicit, separately authenticated, time-limited, clearly indicated in every relevant context, and fully audited. Administrative operations must be protected more strongly than ordinary user actions.

## Input, browser, and API protection

Validate type, length, range, enum, cross-field, and unexpected fields on the server. Use parameterized queries and safe JPA/Hibernate practices; prohibit SQL concatenation, command injection, template injection, and unsafe deserialization. Use least-privileged database accounts.

Cookie-authenticated state-changing requests require CSRF protection. Encode output, sanitize allowed user content, and use a restrictive Content Security Policy to reduce XSS risk. Use HTTPS/TLS and security headers including CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and framing protection.

API endpoints require authentication and authorization where applicable, validation, pagination, query limits, rate limiting, versioning, safe Problem Details errors, and no stack traces, SQL, filesystem paths, credentials, or infrastructure details in production responses.

## Rate limits and uploads

At minimum rate limit login, registration, password reset, email verification, 2FA, search, uploads, enrollment, payments, admin endpoints, and expensive operations. Limits and trusted infrastructure behavior are implementation decisions.

Uploads require allow-listed types, maximum sizes, content validation, generated storage names, path traversal prevention, dangerous-file prevention, storage outside executable/static directories, authorization for private files, malware scanning where appropriate, and safe `Content-Type`/`Content-Disposition`. Store assets in protected S3 locations and use pre-signed URLs when appropriate. Upload limits and video processing are unresolved.

## Payments and secrets

Never store raw card numbers or CVV. Verify provider transactions and webhook signatures server-side; protect against replay and duplicates with idempotency and transactional state changes. Audit payments, subscriptions, disputes, chargebacks, reversals, and administrative adjustments.

Never commit database passwords, API keys, JWT/session secrets, encryption keys, cloud credentials, payment secrets, or private keys. Use environment variables locally and AWS Secrets Manager in production. Separate development, staging, and production credentials.

## Logging, auditing, and monitoring

Audit admin login and failures, user lifecycle and role changes, course creation/deletion/publication/major changes, instructor approval/removal, financial and subscription administration, relevant password/email changes, and impersonation. Entries include actor, action, resource, timestamp, result, and correlation/request information where useful.

Never log passwords, tokens, secrets, payment credentials, or sensitive authentication data. Monitor failed logins, unusual authentication, privilege changes, excessive requests, suspicious admin actions, upload violations, payment/webhook anomalies, and production errors.

## Dependencies, backups, and response

Use trusted, necessary dependencies with lock files, vulnerability scanning, regular updates, and prompt remediation of critical CVEs. Backups must be regular, protected, encrypted where appropriate, and restoration-tested. Define recovery objectives before production launch.

Incident response must support identifying affected resources, investigation through audit records, session revocation, credential rotation, account resets, isolation, evidence preservation, restoration, and written follow-up. Security-sensitive features require review before release.
