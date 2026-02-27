export interface Book {
	title: string;
	author: string;
	imageUrl: string;
	state: "Lido" | "Lendo atualmente" | "Na lista de desejos";
	tag: string;
	review?: string;
}

export const Books: Book[] = [
	{
		title: "Arquitetura Limpa",
		author: "Robert C. Martin",
		state: "Lendo atualmente",
		tag: "Arquitetura",
		review:
			"Estou lendo para dominar os fundamentos de desacoplamento, mas com foco total em pragmatismo. O objetivo é absorver os conceitos para escrever código organizado, mas sabendo filtrar o que é excesso de engenharia (overengineering) para manter a agilidade da entrega.",
		imageUrl: "arquitetura-limpa.jpg",
	},
	{
		title: "A Philosophy of Software Design",
		author: "John Ousterhout",
		state: "Na lista de desejos",
		tag: "Arquitetura",
		review:
			"Busco este livro como contraponto ao 'Clean Architecture'. Enquanto um foca na separação estrita de camadas, o Ousterhout ensina a reduzir a carga cognitiva através de 'Módulos Profundos'. Quero aprender a esconder a complexidade em vez de apenas espalhá-la em micro-classes, encontrando o equilíbrio ideal entre estrutura e simplicidade operacional.",
		imageUrl: "philosophy.jpg",
	},
	{
		title: "Refactoring UI",
		author: "Adam Wathan & Steve Schoger",
		state: "Na lista de desejos",
		tag: "Frontend",
		review:
			"Meus sistemas funcionam bem, mas sempre ficam com aquela cara de 'feito por programador'. Não quero teoria das cores, quero a prática: quanto de sombra usar, qual tamanho de fonte, como alinhar. É para deixar meu projeto com cara profissional sem eu precisar virar designer.",
		imageUrl: "refactoring-ui.png",
	},
	{
		title: "Start small, Stay small",
		author: "Rob Walling",
		state: "Na lista de desejos",
		tag: "Business",
		review:
			"Muitas vezes caio na armadilha de focar só na tecnologia e esquecer o 'porquê'. Quero ler este livro para desenvolver meu senso de produto: aprender a priorizar features que trazem retorno real, evitar o desperdício de tempo em funcionalidades que ninguém usa e ter visão estratégica das soluções que construo.",
		imageUrl: "start-small.jpg",
	},
	{
		title: "O Teste Da Mãe",
		author: "Rob Fitzpatrick",
		state: "Na lista de desejos",
		tag: "Business",
		review:
			"Todo mundo mente para ser educado quando mostro minhas ideias. Quero ler esse livro para aprender a fazer as perguntas certas e descobrir se o problema do cliente é real mesmo, antes de desperdiçar 3 meses codando um software que vai pro lixo.",
		imageUrl: "teste-mae.jpg",
	},
	{
		title: "Leis da Psicologia Aplicadas a UX",
		author: "Jon Yablonski",
		state: "Na lista de desejos",
		tag: "Frontend",
		review:
			"Às vezes faço uma tela e o usuário fica perdido sem saber onde clicar. Quero entender como o cérebro das pessoas funciona para parar de 'chutar' o design e criar interfaces óbvias, onde o usuário navega sem precisar pensar duas vezes.",
		imageUrl: "psicologia-ux.jpg",
	},

	/* Livros secondarios */
	{
		title: "Não me Faça Pensar",
		author: "Steve Krug",
		state: "Lido",
		tag: "",
		imageUrl: "nao-faca-pensar.jpg",
	},
	{
		title: "Entendendo Algoritmos",
		author: "Aditya Bhargava",
		state: "Lido",
		tag: "",
		imageUrl: "entendo-algoritmos.jpg",
	},
];
