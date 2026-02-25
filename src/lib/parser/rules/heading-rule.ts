import type { ParseRule } from "./rule";
import type { ParserState } from "../parser-state";
import type { ASTNode } from "../types";

/**
 * Processa títulos baseados na sintaxe ATX do Markdown.
 * * ACEITA:
 * - De 1 a 6 caracteres `#` no início da linha.
 * - Exige obrigatoriamente pelo menos um espaço em branco (\s+) após os `#`.
 * - Ex: "# Título 1", "### Título 3", "###### Título 6"
 * * NÃO ACEITA:
 * - 7 ou mais `#` (tratado como texto normal).
 * - `#` colado no texto sem espaço (ex: "#Título").
 * - Linhas vazias.
 */
export class HeadingRule implements ParseRule {
	public apply(line: string, state: ParserState): boolean {
		const match = line.match(/^(#{1,6})\s+(.*)$/);
		if (!match) return false;

		const [, levelStr, titleStr] = match;
		if (!levelStr || !titleStr) return false;

		const level = levelStr.length;
		const title = titleStr.trim();
		const newNode: ASTNode = { level, title, content: [], children: [] };

		let current = state.current;
		while (state.stack.length > 1 && current.level >= level) {
			state.stack.pop();
			current = state.current;
		}

		current.children.push(newNode);
		state.stack.push(newNode);

		return true;
	}
}
