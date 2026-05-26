import type { ImageMetadata } from "astro";

import edureka from "./images/logos/edureka.png";
import ibm from "./images/logos/ibm.webp";
import uva from "./images/logos/uva.webp";

export interface Formation {
	readonly title: string;
	readonly institution: string;
	readonly period: string;
	readonly description?: string;
	/** Import em `src/content/images/logos/` — Astro redimensiona no build */
	readonly logo: ImageMetadata;
	readonly link?: string;
	readonly isSecondary?: boolean;
}

export const formations: readonly Formation[] = [
	{
		title: "Ciência da Computação",
		institution: "Univ. Estadual do Vale do Acaraú",
		period: "2023 — Presente",
		logo: uva,
		description:
			"Graduação voltada aos fundamentos de computação com especial interesse em Engenharia de Software, Modelagem de dados, Algoritmos e Estrutura de dados.",
	},
	{
		title: "IBM JavaScript Backend Developer",
		institution: "IBM — Coursera",
		period: "05/2026",
		logo: ibm,
		link: "https://coursera.org/verify/professional-cert/PKNMO2685DQL",
		description:
			"Certificação profissional cobrindo Node.js, Express, bancos de dados NoSQL e SQL, conteinerização com Docker, CI/CD e deploy de microsserviços em nuvem.",
	},
	{
		title: "Modern Web Development with TypeScript",
		institution: "Edureka — Coursera",
		period: "05/2026",
		logo: edureka,
		link: "https://coursera.org/verify/specialization/TDOTGZTZV6HY",
		isSecondary: true,
	},
];
