# API

**Status:** Conventions and confirmed conceptual contracts only. The backend does not yet exist, so this document intentionally does not invent a complete endpoint catalogue.

## 1. Protocol and versioning

- REST over HTTPS with JSON request and response bodies.
- Base path: `/api/v1`.
- Use lowercase plural nouns: `/api/v1/courses`, `/api/v1/users`, `/api/v1/certificates`, `/api/v1/notifications`.
- Resource IDs appear as `/api/v1/courses/{courseId}`.
- Nest only when the relationship adds clear semantic value.
- Use OpenAPI 3, preferably through springdoc-openapi or the project-approved equivalent.

Breaking changes require a new version. Additive compatible changes should not silently change the meaning of existing fields.

## 2. Authentication

Preferred authentication is secure server-side sessions using Spring Security and Spring Session backed by Redis. Cookies are `HttpOnly`, `Secure` in deployed environments, and `SameSite=Lax`. Cookie-authenticated state-changing requests require CSRF protection.

The server is authoritative for identity, session state, role checks, and entitlements. The frontend must not treat hidden controls as authorization. OAuth providers are Google and GitHub, but implementation details remain unresolved.

## 3. Request and response conventions

Use explicit request/response DTOs, stable field names, ISO-8601 timestamps, and opaque resource identifiers. Do not return passwords, tokens, secrets, payment credentials, internal filesystem paths, SQL, stack traces, or unnecessary personal data.

Validation must cover types, lengths, ranges, enums, required fields, cross-field rules, and unexpected fields according to the endpoint contract. Use pagination and bounded query parameters for collections.

## 4. Errors

Use RFC 9457 Problem Details with a conceptual shape such as:

```json
{
  "type": "https://api.suden.com/problems/validation-error",
  "title": "Request validation failed",
  "status": 400,
  "detail": "One or more fields are invalid.",
  "instance": "/api/v1/courses",
  "code": "VALIDATION_ERROR",
  "traceId": "request-correlation-id",
  "fieldErrors": [
    { "field": "title", "message": "must not be blank", "code": "NotBlank" }
  ]
}
```

The exact problem type URI convention is an implementation decision. Production errors must not expose stack traces, database/provider details, filesystem paths, credentials, or infrastructure internals.

## 5. HTTP status conventions

- `200 OK`: successful retrieval or action with a response.
- `201 Created`: a resource was created; include its location where appropriate.
- `202 Accepted`: work was accepted for asynchronous processing.
- `204 No Content`: successful action with no response body.
- `400 Bad Request`: malformed or invalid request.
- `401 Unauthorized`: authentication is absent or invalid.
- `403 Forbidden`: authenticated but not authorized.
- `404 Not Found`: resource is absent or intentionally not disclosed.
- `409 Conflict`: state or idempotency conflict.
- `422 Unprocessable Content`: syntactically valid but semantically unacceptable, where the API chooses this distinction.
- `429 Too Many Requests`: rate limit exceeded.
- `500`/`503`: safe generic server/dependency failure.

## 6. Pagination, filtering, and sorting

Collection endpoints must define bounded pagination, stable ordering, and maximum page size. Filtering must use an allow-list of fields and validated values. Search initially covers course title, instructor, category, topic, and skill, with category, duration, and instructor filters. PostgreSQL indexes and capabilities are preferred before adding a search service.

Exact query parameter names and cursor versus offset pagination are `TBD / DECISION REQUIRED`; choose consistently when the first collection contract is implemented.

## 7. Confirmed contract surfaces

The following resource areas are confirmed by requirements, but their endpoint shapes are not yet fixed:

- authentication and account recovery;
- users, roles, and instructor applications;
- courses, sections, lessons, resources, submissions, and publication review;
- enrollment and lesson/course progress;
- assessments and attempts;
- certificates and public verification;
- subscriptions, payments, provider webhooks, earnings, and payouts;
- notifications, preferences, conversations/messages;
- files and administrative/audit operations.

Do not add endpoints for reviews, wishlists, or community features unless the product scope changes.

## 8. Endpoint design principles

Every endpoint must identify its authorization rule, validation contract, transaction boundary, idempotency requirement, audit requirement, and test coverage. Payment webhooks must verify signatures and protect against replay and duplicate delivery. Expensive operations such as certificate generation or email may return `202` and be tracked through a documented job/status contract once implemented.
