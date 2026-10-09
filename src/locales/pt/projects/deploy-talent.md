---
order: 1
experimental: true
title: "Plataforma de recrutamento multi-tenant: do site de carreiras ao pipeline auditável"
shortDescription: "Lab de um ATS multi-tenant em TypeScript para exercitar domínio de recrutamento de ponta a ponta. Empresas operam em isolamento lógico por tenant, e o candidato mantém um perfil único que atravessa as candidaturas. O foco está em máquinas de estado, pipeline por vaga com auditoria e defesa em profundidade no acesso a dados com Prisma sobre PostgreSQL. API em NestJS, produto em Next.js, uploads pré-assinados e site de carreiras público no mesmo desenho."
tech: ["TypeScript", "NestJS", "Next.js", "Prisma", "PostgreSQL", "TanStack Query"]
imageUrl: "../../../assets/projects/deploy-talent.png"
featuredImageUrl: "../../../assets/projects/deploy-talent-mobile.png"
link: "https://deploy-talent.andreximenes.xyz"
github: "https://github.com/AndreXime/deploy-talent"
---

## Contexto técnico
Modelei o produto como um monólito modular bem delimitado: uma API **NestJS** expõe o domínio em casos de uso, com **JWT + RBAC** e validação de entrada consistente; o front é **Next.js** com **React**, consumindo a API com contratos TypeScript e **TanStack Query** para orquestrar estado de servidor. Persistência com **Prisma** e **PostgreSQL** em esquema compartilhado: troquei o custo operacional de *database-per-tenant* pela exigência de **disciplina de engenharia** em todo acesso (use cases + invariantes + constraints). O candidato não é “um perfil por empresa”: tratei **1 usuário → 1 perfil global**, o que simplifica UX e consistência, mas exige regras claras de anonimização (estilo LGPD) sem destruir o rastro operacional do processo seletivo.

Para multi-tenant, fixei o tenant nas rotas B2B a partir do **próprio token** (evitando trust em header solto) e propaguei o contexto na request; em paralelo, estendi o client **Prisma** para aplicar filtro/injeção de `tenantId` em agregados sensíveis, como rede de segurança quando algum caminho esquecer o filtro. O trade-off é explícito: shared database com RLS em aplicação, em vez de database-per-tenant. Para mídia, padronizei **URLs pré-assinadas** (upload direto do browser para armazenamento compatível com S3) e persistência só da **chave do objeto**, reduzindo superfície na API e custo de egress interno. E-mail transacional foi tratado como **melhor esforço**: falha de envio vira log e não reverte contratação, rejeição ou candidatura.

## Desafios de engenharia (como e por quê)
- **Dois eixos de workflow na candidatura**: separei movimento de **status macro** (ex.: contratado, rejeitado) do avanço de **etapas configuráveis** (questionário, upload, link de entrevista), cada um com histórico; isso evita misturar “estado do negócio” com “UX do processo” e mantém evolução do produto menos acoplada.
- **Snapshot do pipeline por vaga**: clonei o template do tenant para os estágios no momento da criação e congelo o desenho após a publicação; o trade-off é não retroagir mudanças em vagas antigas, em troca de previsibilidade para recrutadores e candidatos.
- **Onboarding B2B sem senha definida por terceiros**: convites com token opaco entregue fora da banda, persistindo apenas o hash no banco; se o envio falhar, revogo o convite para não deixar token ativo sem entrega.
- **Sourcing por e-mail como máquina de outcomes**: o mesmo endpoint decide entre convite de cadastro, envio de link público da vaga e curto-circuito quando já existe candidatura; não cria candidatura “sourced”, só escolhe o próximo passo. Isso reduz suporte e estados fantasmas.
- **Exposição pública controlada**: site por empresa e marketplace agregado reutilizam endpoints públicos com regras de visibilidade de vaga (rascunho não vaza), mantendo a mesma base de domínio da área logada.
- **Operação e CI**: health com **liveness** sem dependências e **readiness** checando **PostgreSQL**; pipeline de integração separando API (testes + build + geração Prisma) e Web (checagem + build), alinhado a escala de time e falhas localizadas.
