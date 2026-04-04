export interface ExperienceHighlight {
	readonly label: string;
	readonly detail: string;
}

export interface Experience {
	readonly role: string;
	readonly company: string;
	readonly period: string;
	readonly summary: string;
	readonly highlights?: readonly ExperienceHighlight[];
	/** Caminho em `public/` (ex.: `/logos/stackup.webp`) */
	readonly logo?: string;
}

export const experiences: readonly Experience[] = [
	{
		role: "Desenvolvedor Fullstack",
		company: "Stackup Software",
		period: "10/2025 — 02/2026",
		logo: "/logos/stackup.webp",
		summary:
			"Atuei no ciclo completo de desenvolvimento em uma software house de ritmo dinâmico, integrando um projeto de alta complexidade desde o estágio inicial. Minha contribuição focou na definição da arquitetura e na implementação de soluções escaláveis, transitando entre o frontend com Next.js e o backend com Hono, sempre priorizando a performance e a eficiência de custos em infraestrutura AWS.",
		highlights: [
			{
				label: "Backend & Cloud",
				detail:
					"Desenvolvi APIs com Hono e TypeScript, implementando uploads via S3 Signed URLs para reduzir tráfego na API e arquitetura orientada a eventos com AWS Lambda para OCR e conversão de documentos.",
			},
			{
				label: "Frontend & State",
				detail:
					"Construí dashboards internos utilizando TailwindCSS, Shadcn UI, Zustand e TanStack Query para gerenciamento de estado e cache eficiente de requisições.",
			},
			{
				label: "Automação",
				detail:
					"Implementei a geração dinâmica de contratos com docxtemplater, integrando campos flexíveis via JSON para suportar estruturas de dados não fixas.",
			},
		],
	},
];
