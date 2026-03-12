import type { ZodError } from "zod";
import { transformNode } from "./ast-parser";
import { ParserState } from "./parser-state";
import type { ParseRule } from "./rules/rule";
import { HeadingRule, KeyValueRule, TextRule } from "./rules/rule";
import { applyTransformers } from "./text-transformers";
import type { MarkdownRecord, ParserOptions, ParserTransformers } from "./types";

export class MarkdownParser<T = MarkdownRecord> {
	private schema: ParserOptions<T>["schema"];
	private transformers?: ParserTransformers;
	private rules: ParseRule[];

	constructor(options: ParserOptions<T>) {
		this.schema = options.schema;
		this.transformers = options.transformers;
		this.rules = [new KeyValueRule(), new HeadingRule(), new TextRule()];
	}

	public parse(markdown: string): T | ZodError {
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
				finalResult[k] = applyTransformers(v, this.transformers);
			}
		}

		for (const child of state.root.children) {
			const value = transformNode(child, this.transformers);
			const existing = finalResult[child.title];

			if (existing === undefined) {
				finalResult[child.title] = value;
			} else if (Array.isArray(existing)) {
				existing.push(value);
			} else {
				finalResult[child.title] = [existing, value];
			}
		}

		const parsed = this.schema.safeParse(finalResult);

		if (!parsed.success) {
			return parsed.error;
		}

		return parsed.data;
	}
}
