import { chromium } from "playwright";

(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({
		viewport: { width: 1200, height: 630 },
	});

	await page.goto("http://localhost:4321/og-image");
	await page.waitForSelector("h1"); // Garante que renderizou

	await page.screenshot({ path: "public/og-image.png" });
	await browser.close();
})();
