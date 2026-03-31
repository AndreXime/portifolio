import { ZodError, z } from "zod";
import { MarkdownParser } from "@/lib/parser/markdownParser";
import aboutMd from "./about.md?raw";

function normalizeToArray<T extends z.ZodTypeAny>(element: T) {
	return z.preprocess((val: unknown) => {
		if (val === undefined || val === null) return val;
		if (Array.isArray(val)) return val;
		return [val];
	}, z.array(element));
}

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
	Formação: normalizeToArray(
		z.object({
			Nome: z.string(),
			Instituição: z.string(),
			Data: z.string(),
			Logo: z.string(),
			Link: z.string().optional(),
			Descrição: z.string().optional(),
			isSecondary: z.coerce.boolean().default(false),
		}),
	),
	Experiencias: normalizeToArray(
		z.object({
			Cargo: z.string(),
			Empresa: z.string(),
			Periodo: z.string(),
			ImageUrl: z.string(),
			Descrição: z.string(),
		}),
	),
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
