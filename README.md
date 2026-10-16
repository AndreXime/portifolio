# Portfólio - André Ximenes

Portfólio pessoal em Astro com foco em performance, legibilidade e conversão. O visual segue uma direção **editorial / Swiss**: fundo claro, tipografia forte (IBM Plex Sans, Source Serif 4, JetBrains Mono), grid com bordas finas e accent laranja. Interações em **JavaScript nativo**, sem frameworks de UI e sem ilhas.

**Acesse:** [https://andreximenes.xyz](https://andreximenes.xyz)

https://github.com/user-attachments/assets/61cf6383-fdb2-47fb-bcc4-afba660114f0

## Stack

- **[Astro](https://astro.build/)** - SSG com adapter Cloudflare Workers e rota de API para contato
- **[Tailwind CSS](https://tailwindcss.com/)** v4 - Tokens e utilitários via plugin Vite
- **[TypeScript](https://www.typescriptlang.org/)** - `strictest` + `@astrojs/check`
- **[Biome](https://biomejs.dev/)** - Lint e formatação
- **[Web3Forms](https://web3forms.com/)** - Envio de e-mail via proxy em `/api/contact`
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
- **Contato**: `POST /api/contact` com validação, honeypot, tempo mínimo e Web3Forms

## Internacionalização (i18n)

Astro i18n nativo com `defaultLocale: "pt"` e `prefixDefaultLocale: false`:

| Locale | URL |
|--------|-----|
| Português | `/`, `/projetos/[slug]` |
| Inglês | `/en/`, `/en/projetos/[slug]` |

**Conteúdo e UI**
- Markdown por locale em `src/locales/{pt,en}/`
- Strings de interface em `src/locales/{pt,en}/ui.ts`
- Helpers em `src/lib/i18n/` e `src/locales/`; pages montam o contexto e passam props às sections

**Redirect na raiz (script síncrono no `<head>` da home PT)**  
A home `/` continua SSG (CDN). O script lê o cookie `PREFERRED_LOCALE` ou `navigator.language`, e faz `location.replace("/en/")` quando o visitante não é PT. Bots não são redirecionados (veem HTML em PT). O seletor PT|EN no header grava o cookie. `hreflang` cobre SEO das duas versões.

**SEO**: `hreflang` + `x-default`, canonical por locale, sitemap bilíngue.

## Performance

Lighthouse em produção: **~100** em Performance, Accessibility, Best Practices e SEO.

## Estrutura

```
src/
├── content.config.ts  # Schema das Content Collections
├── locales/
│   ├── pt/            # Markdown + ui.ts (PT)
│   ├── en/            # Markdown + ui.ts (EN)
│   └── index.ts       # resolveLocale, t, etc.
├── lib/
│   ├── content.ts     # getSite, getProjects, etc.
│   └── i18n/          # paths, locale cookie, PageContext
├── components/
│   ├── pages/         # HomePage, ProjectPage
│   ├── sections/      # Hero, About, Experiences, Projects, ...
│   └── ui/            # Button, Container, LocaleSwitch, ...
├── scripts/           # JS nativo (nav, reveal, projetos, contato, 404)
├── styles/            # global.css (tokens), fonts.ts
├── layouts/           # Layout base + meta/SEO/hreflang
└── pages/
    ├── index.astro
    ├── en/            # Home e projetos em inglês
    ├── projetos/[slug].astro
    ├── 404.astro
    ├── og-image/
    └── api/contact.ts # prerender: false (Worker na Cloudflare)
```

Na raiz: `wrangler.jsonc`, `devtools/generate-og.ts` (OG) e `intro-video/` (fonte Remotion da intro). O MP4 versionado fica em `public/videos/intro.mp4`.

## Desenvolvimento

```bash
npm install
npm run dev          # Astro + runtime Cloudflare (workerd)
npm run build        # gera dist/
npm run preview      # wrangler dev (precisa do build antes)
npm run deploy       # wrangler deploy (precisa do build antes)
npm run check        # biome + astro check
npm run format       # biome --write
npm run generate-og  # regenera public/og-image.png
```

O hook `pre-commit` (Husky) roda `format` e `check` nos arquivos em stage.

## Variáveis de ambiente

Crie `.env` na raiz para dev/preview e configure as mesmas no Worker Cloudflare em produção:

```env
WEB3FORMS_ACCESS_KEY=
```

## Deploy (Cloudflare Workers)

Local (CLI):

```bash
npm run build
npm run deploy
```

Ou no dashboard (Workers Builds / Git):

1. Build command: `npm run build`
2. Deploy command: `npx wrangler deploy`
3. Secrets/vars: `WEB3FORMS_ACCESS_KEY`
4. Custom domain: `andreximenes.xyz`
