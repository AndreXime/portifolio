export interface Project {
	title: string;
	description: string;
	type: "app" | "api" | "cli" | "landing page";
	tech: string[];
	image: string;
	link: string;
	github: string;
}

export const projects: Project[] = [
	{
		title: "Restaurante Tech",
		description:
			"Sistema de Ponto de Venda (PDV) completo para restaurantes, 100% offline, usando IndexedDB para armazenamento local de dados.",
		type: "app",
		tech: [
			"TypeScript",
			"React",
			"IndexedDB",
			"Client-Side Architecture",
			"PDV",
		],
		image: "restaurante.png",
		link: "https://restaurante.andreximenes.xyz/",
		github: "https://github.com/AndreXime/restaurante",
	},
	{
		title: "Pagina para Contratação Freelancer",
		description:
			"Desenvolvida para empresas descobrirem e contratarem serviços de desenvolvimento. Utiliza a performance do Astro e a confiabilidade do TypeScript. A arquitetura otimizada em UI/UX transforma a experiência do usuário em uma vantagem competitiva, facilitando a decisão de contratação.",
		type: "landing page",
		tech: ["TypeScript", "Astro", "Preact", "SSR", "UX / UI"],
		image: "contrate.png",
		link: "https://contrate.andreximenes.xyz/",
		github: "",
	},
	{
		title: "Organizador de Disciplinas",
		description:
			"Ferramenta para alunos de Ciência da Computação planejarem semestres, calculando pré-requisitos e montando grade horária visualmente.",
		type: "app",
		tech: ["TypeScript", "React", "Local Storage", "Estruturas de Dados"],
		image: "disciplinas.png",
		link: "https://disciplina-uva.andreximenes.xyz/",
		github: "https://github.com/AndreXime/organiza-cc-uva",
	},
	{
		title: "Plataforma ecommerce para venda de eletronicos",
		description:
			"Plataforma desenvolvida para ecommerce com visual polido e focado na experiencia de usuario, com todas as funcionalidades essenciais como: Autenticação, Filtragem de produtos, Carrinho e Pagamento.",
		type: "landing page",
		tech: ["TypeScript", "Next.js", "React", "UX/UI", "TailwindCSS"],
		image: "ecommerce.png",
		link: "https://ecommerce.andreximenes.xyz/",
		github: "",
	},
	{
		title: "MiniHub",
		description:
			"Ferramentas para o dia a dia, como gerar senhas ou até mais complexas como gerar um resumo quanto gasta de gasolina com esse trajeto por mẽs",
		type: "app",
		tech: ["TypeScript", "React", "Ferramenta para dia a dia", "UX / UI"],
		image: "minihub.png",
		link: "https://ferramentas.andreximenes.xyz/",
		github: "http://github.com/AndreXime/minihub",
	},
	{
		title: "Loja Gin API",
		description:
			"API RESTful completa para e-commerce (carrinho, autenticação JWT, CRUD) construída em Go com o framework Gin e GORM.",
		type: "api",
		tech: [
			"Go (Golang)",
			"Gin Framework",
			"GORM",
			"Swagger",
			"Testes E2E",
			"API REST",
		],
		image: "lojagin.png",
		link: "",
		github: "https://github.com/AndreXime/lojagin-api",
	},
	{
		title: "PixelPress",
		description:
			"Ferramenta CLI para edição em massa de imagens com interface interativa, focada em compressão inteligente e conversão de formato.",
		type: "cli",
		tech: ["Go (Golang)", "CLI", "FFmpeg", "Otimização de Imagens"],
		image: "pixelpress.png",
		link: "",
		github: "https://github.com/AndreXime/pixel-press",
	},
	{
		title: "Youtube Downloader",
		description:
			"Ferramenta CLI para baixar videos e musicas do youtube usando yt-dlp, tendo a possibilidade de baixar a playlist inteira.",
		type: "cli",
		tech: ["Go (Golang)", "CLI", "yt-dlp", "Downloader"],
		image: "yt-downloader.png",
		link: "",
		github: "https://github.com/AndreXime/youtube-downloader",
	},
];
