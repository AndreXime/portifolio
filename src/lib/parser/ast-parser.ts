import type { ASTNode, MarkdownNode, ParserTransformers } from "./types";
import { applyTransformers } from "./text-transformers";

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

	if (textContent) {
		result._content = textContent;
	}

	for (const child of node.children) {
		result[child.title] = transformNode(child, transformers);
	}

	return result;
}
