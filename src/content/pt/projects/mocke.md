---
order: 3
title: "API de mocks para prototipar UIs: CSV no SQLite, filtros e contratos OpenAPI"
shortDescription: "Eu construí o Mockê, uma API pública de mocks com datasets prontos (produtos, CEPs, filmes e mais) para prototipar frontends sem backend real. O núcleo é Hono no Bun com cache SQLite: sync atômico por hash do manifesto em data/, filtros SQL por campo e OpenAPI tipado. A reimportação ocorre só no boot quando os CSVs mudam; não há watch em runtime."
tech: ["Bun", "Hono", "SQLite", "Zod", "OpenAPI", "Docker"]
imageUrl: "../../images/projects/mocke.png"
github: "https://github.com/AndreXime/mocke"
---

## Contexto técnico

Modelei o Mockê como monólito modular em Bun: cada dataset (produtos, CEPs, notícias, filmes, usuários, empresas) é um módulo com listagem paginada, get por id, página HTML de docs e tag OpenAPI. Escolhi Hono com rotas tipadas e Zod porque o contrato HTTP precisa bater com os CSVs em `data/` sem um backend de domínio real. Os arquivos viram tabelas TEXT no SQLite no boot; a API consulta com SQL em vez de manter dezenas de milhares de linhas em memória. CORS aberto e headers de segurança ajustados para consumo direto do browser; rate limit por IP e `/health`/`/ready` fecham o caminho para Docker atrás de proxy.

## Desafios de engenharia (como e por quê)

- **Sync atômico por manifesto:** no boot, hasheio nome|tamanho|mtime dos arquivos em `data/` e comparo com `_meta` no SQLite. Se mudou, importo em arquivo temporário com checkpoint WAL e faço rename; se o rebuild falha e já existia cache válido, mantenho o anterior.
- **Filtros genéricos em SQL:** `page`/`limit` são reservados; qualquer outro query param que exista no dataset vira igualdade, com vírgulas como OR e match em células multi-valor (ex.: gêneros). Campos desconhecidos são ignorados para não quebrar clientes exploratórios.
- **Contratos validados no boot:** schemas Zod no catálogo amostram até 100 linhas e falham o processo se o CSV não tiver os campos prometidos ou se a amostra não parsear, evitando servir JSON inconsistente.
- **Módulos espelhados, query compartilhada:** adicionar recurso é CSV em `data/`, rotas Zod, docs HTML e registro no catálogo; listagem e get reutilizam a mesma camada SQL, sem factory genérica de rotas tipadas.
- **Rate limit consciente de proxy:** janela fixa em memória por IP do socket; `TRUST_PROXY` só liga o primeiro hop de `X-Forwarded-For` quando há proxy confiável, para não aceitar spoof do header.
- **Readiness no container:** o Docker usa multi-stage Bun, volume opcional de `.cache` e HEALTHCHECK em `/ready`, que exige SQLite respondendo e todos os datasets do contrato presentes, com start-period longo o bastante para a primeira importação.