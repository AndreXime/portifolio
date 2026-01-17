interface TechItem {
	name: string;
	role: string;
	icons: string[];
}

export const technologies: TechItem[] = [
	{ name: "TypeScript", role: "Linguagem Principal", icons: ["typescript"] },
	{
		name: "Astro e Next.js",
		role: "Frontend Framework",
		icons: ["astro", "nextjs"],
	},
	{ name: "Tailwind CSS e ShadCN", role: "Estilização", icons: ["tailwind"] },
	{
		name: "Node.js & Bun",
		role: "Javascript Runtime",
		icons: ["node", "bun"],
	},
	{
		name: "Git e GitHub",
		role: "Versionamento",
		icons: ["git", "github"],
	},
	{
		name: "Hono & Gin",
		role: "API Framework",
		icons: ["hono", "gin"],
	},
	{
		name: "PostgreSQL & Redis",
		role: "Banco de Dados",
		icons: ["postgree", "redis"],
	},
	{ name: "Docker", role: "Orquestrador de containers", icons: ["docker"] },
	{ name: "Linux", role: "Sistema operacional", icons: ["linux"] },
	{
		name: "Github Actions",
		role: "Automação de Workflow (CI/CD)",
		icons: ["cicd"],
	},
	{ name: "AWS & Vercel", role: "Hospedagem", icons: ["aws"] },
	{ name: "Golang", role: "Linguagem secundária", icons: ["go"] },
];
