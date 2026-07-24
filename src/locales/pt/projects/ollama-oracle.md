---
order: 2
title: "Chat corporativo com RAG local: políticas indexadas sem ir para a nuvem"
shortDescription: "Eu construí um chatbot corporativo com RAG local para consultar políticas e runbooks sem enviar a base a APIs externas. Usei Bun, Hono, React, Ollama e Chroma, com retrieval híbrido (vetorial mais fallback lexical) e streaming NDJSON com cancelamento. O histórico fica desligado por padrão para não poluir o embed em modelos pequenos."
tech: ["Bun", "Hono", "React", "Ollama", "ChromaDB", "LangChain"]
imageUrl: "../../../content/images/projects/ollama-oracle.png"
github: "https://github.com/AndreXime/ollama-oracle"
---

## Contexto técnico

Eu modelei um monorepo Bun com workspaces: API Hono em TypeScript e UI React (Vite) servida pelo mesmo processo em produção. Escolhi Ollama e Chroma em Docker Compose para manter embeddings e geração no ambiente local, alinhado à regra de negócio de não expor a base corporativa a provedores externos. O pipeline separa ingestão one-shot (recria a coleção, parte→chunk, batches com concorrência limitada) do runtime de chat, com health live/ready que valida modelos no Ollama e existência da coleção no Chroma antes de marcar a app pronta.

## Desafios de engenharia (como e por quê)

- **Retrieval com portões de distância:** recupero mais candidatos do que cabem no prompt, filtro por distância máxima por trecho e por distância do melhor match. Se o melhor embedding fica fraco demais, desligo o RAG puro em vez de forçar contexto irrelevante no modelo pequeno.
- **Fallback lexical quando o vetor falha:** se a similaridade não passa no limiar, reavalio os candidatos por overlap de tokens (com prune dos matches fracos) e só então monto o prompt. Assim perguntas com vocabulário institucional ainda recuperam trechos úteis sem afrouxar o filtro vetorial de forma permanente.
- **Modos de turno e anti-alucinação:** distingo rag, lexical_fallback, conversacional e limitação. Saudação vai pelo prompt conversacional; pergunta de negócio sem chunks bons devolve mensagem fixa pedindo reformulação, em vez de deixar o LLM inventar política.
- **Stream NDJSON com abort no disconnect:** o endpoint emite ping, deltas e done com fontes; no abort do cliente corto o AbortController do Ollama sem evento de erro. A UI cancela o fetch anterior ao enviar nova pergunta, evitando corrida de respostas.
- **Ingestão tipada por formato:** md/txt viram uma parte; csv vira uma parte por linha; json extrai subdocumentos. Metadados `source`/`partIndex`/`chunkIndex` viram referências `arquivo.md#p0-c12` nas fontes do chat.
- **Proteção do endpoint e observabilidade:** rate limit por IP (1 req / 3s), validação Zod do body e teto de payload; gravo JSONL por turno (pergunta, resposta, distâncias, modo) para afinar limiares sem adivinhar qualidade só pelo UX.
