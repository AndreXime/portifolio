---
order: 3
title: "E-commerce de Eletrônicos"
shortDescription: "Front com Astro SSR, Preact e Tailwind; estado com Nanostores, cookies no SSR e refresh token robusto."
tech: ["TypeScript", "Next.js", "React", "UX/UI", "TailwindCSS"]
imageUrl: "./images/ecommerce.webp"
link: "https://ecommerce.andreximenes.xyz/"
github: "https://github.com/AndreXime/ecommerce"
---

## Contexto

Desenvolvi o front-end de um e-commerce consumindo uma API REST externa, utilizando **Astro** para SSR, **TypeScript**, **Preact** e **Tailwind CSS**.

## Performance

Priorizei a otimização de bundle e os **Core Web Vitals** ao gerenciar o estado global com **Nanostores** e entregar ao cliente apenas o JavaScript necessário por rota.

## Integração e auth

Construí a camada de integração repassando cookies durante a renderização no servidor em prol do **SEO** e implementei um fluxo robusto de refresh token com deduplicação de interceptadores para erros **401**.

## Jornada do produto

Estruturei toda a jornada funcional da aplicação, abrangendo carrinho reativo, checkout em três etapas, área do cliente e um painel administrativo com paginação e busca sob demanda.

