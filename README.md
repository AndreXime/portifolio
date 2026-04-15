# Portfólio - André Ximenes

Portfólio pessoal construído com Astro e foco em performance, legibilidade e conversão. O visual segue uma direção de **Bold Typography** (tipografia forte, hierarquia clara, contraste) e as interações são feitas com **JavaScript nativo**, sem frameworks de UI e sem “ilhas”.

**Acesse:** [https://andreximenes.xyz](https://andreximenes.xyz)

## Stack

* **[Astro](https://astro.build/)** - Site estático com rota de API para contato
* **[Tailwind CSS](https://tailwindcss.com/)** - Sistema de design via Vite plugin
* **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estrita end-to-end
* **[Nodemailer](https://nodemailer.com/)** - SMTP direto via Gmail em serverless function
* **Astro Content Collections** - Conteúdo tipado/validado

## Features Técnicas

### Otimizações de Performance
- **Imagens**: `astro:assets` para otimização e loading lazy por padrão
- **JS mínimo**: interações pontuais (modal, “ver mais”, scroll helpers) com JS nativo
- **Reveal Animations**: `IntersectionObserver` próprio (sem libs) para reduzir bundle
- **Inline Stylesheets**: CSS crítico injetado no HTML para eliminar FOUC
- **Static Output**: Páginas estáticas servidas por CDN edge para performance extrema

### API de Contato
Endpoint SSR em `/api/contact.ts` com envio direto via SMTP do Gmail, sem dependência de serviços terceiros.

## Performance Metrics

- **Lighthouse Score**: Performance ~95–100 / Accessibility 100 / Best Practices 100 / SEO 100
- **First Contentful Paint**: ~1,4 s
- **Largest Contentful Paint**: ~2,1 s
- **Speed Index**: ~1,4 s
- **Total Blocking Time**: 0 ms
- **Cumulative Layout Shift**: 0

## Arquitetura

```
src/
├── content/        # Collections
├── components/
│   ├── sections/   # Seções (Hero, Contact, etc.)
│   └── ui/         # UI primitives (Button, Reveal, etc.)
├── scripts/        # Interações em JS nativo (modal, “ver mais”, reveal)
├── pages/
│   ├── index.astro    # SSG
│   └── api/
│       └── contact.ts # SSR
└── layout/         # Layout base + SEO
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
