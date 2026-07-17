---
order: 0
title: "Multi-tenant recruiting platform: from careers site to auditable pipeline"
shortDescription: "I built an end-to-end multi-tenant ATS in TypeScript, with NestJS on the API and Next.js (React) on the product: companies operate in logical isolation per tenant, while the candidate keeps a single profile that spans all applications. The technical differentiator is the combination of explicit state machines (jobs and applications), a customizable pipeline per job with auditing, and a second line of defense for data access via tenant context and Prisma extension over PostgreSQL, plus direct upload to object storage with pre-signed URLs and domain validation in use cases."
tech: ["TypeScript", "NestJS", "Next.js", "Prisma", "PostgreSQL", "Zod"]
imageUrl: "../../projects/images/deploy-talent.png"
featuredImageUrl: "../../projects/images/deploy-talent-mobile.png"
link: "https://deploy-talent.andreximenes.xyz"
github: "https://github.com/AndreXime/deploy-talent"
---

## Technical context
I modeled the product as a well-bounded modular monolith: a **NestJS** API exposes the domain through use cases, with **JWT + RBAC** and consistent input validation; the front end is **Next.js** with **React**, consuming the API with typed contracts and forms/validation guided by **Zod**, and **TanStack Query** to orchestrate server state. Persistence with **Prisma** and **PostgreSQL** in a shared schema: I traded the operational cost of *database-per-tenant* for the requirement of **engineering discipline** on every access (use cases + invariants + constraints). The candidate is not "one profile per company": I treated **1 user → 1 global profile**, which simplifies UX and consistency, but requires clear anonymization rules (LGPD-style) without destroying the operational trail of the hiring process.

For multi-tenant, I fixed the tenant on B2B routes from the **token itself** (avoiding trust in a loose header) and propagated context in **async local storage**; in parallel, I extended the **Prisma** client to apply filter/injection of `tenantId` on sensitive aggregates, as a safety net when some path forgets the filter; a conscious trade-off: more "RLS in application" than simply "trust the controller." For media, I standardized **pre-signed URLs** (direct browser upload to S3-compatible storage) and persistence of only the **object key**, reducing surface area on the API and internal egress cost. Transactional email was treated as **best effort**: send failure should not roll back hire/reject/application; the domain gains perceived resilience, with risk managed through observability and retry policies in the environment.

## Engineering challenges (how and why)
- **Two workflow axes in the application**: I separated **macro status** movement (e.g., hired, rejected) from advancement through **configurable stages** (questionnaire, upload, interview link), each with history; this avoids mixing "business state" with "process UX" and keeps product evolution less coupled.
- **Versioned pipeline per job**: I cloned the tenant template into job stages at creation time, freezing the design after publication; the trade-off is not retroactively changing old jobs, in exchange for predictability for recruiters and candidates.
- **B2B onboarding without third-party-defined passwords**: invites with opaque tokens delivered out of band, persisting only **digest** in the database; if delivery fails, I revoke the invite to avoid leaving an "active" token without delivery, a security decision that closes a common class of operational inconsistency.
- **Email sourcing as a decision machine**: the same endpoint distinguishes registration invite, public job link delivery, and short-circuit when an application already exists; this reduces support and ghost states in the pipeline.
- **Controlled public exposure**: site per company and aggregated marketplace reuse public endpoints with job visibility rules (draft does not leak), keeping the same domain base as the logged-in area.
- **Operations and CI**: health with **liveness** without dependencies and **readiness** checking **PostgreSQL**; integration pipeline separating API (tests + build + Prisma generation) and Web (check + build), aligned with team scale and localized failures.
