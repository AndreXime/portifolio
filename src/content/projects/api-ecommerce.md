---
order: 2
title: "API para E-commerce"
shortDescription: "API REST com Bun, Hono, Prisma e PostgreSQL — JWT com refresh, rate limit, filas e OpenAPI."
tech: ["TypeScript", "Hono", "AWS SDK", "PostgreSQL", "Open API"]
imageUrl: "./images/api-ecommerce.webp"
link: "https://ecommerce-api.andreximenes.xyz"
github: "https://github.com/AndreXime/ecommerce-backend"
---

## Visão geral

Construí a API REST de um e-commerce utilizando **Bun**, **Hono** e **Prisma** com **PostgreSQL**, abrangendo desde o catálogo com filtros até o fluxo completo de pedidos e carrinho persistido.

## Segurança e sessão

Implementei autenticação **JWT** com refresh tokens em cookies **HttpOnly**, reforçando a segurança com controle de acesso por cargos e revogação imediata no logout via blocklist de JTI no **Redis**.

## Resiliência e integrações

- rate limiting dinâmico
- processamento assíncrono com **BullMQ**
- uploads com **AWS S3**

## Qualidade e contratos

Estruturei o código em uma arquitetura modular validada com **Zod**, garantindo tipagem de ponta a ponta no **TypeScript** e geração automatizada dos contratos na documentação **OpenAPI**.

