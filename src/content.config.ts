import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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
			/** Recorte vertical só no card em destaque (desktop); mobile usa imageUrl */
			featuredImageUrl: image().optional(),
			link: z.string().optional(),
			github: z.string(),
		}),
});

const books = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
	schema: ({ image }) =>
		z.object({
			order: z.number().int().min(0),
			title: z.string(),
			author: z.string(),
			state: z.enum(["Lido", "Lendo atualmente", "Na lista de desejos"]),
			tag: z.string(),
			imageUrl: image(),
		}),
});

export const collections = { projects, books };
