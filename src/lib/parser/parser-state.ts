import type { ASTNode } from "./types";

export class ParserState {
	public readonly root: ASTNode = { level: 0, title: "root", content: [], children: [] };
	public stack: ASTNode[] = [this.root];

	public get current(): ASTNode {
		const node = this.stack[this.stack.length - 1];
		if (!node) throw new Error("A pilha da AST foi corrompida.");
		return node;
	}
}
