function scrollSmoothTo(id: string): boolean {
	const normalizedId = id.startsWith("#") ? id.slice(1) : id;
	const el = document.getElementById(normalizedId);
	if (!(el instanceof HTMLElement)) return false;

	const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
	const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

	el.scrollIntoView({ behavior, block: "start" });

	return behavior === "smooth";
}

document.addEventListener("customScroll", (event: Event) => {
	if (!(event instanceof CustomEvent)) return;

	const detail = event.detail;
	if (!detail || typeof detail !== "object") return;
	const elementId = detail.id;
	if (typeof elementId !== "string") return;

	const onComplete =
		"onComplete" in detail && typeof detail.onComplete === "function" ? (detail.onComplete as () => void) : undefined;

	const scrollIsSmooth = scrollSmoothTo(elementId);

	if (onComplete) {
		if (!scrollIsSmooth) {
			// Já que o scroll é instantâneo só precisa de "2 frames" pra executar a ação
			requestAnimationFrame(() => {
				requestAnimationFrame(onComplete);
			});
			return;
		}

		// Tempo para animação de scroll smooth executar
		const smoothScrollSettleMs = 400;
		window.setTimeout(onComplete, smoothScrollSettleMs);
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const buttons = document.querySelectorAll<HTMLButtonElement>("button[data-scroll-to]");

	for (const button of buttons) {
		button.addEventListener("click", (event) => {
			if (button.disabled) return;
			event.preventDefault();

			const elementId = button.getAttribute("data-scroll-to");
			if (!elementId) return;

			scrollSmoothTo(elementId);
		});
	}
});
