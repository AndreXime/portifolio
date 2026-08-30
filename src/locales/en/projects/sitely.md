---
order: 2
title: "Production business sites: CMS on a VPS and HTML on Cloudflare's CDN"
shortDescription: "I shipped two sites (a grocery store and an atelier) as Astro SSR on a VPS, with a panel so the owner can edit copy, photos, and products. The origin uses a Cloudflare Origin CA certificate, and the host firewall allows 80/443 only from Cloudflare IPs. Every other port stays closed except SSH with fail2ban. The edge keeps public HTML for up to a year and only hits the VPS again after a CMS save invalidates the cache through Cloudflare's CDN API. Content lives in a SQLite document, not an off-the-shelf CMS."
tech: ["TypeScript", "Astro", "Node.js", "SQLite", "Docker", "Nginx", "Cloudflare"]
imageUrl: "../../../assets/projects/sitely.png"
link: "https://mercearia-ricardo.sitely.page/"
---

## Technical context

I modeled each site as a standalone Node process (Astro adapter, `output: "server"`) behind Cloudflare: public HTML is still SSR, but the origin barely sees the visitor. I split browser TTL (`Cache-Control` of 60s) from edge TTL (`Cloudflare-CDN-Cache-Control` of one year). On the host, 80 and 443 accept only Cloudflare IPs. The other ports stay closed, with SSH open and fail2ban in front. The `/admin` panel authenticates with JWT (12h), reads and writes the same SQLite as the home page. After a save, the origin calls Cloudflare's CDN cache API and asks it to invalidate the public URLs. Without that, stale HTML would sit at the edge for up to a year. Deploy is Docker with a volume for the database and uploads: the sites sit on an internal network, with no ports on the host. Only nginx publishes HTTP and HTTPS on the machine.

The two live sites share that design: [Mercearia Ricardo](https://mercearia-ricardo.sitely.page/) and [Grace Elegance](https://grace-elegance.sitely.page/). The source repository is private.

## Engineering challenges (how and why)

- **Origin only talks to Cloudflare:** I combined Origin CA with a host firewall. HTTP and HTTPS accept only Cloudflare IPs, so the VPS IP does not serve the page outside the edge. In Docker, the apps do not publish ports: only nginx opens 80 and 443 on the host. I closed the rest of the VPS ports. 80, 443, and SSH remain, the last with fail2ban. The visitor terminates TLS at the edge. The trade-off is depending on Cloudflare on the path, in exchange for the origin not staying open to scans or direct access by IP.
- **Aggressive edge cache, live content in the panel:** home and public listings can sit at the edge for a year. Saving in the CMS on the VPS does not reach the visitor by itself. After persist, the origin calls Cloudflare's CDN cache purge API with the public URLs. The edge drops the old HTML. The next visitor misses the cache and the VPS renders again.
- **Single document instead of an off-the-shelf CMS:** the site's copy, sections, categories, and products live in one SQLite document. WAL lets the home page (read) coexist with admin (write) on the same file. Images stay on disk with an immutable URL. Changing a photo creates another file, and the next HTML points at the new URL.
- **Admin stays off the storefront cache:** login, dashboard, and authenticated APIs do not carry the home page's aggressive headers. The business owner edits on the same Node process without inheriting visitor-cached HTML.
