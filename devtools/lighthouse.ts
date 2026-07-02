// Audits a URL with Lighthouse via Playwright Chromium.
// Usage: tsx devtools/lighthouse.ts [url]
// Sem argumentos, audita o preview local (http://localhost:4321).

import lighthouse from "lighthouse";
import type Result from "lighthouse/types/lhr/lhr.js";
import { closeBrowser, startBrowser } from "./lib/browser.js";
import { closePreviewServer, startPreviewServer } from "./lib/server.js";

type Category = Result["categories"][string];
type Audit = Result["audits"][string];

interface LighthouseReport {
	categories: Array<{
		title: string;
		score: number | null;
		failingAudits: string[];
	}>;
}

function getCategoryScore(category: Category): number | null {
	return category.score === null ? null : Math.round(category.score * 100);
}

function getFailingAuditMessages(category: Category, audits: Result["audits"]): string[] {
	return category.auditRefs
		.map((ref) => audits[ref.id])
		.filter((audit): audit is Audit => audit !== undefined && audit.score !== null && audit.score < 1)
		.map((audit) => (audit.displayValue ? `${audit.title} (${audit.displayValue})` : audit.title));
}

async function runLighthouseAudit(url?: string): Promise<LighthouseReport> {
	try {
		let targetUrl = url;
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
			throw new Error("Lighthouse nao retornou o relatorio");
		}

		const reportJson = Array.isArray(runnerResult.report) ? runnerResult.report[0] : runnerResult.report;

		if (!reportJson) {
			throw new Error("Lighthouse nao retornou o relatorio");
		}

		const result = JSON.parse(reportJson) as Result;

		return {
			categories: Object.values(result.categories).map((category) => ({
				title: category.title,
				score: getCategoryScore(category),
				failingAudits: getFailingAuditMessages(category, result.audits),
			})),
		};
	} finally {
		await closeBrowser();
		closePreviewServer();
	}
}

function printLighthouseReport(report: LighthouseReport): void {
	console.log("Resultados:");
	for (const category of report.categories) {
		const scoreLabel = category.score === null ? "n/a" : category.score;
		console.log(`  ${category.title}: ${scoreLabel}`);

		if (category.score === 100) continue;

		for (const message of category.failingAudits) {
			console.log(`    - ${message}`);
		}
	}
}

const minScore = 90;

async function main() {
	try {
		const report = await runLighthouseAudit(process.argv[2]);
		printLighthouseReport(report);
		const failures = report.categories.filter((category) => category.score === null || category.score < minScore);

		if (failures.length === 0) {
			process.exit(0);
		}

		console.error(`Lighthouse abaixo do minimo (${minScore}):`);
		for (const category of failures) {
			console.error(`  ${category.title}: ${category.score ?? "n/a"}`);
		}
		process.exit(1);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();
