export interface Formation {
	readonly title: string;
	readonly institution: string;
	readonly period: string;
	readonly description?: string;
	/** Caminho em `public/` (ex.: `/logos/uva.jpg`) */
	readonly logo: string;
	readonly link?: string;
	readonly isSecondary?: boolean;
}

/**
 * Coloque os ficheiros em `public/logos/` (uva.jpg, meta.png, ibm.png).
 */
export const formations: readonly Formation[] = [
	{
		title: "Ciência da Computação",
		institution: "Univ. Estadual do Vale do Acaraú",
		period: "2023 — Presente",
		logo: "/logos/uva.png",
		description:
			"Graduação voltada aos fundamentos de computação com especial interesse em Engenharia de Software, Modelagem de dados, Algoritmos e Estrutura de dados.",
	},
	{
		title: "Frontend Developer Certificate",
		institution: "Meta — Coursera",
		period: "03/2026",
		logo: "/logos/meta.png",
		link: "https://coursera.org/verify/professional-cert/PLCI5UKSC5CS",
		description:
			"Certificação em desenvolvimento com React e JavaScript, cobrindo desde a criação de interfaces responsivas até o consumo de APIs REST. Inclui práticas com Git, testes unitários com Jest e fundamentos de UX/UI.",
	},
	{
		title: "Get Started with Cloud Native, DevOps, Agile, and NoSQL",
		institution: "IBM — Coursera",
		period: "03/2026",
		logo: "/logos/ibm.png",
		link: "https://coursera.org/verify/W0EQJWJ10E04",
		isSecondary: true,
	},
];
