export interface book {
	title: string;
	author: string;
	imageurl: string;
	state: "Lido" | "Lendo atualmente" | "Na fila" | "Referência";
	review: string;
}

export const books: book[] = [
	{
		title: "Entendendo Algoritmos",
		author: "Aditya Bhargava",
		state: "Lido",
		review:
			"A abordagem visual tornou conceitos como Big O e Grafos muito mais intuitivos. Foi a base fundamental para eu entender como escolher a estrutura de dados certa para cada problema de performance.",
		imageurl: "entendo-algoritmos.jpg",
	},
	{
		title: "Arquitetura Limpa",
		author: "Robert C. Martin",
		state: "Lendo atualmente",
		review:
			"Estou aprofundando em como desacoplar a lógica de negócio de ferramentas externas. O foco em manter o núcleo da aplicação independente de frameworks e bancos de dados é um divisor de águas.",
		imageurl: "arquitetura-limpa.jpg",
	},
	{
		title: "Startup Enxuta",
		author: "Eric Ries",
		state: "Na fila",
		review:
			"Quero ler para entender melhor o ciclo construir-medir-aprender. Como desenvolvedor, acredito que entender sobre MVP e validação de produto ajuda a entregar código que realmente gera valor.",
		imageurl: "startup-enxuta.jpg",
	},
	{
		title: "Implementando DDD",
		author: "Vaughn Vernon",
		state: "Na fila",
		review:
			"Este está na fila para elevar meu nível em modelagem de sistemas complexos. O objetivo é aprender a usar contextos delimitados e linguagem ubíqua para aproximar o código do mundo real.",
		imageurl: "implementando-ddd.jpg",
	},
];
