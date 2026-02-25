import { MarkdownParser } from "@/lib/parser/markdownParser";
import { z } from "zod";
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
		Descrição: z.string(),
	}),
	Experiencias: z.object({
		Cargo: z.string(),
		Empresa: z.string(),
		Periodo: z.string(),
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

export const { Links, Hero, Sobre, Formação, Experiencias } = parser.parse(aboutMd);
