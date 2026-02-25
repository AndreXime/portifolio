import type { ParserState } from "../parser-state";

export interface ParseRule {
	apply(line: string, state: ParserState): boolean;
}
