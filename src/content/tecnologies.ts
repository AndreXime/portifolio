import {
	TypescriptIcon,
	ViteIcon,
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
} from "@/components/Icons";

interface TechItem {
	name: string;
	role: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	secondIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const technologies: TechItem[] = [
	{ name: "TypeScript", role: "Linguagem Principal", icon: TypescriptIcon },
	{
		name: "Vite / Next.js",
		role: "Frontend Framework",
		icon: ViteIcon,
		secondIcon: NextjsIcon,
	},
	{ name: "Tailwind CSS / ShadCN", role: "Estilização", icon: TailwindIcon },
	{
		name: "Git & GitHub",
		role: "Versionamento",
		icon: GitIcon,
		secondIcon: GithubIcon,
	},
	{
		name: "Node.js / Bun",
		role: "Backend Runtime",
		icon: NodeJSIcon,
		secondIcon: BunIcon,
	},
	{
		name: "Express.js / Hono",
		role: "API Framework",
		icon: HonoIcon,
	},
	{ name: "SQL / PostgreSQL", role: "Banco de Dados", icon: PostgreeICon },
	{ name: "Docker", role: "Orquestrador de containers", icon: DockerIcon },
	{ name: "Linux", role: "Sistema operacional", icon: LinuxIcon },
	{
		name: "Github Actions",
		role: "Automação de Workflow (CI/CD)",
		icon: CICDIcon,
	},
	{ name: "AWS / Vercel", role: "Hospedagem", icon: AWSIcon },
	{ name: "Golang", role: "Linguagem secundária", icon: GoIcon },
];
