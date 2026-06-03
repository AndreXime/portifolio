function getFocusableElements(container: HTMLElement): HTMLElement[] {
	return Array.from(
		container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
	).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
}

function initNavDrawer() {
	const drawer = document.getElementById("nav-drawer");
	if (!(drawer instanceof HTMLDetailsElement)) return;

	const panel = drawer.querySelector<HTMLElement>("[data-nav-drawer-panel]");
	const summary = drawer.querySelector<HTMLElement>("summary");
	if (!panel || !summary) return;

	let previouslyFocused: HTMLElement | null = null;

	const closeDrawer = () => {
		if (!drawer.open) return;
		drawer.removeAttribute("open");
		summary.setAttribute("aria-expanded", "false");
		previouslyFocused?.focus();
		previouslyFocused = null;
	};

	const openDrawer = () => {
		previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		summary.setAttribute("aria-expanded", "true");
		const focusables = getFocusableElements(panel);
		focusables[0]?.focus();
	};

	drawer.addEventListener("toggle", () => {
		if (drawer.open) {
			openDrawer();
		} else {
			summary.setAttribute("aria-expanded", "false");
		}
	});

	panel.addEventListener("keydown", (e) => {
		if (!drawer.open || e.key !== "Tab") return;

		const focusables = getFocusableElements(panel);
		if (focusables.length === 0) return;

		const first = focusables.at(0);
		const last = focusables.at(-1);
		if (first === undefined || last === undefined) return;

		const active = document.activeElement;

		if (e.shiftKey && active === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && active === last) {
			e.preventDefault();
			first.focus();
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && drawer.open) {
			e.preventDefault();
			closeDrawer();
		}
	});

	document.addEventListener("click", (e) => {
		if (!drawer.open) return;
		const target = e.target;
		if (!(target instanceof Node)) return;
		if (drawer.contains(target)) return;
		closeDrawer();
	});

	summary.setAttribute("aria-expanded", "false");

	for (const link of panel.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
		link.addEventListener("click", () => {
			closeDrawer();
		});
	}
}

document.addEventListener("DOMContentLoaded", initNavDrawer);
