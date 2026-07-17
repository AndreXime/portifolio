---
order: 1
title: "Ecommerce full stack: API Hono, loja Astro e domínio de pedidos"
shortDescription: "Construí um ecommerce full stack em monorepo: API REST em Hono (Bun), loja SSR em Astro e persistência em PostgreSQL com Prisma e Redis. O núcleo são sessão com JWT em cookies e refresh, pedidos em transação com estoque condicional, RBAC vitrine/admin e contrato OpenAPI com Zod. A API já fecha pedidos; o checkout na loja ainda evolui na camada de apresentação."
tech: ["TypeScript", "Hono", "PostgreSQL", "Redis", "OpenAPI", "AWS SDK"]
imageUrl: "../../images/projects/ecommerce.png"
link: "https://ecommerce.andreximenes.xyz"
github: "https://github.com/AndreXime/ecommerce"
---

### Contexto técnico

Eu tratei o projeto como **dois deployables** no mesmo repositório: uma **API em Hono** e uma **loja em Astro**, compartilhando um contrato HTTP explícito. No backend, **Zod** não só valida entrada e saída como alimenta a **especificação OpenAPI**, o que reduz divergência entre documentação e comportamento real e barateia evoluções de cliente (web ou ferramentas de teste).

Escolhi **Bun** como runtime pela simplicidade de desenvolvimento e build, e **Hono** pela composição de middlewares (CORS com credenciais, cabeçalhos de segurança, limitação de taxa global e mais restrita em autenticação) sem carregar um framework monolítico. **PostgreSQL** com **Prisma** concentra o modelo relacional (usuário, carrinho, pedido, tokens de refresh, catálogo); **Redis** aparece como **cache de revogação** de access token e como **backbone de filas** para e-mail e rotinas como carrinho abandonado. Para mídia de produto, o fluxo de admin passa por **URLs pré-assinadas** em **armazenamento objeto compatível com S3**, o que tira upload pesado do processo da API e mantém o bucket como fronteira clara de infraestrutura.

No front, **Astro** faz o trabalho de **SSR** nas vitrines e listagens (SEO e primeiro paint estável) e delega interatividade a **Preact** onde o estado muda no browser; **Tailwind** centraliza o design system. O trade-off consciente foi **cookies HttpOnly** em vez de guardar tokens em armazenamento acessível ao script da página: a web precisa sempre enviar **`credentials`**, repassar **Cookie** no SSR e tratar **401** com fluxo de **refresh** centralizado. Isso aumenta um pouco a complexidade de integração, mas alinha segurança e modelo de sessão com o navegador moderno.

### Desafios de engenharia (como e por quê)

- **Pedido como unidade atômica:** consolidei criação de pedido em **transação de banco**: carregamento de produtos e opções, validação de variante, **snapshot** de preço e imagem nos itens, **decremento de estoque só quando há quantidade suficiente** (`updateMany` condicional) e ajuste de flags de disponibilidade, com esvaziamento do carrinho quando a origem é o carrinho ativo. Isso evita estado inconsistente sob concorrência moderada sem espalhar locks na aplicação.

- **Sessão com revogação real:** além de **refresh token** persistido e rotação lógica no login, usei **blocklist em Redis** por JTI do access token até o TTL natural e **versão de sessão** após troca de senha para invalidar tokens antigos. O objetivo é que logout e incidentes de credencial tenham efeito antes do access expirar sozinho.

- **Integração Astro e API sem “dois mundos”:** no SSR, as chamadas repassam o header de cookie para o backend; no cliente, um cliente HTTP único aplica **`credentials: include`**, trata erros de validação de forma uniforme e **serializa refresh** para não disparar corridas de renovação. Isso mantém a mesma semântica de sessão em páginas estáticas e ilhas interativas.

- **Operação e observabilidade desde o ambiente local:** subi **PostgreSQL**, **Redis**, fila de e-mail para desenvolvimento, **Prometheus** e **Grafana** via **Compose**, com **emulador de serviços de nuvem** para o fluxo de armazenamento. Na API, há verificação de dependências na subida, **retry com backoff** na conexão com o banco e endpoint de **métricas** para acompanhar saúde e throughput em ambientes próximos de produção.

- **Painel admin e uploads:** o gate de **`/admin`** usa uma chamada autorizada à listagem restrita de usuários; uploads passam pelo fluxo pré-assinado para não expor segredos de infraestrutura ao browser e para desacoplar largura de banda da compute da API.

- **Limite conhecido tratado como fronteira de produto:** o checkout na web hoje fecha o fluxo na camada de apresentação enquanto a **API já implementa `POST /orders`** com as regras de estoque. Eu documentei essa separação de propósito: prioriza contrato e domínio estáveis antes de acoplar o botão final do wizard ao fechamento, o que evita “meio checkout” que quebra pedido sob carga.

