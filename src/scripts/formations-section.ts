import { scrollToSection } from "./scroll-to";

function applyShowMoreState(
	listEl: HTMLElement,
	showMore: HTMLButtonElement,
	expanded: boolean,
	reducedMotion: boolean,
): void {
	const extras = listEl.querySelectorAll<HTMLLIElement>("li[data-formation-extra]");

	if (expanded) {
		extras.forEach((li) => {
			li.classList.remove("hidden");
			li.querySelectorAll<HTMLElement>("[data-reveal-root]").forEach((node) => {
				node.classList.remove("is-visible");
			});
		});

		const finishExpand = () => {
			extras.forEach((li) => {
				li.querySelectorAll<HTMLElement>("[data-reveal-root]").forEach((node) => {
					node.classList.add("is-visible");
				});
			});
			showMore.setAttribute("aria-expanded", "true");
			showMore.textContent = "Ver menos certificações";
		};

		if (reducedMotion) {
			finishExpand();
		} else {
			requestAnimationFrame(() => {
				requestAnimationFrame(finishExpand);
			});
		}
		return;
	}

	requestAnimationFrame(() => {
		scrollToSection("formacoes", () => {
			extras.forEach((li) => {
				li.classList.add("hidden");
			});
			showMore.setAttribute("aria-expanded", "false");
			showMore.textContent = "Ver mais certificações";
		});
	});
}

export function initFormationsSection(): void {
	const listEl = document.getElementById("formacoes-list");
	const showMoreRaw = document.getElementById("formations-show-more");

	if (!(listEl instanceof HTMLElement)) return;
	if (!(showMoreRaw instanceof HTMLButtonElement)) return;

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	showMoreRaw.addEventListener("click", () => {
		const expanded = showMoreRaw.getAttribute("aria-expanded") === "true";
		applyShowMoreState(listEl, showMoreRaw, !expanded, reducedMotion);
	});
}
