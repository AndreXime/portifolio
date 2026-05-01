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
		name: "Next.js, Astro e Vite",
		role: "Frontend framework",
		icons: ["nextdotjs", "astro", "vite"],
	},
	{
		name: "TailwindCSS e ShadCN",
		role: "Estilização",
		icons: ["tailwindcss", "shadcn"],
	},
	{
		name: "NestJS, Express e Hono",
		role: "Backend frameworks",
		icons: ["nestjs", "express", "hono"],
	},
	{
		name: "REST e OpenAPI",
		role: "APIs e documentação",
		icons: ["rest", "openapiinitiative"],
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
		name: "BullMQ",
		role: "Mensageria e Filas",
		icons: ["bullmq"],
	},
	{
		name: "Jest e React Testing Library",
		role: "Testes",
		icons: ["jest", "testinglibrary"],
	},
	{
		name: "CI/CD e Cloud",
		role: "Automação e deploy",
		icons: ["githubactions", "amazonaws"],
	},
];
