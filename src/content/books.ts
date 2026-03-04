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
			"Estou lendo para dominar os fundamentos de desacoplamento, mas com foco total em pragmatismo. O objetivo é absorver os conceitos para escrever código organizado, mas sabendo filtrar o que é excesso de engenharia para manter a agilidade da entrega.",
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
		title: "Soft Skills: The Software Developer's Life Manual",
		author: "John Sonmez",
		state: "Na lista de desejos",
		tag: "Carreira",
		review:
			"Vou ler este livro para aprender a me posicionar como um produto e atrair as melhores oportunidades através do marketing pessoal. O foco é construir uma autoridade técnica que me destaque em processos seletivos. Quero aplicar as estratégias de branding e produtividade para acelerar minha evolução profissional.",
		imageUrl: "softskills.jpg",
	},
	{
		title: "O Teste Da Mãe",
		author: "Rob Fitzpatrick",
		state: "Na lista de desejos",
		tag: "Business",
		review:
			"Leitura para aprimorar a extração de requisitos e regras de negócio. O foco é aprender a conduzir entrevistas que superem a dificuldade dos clientes em expressar necessidades reais, permitindo identificar edge cases e definir o escopo funcional correto antes de iniciar o desenvolvimento.",
		imageUrl: "teste-mae.jpg",
	},
	{
		title: "Leis da Psicologia Aplicadas a UX",
		author: "Jon Yablonski",
		state: "Na lista de desejos",
		tag: "Frontend",
		review:
			"Leitura para complementar o Refactoring UI com base teórica em psicologia cognitiva. O objetivo é aplicar heurísticas de UX para reduzir a carga cognitiva do usuário, eliminando decisões baseadas em 'achismo' e criando interfaces com fluxos de navegação óbvios.",
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
