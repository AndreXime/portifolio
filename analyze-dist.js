import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const DIST_DIR = "dist/client";
const FONT_EXTENSIONS = new Set([".woff", ".woff2", ".ttf", ".otf", ".eot"]);

function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function walkDir(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const nested = await Promise.all(
		entries.map(async (entry) => {
			const fullPath = join(dir, entry.name);
			if (entry.isDirectory()) return walkDir(fullPath);
			const { size } = await stat(fullPath);
			return [{ path: fullPath, size }];
		}),
	);
	return nested.flat();
}

function printGroup(title, files, baseDir) {
	const sorted = [...files].sort((a, b) => b.size - a.size);
	const total = sorted.reduce((sum, file) => sum + file.size, 0);

	console.log(`\n${title} (${sorted.length} arquivo${sorted.length === 1 ? "" : "s"}) = ${formatBytes(total)}`);
	console.log("-".repeat(60));

	if (sorted.length === 0) {
		console.log("  (nenhum arquivo encontrado)");
		return 0;
	}

	for (const file of sorted) {
		console.log(`  ${formatBytes(file.size).padStart(10)}  ${relative(baseDir, file.path)}`);
	}

	return total;
}

async function getIndexedHtmlPaths(distDir) {
	const sitemap = await readFile(join(distDir, "sitemap-0.xml"), "utf8");
	return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => {
		const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
		return path ? `${path}/index.html` : "index.html";
	});
}

const distPath = join(process.cwd(), DIST_DIR);

let allFiles;
try {
	allFiles = await walkDir(distPath);
} catch (error) {
	if (error?.code === "ENOENT") {
		console.error(`Diretorio nao encontrado: ${DIST_DIR}`);
		console.error('Execute "npm run build" antes de analisar o dist.');
		process.exit(1);
	}
	throw error;
}

const groups = { html: [], js: [], font: [] };

for (const file of allFiles) {
	const ext = extname(file.path).toLowerCase();
	if (ext === ".html") groups.html.push(file);
	else if (ext === ".js") groups.js.push(file);
	else if (FONT_EXTENSIONS.has(ext)) groups.font.push(file);
}

const indexedPaths = new Set(await getIndexedHtmlPaths(distPath));
const indexedHtml = groups.html.filter((file) => indexedPaths.has(relative(distPath, file.path)));

console.log(`Analise de ${DIST_DIR}`);

const grandTotal =
	printGroup("HTML", indexedHtml, distPath) +
	printGroup("JavaScript", groups.js, distPath) +
	printGroup("Fontes", groups.font, distPath);

console.log(`\n${"=".repeat(60)}`);
console.log(`  Total dos assets:     ${formatBytes(grandTotal)}`);
console.log(`${"=".repeat(60)}\n`);
