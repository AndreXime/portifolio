export function initProjectBackFromList(): void {
	const params = new URLSearchParams(window.location.search);
	if (params.get("from") !== "list") {
		return;
	}

	const host = document.querySelector("[data-projects-index-href]");
	const listHref = host?.getAttribute("data-projects-index-href");
	if (!listHref) {
		return;
	}

	for (const el of document.querySelectorAll<HTMLAnchorElement>("[data-projects-back]")) {
		el.href = listHref;
	}
}
