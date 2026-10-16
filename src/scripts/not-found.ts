function pathLocale(pathname: string): "pt" | "en" {
	return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";
}

export function initNotFound(): void {
	const root = document.querySelector<HTMLElement>("[data-not-found]");
	if (!root) {
		return;
	}

	const locale = pathLocale(window.location.pathname);
	const prefix = locale === "en" ? "en" : "pt";

	const code = root.dataset[`${prefix}Code`]?.trim();
	const title = root.dataset[`${prefix}Title`]?.trim();
	const body = root.dataset[`${prefix}Body`]?.trim();
	const cta = root.dataset[`${prefix}Cta`]?.trim();
	const homeHref = root.dataset[`${prefix}Home`]?.trim();

	const codeEl = root.querySelector("[data-not-found-code]");
	const titleEl = root.querySelector("[data-not-found-title]");
	const bodyEl = root.querySelector("[data-not-found-body]");
	const ctaEl = root.querySelector<HTMLAnchorElement>("[data-not-found-cta]");
	const ctaLabelEl = root.querySelector("[data-not-found-cta-label]");

	if (codeEl && code) {
		codeEl.textContent = code;
	}
	if (titleEl && title) {
		titleEl.textContent = title;
	}
	if (bodyEl && body) {
		bodyEl.textContent = body;
	}
	if (ctaLabelEl && cta) {
		ctaLabelEl.textContent = cta;
	}
	if (ctaEl && homeHref) {
		ctaEl.href = homeHref;
	}

	document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
}
