import type { Locale } from "../i18n";
import type {
	Experience,
	JsonLdNode,
	PortfolioJsonLdInput,
	ProjectEntry,
	ProjectPageJsonLdInput,
} from "./portfolio-json-ld.types";
import { getProjectPageUrl, localeHomeUrl, localeProjectsHashUrl } from "./project-page";

export function buildPortfolioJsonLd(input: PortfolioJsonLdInput) {
	const homeUrl = localeHomeUrl(input.site, input.locale);
	const personId = schemaId(input.site, "person");
	const experienceNodes = buildExperienceNodes(input.site, input.experiences);
	const projectNodes = buildProjectNodes(input.site, input.locale, input.projects);

	const person: JsonLdNode = {
		"@type": "Person",
		"@id": personId,
		name: input.person.fullName,
		givenName: "André",
		familyName: "Ximenes",
		alternateName: ["André Ricardo Ximenes", "andrexime"],
		jobTitle: input.person.jobTitle,
		description: input.person.description,
		image: new URL("/me.webp", input.site).href,
		url: homeUrl,
		homeLocation: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Sobral",
				addressRegion: "CE",
				addressCountry: "BR",
			},
		},
		workLocation: {
			"@type": "Place",
			name: "Remote",
			address: {
				"@type": "PostalAddress",
				addressCountry: "BR",
			},
		},
		sameAs: [input.githubUrl, input.linkedinUrl],
		knowsAbout: [
			{ "@type": "Thing", name: "TypeScript" },
			{ "@type": "Thing", name: "Node.js" },
			{ "@type": "Thing", name: "NestJS" },
			{ "@type": "Thing", name: "Hono" },
			{ "@type": "Thing", name: "PostgreSQL" },
			{ "@type": "Thing", name: "Prisma" },
			{ "@type": "Thing", name: "React" },
			{ "@type": "Thing", name: "Next.js" },
			{ "@type": "Thing", name: "REST API" },
			{ "@type": "Thing", name: "OpenAPI" },
			{ "@type": "Thing", name: "Software Architecture" },
		],
		alumniOf: {
			"@type": "EducationalOrganization",
			name: "Universidade Estadual do Vale do Acaraú",
			sameAs: "https://www.uva.ce.gov.br",
		},
		...(experienceNodes.length > 0
			? {
					hasOccupation: experienceNodes.map((node) => ({
						"@id": node["@id"],
					})),
				}
			: {}),
	};

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "ProfilePage",
				"@id": schemaId(input.site, "profilepage"),
				url: homeUrl,
				name: input.seo.title,
				description: input.seo.description,
				dateCreated: "2025-10-17T00:00:00+00:00",
				dateModified: new Date().toISOString(),
				mainEntity: {
					"@id": personId,
				},
				isPartOf: {
					"@type": "WebSite",
					"@id": schemaId(input.site, "website"),
					name: input.labels.websiteName,
					url: homeUrl,
				},
				...(projectNodes.length > 0
					? {
							hasPart: {
								"@id": schemaId(input.site, "projects"),
							},
						}
					: {}),
			},
			person,
			...experienceNodes,
			...(projectNodes.length > 0
				? [buildProjectsItemList(input.site, input.locale, input.labels.projects, input.projects)]
				: []),
			...projectNodes,
		],
	};
}

export function buildProjectPageJsonLd(input: ProjectPageJsonLdInput) {
	const pageUrl = getProjectPageUrl(input.site, input.project.id, input.locale);
	const homeUrl = localeHomeUrl(input.site, input.locale);
	const projectsUrl = localeProjectsHashUrl(input.site, input.locale);
	const liveUrl = input.project.data.link?.trim();
	const personId = schemaId(input.site, "person");
	const sameAs = [input.project.data.github, ...(liveUrl ? [liveUrl] : [])];

	const software: JsonLdNode = {
		"@type": "SoftwareSourceCode",
		"@id": pageUrl,
		url: pageUrl,
		name: input.project.data.title,
		description: input.project.data.shortDescription,
		codeRepository: input.project.data.github,
		programmingLanguage: input.project.data.tech,
		keywords: input.project.data.tech.join(", "),
		image: new URL(input.ogImageSrc, input.site).href,
		author: { "@id": personId },
		sameAs,
	};

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": `${pageUrl}#webpage`,
				url: pageUrl,
				name: input.project.data.title,
				description: input.project.data.shortDescription,
				isPartOf: { "@id": schemaId(input.site, "website") },
				breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
				mainEntity: { "@id": pageUrl },
			},
			{
				"@type": "BreadcrumbList",
				"@id": `${pageUrl}#breadcrumb`,
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: input.labels.home,
						item: homeUrl,
					},
					{
						"@type": "ListItem",
						position: 2,
						name: input.labels.projects,
						item: projectsUrl,
					},
					{
						"@type": "ListItem",
						position: 3,
						name: input.project.data.title,
						item: pageUrl,
					},
				],
			},
			software,
		],
	};
}

function slugify(text: string): string {
	return text
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

function schemaId(site: string, segment: string): string {
	return `${site}#${segment}`;
}

function parseExperiencePeriod(period: string): {
	startDate?: string;
	endDate?: string;
} {
	const [startRaw, endRaw] = period.split(/\s*[—–-]\s*/);

	const toYearMonth = (value: string | undefined): string | undefined => {
		if (!value) return undefined;
		const match = /^(\d{1,2})\/(\d{4})$/.exec(value.trim());
		if (!match?.[1] || !match[2]) return undefined;
		return `${match[2]}-${match[1].padStart(2, "0")}`;
	};

	const startDate = toYearMonth(startRaw);
	const endDate = toYearMonth(endRaw);

	return {
		...(startDate ? { startDate } : {}),
		...(endDate ? { endDate } : {}),
	};
}

function buildExperienceNodes(site: string, experiences: Experience[]): JsonLdNode[] {
	return experiences.map((experience) => {
		const id = schemaId(site, `experience-${slugify(experience.company)}`);
		const { startDate, endDate } = parseExperiencePeriod(experience.period);

		return {
			"@type": "OrganizationRole",
			"@id": id,
			roleName: experience.role,
			...(startDate ? { startDate } : {}),
			...(endDate ? { endDate } : {}),
			description: experience.summary,
			memberOf: {
				"@type": "Organization",
				name: experience.company,
			},
		};
	});
}

function buildProjectNodes(site: string, locale: Locale, projects: ProjectEntry[]): JsonLdNode[] {
	return projects.map((project) => {
		const pageUrl = getProjectPageUrl(site, project.id, locale);
		const liveUrl = project.data.link?.trim();
		const sameAs = [project.data.github, ...(liveUrl ? [liveUrl] : [])];

		return {
			"@type": "SoftwareSourceCode",
			"@id": pageUrl,
			url: pageUrl,
			name: project.data.title,
			description: project.data.shortDescription,
			codeRepository: project.data.github,
			programmingLanguage: project.data.tech,
			keywords: project.data.tech.join(", "),
			image: new URL(project.data.imageUrl.src, site).href,
			author: {
				"@id": schemaId(site, "person"),
			},
			sameAs,
		};
	});
}

function buildProjectsItemList(
	site: string,
	locale: Locale,
	projectsLabel: string,
	projects: ProjectEntry[],
): JsonLdNode {
	return {
		"@type": "ItemList",
		"@id": schemaId(site, "projects"),
		name: projectsLabel,
		itemListElement: projects.map((project, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@id": getProjectPageUrl(site, project.id, locale),
			},
		})),
	};
}
