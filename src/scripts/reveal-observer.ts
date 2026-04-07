function initReveal() {
	const TIMING = "cubic-bezier(0.25, 0, 0, 1)";

	const nodes = document.querySelectorAll("[data-reveal-root]");
	if (!nodes.length) return;

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target as HTMLElement;
				el.style.transitionTimingFunction = TIMING;
				el.classList.add("is-visible");
				io.unobserve(el);
			}
		},
		{ threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
	);

	for (const el of nodes) io.observe(el);
}

document.addEventListener("DOMContentLoaded", initReveal);
