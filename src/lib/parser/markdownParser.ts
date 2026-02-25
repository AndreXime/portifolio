import type { MarkdownRecord, ParserOptions } from "./types";
import { transformNode } from "./ast-parser";
import { applyTransformers } from "./text-transformers";
import type { ParseRule } from "./rules/rule";
import { ParserState } from "./parser-state";
import { HeadingRule } from "./rules/heading-rule";
import { KeyValueRule } from "./rules/key-value-rule";
import { TextRule } from "./rules/text-rule";

export class MarkdownParser<T = MarkdownRecord> {
	private options: ParserOptions<T>;
	private rules: ParseRule[];

	constructor(options: ParserOptions<T>) {
		this.options = options;

		this.rules = [new KeyValueRule(), new HeadingRule(), new TextRule()];
	}

	public parse(markdown: string): T {
		const state = new ParserState();

		for (const line of markdown.split(/\r?\n/)) {
			if (line.trimStart().startsWith("//")) continue;

			for (const rule of this.rules) {
				if (rule.apply(line, state)) {
					break;
				}
			}
		}

		const finalResult: MarkdownRecord = {};

		if (state.root.keyValues) {
			for (const [k, v] of Object.entries(state.root.keyValues)) {
				finalResult[k] = applyTransformers(v, this.options.transformers);
			}
		}

		const rootRawText = state.root.content.join("\n").trim();
		const rootText = applyTransformers(rootRawText, this.options.transformers);

		if (rootText) {
			finalResult._content = rootText;
		}

		for (const child of state.root.children) {
			finalResult[child.title] = transformNode(child, this.options.transformers);
		}

		return this.options.schema.parse(finalResult);
	}
}
