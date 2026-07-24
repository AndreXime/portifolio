import { getCollection, getEntry } from "astro:content";
import type { Locale } from "./i18n/locale";

type LocaleKeyedCollection = "portfolio" | "experiences" | "formations" | "technologies";

async function requireEntry<C extends LocaleKeyedCollection>(collection: C, locale: Locale) {
	const entry = await getEntry(collection, locale);
	if (!entry) {
		throw new Error(`${collection} não encontrado para locale "${locale}".`);
	}
	return entry;
}

export async function getSite(locale: Locale) {
	const portfolio = (await requireEntry("portfolio", locale)).data;
	return {
		authorName: portfolio.authorName,
		email: portfolio.email,
		githubUrl: portfolio.githubUrl,
		linkedinUrl: portfolio.linkedinUrl,
		blogUrl: portfolio.blogUrl,
		resumePdfUrl: portfolio.resumePdfUrl,
		seo: portfolio.seo,
		person: portfolio.person,
		hero: portfolio.hero,
		about: portfolio.about,
		sections: portfolio.sections,
		cta: portfolio.cta,
	};
}

export async function getExperiences(locale: Locale) {
	return (await requireEntry("experiences", locale)).data.experiences;
}

export async function getFormations(locale: Locale) {
	return (await requireEntry("formations", locale)).data.formations;
}

export async function getTechnologies(locale: Locale) {
	return (await requireEntry("technologies", locale)).data.technologies;
}

export async function getProjects(locale: Locale) {
	const prefix = `${locale}/`;
	const projects = await getCollection("projects", ({ id }) => id.startsWith(prefix));
	return projects
		.map((project) => ({
			...project,
			slug: project.id.slice(prefix.length),
		}))
		.sort((a, b) => a.data.order - b.data.order);
}

export async function getProject(locale: Locale, slug: string) {
	const entry = await getEntry("projects", `${locale}/${slug}`);
	if (!entry) {
		return undefined;
	}
	return {
		...entry,
		slug,
	};
}

export type SiteContent = Awaited<ReturnType<typeof getSite>>;
export type ProjectEntry = Awaited<ReturnType<typeof getProjects>>[number];
export type ExperienceList = Awaited<ReturnType<typeof getExperiences>>;
export type FormationList = Awaited<ReturnType<typeof getFormations>>;
export type TechnologyList = Awaited<ReturnType<typeof getTechnologies>>;
