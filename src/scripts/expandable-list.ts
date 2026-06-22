import { scrollToSection } from "./scroll-to";

interface ExpandableListConfig {
	listEl: HTMLElement;
	showMore: HTMLButtonElement;
	scrollSectionId: string;
	expandLabel: string;
	collapseLabel: string;
	expanded: boolean;
}

function applyShowMoreState(config: ExpandableListConfig): void {
	const { listEl, showMore, scrollSectionId, expandLabel, collapseLabel, expanded } = config;
	const extras = listEl.querySelectorAll<HTMLLIElement>("li[data-expandable-extra]");

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

		requestAnimationFrame(() => {
			requestAnimationFrame(finishExpand);
		});
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

function initSingleExpandableList(root: HTMLElement): void {
	const showMore = root.querySelector<HTMLButtonElement>("[data-expandable-show-more]");
	if (!showMore) return;

	const listEl = root.querySelector(":scope > ul");
	if (!(listEl instanceof HTMLElement)) return;

	const scrollSectionId = root.dataset.scrollSection;
	const expandLabel = root.dataset.expandLabel;
	const collapseLabel = root.dataset.collapseLabel;
	if (!scrollSectionId || !expandLabel || !collapseLabel) return;

	const baseConfig = {
		listEl,
		showMore,
		scrollSectionId,
		expandLabel,
		collapseLabel,
	};

	showMore.addEventListener("click", () => {
		const expanded = showMore.getAttribute("aria-expanded") === "true";
		applyShowMoreState({ ...baseConfig, expanded: !expanded });
	});
}

export function initExpandableList(): void {
	document.querySelectorAll<HTMLElement>("[data-expandable-list]").forEach(initSingleExpandableList);
}
