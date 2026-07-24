import { closeBrowser, startBrowser } from "./lib/browser.js";
import { closePreviewServer, startPreviewServer } from "./lib/server.js";

try {
	const localUrl = await startPreviewServer();
	const ogsToGenerate = [
		{ url: `${localUrl}/og-image`, outputPath: "public/og-image.png" },
		{ url: `${localUrl}/en/og-image`, outputPath: "public/og-image-en.png" },
	];

	const { browser } = await startBrowser();

	const page = await browser.newPage({
		viewport: { width: 1200, height: 630 },
	});

	for (const { url, outputPath } of ogsToGenerate) {
		console.log(`Abrindo ${url} (1200x630)...`);
		await page.goto(url);
		await page.waitForSelector("h1");

		console.log(`Capturando screenshot em ${outputPath}...`);
		await page.screenshot({ path: outputPath });
		console.log(`OG image salva em ${outputPath}`);
	}
} catch (error) {
	console.log(error);
} finally {
	await closeBrowser();
	closePreviewServer();
}
