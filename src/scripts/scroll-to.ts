function getScrollTargetId(raw: string): string | null {
	const trimmed = raw.trim();
	if (!trimmed) return null;
	return trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
}

function bindScrollToButtons(): void {
	const buttons = document.querySelectorAll<HTMLButtonElement>("button[data-scroll-to]");

	for (const button of buttons) {
		if (button.dataset.scrollToBound === "true") continue;
		button.dataset.scrollToBound = "true";

		button.addEventListener("click", (event) => {
			if (button.disabled) return;

			const raw = button.getAttribute("data-scroll-to");
			if (!raw) return;

			const id = getScrollTargetId(raw);
			if (!id) return;

			const el = document.getElementById(id);
			if (!(el instanceof HTMLElement)) return;

			event.preventDefault();

			const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

			el.scrollIntoView({
				behavior: prefersReducedMotion ? "auto" : "smooth",
				block: "start",
			});
		});
	}
}

document.addEventListener("DOMContentLoaded", bindScrollToButtons);
