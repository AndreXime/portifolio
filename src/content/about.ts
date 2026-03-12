import { ZodError, z } from "zod";
import { MarkdownParser } from "@/lib/parser/markdownParser";
import aboutMd from "./about.md?raw";

const personalData = z.object({
	Links: z.object({
		Email: z.string(),
		Github: z.string(),
		Linkedin: z.string(),
	}),
	Hero: z.string(),
	Sobre: z.object({
		Destaques: z.object({
			Stack: z.string(),
			Experiência: z.string(),
			Localização: z.string(),
		}),
		Trajetoria: z.string(),
	}),
	Formação: z.object({
		Curso: z.string(),
		Instituição: z.string(),
		Periodo: z.string(),
		ImageUrl: z.string(),
		Descrição: z.string(),
	}),

	Experiencias: z.object({
		Cargo: z.string(),
		Empresa: z.string(),
		Periodo: z.string(),
		ImageUrl: z.string(),
		Descrição: z.string(),
	}),
});

export type personalData = z.infer<typeof personalData>;

const parser = new MarkdownParser({
	schema: personalData,
	transformers: {
		bold: (text) => `<span class="font-bold text-primary">${text}</span>`,
		italic: (text) => `<span class="italic">${text}</span>`,
	},
});

const parsed = parser.parse(aboutMd);

if (parsed instanceof ZodError) {
	throw parsed;
}

export const { Links, Hero, Sobre, Formação, Experiencias } = parsed;
