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

	result = transformMarkdownLists(result);

	return result;
}

function transformMarkdownLists(text: string): string {
	const lines = text.split(/\r?\n/);
	let html = "";
	let inList = false;

	for (const line of lines) {
		const listMatch = line.match(/^\s*[-*]\s+(.*)$/);

		if (listMatch) {
			if (!inList) {
				inList = true;
				html += '<ul class="list-disc pl-4 mt-2">';
			}

			html += `<li>${listMatch[1]}</li>`;
		} else {
			if (inList) {
				html += "</ul>";
				inList = false;
			}

			if (html) {
				html += "\n";
			}

			html += line;
		}
	}

	if (inList) {
		html += "</ul>";
	}

	return html;
}
