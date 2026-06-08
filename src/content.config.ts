import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const portfolio = defineCollection({
	loader: glob({ pattern: "portfolio.md", base: "./src/content" }),
	schema: z.object({
		authorName: z.string(),
		email: z.string().email(),
		githubUrl: z.string().url(),
		linkedinUrl: z.string().url(),
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
	}),
});

const experiences = defineCollection({
	loader: glob({ pattern: "experiences.md", base: "./src/content" }),
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
	loader: glob({ pattern: "formations.md", base: "./src/content" }),
	schema: ({ image }) =>
		z.object({
			formations: z.array(
				z.object({
					title: z.string(),
					institution: z.string(),
					period: z.string(),
					description: z.string().optional(),
					logo: image(),
					link: z.string().url().optional(),
					featured: z.boolean().default(true),
				}),
			),
		}),
});

const technologies = defineCollection({
	loader: glob({ pattern: "technologies.md", base: "./src/content" }),
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
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: ({ image }) =>
		z.object({
			order: z.number().int().min(0),
			title: z.string(),
			shortDescription: z.string(),
			cardTagline: z.string().optional(),
			featured: z.boolean().default(false),
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
