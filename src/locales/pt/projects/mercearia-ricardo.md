---
order: 2
title: "Vitrine de mercearia com CTA no WhatsApp, no plano Free da Cloudflare"
shortDescription: "Eu construí a vitrine da Mercearia Ricardo Aragão: catálogo editável e conversa no WhatsApp, sem checkout nem estoque. Astro SSR no Workers Free, fotos no R2 e cache longo na borda invalidado quando o dono salva. O admin em React deixa a loja atualizar textos e prateleira sozinha, com autenticação calibrada ao teto de CPU do plano Free."
tech: ["Astro", "Cloudflare Workers", "D1", "R2", "React", "Tailwind CSS"]
imageUrl: "../../../assets/projects/mercearia-ricardo.png"
link: "https://mercearia-ricardo.sitely.page"
---

## Contexto técnico

Modelei um monólito SSR em Astro no Cloudflare Workers: a vitrine é HTML na borda e o `/admin` é uma ilha React que edita o mesmo conteúdo. O negócio é editorial (textos da página e lista de produtos), não pedidos nem estoque. Guardei esse conteúdo num documento único no D1 e as fotos no R2: para esse modelo, schema relacional e fila de migrations seria excesso. O trade-off é explícito: operação simples e custo zero no Free, em troca de não escalar para multi-usuário ou PDV.

Priorizei CDN-first. Páginas públicas ficam cacheadas por muito tempo na borda e o Worker invalida de forma seletiva depois de cada save, para o site continuar rápido sem queimar a cota do Free em miss constante. Auth e recuperação de senha foram calibrados ao teto de CPU e às cotas do plano, com sessão que cai quando as credenciais mudam.

## Desafios de engenharia (como e por quê)

- **Conteúdo num documento, sem migrations atrás da outra:** o admin salva textos e catálogo no mesmo registro. Cabe porque só muda copy e prateleira. Evita schema de e-commerce para um fluxo que termina no WhatsApp.

- **Duas abas sem last-write-wins:** o save só grava se a versão que o admin leu ainda for a do banco. Conflito vira aviso explícito, não sobrescrita silenciosa.

- **Cache longo sem página velha após edição:** HTML público fica na borda com invalidação por tag após save, reset ou mudança de produto. Sem isso, o Free gasta request em miss o tempo todo.

- **Fotos leves e lixo limpo:** compressão roda no browser antes do upload. No save e em trocas de rascunho, apago no R2 o que deixou de ser referenciado. Assets de seed ficam intactos.

- **Sessão amarrada à senha atual:** trocar ou recuperar a senha invalida tokens antigos sem lista de revogação. Recover e setup usam chave mestra e rate limit, falhando fechado se o limitador não responder.

- **Cadastro rápido por código de barras:** no admin, o dono consulta e registra produto com leitor no browser. Preço, estoque e validade ficam de fora de propósito: a vitrine empurra para o WhatsApp, não para checkout.
