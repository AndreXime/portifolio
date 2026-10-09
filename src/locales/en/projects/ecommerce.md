---
order: 2
experimental: true
title: "Full stack ecommerce: Hono API, Astro storefront, and order domain"
shortDescription: "Full stack ecommerce lab in a monorepo to practice API, storefront, and order domain together. REST API in Hono (Bun), SSR storefront in Astro, and persistence in PostgreSQL with Prisma and Redis. The core covers JWT session in cookies with refresh, atomic orders with stock, CEP-based shipping, and an OpenAPI contract with Zod. The storefront already creates real orders; payment is still simulated in the presentation layer."
tech: ["TypeScript", "Hono", "Astro", "PostgreSQL", "Redis", "Prisma"]
imageUrl: "../../../assets/projects/ecommerce.png"
link: "https://ecommerce.andreximenes.xyz"
github: "https://github.com/AndreXime/ecommerce"
---

## Technical context

I treated the project as two deployables in the same repository: a Hono API and an Astro storefront, sharing an explicit HTTP contract. On the backend, Zod validates input and output and feeds the OpenAPI specification, which reduces divergence between documentation and real behavior. I chose Bun as the runtime for development and build simplicity, and Hono for middleware composition (CORS with credentials, security headers, rate limiting) without carrying a monolithic framework. PostgreSQL with Prisma concentrates the relational model; Redis appears as an access token revocation cache and as the BullMQ queue backbone for email and routines like abandoned cart. For product media, the admin flow goes through pre-signed URLs on S3-compatible object storage.

On the front end, Astro handles SSR on storefronts and listings and delegates interactivity to Preact where state changes in the browser. The conscious trade-off was HttpOnly cookies instead of storing tokens in page-script-accessible storage: the web must always send credentials, forward Cookie on SSR, and handle 401 with a centralized refresh flow. This adds a bit of integration complexity, but aligns security and session model with the modern browser.

## Engineering challenges (how and why)

- **Order as an atomic unit:** I consolidated order creation in a database transaction: loading products and options, variant validation, price and image snapshot on items, stock decrement only when quantity is sufficient (conditional `updateMany`) and availability flag adjustment, with cart emptying when the source is the active cart. The storefront calls this API at checkout; what is still cosmetic is the payment UI (card/pix/boleto without a gateway).
- **Shipping and CEP quotes:** the domain covers carriers, methods, weight, and quotes from postal codes, with the amount entering the order. That completes the path to close without pretending shipping is a static field.
- **Session with real revocation:** beyond persisted refresh token and logical rotation on login, I used a Redis blocklist by access token JTI until natural TTL and session version on password reset to invalidate old tokens. The goal is for logout and credential recovery to take effect before the access token expires on its own.
- **Astro and API integration without "two worlds":** on SSR, calls forward the cookie header to the backend; on the client, a single HTTP client applies `credentials: include`, handles validation errors uniformly, and serializes refresh to avoid renewal race conditions. This keeps the same session semantics on static pages and interactive islands.
- **Reproducible local environment:** I brought up PostgreSQL, Redis, Mailpit, and MinIO via Compose. On the API, there is dependency checking on startup, retry with backoff on database connection, and a health check to track process health.
- **Admin panel and uploads:** the `/admin` gate uses an authorized call to the restricted user listing; uploads go through the pre-signed flow to avoid exposing infrastructure secrets to the browser and to decouple bandwidth from API compute.
