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
- **SEO**: sitemap com i18n, JSON-LD, OG estática, `hreflang`
- **i18n**: PT em `/`, EN em `/en` (ver seção abaixo)
- **Contato**: `POST /api/contact` com validação, honeypot, rate limit e envio SMTP

## Internacionalização (i18n)

Astro i18n nativo com `defaultLocale: "pt"` e `prefixDefaultLocale: false`:

| Locale | URL |
|--------|-----|
| Português | `/`, `/projetos/[slug]` |
| Inglês | `/en`, `/en/projetos/[slug]` |

**Conteúdo e UI**
- Markdown por locale em `src/content/pt/` e `src/content/en/`
- Strings de interface em `src/i18n/locales/{pt,en}.ts`
- Helpers em `src/i18n/` (`paths`, `context`); pages montam o contexto e passam props às sections

**Redirect na raiz (`middleware.ts` na raiz, Vercel Routing Middleware)**  
Roda na edge **antes do CDN**. Só age em `/`. Visitantes vão para `/en` por padrão; ficam em PT só com cookie `PREFERRED_LOCALE=pt` ou `Accept-Language` em português. Bots não são redirecionados (veem `/` em PT). O seletor PT|EN no header grava o cookie.

**SEO**: `hreflang` + `x-default`, canonical por locale, sitemap bilíngue.

## Performance

Lighthouse em produção: **~100** em Performance, Accessibility, Best Practices e SEO.

## Estrutura

```
src/
├── content/
│   ├── pt/            # Collections em português
│   ├── en/            # Collections em inglês
│   └── index.ts       # Helpers getSite, getProjects, etc.
├── i18n/              # Locales, paths, PageContext
├── components/
│   ├── pages/         # HomePage, ProjectPage
│   ├── sections/      # Hero, About, Experiences, Projects, ...
│   └── ui/            # Button, Container, LocaleSwitch, ...
├── scripts/           # JS nativo (nav, reveal, projetos, contato)
├── styles/            # global.css (tokens), fonts.ts
├── layouts/           # Layout base + meta/SEO/hreflang
└── pages/
    ├── index.astro
    ├── en/            # Home e projetos em inglês
    ├── projetos/[slug].astro
    ├── 404.astro
    ├── og-image/
    └── api/contact.ts # prerender: false (serverless na Vercel)
```

Na raiz: `middleware.ts` (redirect de locale na `/`) e `devtools/generate-og.ts` (OG).

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
