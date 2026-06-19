interface ProjectImageAltInput {
	data: {
		title: string;
		cardTagline?: string | undefined;
	};
}

export function getProjectPagePath(id: string): string {
	return `/projetos/${id}`;
}

export function getProjectPageUrl(site: string, id: string): string {
	return `${site}${getProjectPagePath(id)}`;
}

export function projectImageAlt(project: ProjectImageAltInput): string {
	const tagline = project.data.cardTagline?.trim();
	if (tagline) return `Captura do projeto: ${tagline}`;
	return `Captura do projeto ${project.data.title}`;
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
