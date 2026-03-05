const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && entry.target instanceof HTMLElement) {
				const el = entry.target;

				el.style.transitionDelay = `${el.dataset.revealTime}ms`;

				el.classList.remove("reveal-hidden");

				// Para de observar
				observer.unobserve(el);
			}
		});
	},
	{
		threshold: 0.1, // Dispara quando 10% do elemento estiver visível
	},
);

document.querySelectorAll("[data-reveal-time]").forEach((el) => {
	observer.observe(el);
});
