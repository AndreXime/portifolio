# Portfólio - André Ximenes

Portfólio pessoal em Astro com foco em performance, legibilidade e conversão. O visual segue uma direção **editorial / Swiss**: fundo claro, tipografia forte (IBM Plex Sans, Source Serif 4, JetBrains Mono), grid com bordas finas e accent laranja. Interações em **JavaScript nativo**, sem frameworks de UI e sem ilhas.

**Acesse:** [https://andreximenes.xyz](https://andreximenes.xyz)

## Stack

- **[Astro](https://astro.build/)** - SSG com adapter Vercel e rota de API para contato
- **[Tailwind CSS](https://tailwindcss.com/)** v4 - Tokens e utilitários via plugin Vite
- **[TypeScript](https://www.typescriptlang.org/)** - `strictest` + `@astrojs/check`
- **[Biome](https://biomejs.dev/)** - Lint e formatação
- **[Nodemailer](https://nodemailer.com/)** - SMTP (Gmail) na função serverless de contato
- **Content Collections** - Projetos, experiências, formações e tecnologias tipados
- **[@fontsource](https://fontsource.org/)** - Fontes self-hosted com preload acima da dobra
- **[astro-icon](https://www.astroicon.dev/)** + Simple Icons - Ícones de stack e redes

## Features técnicas

- **Imagens**: `astro:assets` (WebP, lazy load, `sizes` adequados)
- **Fontes**: pesos alinhados ao markup; preload só no primeiro paint
- **JS mínimo**: modal de projetos, “ver mais”, nav drawer, scroll spy, formulário de contato
- **Reveal**: `IntersectionObserver` próprio, respeita `prefers-reduced-motion`
- **CSS crítico**: `inlineStylesheets: "always"` no build
- **SEO**: sitemap, JSON-LD, OG estática
- **Contato**: `POST /api/contact` com validação, honeypot, rate limit e envio SMTP

## Performance

Lighthouse em produção: **~100** em Performance, Accessibility, Best Practices e SEO.

## Estrutura

```
src/
├── content/           # Collections + site.ts, experiences, formations, technologies
├── components/
│   ├── layout/        # Header, Footer
│   ├── sections/      # Hero, About, Experiences, Projects, Technologies, Formations, Contact
│   └── ui/            # Button, Container, Input, Reveal, AccentBar, ícones
├── scripts/           # JS nativo (nav, reveal, projetos, contato)
├── styles/            # global.css (tokens), fonts.ts (preload + @fontsource)
├── layouts/           # Layout base + meta/SEO
└── pages/
    ├── index.astro
    ├── 404.astro
    ├── og-image/      # Template para captura da OG
    └── api/
        └── contact.ts # prerender: false (serverless na Vercel)
```

Na raiz: `generate-og.js` (Playwright) gera `public/og-image.png`.

## Desenvolvimento

```bash
npm install
npm run dev          # http://localhost:4321
npm run build
npm run preview
npm run check        # biome + astro check
npm run format       # biome --write
npm run generate-og  # regenera public/og-image.png
```

O hook `pre-commit` (Husky) roda `format` e `check` nos arquivos em stage.

## Variáveis de ambiente

Crie `.env` na raiz para o formulário de contato em dev/preview e na Vercel em produção:

```env
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-app-password
```

`EMAIL_PASS` deve ser uma **App Password** do Gmail, não a senha da conta.
