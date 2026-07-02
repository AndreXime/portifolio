// Audits a URL with Lighthouse via Playwright Chromium.
// Usage: tsx devtools/lighthouse.ts [url]
// Sem argumentos, audita o preview local (http://localhost:4321).

import lighthouse from "lighthouse";
import type Result from "lighthouse/types/lhr/lhr.js";
import { closeBrowser, startBrowser } from "./lib/browser.js";
import { closePreviewServer, startPreviewServer } from "./lib/server.js";

type Category = Result["categories"][string];
type Audit = Result["audits"][string];

function getCategoryScore(category: Category): number | null {
	return category.score === null ? null : Math.round(category.score * 100);
}

function getFailingAuditMessages(category: Category, audits: Result["audits"]): string[] {
	return category.auditRefs
		.map((ref) => audits[ref.id])
		.filter((audit): audit is Audit => audit !== undefined && audit.score !== null && audit.score < 1)
		.map((audit) => (audit.displayValue ? `${audit.title} (${audit.displayValue})` : audit.title));
}

try {
	let targetUrl = process.argv[2];
	if (!targetUrl) {
		targetUrl = await startPreviewServer();
	}
	const { cdpPort } = await startBrowser();

	console.log(`Executando Lighthouse para ${targetUrl}`);
	const runnerResult = await lighthouse(targetUrl, {
		logLevel: "error",
		output: "json",
		port: cdpPort,
	});

	if (!runnerResult?.report) {
		throw new Error("Lighthouse não retornou o relatorio");
	}

	const reportJson = Array.isArray(runnerResult.report) ? runnerResult.report[0] : runnerResult.report;

	if (!reportJson) {
		throw new Error("Lighthouse não retornou o relatorio");
	}

	const report = JSON.parse(reportJson) as Result;

	console.log("Resultados:");
	for (const category of Object.values(report.categories)) {
		const score = getCategoryScore(category);
		const scoreLabel = score === null ? "n/a" : score;
		console.log(`  ${category.title}: ${scoreLabel}`);

		if (score === 100) continue;

		for (const message of getFailingAuditMessages(category, report.audits)) {
			console.log(`    - ${message}`);
		}
	}
} catch (error) {
	console.log(error);
} finally {
	await closeBrowser();
	closePreviewServer();
}
