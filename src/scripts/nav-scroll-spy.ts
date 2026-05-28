const SECTION_IDS = ["sobre", "experiencias", "formacoes", "tecnologias", "projetos", "contato"] as const;

function setActiveSection(sectionId: string | null) {
	const links = document.querySelectorAll<HTMLElement>("[data-nav-section]");
	for (const link of links) {
		const isActive = link.getAttribute("data-nav-section") === sectionId;
		link.classList.toggle("is-nav-active", isActive);
		if (isActive) {
			link.setAttribute("aria-current", "location");
		} else {
			link.removeAttribute("aria-current");
		}
	}
}

function initNavScrollSpy() {
	const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
		(el): el is HTMLElement => el instanceof HTMLElement,
	);

	if (!sections.length) return;

	const visible = new Map<string, number>();

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const id = entry.target.id;
				if (!id) continue;
				if (entry.isIntersecting) {
					visible.set(id, entry.intersectionRatio);
				} else {
					visible.delete(id);
				}
			}

			if (visible.size === 0) {
				setActiveSection(null);
				return;
			}

			let bestId: string | null = null;
			let bestRatio = -1;
			for (const [id, ratio] of visible) {
				if (ratio > bestRatio) {
					bestRatio = ratio;
					bestId = id;
				}
			}

			setActiveSection(bestId);
		},
		{
			rootMargin: "-40% 0px -45% 0px",
			threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
		},
	);

	for (const section of sections) {
		observer.observe(section);
	}
}

document.addEventListener("DOMContentLoaded", initNavScrollSpy);
