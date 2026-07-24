import type { Locale } from "./i18n/locale";

export interface Experience {
	role: string;
	company: string;
	period: string;
	summary: string;
	highlights?: string[] | undefined;
}

export interface ProjectEntry {
	id: string;
	data: {
		title: string;
		shortDescription: string;
		github: string;
		tech: string[];
		imageUrl: { src: string };
		link?: string | undefined;
	};
}

export interface JsonLdLabels {
	websiteName: string;
	home: string;
	projects: string;
}

export interface PortfolioJsonLdInput {
	site: string;
	locale: Locale;
	labels: JsonLdLabels;
	seo: {
		title: string;
		description: string;
	};
	person: {
		fullName: string;
		jobTitle: string;
		description: string;
	};
	githubUrl: string;
	linkedinUrl: string;
	experiences: Experience[];
	projects: ProjectEntry[];
}

export interface ProjectPageJsonLdInput {
	site: string;
	locale: Locale;
	labels: JsonLdLabels;
	project: ProjectEntry;
	ogImageSrc: string;
}

export interface JsonLdNode {
	"@type": string;
	"@id"?: string;
	[key: string]: unknown;
}
