---
order: 1
title: "E-commerce de Eletrônicos"
shortDescription: "Construí um e-commerce com catálogo, carrinho, checkout, autenticação e área administrativa. O foco foi otimizar carregamento inicial e SEO sem abrir mão de interatividade e sessão. A base combina páginas renderizadas com ilhas de UI, estado global e uma camada de serviço unificada (inclui modo demo)."
tech: ["TypeScript", "Astro", "Preact", "TailwindCSS", "Islands Architecture", "SSR"]
imageUrl: "./images/ecommerce.webp"
link: "https://ecommerce.andreximenes.xyz/"
github: "https://github.com/AndreXime/ecommerce"
---

# Problema
Eu precisava de um e-commerce que fosse rápido no primeiro carregamento e que mantivesse boa indexação, mas que ainda suportasse interações típicas de compra, como carrinho e checkout. Além disso, a aplicação exigia autenticação com sessão e proteção de rotas, incluindo diferenças de permissão para a área administrativa. O desafio foi evitar o custo arquitetural de uma SPA inteira sem perder consistência de estado e previsibilidade de dados no cliente e no servidor. Também era necessário ter um ambiente funcional mesmo sem backend pronto, para validar o fluxo completo e a UI com dados coerentes.

# Solução
Eu implementei uma arquitetura com páginas renderizadas pelo framework e componentes interativos isolados onde a experiência exigia estado e eventos no cliente. Para manter consistência, usei stores para estado global e sincronização entre componentes, evitando acoplamento entre telas e reduzindo prop drilling.

Centralizei o acesso a dados em uma camada de serviço com tipagem, padronização de respostas e tratamento de erros, incluindo retry automático após renovação de sessão em casos de expiração.

Em modo demo, a API é simulada com regras de autenticação/autorização, persistência local e sincronização via cookies e eventos, mantendo o contrato de endpoints idêntico ao de um backend real.

## Destaques
- Páginas **SSR** com **ilhas interativas** só onde há estado/eventos
- **Stores** para estado global e sincronização entre componentes sem prop drilling
- Camada de serviço tipada com tratamento de erro e **retry** após renovar sessão
- **Modo demo** com API simulada e contrato idêntico ao backend real

# Impacto
Com essa abordagem, eu obtive carregamento inicial mais leve e melhor previsibilidade de performance, porque a maior parte do conteúdo é entregue como HTML e só hidrata o que precisa de interação. O sistema ficou mais manutenível por separar claramente UI, estado e acesso a dados, com contratos tipados e pontos únicos para regras de sessão e erros. O modo demo permitiu evoluir UI e fluxos de negócio sem bloquear o desenvolvimento por dependências externas, e ainda preservou o caminho de migração para um backend real via configuração. A experiência de usuário ficou mais resiliente, já que falhas de sessão são tratadas de forma automática e consistente antes de propagar erro para as telas.
