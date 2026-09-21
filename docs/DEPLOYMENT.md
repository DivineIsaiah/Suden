# Deployment

## 1. Environments

Maintain separate development, staging, and production environments, accounts/credentials where practical, databases, Redis instances, storage locations, and payment configuration. Never share production secrets casually.

The current frontend prototype deploys to GitHub Pages from `main` through `.github/workflows/deploy.yml`: checkout -> Node 22 -> `npm ci` -> `npm run build` -> upload `dist` -> deploy Pages. This remains the current prototype deployment.

## 2. Planned production architecture

```text
Cloudflare -> Route 53/ACM -> load-balanced ECS Fargate application
                         -> RDS PostgreSQL
                         -> ElastiCache Redis
                         -> S3 + CloudFront
                         -> Secrets Manager
                         -> ECR
                         -> SQS when justified
```

AWS components are ECS Fargate, RDS PostgreSQL, S3, CloudFront, ElastiCache Redis, Secrets Manager, ECR, Route 53, ACM, and optionally SQS. Exact networking, regions, scaling, and Cloudflare responsibilities are `TBD / DECISION REQUIRED`.

## 3. CI/CD

The target pipeline is:

```text
Code -> compile -> unit tests -> integration tests -> static analysis
     -> dependency scan -> Docker build -> ECR
     -> staging deploy -> smoke tests -> manual production promotion
```

Use GitHub Actions. Database migrations run as a controlled deployment step using Flyway. Production promotion requires review and an observable rollback plan.

## 4. Configuration and secrets

Environment configuration covers database, Redis, sessions, payment providers, AWS, email, encryption, observability, and application settings. Local values use ignored environment files or shell variables. Production uses AWS Secrets Manager where appropriate. Secrets must not be placed in GitHub Actions logs, images, source, or frontend bundles.

## 5. Migrations and release order

Deploy backward-compatible application changes before destructive schema changes. Apply and verify Flyway migrations using a least-privileged controlled account. Financial and access-control migrations require integration tests and a recovery plan. Never use Hibernate automatic schema generation as the production migration mechanism.

## 6. Monitoring and operations

Use Actuator health/metrics, structured JSON logs, correlation IDs, OpenTelemetry where adopted, and alerts for availability, latency, errors, authentication anomalies, payment/webhook failures, job failures, database health, Redis health, and storage failures. Do not expose Actuator management endpoints publicly without deliberate protection.

## 7. Rollback and recovery

A rollback plan must identify whether to redeploy the previous image, disable a feature, replay/reconcile a job, or apply a forward database fix. Do not blindly roll back a migration after data has changed. Maintain protected, encrypted backups, test restoration regularly, and document recovery objectives before production launch.

## 8. Open deployment decisions

Still to decide: AWS account/region layout, network topology, domain ownership, Cloudflare mode, scaling targets, deployment strategy, RPO/RTO, backup retention, email provider, video processing, and production alert ownership.
