import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const portfolioSchema = z.object({
	authorName: z.string(),
	email: z.email(),
	githubUrl: z.url(),
	linkedinUrl: z.url(),
	blogUrl: z.url(),
	resumePdfUrl: z.string(),
	seo: z.object({
		title: z.string(),
		description: z.string(),
		ogImageAlt: z.string(),
	}),
	person: z.object({
		fullName: z.string(),
		jobTitle: z.string(),
		description: z.string(),
	}),
	hero: z.object({
		headline: z.string(),
		headlineAccent: z.string(),
		intro: z.string(),
		stackLine: z.string(),
		availabilityLabel: z.string(),
		availabilityValue: z.string(),
		locationValue: z.string(),
	}),
	about: z.object({
		photoAlt: z.string(),
		quote: z.string(),
		paragraphs: z.array(z.string()).min(1),
	}),
	sections: z.object({
		experiencesIntro: z.string(),
		projectsSubtitle: z.string(),
	}),
	cta: z.object({
		title: z.string(),
		body: z.string(),
	}),
});

const portfolio = defineCollection({
	loader: glob({
		pattern: "*/portfolio.md",
		base: "./src/locales",
		generateId: ({ entry }) => entry.replace(/\/portfolio\.md$/, ""),
	}),
	schema: portfolioSchema,
});

const experiences = defineCollection({
	loader: glob({
		pattern: "*/experiences.md",
		base: "./src/locales",
		generateId: ({ entry }) => entry.replace(/\/experiences\.md$/, ""),
	}),
	schema: ({ image }) =>
		z.object({
			experiences: z.array(
				z.object({
					role: z.string(),
					company: z.string(),
					period: z.string(),
					summary: z.string(),
					highlights: z.array(z.string()).optional(),
					logo: image().optional(),
				}),
			),
		}),
});

const formations = defineCollection({
	loader: glob({
		pattern: "*/formations.md",
		base: "./src/locales",
		generateId: ({ entry }) => entry.replace(/\/formations\.md$/, ""),
	}),
	schema: ({ image }) =>
		z.object({
			formations: z.array(
				z.object({
					title: z.string(),
					institution: z.string(),
					period: z.string(),
					description: z.string().optional(),
					logo: image(),
					link: z.url().optional(),
					featured: z.boolean().default(false),
				}),
			),
		}),
});

const technologies = defineCollection({
	loader: glob({
		pattern: "*/technologies.md",
		base: "./src/locales",
		generateId: ({ entry }) => entry.replace(/\/technologies\.md$/, ""),
	}),
	schema: z.object({
		technologies: z.array(
			z.object({
				name: z.string(),
				role: z.string(),
				icons: z.array(z.string()),
			}),
		),
	}),
});

const projects = defineCollection({
	loader: glob({
		pattern: "*/projects/*.md",
		base: "./src/locales",
		generateId: ({ entry }) => {
			const withoutExt = entry.replace(/\.md$/, "");
			const [locale, , slug] = withoutExt.split("/");
			return `${locale}/${slug}`;
		},
	}),
	schema: ({ image }) =>
		z.object({
			order: z.number().int().min(0),
			title: z.string(),
			shortDescription: z.string(),
			tech: z.array(z.string()),
			imageUrl: image(),
			featuredImageUrl: image().optional(),
			link: z.string().optional(),
			github: z.string(),
		}),
});

export const collections = {
	portfolio,
	experiences,
	formations,
	technologies,
	projects,
};
