import type { ZodType, ZodTypeDef } from "zod";

export type MarkdownNode =
	| string
	| {
			_content?: string;
			[heading: string]: MarkdownNode | string | undefined;
	  };

export type MarkdownRecord = Record<string, MarkdownNode>;

export type TextTransformerFn = (text: string) => string;
export type LinkTransformerFn = (text: string, url: string) => string;

export interface ParserTransformers {
	bold?: TextTransformerFn;
	italic?: TextTransformerFn;
	inlineCode?: TextTransformerFn;
	link?: LinkTransformerFn;
}

export interface ParserOptions<T = MarkdownRecord> {
	transformers?: ParserTransformers;
	schema: ZodType<T, ZodTypeDef, unknown>;
}

export interface ASTNode {
	level: number;
	title: string;
	content: string[];
	children: ASTNode[];
	keyValues?: Record<string, string>;
}
