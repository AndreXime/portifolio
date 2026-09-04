function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readProgress(scene: HTMLElement, hero: HTMLElement): number {
	const travel = Math.max(scene.offsetHeight - hero.offsetHeight, 1);
	const scrolled = Math.max(0, -scene.getBoundingClientRect().top);
	return Math.min(1, scrolled / travel);
}

function fmt(n: number): string {
	return n.toFixed(5);
}

/** Converte pontos em cúbicas Catmull-Rom → Bézier (curva contínua). */
function curveThrough(points: Array<{ x: number; y: number }>): string {
	const first = points[0];
	if (!first) return "";

	let d = `L ${fmt(first.x)} ${fmt(first.y)}`;
	for (let i = 0; i < points.length - 1; i++) {
		const p1 = points[i];
		const p2 = points[i + 1];
		if (!p1 || !p2) continue;

		const p0 = points[i - 1] ?? p1;
		const p3 = points[i + 2] ?? p2;
		const cp1x = p1.x + (p2.x - p0.x) / 6;
		const cp1y = p1.y + (p2.y - p0.y) / 6;
		const cp2x = p2.x - (p3.x - p1.x) / 6;
		const cp2y = p2.y - (p3.y - p1.y) / 6;
		d += `C ${fmt(cp1x)} ${fmt(cp1y)} ${fmt(cp2x)} ${fmt(cp2y)} ${fmt(p2.x)} ${fmt(p2.y)}`;
	}
	return d;
}

function buildWavePath(waveY: number, cycles: number, amplitude: number): string {
	const steps = Math.max(Math.round(cycles * 16), 32);
	const points: Array<{ x: number; y: number }> = [];
	for (let i = steps; i >= 0; i--) {
		const x = i / steps;
		const y = waveY + amplitude * Math.sin(x * Math.PI * 2 * cycles);
		points.push({ x, y });
	}
	return `M 0 0 H 1 ${curveThrough(points)} Z`;
}

function waveConfig(
	wave: HTMLElement,
	hero: HTMLElement,
): {
	waveY: (progress: number) => number;
	cycles: number;
	amplitude: number;
} {
	const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
	const spill = Math.max(wave.offsetHeight - hero.offsetHeight, 1);
	const restRatio = isDesktop ? 0.5 : 0.5;
	const endY = 1 - (spill * restRatio) / wave.offsetHeight;
	const startY = -0.08;

	return {
		waveY: (progress) => startY + progress * (endY - startY),
		cycles: isDesktop ? 2.5 : 5.5,
		amplitude: isDesktop ? 0.024 : 0.01,
	};
}

export function initHeroScrollTint(): void {
	const scene = document.querySelector<HTMLElement>(".hero-scroll-scene");
	const hero = document.querySelector<HTMLElement>(".hero-scroll-tint");
	const wave = document.querySelector<HTMLElement>(".hero-layer-wave");
	const path = document.querySelector<SVGPathElement>("[data-hero-wave-path]");
	if (!scene || !hero || !wave || !path) return;

	let frame = 0;

	const paint = (): void => {
		frame = 0;
		if (prefersReducedMotion()) {
			path.setAttribute("d", "M0 0H1V0H0Z");
			return;
		}

		const progress = readProgress(scene, hero);
		const { waveY, cycles, amplitude } = waveConfig(wave, hero);
		path.setAttribute("d", buildWavePath(waveY(progress), cycles, amplitude));
	};

	const kick = (): void => {
		if (frame) return;
		frame = requestAnimationFrame(paint);
	};

	window.addEventListener("scroll", kick, { passive: true });
	window.addEventListener("resize", kick);

	const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	motionQuery.addEventListener("change", kick);
	window.matchMedia("(min-width: 1024px)").addEventListener("change", kick);

	paint();
}

document.addEventListener("DOMContentLoaded", initHeroScrollTint);
