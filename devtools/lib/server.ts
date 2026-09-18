import { type ChildProcess, spawn, spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PREVIEW_PORT = 4321;
const NODE_ENV = { ASTRO_NODE: "1" };
const ASTRO_CLI = join(dirname(fileURLToPath(import.meta.resolve("astro/package.json"))), "bin", "astro.mjs");

let server: ChildProcess | null = null;
const localUrl = `http://localhost:${PREVIEW_PORT}`;

export async function startPreviewServer(): Promise<string> {
	await ensureBuild();

	console.log(`Iniciando servidor em ${localUrl}`);
	server = spawn(process.execPath, [ASTRO_CLI, "preview", "--port", String(PREVIEW_PORT)], {
		stdio: "pipe",
		detached: true,
		env: { ...process.env, ...NODE_ENV },
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

	throw new Error("Servidor Astro nao iniciou a tempo");
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
		env: { ...process.env, ...NODE_ENV },
	});
	if (result.status !== 0) {
		throw new Error("Error ao fazer build");
	}
}
