---
order: 4
experimental: true
title: "API de mocks para prototipar UIs: CSV no SQLite, filtros e contratos OpenAPI"
shortDescription: "Lab de API pública de mocks com datasets prontos (produtos, CEPs, filmes e mais) para prototipar frontends sem backend real. O núcleo é Hono no Bun com cache SQLite alimentado pelos arquivos em data/. Tem filtros, busca e sort em SQL, OpenAPI tipado, mutações fake e auth mock. A reimportação só roda no boot quando o manifesto muda, sem watch em runtime."
tech: ["Bun", "Hono", "SQLite", "Zod", "OpenAPI", "Docker"]
imageUrl: "../../../assets/projects/mocke.png"
github: "https://github.com/AndreXime/mocke"
---

## Contexto técnico

Modelei o Mockê como monólito modular em Bun: cada dataset (produtos, CEPs, notícias, filmes, usuários, empresas) é um módulo com listagem paginada, get por id, página HTML de docs e tag OpenAPI. Escolhi Hono com rotas tipadas e Zod porque o contrato HTTP precisa bater com os arquivos em `data/` (CSV e JSON) sem um backend de domínio real. Os arquivos viram tabelas TEXT no SQLite no boot; a API consulta com SQL em vez de manter dezenas de milhares de linhas em memória. CORS aberto para GET, headers de segurança, rate limit por IP e `/health`/`/ready` fecham o caminho para Docker atrás de proxy. Além da leitura, há mutações fake não persistentes e um auth mock para exercitar fluxos de login no front.

## Desafios de engenharia (como e por quê)

- **Sync atômico por manifesto:** no boot, hasheio nome|tamanho|mtime dos arquivos em `data/` e comparo com `_meta` no SQLite. Se mudou, importo em arquivo temporário com checkpoint WAL e faço rename; se o rebuild falha e já existia cache válido, mantenho o anterior.
- **Listagem rica em SQL:** params de paginação, busca, sort e projeção ficam reservados; qualquer outro query param que exista no dataset vira igualdade, com vírgulas como OR e match em células multi-valor. Campos desconhecidos são ignorados para não quebrar clientes exploratórios.
- **Contratos validados no boot:** schemas Zod no catálogo amostram até 100 linhas e falham o processo se o arquivo não tiver os campos prometidos ou se a amostra não parsear, evitando servir JSON inconsistente.
- **Módulos espelhados, query compartilhada:** adicionar recurso é arquivo em `data/`, rotas Zod, docs HTML e registro no catálogo; listagem e get reutilizam a mesma camada SQL, sem factory genérica de rotas tipadas.
- **Rate limit por IP:** janela fixa em memória; o IP vem do primeiro hop de `X-Forwarded-For` quando existe, senão do socket. Não há flag de proxy confiável: o header é aceito se estiver presente.
- **Readiness no container:** o Docker usa multi-stage Bun, volume opcional de `.cache` e HEALTHCHECK em `/ready`, que exige SQLite respondendo e todos os datasets do contrato presentes, com start-period longo o bastante para a primeira importação.
