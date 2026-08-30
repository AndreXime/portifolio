---
order: 2
title: "Sites de negócio em produção: CMS na VPS e HTML na CDN da Cloudflare"
shortDescription: "Eu coloquei no ar dois sites (mercearia e ateliê) em Astro SSR numa VPS, com painel para o dono editar textos, fotos e produtos. A origem usa certificado Origin CA da Cloudflare e o firewall só libera 80/443 para os IPs da Cloudflare. O resto das portas fica fechado, salvo SSH com fail2ban. A borda guarda o HTML público por até um ano e só volta a bater na VPS depois que o save do CMS invalida o cache na API da CDN da Cloudflare. O conteúdo mora num documento SQLite, não num CMS de prateleira."
tech: ["TypeScript", "Astro", "Node.js", "SQLite", "Docker", "Nginx", "Cloudflare"]
imageUrl: "../../../assets/projects/sitely.png"
link: "https://mercearia-ricardo.sitely.page/"
---

## Contexto técnico

Modelei cada site como um processo Node standalone (adapter Astro, `output: "server"`) atrás da Cloudflare: o HTML público continua SSR, mas a origem quase não vê o visitante. Separei TTL no browser (`Cache-Control` de 60s) do TTL na borda (`Cloudflare-CDN-Cache-Control` de um ano). No host, 80 e 443 só aceitam os IPs da Cloudflare. As demais portas ficam fechadas, com SSH aberto e fail2ban na frente. O painel em `/admin` autentica com JWT (12h), lê e grava o mesmo SQLite da home. Depois de salvar, a origem chama a API de cache da CDN da Cloudflare e pede para invalidar as URLs públicas. Sem isso o HTML antigo ficaria até um ano na borda. O deploy é Docker com volume para banco e uploads: os sites ficam numa rede interna, sem porta no host. Só o nginx publica HTTP e HTTPS na máquina.

Os dois sites no ar seguem o mesmo desenho: [Mercearia Ricardo](https://mercearia-ricardo.sitely.page/) e [Grace Elegance](https://grace-elegance.sitely.page/). O repositório do código é privado.

## Desafios de engenharia (como e por quê)

- **Origem só fala com a Cloudflare:** juntei Origin CA com firewall no host. HTTP e HTTPS só aceitam os IPs da Cloudflare, então o IP da VPS não serve a página por fora da borda. No Docker, os apps não publicam porta: só o nginx abre 80 e 443 no host. Fechei o restante das portas da VPS. Ficou 80, 443 e SSH, este com fail2ban. O visitante termina TLS na borda. O trade-off é depender da Cloudflare no caminho, em troca de a origem não ficar aberta a scan nem a acesso direto pelo IP.
- **Cache agressivo na borda, conteúdo vivo no painel:** a home e as listagens públicas podem ficar um ano no edge. Gravar no CMS na VPS não chega ao visitante sozinho. Depois de persistir, a origem chama a API de purge de cache da CDN da Cloudflare com as URLs públicas. A borda descarta o HTML antigo. O próximo visitante erra o cache e a VPS renderiza de novo.
- **Documento único em vez de CMS de prateleira:** textos, seções, categorias e produtos do site cabem num único documento no SQLite. WAL deixa a home (leitura) conviver com o admin (escrita) no mesmo arquivo. Imagens ficam no disco com URL imutável. Trocar a foto gera outro arquivo, e o HTML seguinte aponta para a URL nova.
- **Admin fora do cache da vitrine:** login, dashboard e APIs autenticadas não levam os headers agressivos da home. Assim o dono do negócio edita no mesmo processo Node sem herdar HTML cacheado de visitante.
