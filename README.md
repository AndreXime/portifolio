# Portfólio - André Ximenes

Portfólio pessoal desenvolvido com arquitetura híbrida (static + SSR) focado em performance máxima e conversão. Implementa otimizações agressivas de imagem, hidratação parcial de componentes e animações baseadas em Intersection Observer.

**Acesse:** [https://andreximenes.xyz](https://andreximenes.xyz)

## Stack

* **[Astro 5](https://astro.build/)** - SSG com output estático e SSR pontual para API routes
* **[Preact](https://preactjs.com/)** - Hidratação cliente com `client:visible` para reduzir bundle
* **[Tailwind CSS v4](https://tailwindcss.com/)** - Sistema de design via Vite plugin
* **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estrita end-to-end
* **[Nodemailer](https://nodemailer.com/)** - SMTP direto via Gmail em serverless function

## Features Técnicas

### Otimizações de Performance
- **Imagens**: Pipeline de conversão para WebP (70% qualidade) e resize para 800px na build
- **Hidratação Parcial**: JS carregado apenas quando componentes ficam visíveis (`client:visible`) para melhorar TTI e TBT
- **Reveal Animations**: Intersection Observer custom substituindo bibliotecas (AOS, Framer Motion) para reduzir bundle
- **Inline Stylesheets**: CSS crítico injetado no HTML para eliminar FOUC
- **Static Output**: Páginas estáticas servidas por CDN edge para performance extrema

### API de Contato
Endpoint SSR em `/api/contact.ts` com envio direto via SMTP do Gmail, sem dependência de serviços terceiros.

## Performance Metrics

- **Lighthouse Score**: 100/100/100/100 (Performance/Accessibility/Best Practices/SEO)
- **First Contentful Paint**: 0.9s
- **Largest Contentful Paint**: 0,9 s
- **Speed Index**: 0,9 s
- **Total Blocking Time**: 0 ms
- **Cumulative Layout Shift**: 0

## Arquitetura

```
src/
├── content/        # Data sources (projects, books, tech stack, social)
├── sections/       # Componentes de seção (Hero, Projects, Contact, etc.)
├── components/     # Componentes reutilizáveis (Reveal, UI primitives)
├── lib/            # Utilitários (otimização de imagens)
├── pages/
│   ├── index.astro    # SSG
│   └── api/
│       └── contact.ts # SSR
└── layout/         # Layout base com metadados SEO
```

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Gera output em dist/
npm run preview  # Preview da build local
```

### Variáveis de Ambiente

Crie `.env` na raiz para ativar o formulário de contato:

```env
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-app-password
```

> **Nota:** `EMAIL_PASS` deve ser uma App Password do Gmail, não a senha principal.
