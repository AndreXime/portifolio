import type { Project } from "./types";

export const Projects: Project[] = [
	{
		title: "andre_OS: Notas, recomendações e ferramentas",
		description:
			"Criei esse blog com a intenção de ter um hub digital próprio onde eu pudesse centralizar tudo o que é útil para o meu dia a dia. O foco principal foi reunir, em um só lugar, ferramentas web simples que desenvolvi, recomendações de sites que utilizo e meus artigos sobre desenvolvimento. Construído com Astro e TypeScript, o projeto reflete minha busca por performance e organização. É a minha maneira de documentar o que aprendo e compartilhar recursos práticos com a comunidade.",
		type: "app",
		tech: ["TypeScript", "Astro", "Preact", "Ferramentas", "Blog", "Content Collections"],
		imageUrl: "blog.png",
		link: "https://dev.andreximenes.xyz",
		github: "https://github.com/AndreXime/andre_OS",
	},
	{
		title: "Plataforma de Captação de Projetos B2B para Freelancers",
		description:
			"Desenvolvi esta landing page conceitual para demonstrar, na prática, minha habilidade em criar interfaces de alta conversão utilizando a performance do Astro. Embora o projeto leve meu nome e simule uma oferta de serviços, ele serve principalmente como uma prova técnica de que sei construir páginas de vendas rápidas e profissionais do zero. O objetivo é mostrar a potenciais clientes o padrão de qualidade e otimização que posso entregar para os seus negócios.",
		type: "landing page",
		tech: ["TypeScript", "Astro", "Preact", "TailwindCSS", "Performance & SEO"],
		imageUrl: "contrate.png",
		link: "https://contrate.andreximenes.xyz/",
		github: "https://github.com/AndreXime/contrate",
	},
	{
		title: "Gerenciador de Grade Curricular Inteligente",
		description:
			"Desenvolvi esta aplicação para preencher uma lacuna na minha universidade: a ausência de um planejador acadêmico visual e eficiente. A ferramenta substitui o uso de planilhas manuais, permitindo que o estudante gerencie sua grade de horários de forma interativa. Construído com Next.js e Tailwind CSS, o sistema vai além da organização básica; implementei uma lógica de pré-requisitos que calcula automaticamente quais matérias estarão disponíveis para cursar nos próximos semestres, evitando conflitos e simplificando a tomada de decisão acadêmica.",
		type: "app",
		tech: ["TypeScript", "Next.js", "Local Storage", "Zustand"],
		imageUrl: "disciplinas.png",
		link: "https://disciplina-uva.andreximenes.xyz/",
		github: "https://github.com/AndreXime/organiza-cc-uva",
	},
	{
		title: "PDV para Restaurantes (Offline-First)",
		description:
			"Sistema de Ponto de Venda (PDV) completo para restaurantes, 100% offline, usando IndexedDB para armazenamento local de dados.",
		type: "app",
		tech: ["TypeScript", "React", "IndexedDB", "Client-Side Architecture", "PDV"],
		imageUrl: "restaurante.png",
		link: "https://restaurante.andreximenes.xyz/",
		github: "https://github.com/AndreXime/restaurante",
	},
	{
		title: "E-commerce de Eletrônicos",
		description:
			"Plataforma desenvolvida para ecommerce com visual polido e focado na experiencia de usuario, com todas as funcionalidades essenciais como: Autenticação, Filtragem de produtos, Carrinho e Pagamento.",
		type: "landing page",
		tech: ["TypeScript", "Next.js", "React", "UX/UI", "TailwindCSS"],
		imageUrl: "ecommerce.png",
		link: "https://ecommerce.andreximenes.xyz/",
		github: "",
	},

	{
		title: "E-commerce RESTful API",
		description:
			"API RESTful completa para e-commerce (carrinho, autenticação JWT, CRUD) construída em Go com o framework Gin e GORM.",
		type: "api",
		tech: ["Go (Golang)", "Gin Framework", "GORM", "Swagger", "Testes E2E", "API REST"],
		imageUrl: "lojagin.png",
		link: "",
		github: "https://github.com/AndreXime/lojagin-api",
	},
	{
		title: "PixelPress: Processador de Imagens via CLI",
		description:
			"Ferramenta CLI para edição em massa de imagens com interface interativa, focada em compressão inteligente e conversão de formato.",
		type: "cli",
		tech: ["Go (Golang)", "CLI", "FFmpeg", "Otimização de Imagens"],
		imageUrl: "pixelpress.png",
		link: "",
		github: "https://github.com/AndreXime/pixel-press",
	},
	{
		title: "Media Downloader via Linha de Comando",
		description:
			"Ferramenta CLI para baixar videos e musicas do youtube usando yt-dlp, tendo a possibilidade de baixar a playlist inteira.",
		type: "cli",
		tech: ["Go (Golang)", "CLI", "yt-dlp", "Downloader"],
		imageUrl: "yt-downloader.png",
		link: "",
		github: "https://github.com/AndreXime/youtube-downloader",
	},
];
