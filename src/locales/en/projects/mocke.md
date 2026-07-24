---
order: 3
title: "Mock API for prototyping UIs: CSV into SQLite, filters, and OpenAPI contracts"
shortDescription: "I built Mockê, a public mock API with ready-made datasets (products, postal codes, movies, and more) to prototype frontends without a real backend. The core is Hono on Bun with SQLite cache: atomic sync by hash of the manifest under data/, per-field SQL filters, and typed OpenAPI. Reimport happens only at boot when the CSVs change; there is no runtime watch."
tech: ["Bun", "Hono", "SQLite", "Zod", "OpenAPI", "Docker"]
imageUrl: "../../../assets/projects/mocke.png"
github: "https://github.com/AndreXime/mocke"
---

## Technical context

I modeled Mockê as a modular monolith on Bun: each dataset (products, postal codes, news, movies, users, companies) is a module with paginated listing, get by id, HTML docs page, and OpenAPI tag. I chose Hono with typed routes and Zod because the HTTP contract needs to match the CSVs in `data/` without a real domain backend. Files become TEXT tables in SQLite at boot; the API queries with SQL instead of keeping tens of thousands of rows in memory. Open CORS and tuned security headers for direct browser consumption; per-IP rate limit and `/health`/`/ready` close the path for Docker behind a proxy.

## Engineering challenges (how and why)

- **Atomic sync by manifest:** at boot, I hash name|size|mtime of files under `data/` and compare with `_meta` in SQLite. If it changed, I import into a temporary file with a WAL checkpoint and rename; if the rebuild fails and a valid cache already existed, I keep the previous one.
- **Generic SQL filters:** `page`/`limit` are reserved; any other query param that exists on the dataset becomes equality, with commas as OR and match on multi-value cells (e.g. genres). Unknown fields are ignored so exploratory clients do not break.
- **Contracts validated at boot:** Zod schemas in the catalog sample up to 100 rows and fail the process if the CSV lacks the promised fields or if the sample does not parse, avoiding serving inconsistent JSON.
- **Mirrored modules, shared query:** adding a resource is a CSV in `data/`, Zod routes, HTML docs, and catalog registration; listing and get reuse the same SQL layer, without a generic factory for typed routes.
- **Proxy-aware rate limit:** fixed in-memory window by socket IP; `TRUST_PROXY` only enables the first hop of `X-Forwarded-For` when there is a trusted proxy, so the header cannot be spoofed.
- **Readiness in the container:** Docker uses multi-stage Bun, an optional `.cache` volume, and a HEALTHCHECK on `/ready`, which requires SQLite responding and every contract dataset present, with a start-period long enough for the first import.
