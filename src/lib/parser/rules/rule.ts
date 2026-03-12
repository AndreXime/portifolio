import type { ParserState } from "../parser-state";

export interface ParseRule {
	apply(line: string, state: ParserState): boolean;
}

export { HeadingRule } from "./heading-rule";
export { KeyValueRule } from "./key-value-rule";
export { TextRule } from "./text-rule";
