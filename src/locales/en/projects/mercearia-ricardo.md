---
order: 0
title: "Grocery storefront with WhatsApp CTA on Cloudflare Workers Free"
shortDescription: "Storefront for a real business, Mercearia Ricardo Aragão: editable catalog and WhatsApp chat, no checkout or inventory. The owner updates copy, photos, and the shelf from the admin without needing a developer for every change. It runs as Astro SSR on Workers Free, with photos on R2 and a long edge cache invalidated on save. Auth and ops were tuned to the Free plan CPU and quota limits, prioritizing zero cost and simple maintenance."
tech: ["Astro", "Cloudflare Workers", "D1", "R2", "React", "Tailwind CSS"]
imageUrl: "../../../assets/projects/mercearia-ricardo.png"
link: "https://mercearia-ricardo.sitely.page"
---

## Technical context

I modeled an Astro SSR monolith on Cloudflare Workers: the storefront is HTML at the edge and `/admin` is a React island that edits the same content. The business is editorial (page copy and a product list), not orders or inventory. I stored that content as a single document in D1 and photos in R2: for this model, a relational schema and a migration treadmill would be overkill. The trade-off is explicit: simple ops and zero cost on Free, in exchange for not scaling to multi-user or POS.

I prioritized CDN-first. Public pages stay cached at the edge for a long time and the Worker invalidates selectively after each save, so the site stays fast without burning the Free request quota on constant misses. Auth and password recovery were tuned to the plan's CPU and quota limits, with sessions that drop when credentials change.

## Engineering challenges (how and why)

- **One content document, no migration treadmill:** admin saves copy and catalog in the same record. It fits because only page text and the shelf change. Avoids an e-commerce schema for a flow that ends on WhatsApp.

- **Two tabs without silent last-write-wins:** save only writes if the version the admin read still matches the database. Conflicts surface explicitly instead of overwriting quietly.

- **Long cache without stale pages after edits:** public HTML lives at the edge with tag-based invalidation after save, reset, or product changes. Without that, Free spends requests on misses all day.

- **Light photos and cleaned leftovers:** compression runs in the browser before upload. On save and draft swaps, I delete R2 objects that are no longer referenced. Seed assets stay untouched.

- **Session tied to the current password:** changing or recovering the password invalidates old tokens without a revocation list. Recover and setup use a master key and rate limiting, failing closed if the limiter does not respond.

- **Fast barcode signup:** in admin, the owner looks up and registers a product with a browser scanner. Price, stock, and expiry stay out of the model on purpose: the storefront pushes to WhatsApp, not checkout.
