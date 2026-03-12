import { applyTransformers } from "./text-transformers";
import type { ASTNode, MarkdownNode, ParserTransformers } from "./types";

function appendNode(record: Record<string, MarkdownNode>, key: string, value: MarkdownNode) {
	const existing = record[key];

	if (existing === undefined) {
		record[key] = value;
		return;
	}

	if (Array.isArray(existing)) {
		existing.push(value);
		return;
	}

	record[key] = [existing, value];
}

export function transformNode(node: ASTNode, transformers?: ParserTransformers): MarkdownNode {
	const result: Record<string, MarkdownNode> = {};

	if (node.keyValues) {
		for (const [k, v] of Object.entries(node.keyValues)) {
			result[k] = applyTransformers(v, transformers);
		}
	}

	const rawText = node.content.join("\n").trim();
	const textContent = applyTransformers(rawText, transformers);

	if (node.children.length === 0 && !node.keyValues) {
		return textContent;
	}

	for (const child of node.children) {
		const value = transformNode(child, transformers);
		appendNode(result, child.title, value);
	}

	return result;
}
