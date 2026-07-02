import { closeBrowser, startBrowser } from "./lib/browser.js";
import { closePreviewServer, startPreviewServer } from "./lib/server.js";

try {
	const localUrl = await startPreviewServer();
	const ogUrl = `${localUrl}/og-image`;
	const outputPath = "public/og-image.png";

	const { browser } = await startBrowser();

	console.log("Abrindo pagina (1200x630)...");
	const page = await browser.newPage({
		viewport: { width: 1200, height: 630 },
	});

	await page.goto(ogUrl);
	await page.waitForSelector("h1");

	console.log(`Capturando screenshot em ${outputPath}...`);
	await page.screenshot({ path: outputPath });
	console.log(`OG image salva em ${outputPath}`);
} catch (error) {
	console.log(error);
} finally {
	await closeBrowser();
	closePreviewServer();
}
