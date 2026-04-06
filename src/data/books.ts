import type { ImageMetadata } from "astro";

import arquiteturaLimpa from "./images/books/arquitetura-limpa.webp";
import entendendoAlgoritmos from "./images/books/entendo-algoritmos.webp";
import philosophy from "./images/books/philosophy.webp";
import refactoringUi from "./images/books/refactoring-ui.webp";
import softskills from "./images/books/softskills.webp";
import testeMae from "./images/books/teste-mae.webp";

export interface Book {
	readonly title: string;
	readonly author: string;
	/** Metadados da capa (import em `src/data/images/books/`) — Astro redimensiona no build */
	readonly imageUrl: ImageMetadata;
	readonly state: "Lido" | "Lendo atualmente" | "Na lista de desejos";
	readonly tag: string;
	readonly review?: string;
}

export const books: readonly Book[] = [
	{
		title: "Arquitetura Limpa",
		author: "Robert C. Martin",
		state: "Lendo atualmente",
		tag: "Arquitetura",
		review:
			"Considerado a bíblia dos programadores, estou lendo para dominar os fundamentos de desacoplamento com foco em viabilidade técnica e entrega. O objetivo é absorver os conceitos para escrever código organizado, mas sabendo filtrar o que é excesso de engenharia para manter a agilidade no dia a dia.",
		imageUrl: arquiteturaLimpa,
	},
	{
		title: "A Philosophy of Software Design",
		author: "John Ousterhout",
		state: "Na lista de desejos",
		tag: "Arquitetura",
		review:
			"Busco este livro como contraponto ao 'Clean Architecture'. Enquanto um foca na separação estrita de camadas, o Ousterhout ensina a reduzir a carga cognitiva através de 'Módulos Profundos'. Quero aprender a esconder a complexidade em vez de apenas espalhá-la em micro-classes, encontrando o equilíbrio ideal entre estrutura e simplicidade operacional.",
		imageUrl: philosophy,
	},
	{
		title: "Refactoring UI",
		author: "Adam Wathan & Steve Schoger",
		state: "Na lista de desejos",
		tag: "Frontend",
		review:
			"Meus sistemas funcionam bem, mas sempre ficam com aquela cara de 'feito por programador'. Não quero teoria das cores, quero a prática: quanto de sombra usar, qual tamanho de fonte, como alinhar. É para deixar meu projeto com cara profissional sem eu precisar virar designer.",
		imageUrl: refactoringUi,
	},
	{
		title: "Soft Skills: The Software Developer's Life Manual",
		author: "John Sonmez",
		state: "Na lista de desejos",
		tag: "Carreira",
		review:
			"Vou ler este livro para aprender a me posicionar como um produto e atrair as melhores oportunidades através do marketing pessoal. O foco é construir uma autoridade técnica que me destaque em processos seletivos. Quero aplicar as estratégias de branding e produtividade para acelerar minha evolução profissional.",
		imageUrl: softskills,
	},
	{
		title: "O Teste Da Mãe",
		author: "Rob Fitzpatrick",
		state: "Na lista de desejos",
		tag: "Business",
		review:
			"Leitura para aprimorar a extração de requisitos e regras de negócio. O foco é aprender a conduzir entrevistas que superem a dificuldade dos clientes em expressar necessidades reais, permitindo identificar edge cases e definir o escopo funcional correto antes de iniciar o desenvolvimento.",
		imageUrl: testeMae,
	},
	{
		title: "Entendendo Algoritmos",
		author: "Aditya Bhargava",
		state: "Lido",
		tag: "Didático",
		review:
			"Utilizei como base teórica para a disciplina de Construção e Análise de Algoritmos. O livro simplifica conceitos fundamentais como Big O e algoritmos de ordenação, servindo como uma revisão rápida e eficiente para qualquer nível de senioridade. Considero esta obra um pré-requisito prático para quem busca transitar de implementações básicas para o estudo acadêmico da computação.",
		imageUrl: entendendoAlgoritmos,
	},
];
