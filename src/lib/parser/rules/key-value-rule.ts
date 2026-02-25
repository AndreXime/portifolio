import type { ParseRule } from "./rule";
import type { ParserState } from "../parser-state";

/**
 * Processa metadados no formato chave-valor.
 * * ACEITA:
 * - Chaves: letras Unicode (incl. acentuadas), números, underscores (_), hifens (-) e espaços.
 * - Um caractere de dois-pontos `:` separando a chave do valor.
 * - Espaços opcionais após os dois-pontos.
 * - Restrito a uma única linha (single-line). O valor não pode quebrar a linha.
 * - Ex: "Email: teste@teste.com", "Github: https://...", "Minha Chave-1: Valor"
 * * NÃO ACEITA:
 * - Valores multilinhas. Quebras de linha encerram a captura daquele valor.
 * - Chaves contendo caracteres que não sejam letras, números, _, - ou espaço.
 * - Isso evita capturar acidentalmente URLs soltas no texto como chaves (ex: "https://site.com").
 */
export class KeyValueRule implements ParseRule {
	public apply(line: string, state: ParserState): boolean {
		const match = line.match(/^([\p{L}\p{N}_ -]+):\s*(.*)$/u);
		if (!match) return false;

		const [, key, value] = match;
		if (!key || value === undefined) return false;

		const current = state.current;
		current.keyValues ??= {};
		current.keyValues[key.trim()] = value.trim();

		return true;
	}
}
