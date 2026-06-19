function scrollSmoothTo(id: string): boolean {
	const normalizedId = id.startsWith("#") ? id.slice(1) : id;
	const el = document.getElementById(normalizedId);
	if (!(el instanceof HTMLElement)) return false;

	const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
	const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

	el.scrollIntoView({ behavior, block: "start" });

	return behavior === "smooth";
}

export function scrollToSection(id: string, onComplete?: () => void): void {
	const scrollIsSmooth = scrollSmoothTo(id);

	if (!onComplete) return;

	if (!scrollIsSmooth) {
		requestAnimationFrame(() => {
			requestAnimationFrame(onComplete);
		});
		return;
	}

	const smoothScrollSettleMs = 400;
	window.setTimeout(onComplete, smoothScrollSettleMs);
}
