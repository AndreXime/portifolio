import { scrollToSection } from "./scroll-to";

function bindProjectsList(listEl: HTMLElement, reducedMotion: boolean, showMore: HTMLButtonElement): void {
	function applyShowMoreState(expanded: boolean): void {
		const extras = listEl.querySelectorAll<HTMLLIElement>("li[data-project-extra]");
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
				showMore.textContent = "Ver menos";
			};
			if (reducedMotion) {
				finishExpand();
			} else {
				requestAnimationFrame(() => {
					requestAnimationFrame(finishExpand);
				});
			}
		} else {
			requestAnimationFrame(() => {
				scrollToSection("projetos", () => {
					extras.forEach((li) => {
						li.classList.add("hidden");
					});
					showMore.setAttribute("aria-expanded", "false");
					showMore.textContent = "Ver mais";
				});
			});
		}
	}

	showMore.addEventListener("click", () => {
		const expanded = showMore.getAttribute("aria-expanded") === "true";
		applyShowMoreState(!expanded);
	});
}

function setupProjectsSection(): void {
	const sectionEl = document.getElementById("projetos");
	const listEl = document.getElementById("projetos-list");
	const showMoreRaw = document.getElementById("projects-show-more");
	const showMoreWrap = document.getElementById("projects-show-more-wrap");

	if (!(sectionEl instanceof HTMLElement)) return;
	if (!(listEl instanceof HTMLElement)) return;

	const hasShowMore = Boolean(showMoreRaw) && Boolean(showMoreWrap);
	if (!hasShowMore) return;
	if (!(showMoreRaw instanceof HTMLButtonElement)) return;

	if (sectionEl.dataset.ready === "1") return;
	sectionEl.dataset.ready = "1";

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	bindProjectsList(listEl, reducedMotion, showMoreRaw);
}

document.addEventListener("DOMContentLoaded", setupProjectsSection);
