// Analyzes the dist/client build and lists raw and brotli sizes for indexable HTML
// (skips pages with meta robots noindex), JS, CSS, images, and fonts. Run after "npm run build".
// Images are included only when referenced in HTML (excluding JSON-LD), CSS, or JS.

import { readdir, readFile, stat } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { promisify } from "node:util";
import { brotliCompress as brotliCompressCb } from "node:zlib";

const brotliCompress = promisify(brotliCompressCb);

const DIST_DIR = "dist/client";
const JS_EXTENSIONS = new Set([".js", ".mjs", ".cjs"]);
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico", ".avif"]);
const FONT_EXTENSIONS = new Set([".woff", ".woff2", ".ttf", ".otf", ".eot"]);
const REFERENCE_EXTENSIONS = new Set([".html", ".css", ".js", ".mjs", ".cjs"]);
const WIDTH = 103;

const FILE_COLUMNS = [
	{ label: "raw", width: 12, align: "center" },
	{ label: "brotli", width: 10, align: "center" },
	{ label: "savings", width: 8, align: "center" },
	{ label: "file", width: 70, align: "center" },
];

const tty = process.stdout.isTTY;
const c = {
	reset: tty ? "\x1b[0m" : "",
	dim: tty ? "\x1b[2m" : "",
	bold: tty ? "\x1b[1m" : "",
	cyan: tty ? "\x1b[36m" : "",
	green: tty ? "\x1b[32m" : "",
	yellow: tty ? "\x1b[33m" : "",
};

async function main() {
	const distPath = join(process.cwd(), DIST_DIR);

	let allFiles;
	try {
		allFiles = await walkDir(distPath);
	} catch (error) {
		if (error?.code === "ENOENT") {
			console.error(`${c.bold}Directory not found:${c.reset} ${DIST_DIR}`);
			console.error(`${c.dim}Run "npm run build" before analyzing dist.${c.reset}`);
			process.exit(1);
		}
		throw error;
	}

	const groups = { html: [], js: [], css: [], image: [], font: [] };

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

	const sections = [
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

function printGroup(title, files, baseDir) {
	const sorted = [...files].sort((a, b) => b.size - a.size);
	const total = sorted.reduce((sum, file) => sum + file.size, 0);
	const brotliTotal = sorted.reduce((sum, file) => sum + file.brotliSize, 0);
	const count = sorted.length;

	const label = count === 1 ? "file" : "files";
	banner(title);
	const stats = `${count} ${label} · ${formatBytes(total)} → ${formatBytes(brotliTotal)} (${savingsPercent(total, brotliTotal)} smaller)`;
	printCentered(stats, c.dim);

	const rows = sorted.map((file) => {
		const pct = savingsPercent(file.size, file.brotliSize);
		return {
			cells: [formatBytes(file.size), formatBytes(file.brotliSize), pct, relative(baseDir, file.path)],
			colors: [c.yellow, c.green, file.brotliSize < file.size ? c.green : c.dim, ""],
		};
	});

	printTable(FILE_COLUMNS, rows);
}

async function prepareGroup(files) {
	return Promise.all(files.map(enrichWithContent));
}

async function prepareHtmlGroup(files) {
	const enriched = await prepareGroup(files);
	return enriched.filter((file) => !hasRobotsNoindex(file.content));
}

async function prepareImageGroup(files, referenceContent) {
	const used = files.filter((file) => referenceContent.includes(basename(file.path)));
	return prepareGroup(used);
}

async function collectUserFacingReferenceContent(allFiles) {
	const referenceFiles = allFiles.filter((file) => REFERENCE_EXTENSIONS.has(extname(file.path).toLowerCase()));
	const chunks = await Promise.all(
		referenceFiles.map(async (file) => {
			const content = await readFile(file.path, "utf8");
			return extname(file.path).toLowerCase() === ".html" ? stripJsonLd(content) : content;
		}),
	);
	return chunks.join("");
}

function stripJsonLd(html) {
	return html.replace(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");
}

async function enrichWithContent(file) {
	const content = await readFile(file.path);
	const brotli = await brotliCompress(content);
	return {
		...file,
		content,
		brotliSize: brotli.length,
	};
}

function hasRobotsNoindex(content) {
	const html = content.toString("utf8");
	const tags = html.match(/<meta[^>]*>/gi) ?? [];
	for (const tag of tags) {
		if (!/name\s*=\s*["']robots["']/i.test(tag)) continue;
		const robotsContent = tag.match(/content\s*=\s*["']([^"']*)["']/i)?.[1] ?? "";
		if (/noindex/i.test(robotsContent)) return true;
	}
	return false;
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

function printTable(columns, rows) {
	console.log(tableBorder(columns, "┌", "┬", "┐"));
	console.log(
		tableRow(
			columns,
			columns.map((column) => column.label),
			columns.map(() => c.bold),
		),
	);
	console.log(tableBorder(columns, "├", "┼", "┤"));

	for (const row of rows) {
		console.log(tableRow(columns, row.cells, row.colors));
	}

	console.log(tableBorder(columns, "└", "┴", "┘"));
}

function tableRow(columns, cells, colors = [], aligns) {
	const body = columns
		.map((column, index) => {
			const align = aligns?.[index] ?? column.align;
			const padded = padCell(cells[index] ?? "", column.width, align);
			const color = colors[index];
			return color ? `${color}${padded}${c.reset}` : padded;
		})
		.join(`${c.dim}│${c.reset}`);

	return `${c.dim}│${c.reset}${body}${c.dim}│${c.reset}`;
}

function tableBorder(columns, left, mid, right) {
	const body = columns.map((column) => "─".repeat(column.width)).join(mid);
	return `${c.dim}${left}${body}${right}${c.reset}`;
}

function banner(title) {
	const inner = ` ${title} `;
	const pad = Math.max(0, WIDTH - inner.length);
	const left = Math.floor(pad / 2);
	const right = pad - left;
	console.log(
		`\n${c.dim}╭${"─".repeat(left)}${c.reset}${c.bold}${c.cyan}${inner}${c.reset}${c.dim}${"─".repeat(right)}╮${c.reset}`,
	);
}

function printCentered(text, style = "") {
	const width = WIDTH + 2;
	const pad = Math.max(0, width - text.length);
	const left = Math.floor(pad / 2);
	const right = pad - left;
	const content = style ? `${style}${text}${c.reset}` : text;
	console.log(`${" ".repeat(left)}${content}${" ".repeat(right)}`);
}

function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function savingsPercent(raw, brotli) {
	if (raw === 0) return "-";
	return `${Math.round((1 - brotli / raw) * 100)}%`;
}

function padCell(text, width, align = "right") {
	const plain = String(text);
	if (plain.length > width) return plain.slice(0, width);
	const gap = width - plain.length;
	if (align === "right") return " ".repeat(gap) + plain;
	if (align === "left") return plain + " ".repeat(gap);
	const left = Math.floor(gap / 2);
	const right = gap - left;
	return " ".repeat(left) + plain + " ".repeat(right);
}

await main();
