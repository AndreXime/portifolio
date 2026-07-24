import type { Locale } from "./i18n/locale";
import { homeHash, localizedPath } from "./i18n/paths";

interface ProjectImageAltInput {
	data: {
		title: string;
	};
}

export function getProjectsIndexPath(locale: Locale): string {
	return localizedPath(locale, "/projetos");
}

export function getProjectsIndexUrl(site: string, locale: Locale): string {
	return new URL(getProjectsIndexPath(locale), site).href;
}

export function getProjectPagePath(id: string, locale: Locale, options?: { fromList?: boolean }): string {
	const path = localizedPath(locale, `/projetos/${id}`);
	return options?.fromList ? `${path}?from=list` : path;
}

export function getProjectPageUrl(site: string, id: string, locale: Locale): string {
	return new URL(getProjectPagePath(id, locale), site).href;
}

export function localeHomeUrl(site: string, locale: Locale): string {
	return new URL(localizedPath(locale, "/"), site).href;
}

export function localeProjectsHashUrl(site: string, locale: Locale): string {
	return new URL(homeHash(locale, "projetos"), site).href;
}

export function projectImageAlt(project: ProjectImageAltInput, template: string): string {
	return template.replace("{title}", project.data.title);
}

export const projectMarkdownClasses = [
	"project-md max-w-none text-sm leading-relaxed text-foreground-variant md:text-base",
	"[&_h1]:font-display [&_h1]:mt-8 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-foreground md:[&_h1]:text-2xl",
	"[&_h1:first-child]:mt-0",
	"[&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground md:[&_h2]:text-xl",
	"[&_h2:first-child]:mt-0",
	"[&_h3]:font-display [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground md:[&_h3]:text-xl",
	"[&_h3:first-child]:mt-0",
	"[&_p]:mt-2 [&_p:first-child]:mt-0",
	"[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5",
	"[&_strong]:font-semibold [&_strong]:text-foreground",
	"[&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 hover:[&_a]:decoration-accent",
	"[&_code]:border [&_code]:border-border [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-foreground",
] as const;
