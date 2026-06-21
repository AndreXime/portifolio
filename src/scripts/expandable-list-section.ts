import { scrollToSection } from "./scroll-to";

interface ExpandableListConfig {
	listEl: HTMLElement;
	showMore: HTMLButtonElement;
	extraItemSelector: string;
	scrollSectionId: string;
	expandLabel: string;
	collapseLabel: string;
	expanded: boolean;
	reducedMotion: boolean;
}

interface initProps {
	listId: string;
	showMoreId: string;
	extraItemSelector: string;
	scrollSectionId: string;
	expandLabel: string;
	collapseLabel: string;
}

function applyShowMoreState(config: ExpandableListConfig): void {
	const { listEl, showMore, extraItemSelector, scrollSectionId, expandLabel, collapseLabel, expanded, reducedMotion } =
		config;
	const extras = listEl.querySelectorAll<HTMLLIElement>(extraItemSelector);

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
			showMore.textContent = expandLabel;
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
		scrollToSection(scrollSectionId, () => {
			extras.forEach((li) => {
				li.classList.add("hidden");
			});
			showMore.setAttribute("aria-expanded", "false");
			showMore.textContent = collapseLabel;
		});
	});
}

export function initExpandableList(options: initProps): void {
	const { listId, showMoreId, ...rest } = options;
	// As vezes por exemplo não tem muitos projetos o astro nem renderiza o botão então nem precisa do script
	const showMore = document.getElementById(showMoreId);
	if (!(showMore instanceof HTMLButtonElement)) return;

	const listEl = document.getElementById(listId);
	if (!(listEl instanceof HTMLElement)) {
		throw new Error(`Elemento não encontrado: ${listId}`);
	}

	const baseConfig = {
		listEl,
		showMore,
		reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
		...rest,
	};

	showMore.addEventListener("click", () => {
		const expanded = showMore.getAttribute("aria-expanded") === "true";
		applyShowMoreState({ ...baseConfig, expanded: !expanded });
	});
}
