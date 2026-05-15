import type { ImageMetadata } from "astro";

import edureka from "./images/logos/edureka.png";
import meta from "./images/logos/meta.webp";
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
		title: "Frontend Developer Certificate",
		institution: "Meta — Coursera",
		period: "03/2026",
		logo: meta,
		link: "https://coursera.org/verify/professional-cert/PLCI5UKSC5CS",
		description:
			"Certificação em desenvolvimento com React e JavaScript, cobrindo desde a criação de interfaces responsivas até o consumo de APIs REST. Inclui práticas com Git, testes unitários com Jest e fundamentos de UX/UI.",
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
