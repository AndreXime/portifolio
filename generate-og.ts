import { spawn } from "node:child_process";
import { chromium } from "playwright";

const OG_URL = "http://localhost:4321/og-image";

const CHROMIUM_PATH = process.env.CHROMIUM_PATH ?? "/usr/bin/chromium";

async function waitForServer(url: string, timeoutMs = 30_000): Promise<void> {
	const start = Date.now();

	while (Date.now() - start < timeoutMs) {
		try {
			const response = await fetch(url);
			if (response.ok) return;
		} catch {
			// servidor ainda nao subiu
		}

		await new Promise((resolve) => setTimeout(resolve, 500));
	}

	throw new Error("Astro nao iniciou a tempo");
}

function stopAstroProcess(astro: ReturnType<typeof spawn>): void {
	try {
		if (astro.pid !== undefined) {
			process.kill(-astro.pid, "SIGTERM");
			return;
		}
	} catch {
		// processo ja encerrado
	}

	astro.kill("SIGTERM");
}

const astro = spawn("npx", ["astro", "dev", "--port", "4321"], {
	stdio: "pipe",
	detached: true,
});

try {
	await waitForServer(OG_URL);

	const browser = await chromium.launch({
		executablePath: CHROMIUM_PATH,
		headless: true,
	});
	const page = await browser.newPage({
		viewport: { width: 1200, height: 630 },
	});

	await page.goto(OG_URL);
	await page.waitForSelector("h1");

	await page.screenshot({ path: "public/og-image.png" });
	await browser.close();
} finally {
	stopAstroProcess(astro);
}
