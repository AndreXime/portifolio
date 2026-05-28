---
order: 0
title: "Plataforma de recrutamento multi-tenant: do site de carreiras ao pipeline auditável"
shortDescription: "Construí um ATS multi-tenant de ponta a ponta em TypeScript, com NestJS na API e Next.js (React) no produto: empresas operam em isolamento lógico por tenant, enquanto o candidato mantém um perfil único que atravessa todas as candidaturas. O diferencial técnico está na combinação de máquinas de estado explícitas (vagas e candidaturas), pipeline customizável por vaga com auditoria, e uma segunda linha de defesa no acesso a dados via contexto de tenant e extensão do Prisma sobre PostgreSQL, além de upload direto para armazenamento objeto com URLs pré-assinadas e validação de domínio nos use cases."
cardTagline: "ATS multi-tenant · NestJS · deploy em produção"
featured: true
tech: ["TypeScript", "NestJS", "Next.js", "Prisma", "PostgreSQL", "Zod"]
imageUrl: "./images/deploy-talent.png"
featuredImageUrl: "./images/deploy-talent-vertical.png"
link: "https://deploy-talent.andreximenes.xyz"
github: "https://github.com/AndreXime/deploy-talent"
---

## Contexto técnico 
Modelei o produto como um monólito modular bem delimitado: uma API **NestJS** expõe o domínio em casos de uso, com **JWT + RBAC** e validação de entrada consistente; o front é **Next.js** com **React**, consumindo a API com contratos tipados e formulários/validação guiados por **Zod**, e **TanStack Query** para orquestrar estado de servidor. Persistência com **Prisma** e **PostgreSQL** em esquema compartilhado: troquei o custo operacional de *database-per-tenant* pela exigência de **disciplina de engenharia** em todo acesso (use cases + invariantes + constraints). O candidato não é “um perfil por empresa”: tratei **1 usuário → 1 perfil global**, o que simplifica UX e consistência, mas exige regras claras de anonimização (estilo LGPD) sem destruir o rastro operacional do processo seletivo.

Para multi-tenant, fixei o tenant nas rotas B2B a partir do **próprio token** (evitando trust em header solto) e propaguei o contexto em **armazenamento assíncrono local**; em paralelo, estendi o client **Prisma** para aplicar filtro/injeção de `tenantId` em agregados sensíveis, como rede de segurança quando algum caminho esquecer o filtro; um trade-off consciente: mais “RLS em aplicação” do que apenas “confio no controller”. Para mídia, padronizei **URLs pré-assinadas** (upload direto do browser para armazenamento compatível com S3) e persistência só da **chave do objeto**, reduzindo superfície na API e custo de egress interno. E-mail transacional foi tratado como **melhor esforço**: falha de envio não deve reverter contratação/rejeição/candidatura; o domínio ganha resiliência percebida, com risco gerido por observabilidade e políticas de retentativa no entorno.

## Desafios de engenharia (como e por quê)
- **Dois eixos de workflow na candidatura**: separei movimento de **status macro** (ex.: contratado, rejeitado) do avanço de **etapas configuráveis** (questionário, upload, link de entrevista), cada um com histórico; isso evita misturar “estado do negócio” com “UX do processo” e mantém evolução do produto menos acoplada.  
- **Pipeline versionado por vaga**: clonei template do tenant para estágios da vaga no momento da criação, congelando o desenho após publicação; o trade-off é não retroagir mudanças em vagas antigas, em troca de previsibilidade para recrutadores e candidatos.  
- **Onboarding B2B sem senha definida por terceiros**: convites com token opaco entregue fora da banda, persistindo apenas **digest** no banco; se o envio falhar, revogo o convite para não deixar token “ativo” sem entrega, uma decisão de segurança que fecha uma classe comum de inconsistência operacional.  
- **Sourcing por e-mail como máquina de decisão**: o mesmo endpoint distingue convite de cadastro, envio de link público da vaga e curto-circuito quando já existe candidatura; isso reduz suporte e estados fantasmas no pipeline.  
- **Exposição pública controlada**: site por empresa e marketplace agregado reutilizam endpoints públicos com regras de visibilidade de vaga (rascunho não vaza), mantendo a mesma base de domínio da área logada.  
- **Operação e CI**: health com **liveness** sem dependências e **readiness** checando **PostgreSQL**; pipeline de integração separando API (testes + build + geração Prisma) e Web (checagem + build), alinhado a escala de time e falhas localizadas.