const progressBar = document.getElementById("progressBar");

let ticking = false;

function updateProgressBar(): void {
	if (!progressBar) return;

	const winScroll = window.scrollY || document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

	// Cálculo da porcentagem (0 a 100)
	const scrolled = (winScroll / height) * 100;

	// Atualização síncrona com o refresh rate do monitor
	progressBar.style.width = `${scrolled}%`;

	// Reseta a flag para permitir o próximo frame
	ticking = false;
}

function onScroll(): void {
	if (!ticking) {
		window.requestAnimationFrame(updateProgressBar);
		ticking = true;
	}
}

// Event listener com passive: true para performance de scroll
window.addEventListener("scroll", onScroll, { passive: true });
