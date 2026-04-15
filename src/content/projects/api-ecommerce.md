---
order: 0
title: "API para E-commerce"
shortDescription: "Construí uma API REST de e-commerce cobrindo autenticação, catálogo, carrinho, wishlist, pedidos e perfil. O foco foi manter segurança de sessão e consistência de validação/erros, com integrações típicas do domínio. A base segue uma arquitetura modular por casos de uso e contratos tipados com documentação OpenAPI."
tech: ["TypeScript", "Hono", "PostgreSQL", "Redis", "OpenAPI", "AWS SDK"]
imageUrl: "./images/api-ecommerce.webp"
link: "https://ecommerce-api.andreximenes.xyz"
github: "https://github.com/AndreXime/ecommerce-backend"
---

# Problema
O desafio foi implementar um backend de ecommerce que suportasse todo o ciclo de compra sem degradar segurança e consistência conforme o número de rotas e regras crescesse. Em especial, autenticação baseada em cookies tende a falhar em revogação de sessão, proteção contra CSRF e controle de permissões quando o sistema fica maior. Também havia a necessidade de padronizar validação e erros para reduzir divergências entre endpoints e facilitar evolução do contrato da API. Por fim, eu precisava de uma base operacional mínima (métricas e limites de requisição) para evitar pontos cegos em produção.

# Solução
Eu resolvi isso com um desenho modular centrado em casos de uso, separando camada HTTP, validação/contratos, lógica de negócio e persistência, mantendo o mesmo padrão estrutural em todos os recursos.

Padronizei um pipeline de middlewares para CORS, CSRF, autenticação com RBAC, rate limiting em Redis e tratamento global de erros, o que torna o comportamento transversal previsível. Na autenticação, usei access token de curta duração e refresh token persistido no banco, com revogação por blocklist no Redis e invalidação de sessões via versionamento para cobrir logout e reset de senha sem janelas de uso indevido.

Para infraestrutura, integrei PostgreSQL via ORM, filas com processamento assíncrono para tarefas de email, storage com URLs pré-assinadas e documentação OpenAPI gerada a partir dos schemas de validação.

## Destaques
- Arquitetura por **casos de uso** com contratos tipados e validação padronizada
- Pipeline de segurança com **CSRF**, **RBAC**, **rate limiting** (Redis) e erro global
- Sessão com **dual token**, revogação (JTI/blocklist) e **versionamento** de sessão
- Integrações de produção: **PostgreSQL**, filas assíncronas, **URLs pré-assinadas** e **OpenAPI**

# Impacto
O resultado foi um backend mais fácil de manter porque novas rotas seguem o mesmo contrato, a mesma validação e o mesmo fluxo de execução, reduzindo acoplamento e regressões. Em segurança, a combinação de dual token, revogação por JTI e versionamento de sessão diminui o risco de token reutilizável após eventos sensíveis e simplifica a governança de sessão. Operacionalmente, métricas no padrão Prometheus e visualização no Grafana deixam o comportamento HTTP observável e aceleram diagnóstico de incidentes. A arquitetura também escala de forma incremental, porque as preocupações transversais ficam centralizadas nos middlewares e as integrações externas ficam isoladas, permitindo evoluir domínio e regras sem reescrever a base.
