function scrollSmoothTo(id: string): void {
	const normalizedId = id.startsWith("#") ? id.slice(1) : id;
	const el = document.getElementById(normalizedId);
	if (!(el instanceof HTMLElement)) return;

	const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

	el.scrollIntoView({
		behavior: prefersReducedMotion ? "auto" : "smooth",
		block: "start",
	});
}

document.addEventListener("customScroll", (event: Event) => {
	if (!(event instanceof CustomEvent)) return;

	const detail = event.detail;
	if (!detail || typeof detail !== "object") return;
	const elementId = detail.id;
	if (typeof elementId !== "string") return;

	scrollSmoothTo(elementId);
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
