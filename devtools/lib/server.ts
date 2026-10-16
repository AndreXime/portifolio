import { type ChildProcess, spawn, spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PREVIEW_PORT = 4321;
const ASTRO_CLI = join(dirname(fileURLToPath(import.meta.resolve("astro/package.json"))), "bin", "astro.mjs");
const WRANGLER_CLI = join(dirname(fileURLToPath(import.meta.resolve("wrangler/package.json"))), "bin", "wrangler.js");

let server: ChildProcess | null = null;
const localUrl = `http://127.0.0.1:${PREVIEW_PORT}`;

export async function startPreviewServer(): Promise<string> {
	await ensureBuild();

	console.log(`Iniciando servidor em ${localUrl}`);
	server = spawn(process.execPath, [WRANGLER_CLI, "dev", "--ip", "127.0.0.1", "--port", String(PREVIEW_PORT)], {
		stdio: "pipe",
		detached: true,
		env: process.env,
	});

	await waitForServer(localUrl);
	return localUrl;
}

export function closePreviewServer(): void {
	if (!server) return;
	stopProcess(server);
	server = null;
}

async function waitForServer(url: string, timeoutMs = 60_000): Promise<void> {
	const start = Date.now();

	while (Date.now() - start < timeoutMs) {
		try {
			const response = await fetch(url);
			if (response.ok) return;
		} catch {
			// servidor ainda nao subiu
		}

		await new Promise((resolve) => setTimeout(resolve, 500));
	}

	throw new Error("Servidor Wrangler nao iniciou a tempo");
}

function stopProcess(child: ChildProcess): void {
	try {
		if (child.pid !== undefined) {
			process.kill(-child.pid, "SIGTERM");
			return;
		}
	} catch {
		// processo ja encerrado
	}

	child.kill("SIGTERM");
}

async function ensureBuild(): Promise<void> {
	console.log("Executando build");
	const result = spawnSync(process.execPath, [ASTRO_CLI, "build"], {
		stdio: "pipe",
		env: process.env,
	});
	if (result.status !== 0) {
		throw new Error("Error ao fazer build");
	}
}
