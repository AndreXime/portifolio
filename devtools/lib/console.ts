const WIDTH = 103;

const tty = process.stdout.isTTY;

export const c = {
	reset: tty ? "\x1b[0m" : "",
	dim: tty ? "\x1b[2m" : "",
	bold: tty ? "\x1b[1m" : "",
	cyan: tty ? "\x1b[36m" : "",
	green: tty ? "\x1b[32m" : "",
	yellow: tty ? "\x1b[33m" : "",
};

export function printFileGroup(title: string, stats: string, columns: TableColumn[], rows: TableRow[]): void {
	banner(title);
	printCentered(stats, c.dim);
	printTable(columns, rows);
}

export function printTable(columns: TableColumn[], rows: TableRow[]): void {
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

function tableRow(columns: TableColumn[], cells: string[], colors: string[] = []): string {
	const body = columns
		.map((column, index) => {
			const padded = padCell(cells[index] ?? "", column.width, column.align);
			const color = colors[index];
			return color ? `${color}${padded}${c.reset}` : padded;
		})
		.join(`${c.dim}│${c.reset}`);

	return `${c.dim}│${c.reset}${body}${c.dim}│${c.reset}`;
}

function tableBorder(columns: TableColumn[], left: string, mid: string, right: string): string {
	const body = columns.map((column) => "─".repeat(column.width)).join(mid);
	return `${c.dim}${left}${body}${right}${c.reset}`;
}

export function banner(title: string): void {
	const inner = ` ${title} `;
	const pad = Math.max(0, WIDTH - inner.length);
	const left = Math.floor(pad / 2);
	const right = pad - left;
	console.log(
		`\n${c.dim}╭${"─".repeat(left)}${c.reset}${c.bold}${c.cyan}${inner}${c.reset}${c.dim}${"─".repeat(right)}╮${c.reset}`,
	);
}

export function printCentered(text: string, style = ""): void {
	const width = WIDTH + 2;
	const pad = Math.max(0, width - text.length);
	const left = Math.floor(pad / 2);
	const right = pad - left;
	const content = style ? `${style}${text}${c.reset}` : text;
	console.log(`${" ".repeat(left)}${content}${" ".repeat(right)}`);
}

export function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function savingsPercent(raw: number, brotli: number): string {
	if (raw === 0) return "-";
	return `${Math.round((1 - brotli / raw) * 100)}%`;
}

function padCell(text: string, width: number, align: "left" | "center" | "right" = "right"): string {
	const plain = String(text);
	if (plain.length > width) return plain.slice(0, width);
	const gap = width - plain.length;
	if (align === "right") return " ".repeat(gap) + plain;
	if (align === "left") return plain + " ".repeat(gap);
	const left = Math.floor(gap / 2);
	const right = gap - left;
	return " ".repeat(left) + plain + " ".repeat(right);
}

export interface TableColumn {
	label: string;
	width: number;
	align: "left" | "center" | "right";
}

export interface TableRow {
	cells: string[];
	colors: string[];
}
