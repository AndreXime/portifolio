import { createServer } from "node:net";
import sparticuzChromium from "@sparticuz/chromium";
import { type Browser, chromium } from "playwright-core";

let browser: Browser | null = null;
let cdpPort: number | null = null;

function getFreePort(): Promise<number> {
	return new Promise((resolve, reject) => {
		const server = createServer();
		server.listen(0, () => {
			const address = server.address();
			if (!address || typeof address === "string") {
				reject(new Error("Failed to allocate a free port"));
				return;
			}
			server.close((error) => (error ? reject(error) : resolve(address.port)));
		});
		server.on("error", reject);
	});
}

export async function startBrowser(): Promise<{ browser: Browser; cdpPort: number }> {
	cdpPort = await getFreePort();

	const executablePath = await sparticuzChromium.executablePath();

	console.log("Iniciando Chromium\n");
	browser = await chromium.launch({
		executablePath,
		headless: true,
		args: ["--no-sandbox", "--disable-gpu", `--remote-debugging-port=${cdpPort}`],
	});

	return { browser, cdpPort };
}

export async function closeBrowser(): Promise<void> {
	if (browser) {
		console.log("\nEncerrando Chromium");
		await browser.close();
		browser = null;
		cdpPort = null;
	}
}
