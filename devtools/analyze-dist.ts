// Analyzes the dist/client build and lists raw and brotli sizes for indexable HTML
// (skips pages with meta robots noindex), JS, CSS, images, and fonts. Run after "npm run build".
// Images are included only when referenced in HTML (excluding JSON-LD), CSS, or JS.

import { readdir, readFile, stat } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { promisify } from "node:util";
import { brotliCompress as brotliCompressCb } from "node:zlib";
import { banner, c, formatBytes, printFileGroup, savingsPercent, type TableColumn, type TableRow } from "./lib/console";

const brotliCompress = promisify(brotliCompressCb);

const DIST_DIR = "dist/client";
const JS_EXTENSIONS = new Set([".js", ".mjs", ".cjs"]);
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico", ".avif"]);
const FONT_EXTENSIONS = new Set([".woff", ".woff2", ".ttf", ".otf", ".eot"]);
const REFERENCE_EXTENSIONS = new Set([".html", ".css", ".js", ".mjs", ".cjs"]);

interface DistFile {
	path: string;
	size: number;
}

interface EnrichedFile extends DistFile {
	content: Buffer;
	brotliSize: number;
}

const FILE_COLUMNS: TableColumn[] = [
	{ label: "raw", width: 12, align: "center" },
	{ label: "brotli", width: 10, align: "center" },
	{ label: "savings", width: 8, align: "center" },
	{ label: "file", width: 70, align: "center" },
];

async function main(): Promise<void> {
	const distPath = join(process.cwd(), DIST_DIR);

	let allFiles: DistFile[];
	try {
		allFiles = await walkDir(distPath);
	} catch (error: unknown) {
		if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
			console.error(`${c.bold}Directory not found:${c.reset} ${DIST_DIR}`);
			console.error(`${c.dim}Run "npm run build" before analyzing dist.${c.reset}`);
			process.exit(1);
		}
		throw error;
	}

	const groups: Record<"html" | "js" | "css" | "image" | "font", DistFile[]> = {
		html: [],
		js: [],
		css: [],
		image: [],
		font: [],
	};

	for (const file of allFiles) {
		const ext = extname(file.path).toLowerCase();
		if (ext === ".html") groups.html.push(file);
		else if (JS_EXTENSIONS.has(ext)) groups.js.push(file);
		else if (ext === ".css") groups.css.push(file);
		else if (IMAGE_EXTENSIONS.has(ext)) groups.image.push(file);
		else if (FONT_EXTENSIONS.has(ext)) groups.font.push(file);
	}

	const userFacingContent = await collectUserFacingReferenceContent(allFiles);

	const [html, js, css, images, fonts] = await Promise.all([
		prepareHtmlGroup(groups.html),
		prepareGroup(groups.js),
		prepareGroup(groups.css),
		prepareImageGroup(groups.image, userFacingContent),
		prepareGroup(groups.font),
	]);

	const sections: [string, EnrichedFile[]][] = [
		["HTML", html],
		["JavaScript", js],
		["CSS", css],
		["Images", images],
		["Fonts", fonts],
	];

	banner(`Analysis of ${DIST_DIR}`);

	for (const [title, files] of sections) {
		if (files.length > 0) printGroup(title, files, distPath);
	}
}

function printGroup(title: string, files: EnrichedFile[], baseDir: string): void {
	const sorted = [...files].sort((a, b) => b.size - a.size);
	const total = sorted.reduce((sum, file) => sum + file.size, 0);
	const brotliTotal = sorted.reduce((sum, file) => sum + file.brotliSize, 0);
	const count = sorted.length;

	const label = count === 1 ? "file" : "files";
	const stats = `${count} ${label} · ${formatBytes(total)} → ${formatBytes(brotliTotal)} (${savingsPercent(total, brotliTotal)} smaller)`;

	const rows: TableRow[] = sorted.map((file) => {
		const pct = savingsPercent(file.size, file.brotliSize);
		return {
			cells: [formatBytes(file.size), formatBytes(file.brotliSize), pct, relative(baseDir, file.path)],
			colors: [c.yellow, c.green, file.brotliSize < file.size ? c.green : c.dim, ""],
		};
	});

	printFileGroup(title, stats, FILE_COLUMNS, rows);
}

async function prepareGroup(files: DistFile[]): Promise<EnrichedFile[]> {
	return Promise.all(files.map(enrichWithContent));
}

async function prepareHtmlGroup(files: DistFile[]): Promise<EnrichedFile[]> {
	const enriched = await prepareGroup(files);
	return enriched.filter((file) => !hasRobotsNoindex(file.content));
}

async function prepareImageGroup(files: DistFile[], referenceContent: string): Promise<EnrichedFile[]> {
	const used = files.filter((file) => referenceContent.includes(basename(file.path)));
	return prepareGroup(used);
}

async function collectUserFacingReferenceContent(allFiles: DistFile[]): Promise<string> {
	const referenceFiles = allFiles.filter((file) => REFERENCE_EXTENSIONS.has(extname(file.path).toLowerCase()));
	const chunks = await Promise.all(
		referenceFiles.map(async (file) => {
			const content = await readFile(file.path, "utf8");
			return extname(file.path).toLowerCase() === ".html" ? stripJsonLd(content) : content;
		}),
	);
	return chunks.join("");
}

function stripJsonLd(html: string): string {
	return html.replace(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");
}

async function enrichWithContent(file: DistFile): Promise<EnrichedFile> {
	const content = await readFile(file.path);
	const brotli = await brotliCompress(content);
	return {
		...file,
		content,
		brotliSize: brotli.length,
	};
}

function hasRobotsNoindex(content: Buffer): boolean {
	const html = content.toString("utf8");
	const tags = html.match(/<meta[^>]*>/gi) ?? [];
	for (const tag of tags) {
		if (!/name\s*=\s*["']robots["']/i.test(tag)) continue;
		const robotsContent = tag.match(/content\s*=\s*["']([^"']*)["']/i)?.[1] ?? "";
		if (/noindex/i.test(robotsContent)) return true;
	}
	return false;
}

async function walkDir(dir: string): Promise<DistFile[]> {
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

await main();
