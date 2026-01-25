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
		title: "ERP Restaurante: Arquitetura Local-First",
		description:
			"Desenvolvi este sistema de gestão (ERP) para restaurantes como um desafio pessoal de engenharia: criar uma aplicação web complexa que funcionasse inteiramente no navegador, sem backend. A arquitetura é local-first e utiliza IndexedDB para persistir e gerenciar gigabytes de dados desde o histórico financeiro até o fluxo de pedidos em tempo real. O projeto é totalmente modular, integrando frentes de caixa (PDV), monitores de cozinha, gestão de delivery e contabilidade.",
		type: "app",
		tech: ["TypeScript", "React", "IndexedDB", "Client-Side Architecture"],
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
		title: "E-commerce RESTful API com Go",
		description:
			"Desenvolvi esta API RESTful para e-commerce com o objetivo de explorar a eficiência e a tipagem forte do ecossistema Go. O projeto foi estruturado seguindo uma arquitetura em camadas (Repository, Service, Handler), garantindo desacoplamento e facilidade de manutenção. Além das regras de negócio como carrinho de compras e autenticação JWT, foquei em boas práticas de engenharia de software: a aplicação é totalmente containerizada com Docker, documentada via Swagger e validada por uma suíte de testes End-to-End (E2E).",
		type: "api",
		tech: ["Go", "Gin Framework", "GORM", "Swagger", "Testes E2E", "API REST"],
		imageUrl: "lojagin.png",
		link: "",
		github: "https://github.com/AndreXime/lojagin-api",
	},
	{
		title: "PixelPress: Processador de Imagens via CLI",
		description:
			"Uma ferramenta de linha de comando interativa para conversão e compressão de imagens em massa. Desenvolvida em Go, utiliza o framework Bubble Tea para a interface e orquestra o FFmpeg em segundo plano. Implementei uma lógica de compressão recursiva que ajusta a qualidade automaticamente até que o arquivo atinja o tamanho alvo definido pelo usuário.",
		type: "cli",
		tech: ["Go", "CLI", "FFmpeg", "Otimização de Imagens"],
		imageUrl: "pixelpress.png",
		link: "",
		github: "https://github.com/AndreXime/pixel-press",
	},
	{
		title: "YouTube Downloader via Linha de Comando",
		description:
			"Criei esse CLI para resolver a frustração de baixar músicas em massa, já que os conversores online geralmente impõem limites. Desenvolvido em Go, o projeto atua como uma interface para o yt-dlp, permitindo baixar playlists inteiras e converter para MP3 ou MP4 automaticamente. O diferencial está no UX no terminal, utilizei as bibliotecas huh e lipgloss para criar formulários elegantes e implementei concorrência com goroutines e channels para renderizar o progresso do download e o status dos arquivos na pasta simultaneamente, sem travar a interface.",
		type: "cli",
		tech: ["Go", "CLI", "yt-dlp", "Concurrency"],
		imageUrl: "yt-downloader.png",
		link: "",
		github: "https://github.com/AndreXime/youtube-downloader",
	},
];
