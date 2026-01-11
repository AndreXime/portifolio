import {
	TypescriptIcon,
	NextjsIcon,
	TailwindIcon,
	GitIcon,
	NodeJSIcon,
	BunIcon,
	HonoIcon,
	PostgreeICon,
	DockerIcon,
	LinuxIcon,
	CICDIcon,
	AWSIcon,
	GoIcon,
	GithubIcon,
	AstroIcon,
	GinIcon,
	RedisIcon,
} from "@/components/Icons";

interface TechItem {
	name: string;
	role: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	secondIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const words = [
	/*
  "CORS",
  "API Restful",
  "Engenharia de software",
  "Modelagem de banco de dados",
  "Arquitetura de software",
  */
];

export const technologies: TechItem[] = [
	{ name: "TypeScript", role: "Linguagem Principal", icon: TypescriptIcon },
	{
		name: "Astro e Next.js",
		role: "Frontend Framework",
		icon: AstroIcon,
		secondIcon: NextjsIcon,
	},
	{ name: "Tailwind CSS e ShadCN", role: "Estilização", icon: TailwindIcon },
	{
		name: "Node.js & Bun",
		role: "Javascript Runtime",
		icon: NodeJSIcon,
		secondIcon: BunIcon,
	},
	{
		name: "Git e GitHub",
		role: "Versionamento",
		icon: GitIcon,
		secondIcon: GithubIcon,
	},
	{
		name: "Hono & Gin",
		role: "API Framework",
		icon: HonoIcon,
		secondIcon: GinIcon,
	},
	{
		name: "PostgreSQL & Redis",
		role: "Banco de Dados",
		icon: PostgreeICon,
		secondIcon: RedisIcon,
	},
	{ name: "Docker", role: "Orquestrador de containers", icon: DockerIcon },
	{ name: "Linux", role: "Sistema operacional", icon: LinuxIcon },
	{
		name: "Github Actions",
		role: "Automação de Workflow (CI/CD)",
		icon: CICDIcon,
	},
	{ name: "AWS & Vercel", role: "Hospedagem", icon: AWSIcon },
	{ name: "Golang", role: "Linguagem secundária", icon: GoIcon },
];
