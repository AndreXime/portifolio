/**
 * Stack principal.
 * - Maioria: slug Simple Icons → render como `simple-icons:slug`
 * - `bullmq`, `shadcn`: SVG local em `src/icons/`
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
		name: "Astro, Next.js e Vite",
		role: "Frontend framework",
		icons: ["astro", "nextdotjs", "vite"],
	},
	{
		name: "Tailwind CSS e ShadCN",
		role: "Estilização",
		icons: ["tailwindcss", "shadcn"],
	},
	{
		name: "Hono, NestJS e Express",
		role: "Backend frameworks",
		icons: ["hono", "nestjs", "express"],
	},
	{
		name: "PostgreSQL e Redis",
		role: "Banco de dados",
		icons: ["postgresql", "redis"],
	},
	{
		name: "Git e GitHub",
		role: "Versionamento",
		icons: ["git", "github"],
	},
	{
		name: "Docker e Linux",
		role: "Infraestrutura",
		icons: ["docker", "linux"],
	},
	{
		name: "BullMQ e Zod",
		role: "Mensageria e Validação",
		icons: ["bullmq", "zod"],
	},
	{
		name: "Jest, Supertest e React Testing Library",
		role: "Testes unitários e integração",
		icons: ["jest", "testinglibrary"],
	},

	{
		name: "CI/CD e Cloud",
		role: "Automação e Deploy",
		icons: ["githubactions", "amazonaws"],
	},
	{
		name: "Prometheus e Grafana",
		role: "Observabilidade e monitoramento",
		icons: ["prometheus", "grafana"],
	},
];
