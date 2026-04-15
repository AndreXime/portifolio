---
order: 2
title: "Ollama Oracle: chat corporativo com RAG local"
shortDescription: "Construí um chatbot corporativo com RAG 100% local para responder perguntas usando uma base interna de documentos. O foco foi oferecer consulta rastreável com fontes, sem depender de serviços externos. A base inclui ingestão, indexação vetorial e geração local com streaming e controles de qualidade no retrieval."
tech: ["TypeScript", "Bun", "Ollama", "ChromaDB", "LangChain", "RAG"]
imageUrl: "./images/ollama-oracle.webp"
github: "https://github.com/AndreXime/ollama-oracle"
---

## Problema
Eu precisava disponibilizar conhecimento interno em formato de conversa, mas sem abrir mão de privacidade e previsibilidade de custo, evitando dependência de APIs externas. O conteúdo estava espalhado em textos e registros estruturados, o que exigia uma forma consistente de transformar isso em contexto recuperável. Além disso, era importante reduzir respostas “inventadas” e conseguir justificar a resposta com referências ao material usado. Por fim, eu precisava de uma experiência de uso responsiva, com resposta incremental, sem travar a interface em consultas mais longas.

## Solução
Eu implementei um pipeline de ingestão que varre documentos, normaliza formatos comuns e divide o conteúdo em trechos com sobreposição para melhorar a recuperação. Esses trechos são vetorizados por um modelo local de embeddings e persistidos em um banco vetorial, permitindo busca por similaridade com score.

No runtime do chat, eu aplico filtros por distância e limites de contexto para controlar ruído, além de deduplicar trechos repetidos antes de montar o prompt. A resposta é gerada por um modelo local e entregue via streaming em eventos, com cancelamento automático quando o cliente desconecta para evitar trabalho desnecessário.

## Impacto
Na prática, o sistema passou a responder com base em evidências do conteúdo indexado, reduzindo alucinações e tornando a saída mais auditável por meio de fontes. A separação entre ingestão, retrieval e geração deixou ajustes de qualidade e desempenho concentrados em parâmetros, sem reescrever o fluxo principal. O streaming melhorou a latência percebida e a rotina de abort em desconexões evitou desperdício de CPU e filas no modelo local. O resultado foi uma base conversacional que escala por volume de documentos com reindexação repetível e manutenção simples, já que cada integração crítica fica isolada e testável por comportamento.

