interface TechItem {
	name: string;
	role: string;
	icons: string[];
}

export const technologies: TechItem[] = [
	{ name: "TypeScript", role: "Linguagem Principal", icons: ["typescript"] },
	{
		name: "Node.js e Bun",
		role: "Javascript Runtimes",
		icons: ["node", "bun"],
	},
	{
		name: "Astro e Next.js",
		role: "Frontend Framework",
		icons: ["astro", "nextjs"],
	},
	{ name: "Tailwind CSS e ShadCN", role: "Estilização", icons: ["tailwind"] },
	{
		name: "Hono e Express",
		role: "API Frameworks",
		icons: ["hono", "express"],
	},
	{
		name: "PostgreSQL & Redis",
		role: "Banco de Dados",
		icons: ["postgree", "redis"],
	},
	{
		name: "Git & GitHub",
		role: "Versionamento",
		icons: ["git", "github"],
	},
	{ name: "BullMQ", role: "Mensageria e Filas", icons: ["bullmq"] },
	{ name: "Prometheus", role: "Observabilidade e Monitoramento", icons: ["prometheus"] },
	{
		name: "Jest",
		role: "Testes Unitários e Integração",
		icons: ["jest"],
	},
	{
		name: "Docker & Linux",
		role: "Infraestrutura e Containers",
		icons: ["docker", "linux"],
	},
	{ name: "CI/CD & Cloud", role: "Deploy e Automação", icons: ["cicd", "aws"] },
];
