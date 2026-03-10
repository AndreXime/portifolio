const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && entry.target instanceof HTMLElement) {
				const el = entry.target;
				const delay = el.dataset.revealTime ? `${el.dataset.revealTime}ms` : "0ms";
				el.style.transitionDelay = delay;
				el.classList.remove("reveal-hidden");
				observer.unobserve(el);
			}
		});
	},
	{ threshold: 0.1 },
);

document.querySelectorAll("[data-reveal-time]").forEach((el) => {
	observer.observe(el);
});
