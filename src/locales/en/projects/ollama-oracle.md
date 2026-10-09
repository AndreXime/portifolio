---
order: 3
experimental: true
title: "Corporate chat with local RAG: indexed policies without going to the cloud"
shortDescription: "Lab for a local RAG chatbot to query policies and runbooks without sending the corpus to external APIs. Stack on Bun, Hono, React, Ollama, and Chroma, with embeddings and generation kept in the local environment. Retrieval is hybrid: vector search with lexical rerank and fallback when similarity is weak. NDJSON streaming with cancellation, and history off by default so it does not pollute the embed on small models."
tech: ["Bun", "Hono", "React", "Ollama", "ChromaDB", "LangChain"]
imageUrl: "../../../assets/projects/ollama-oracle.png"
github: "https://github.com/AndreXime/ollama-oracle"
---

## Technical context

I modeled a Bun monorepo with workspaces: a Hono API in TypeScript and a React UI (Vite) served by the same process in production. I chose Ollama and Chroma in Docker Compose to keep embeddings and generation in the local environment, aligned with the business rule of not exposing the corporate corpus to external providers. The pipeline separates one-shot ingestion (recreates the collection, part→chunk, batches with limited concurrency) from chat runtime. **Liveness** is trivial; **readiness** validates models on Ollama and collection existence on Chroma before marking the app ready.

## Engineering challenges (how and why)

- **Retrieval with distance gates:** I retrieve more candidates than fit in the prompt, then filter by max distance per chunk and by distance of the best match. On the vector path, lexical scoring also reorders candidates by token overlap.
- **Lexical fallback when the vector fails:** if the best embedding is too weak, I try the lexical path (pruning weak matches) before falling back to conversational or limitation. That way questions with institutional vocabulary still recover useful chunks without permanently loosening the vector filter.
- **Turn modes and anti-hallucination:** I distinguish rag, lexical_fallback, conversational, and limitation. Greetings go through the conversational prompt; a business question without good chunks returns a fixed message asking for reformulation, instead of letting the LLM invent policy.
- **NDJSON stream with abort on disconnect:** the endpoint emits ping, deltas, and done with sources; on client abort I cut the Ollama AbortController without an error event. The UI avoids races with an in-flight guard and abort on unmount.
- **Ingestion typed by format:** md/txt become one part; csv becomes one part per row; json extracts subdocuments. `source`/`partIndex`/`chunkIndex` metadata become `file.md#p0-c12` references in the chat sources.
- **Endpoint protection and observability:** per-IP rate limit (1 req / 3s), Zod body validation, and a payload cap; I write JSONL per turn (question, answer, distances, mode) to tune thresholds without guessing quality from UX alone.
