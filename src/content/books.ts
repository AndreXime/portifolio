export interface book {
	title: string;
	author: string;
	imageurl: string;
	state: "Lido" | "Lendo atualmente" | "Na lista de desejos";
	review: string;
}

export const books: book[] = [
	{
		title: "Entendendo Algoritmos",
		author: "Aditya Bhargava",
		state: "Lido",
		review:
			"Fundamental para minha base acadêmica e preparação para entrevistas técnicas. A abordagem visual torna conceitos como Big O e Grafos intuitivos, facilitando muito a resolução de desafios de código e lógica.",
		imageurl: "entendo-algoritmos.jpg",
	},
	{
		title: "Não me Faça Pensar",
		author: "Steve Krug",
		state: "Lido",
		review:
			"Bom para o mindset, mas raso para engenharia. O conteúdo foca muito em 'senso comum' e carece de diretrizes técnicas de implementação prática para quem constrói a interface.",
		imageurl: "nao-faca-pensar.jpg",
	},
	{
		title: "Arquitetura Limpa",
		author: "Robert C. Martin",
		state: "Lendo atualmente",
		review:
			"Eu já entregava soluções funcionais, mas buscava a organização estrutural de um engenheiro de software. A leitura está preenchendo essa lacuna, trazendo a maturidade e a ordem que faltavam para profissionalizar minha arquitetura.",
		imageurl: "arquitetura-limpa.jpg",
	},
	{
		title: "Startup Enxuta",
		author: "Eric Ries",
		state: "Na lista de desejos",
		review:
			"Meu próximo passo para ir além do código e entender o negócio. Quero dominar o ciclo de feedback para extrair a necessidade real do cliente e garantir que cada linha de código escrita gere valor de verdade, evitando desperdício.",
		imageurl: "startup-enxuta.jpg",
	},
	{
		title: "Leis da Psicologia Aplicadas a UX",
		author: "Jon Yablonski",
		state: "Na lista de desejos",
		review:
			"Sempre senti que minhas interfaces poderiam ser mais intuitivas, mas me faltava o embasamento teórico. Quero entender os padrões cognitivos por trás do design para parar de 'chutar' soluções e começar a aplicar regras que funcionam com o cérebro do usuário.",
		imageurl: "psicologia-ux.jpg",
	},
	{
		title: "Refactoring UI",
		author: "Adam Wathan & Steve Schoger",
		state: "Na lista de desejos",
		review:
			"A resposta para a sensação constante de que 'falta algo' no visual dos meus projetos. Busco táticas práticas e visuais para preencher a lacuna entre um frontend que apenas funciona e uma interface com acabamento profissional e polido.",
		imageurl: "refactoring-ui.png",
	},
	{
		title: "Implementando DDD",
		author: "Vaughn Vernon",
		state: "Na lista de desejos",
		review:
			"Enquanto o 'Arquitetura Limpa' me ensinou a isolar o domínio, quero entender como o DDD ajuda a preencher esse domínio. Meu objetivo é investigar como modelar regras de negócio complexas e evitar modelos anêmicos, descobrindo como ele complementa a estrutura técnica que já aprendi.",
		imageurl: "implementando-ddd.jpg",
	},
];
