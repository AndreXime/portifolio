---
order: 2
experimental: true
title: "Ecommerce full stack: API Hono, loja Astro e domínio de pedidos"
shortDescription: "Lab full stack de ecommerce em monorepo para exercitar API, vitrine e domínio de pedidos juntos. API REST em Hono (Bun), loja SSR em Astro e persistência em PostgreSQL com Prisma e Redis. O núcleo cobre sessão JWT em cookies com refresh, pedido atômico com estoque, frete por CEP e contrato OpenAPI com Zod. A loja já cria pedidos de verdade; o pagamento ainda é simulado na apresentação."
tech: ["TypeScript", "Hono", "Astro", "PostgreSQL", "Redis", "Prisma"]
imageUrl: "../../../assets/projects/ecommerce.png"
link: "https://ecommerce.andreximenes.xyz"
github: "https://github.com/AndreXime/ecommerce"
---

## Contexto técnico

Eu tratei o projeto como dois deployables no mesmo repositório: uma API em Hono e uma loja em Astro, compartilhando um contrato HTTP explícito. No backend, Zod valida entrada e saída e alimenta a especificação OpenAPI, o que reduz divergência entre documentação e comportamento real. Escolhi Bun como runtime pela simplicidade de desenvolvimento e build, e Hono pela composição de middlewares (CORS com credenciais, cabeçalhos de segurança, limitação de taxa) sem carregar um framework monolítico. PostgreSQL com Prisma concentra o modelo relacional; Redis aparece como cache de revogação de access token e como backbone de filas BullMQ para e-mail e rotinas como carrinho abandonado. Para mídia de produto, o fluxo de admin passa por URLs pré-assinadas em armazenamento objeto compatível com S3.

No front, Astro faz SSR nas vitrines e listagens e delega interatividade a Preact onde o estado muda no browser. O trade-off consciente foi cookies HttpOnly em vez de guardar tokens em armazenamento acessível ao script da página: a web precisa sempre enviar credentials, repassar Cookie no SSR e tratar 401 com fluxo de refresh centralizado. Isso aumenta um pouco a complexidade de integração, mas alinha segurança e modelo de sessão com o navegador moderno.

## Desafios de engenharia (como e por quê)

- **Pedido como unidade atômica:** consolidei criação de pedido em transação de banco: carregamento de produtos e opções, validação de variante, snapshot de preço e imagem nos itens, decremento de estoque só quando há quantidade suficiente (`updateMany` condicional) e ajuste de flags de disponibilidade, com esvaziamento do carrinho quando a origem é o carrinho ativo. A loja chama essa API no checkout; o que ainda é cosmético é a UI de pagamento (card/pix/boleto sem gateway).
- **Frete e cotação por CEP:** o domínio cobre transportadoras, métodos, peso e cotação a partir do CEP, com o valor entrando no pedido. Isso completa o caminho até o fechamento sem fingir que frete é só um campo estático.
- **Sessão com revogação real:** além de refresh token persistido e rotação lógica no login, usei blocklist em Redis por JTI do access token até o TTL natural e versão de sessão no reset de senha para invalidar tokens antigos. O objetivo é que logout e recuperação de credencial tenham efeito antes do access expirar sozinho.
- **Integração Astro e API sem “dois mundos”:** no SSR, as chamadas repassam o header de cookie para o backend; no cliente, um cliente HTTP único aplica `credentials: include`, trata erros de validação de forma uniforme e serializa refresh para não disparar corridas de renovação. Isso mantém a mesma semântica de sessão em páginas estáticas e ilhas interativas.
- **Ambiente local reproduzível:** subi PostgreSQL, Redis, Mailpit e MinIO via Compose. Na API, há verificação de dependências na subida, retry com backoff na conexão com o banco e health check para acompanhar a saúde do processo.
- **Painel admin e uploads:** o gate de `/admin` usa uma chamada autorizada à listagem restrita de usuários; uploads passam pelo fluxo pré-assinado para não expor segredos de infraestrutura ao browser e para desacoplar largura de banda da compute da API.
