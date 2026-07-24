import { type Dictionary, resolveLocale, t } from "../../locales";
import {
	type ExperienceList,
	type FormationList,
	getExperiences,
	getFormations,
	getProjects,
	getSite,
	getTechnologies,
	type ProjectEntry,
	type SiteContent,
	type TechnologyList,
} from "../content";
import type { Locale } from "./locale";

export interface PageContext {
	locale: Locale;
	ui: Dictionary;
	site: SiteContent;
}

export interface HomePageContent extends PageContext {
	experiences: ExperienceList;
	projects: ProjectEntry[];
	formations: FormationList;
	technologies: TechnologyList;
}

export async function getPageContext(currentLocale: string | undefined | null): Promise<PageContext> {
	const locale = resolveLocale(currentLocale);
	const ui = t(locale);
	const site = await getSite(locale);
	return { locale, ui, site };
}

export async function getHomePageContent(currentLocale: string | undefined | null): Promise<HomePageContent> {
	const locale = resolveLocale(currentLocale);
	const ui = t(locale);
	const [site, experiences, projects, formations, technologies] = await Promise.all([
		getSite(locale),
		getExperiences(locale),
		getProjects(locale),
		getFormations(locale),
		getTechnologies(locale),
	]);

	return { locale, ui, site, experiences, projects, formations, technologies };
}
