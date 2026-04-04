/**
 * Stack principal.
 * - Maioria: slug Simple Icons → render como `simple-icons:slug`
 * - `bullmq` e `shadcn`: SVG local em `src/icons/` (logos oficiais)
 */
export interface TechItem {
	readonly name: string;
	readonly role: string;
	readonly icons: readonly string[];
}

export const technologies: readonly TechItem[] = [
	{ name: "TypeScript", role: "Linguagem principal", icons: ["typescript"] },
	{
		name: "Node.js e Bun",
		role: "JavaScript runtimes",
		icons: ["nodedotjs", "bun"],
	},
	{
		name: "Astro e Next.js",
		role: "Frontend framework",
		icons: ["astro", "nextdotjs"],
	},
	{
		name: "Tailwind CSS e ShadCN",
		role: "Estilização",
		icons: ["tailwindcss", "shadcn"],
	},
	{
		name: "Hono e NestJS",
		role: "API frameworks",
		icons: ["hono", "nestjs"],
	},
	{
		name: "PostgreSQL & Redis",
		role: "Banco de dados",
		icons: ["postgresql", "redis"],
	},
	{
		name: "Git & GitHub",
		role: "Versionamento",
		icons: ["git", "github"],
	},
	{
		name: "BullMQ",
		role: "Mensageria e filas",
		icons: ["bullmq"],
	},
	{
		name: "Prometheus e Grafana",
		role: "Observabilidade e monitoramento",
		icons: ["prometheus", "grafana"],
	},
	{
		name: "Jest",
		role: "Testes unitários e integração",
		icons: ["jest"],
	},
	{
		name: "Docker & Linux",
		role: "Infraestrutura e containers",
		icons: ["docker", "linux"],
	},
	{
		name: "CI/CD & Cloud",
		role: "Deploy e automação",
		icons: ["githubactions", "amazonaws"],
	},
];
