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
		document.dispatchEvent(
			new CustomEvent("customScroll", {
				detail: {
					id: "formacoes",
					onComplete() {
						extras.forEach((li) => {
							li.classList.add("hidden");
						});
						showMore.setAttribute("aria-expanded", "false");
						showMore.textContent = "Ver mais certificações";
					},
				},
			}),
		);
	});
}

function setupFormationsSection(): void {
	const sectionEl = document.getElementById("formacoes");
	const listEl = document.getElementById("formacoes-list");
	const showMoreRaw = document.getElementById("formations-show-more");

	if (!(sectionEl instanceof HTMLElement)) return;
	if (!(listEl instanceof HTMLElement)) return;
	if (!(showMoreRaw instanceof HTMLButtonElement)) return;
	if (sectionEl.dataset.ready === "1") return;

	sectionEl.dataset.ready = "1";

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	showMoreRaw.addEventListener("click", () => {
		const expanded = showMoreRaw.getAttribute("aria-expanded") === "true";
		applyShowMoreState(listEl, showMoreRaw, !expanded, reducedMotion);
	});
}

document.addEventListener("DOMContentLoaded", setupFormationsSection);
