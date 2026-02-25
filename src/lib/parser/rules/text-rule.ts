import type { ParseRule } from "./rule";
import type { ParserState } from "../parser-state";

/**
 * Regra de fallback (Catch-all) do padrão Chain of Responsibility.
 * * ACEITA:
 * - Qualquer linha que tenha falhado nas regras anteriores.
 * - Acumula o texto no buffer `content` do nó corrente da AST.
 * - Pode receber quebras de linha implícitas, pois o método `parse` itera
 * linha a linha, e o `transformNode` fará o `join('\n')` posteriormente,
 * garantindo o comportamento multi-line para parágrafos.
 */
export class TextRule implements ParseRule {
	public apply(line: string, state: ParserState): boolean {
		state.current.content.push(line);
		return true;
	}
}
