// Audits a URL with Lighthouse via Playwright Chromium. Usage: node lighthouse.js [url]

import { createServer } from "node:net";
import sparticuzChromium from "@sparticuz/chromium";
import lighthouse from "lighthouse";
import { chromium } from "playwright-core";

function getFreePort() {
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

function getCategoryScore(category) {
	return category.score === null ? null : Math.round(category.score * 100);
}

function getFailingAudits(category, audits) {
	return category.auditRefs
		.map((ref) => audits[ref.id])
		.filter((audit) => audit && audit.score !== null && audit.score < 1);
}

function formatAuditMessage(audit) {
	return audit.displayValue ? `${audit.title} (${audit.displayValue})` : audit.title;
}

async function main() {
	const url = process.argv[2] ?? "https://www.andreximenes.xyz";
	const port = await getFreePort();
	let browser;

	try {
		browser = await chromium.launch({
			executablePath: await sparticuzChromium.executablePath(),
			headless: true,
			args: [`--remote-debugging-port=${port}`, "--no-sandbox", "--disable-gpu"],
		});

		const runnerResult = await lighthouse(url, {
			logLevel: "error",
			output: "json",
			port,
		});

		if (!runnerResult?.report) {
			throw new Error("Lighthouse did not return a report");
		}

		const report = JSON.parse(runnerResult.report);

		console.log(`Lighthouse: ${url}\n`);
		for (const category of Object.values(report.categories)) {
			const score = getCategoryScore(category);
			const scoreLabel = score === null ? "n/a" : score;
			console.log(`  ${category.title}: ${scoreLabel}`);

			if (score === 100) continue;

			for (const audit of getFailingAudits(category, report.audits)) {
				console.log(`    - ${formatAuditMessage(audit)}`);
			}
		}
	} catch (error) {
		console.error("Lighthouse failed:", error);
		process.exit(1);
	} finally {
		if (browser) await browser.close();
	}
}

main();
