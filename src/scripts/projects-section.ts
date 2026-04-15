function closeProjectModal(modalRoot: HTMLElement, listEl: HTMLElement): void {
	if (modalRoot.classList.contains("hidden")) return;

	modalRoot.classList.add("hidden");
	modalRoot.setAttribute("aria-hidden", "true");
	document.body.style.overflow = "";

	modalRoot.querySelector<HTMLElement>("[role='dialog']")?.removeAttribute("aria-labelledby");
	modalRoot.querySelector<HTMLElement>("[data-project-modal-title]")?.replaceChildren();

	modalRoot.querySelectorAll<HTMLElement>("[data-project-modal-panel]").forEach((panel) => {
		panel.hidden = true;
	});

	listEl.querySelectorAll<HTMLButtonElement>("[data-project-expand]").forEach((btn) => {
		btn.setAttribute("aria-expanded", "false");
	});
}

function bindProjectsSection(
	listEl: HTMLElement,
	modalRoot: HTMLElement,
	reducedMotion: boolean,
	showMore?: HTMLButtonElement,
	showMoreWrap?: HTMLElement,
): void {
	let lastTrigger: HTMLButtonElement | null = null;

	function getItems(): NodeListOf<HTMLLIElement> {
		return listEl.querySelectorAll<HTMLLIElement>("li[data-project-id]");
	}

	function getModalPanels(): NodeListOf<HTMLElement> {
		return modalRoot.querySelectorAll<HTMLElement>("[data-project-modal-panel]");
	}

	function isModalOpen(): boolean {
		return !modalRoot.classList.contains("hidden");
	}

	function applyShowMoreState(expanded: boolean): void {
		if (!showMore || !showMoreWrap) return;
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
				document.dispatchEvent(
					new CustomEvent("customScroll", {
						detail: {
							id: "projetos",
							onComplete() {
								extras.forEach((li) => {
									li.classList.add("hidden");
								});
								showMore.setAttribute("aria-expanded", "false");
								showMore.textContent = "Ver mais";
							},
						},
					}),
				);
			});
		}
	}

	function openModal(projectId: string): void {
		const panel = modalRoot.querySelector<HTMLElement>(`[data-project-modal-panel="${CSS.escape(projectId)}"]`);
		if (!panel) return;

		const heading = panel.querySelector<HTMLElement>("[data-project-modal-heading]");
		const dialog = modalRoot.querySelector<HTMLElement>("[role='dialog']");
		const modalTitle = modalRoot.querySelector<HTMLElement>("[data-project-modal-title]");
		const scrollRegion = modalRoot.querySelector<HTMLElement>("[data-project-modal-scroll]");

		getModalPanels().forEach((p) => {
			p.hidden = p !== panel;
		});

		if (heading?.id) {
			dialog?.setAttribute("aria-labelledby", heading.id);
		}
		if (modalTitle) {
			modalTitle.textContent = heading?.textContent?.trim() || "";
		}

		getItems().forEach((li) => {
			const idx = li.getAttribute("data-project-id");
			const expandBtn = li.querySelector<HTMLButtonElement>("[data-project-expand]");
			expandBtn?.setAttribute("aria-expanded", idx === projectId ? "true" : "false");
		});

		modalRoot.classList.remove("hidden");
		modalRoot.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden";

		if (scrollRegion) {
			scrollRegion.scrollTop = 0;
			scrollRegion.focus();
		} else {
			const closeBtn = modalRoot.querySelector<HTMLButtonElement>("[data-project-modal-close]");
			closeBtn?.focus();
		}
	}

	showMore?.addEventListener("click", () => {
		if (isModalOpen()) return;
		const expanded = showMore.getAttribute("aria-expanded") === "true";
		applyShowMoreState(!expanded);
	});

	listEl.addEventListener("click", (e: MouseEvent) => {
		const t = e.target;
		if (!(t instanceof Element)) return;
		const expand = t.closest<HTMLElement>("[data-project-expand]");
		if (!expand || !listEl.contains(expand)) return;
		if (isModalOpen()) return;
		lastTrigger = expand instanceof HTMLButtonElement ? expand : null;
		const li = expand.closest<HTMLLIElement>("li[data-project-id]");
		const projectId = li?.getAttribute("data-project-id");
		if (!projectId) return;
		openModal(projectId);
	});

	modalRoot.addEventListener("click", (e: MouseEvent) => {
		const t = e.target;
		if (!(t instanceof Element)) return;
		if (t.closest("[data-project-modal-close]")) {
			e.preventDefault();
			closeProjectModal(modalRoot, listEl);
			lastTrigger?.focus();
			lastTrigger = null;
			return;
		}
		if (t.closest("[data-project-modal-overlay]")) {
			closeProjectModal(modalRoot, listEl);
			lastTrigger?.focus();
			lastTrigger = null;
		}
	});

	document.addEventListener("keydown", (e: KeyboardEvent) => {
		if (e.key !== "Escape") return;
		closeProjectModal(modalRoot, listEl);
		lastTrigger?.focus();
		lastTrigger = null;
	});
}

export function setupProjectsSection(): void {
	const listEl = document.getElementById("projetos-list");
	const modalRoot = document.getElementById("project-modal-root");
	const showMoreRaw = document.getElementById("projects-show-more");
	const showMoreWrap = document.getElementById("projects-show-more-wrap");

	if (!(listEl instanceof HTMLElement)) return;
	if (!(modalRoot instanceof HTMLElement)) return;

	const hasShowMore = Boolean(showMoreRaw) || Boolean(showMoreWrap);
	if (hasShowMore && (!(showMoreRaw instanceof HTMLButtonElement) || !(showMoreWrap instanceof HTMLElement))) {
		return;
	}

	if (listEl.dataset.ready === "1") return;
	listEl.dataset.ready = "1";

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const showMore = showMoreRaw instanceof HTMLButtonElement ? showMoreRaw : undefined;
	const showMoreWrapEl = showMoreWrap instanceof HTMLElement ? showMoreWrap : undefined;

	bindProjectsSection(listEl, modalRoot, reducedMotion, showMore, showMoreWrapEl);
}
