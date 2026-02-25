import type { ParserTransformers } from "./types";

export function applyTransformers(text: string, transformers?: ParserTransformers): string {
	if (!transformers) return text;

	let result = text;
	const { bold, italic, inlineCode, link } = transformers;

	if (bold) {
		result = result.replace(/\*\*(.*?)\*\*/g, (_, p1: string) => bold(p1));
	}

	if (italic) {
		result = result.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, (_, p1: string) => italic(p1));
	}

	if (inlineCode) {
		result = result.replace(/`(.*?)`/g, (_, p1: string) => inlineCode(p1));
	}

	if (link) {
		result = result.replace(/\[(.*?)\]\((.*?)\)/g, (_, textMatch: string, urlMatch: string) =>
			link(textMatch, urlMatch),
		);
	}

	return result;
}
