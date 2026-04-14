---
order: 4
title: "Ollama Oracle: chat corporativo com RAG local"
shortDescription: "Pipeline RAG local com Ollama, ChromaDB e ingestão de documentos — sem mandar dados sensíveis pra nuvem."
tech: ["TypeScript", "Bun", "Ollama", "ChromaDB", "RAG", "LangChain"]
imageUrl: "./images/ollama-oracle.webp"
link: ""
github: "https://github.com/AndreXime/ollama-oracle"
---

## Objetivo

Desenvolvi esse projeto para experimentar um assistente orientado a documentos internos, com pipeline completo de **RAG** rodando de ponta a ponta na minha máquina.

## Pipeline

Ingestão de arquivos, embeddings e busca vetorial no **ChromaDB**, respostas em streaming via **Ollama**.

## Aprendizado

O objetivo foi dominar o fluxo ingestão → vetor → recuperação → **LLM** sem depender de serviços externos para os dados sensíveis.

