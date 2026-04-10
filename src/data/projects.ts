import type { ImageMetadata } from "astro";

import apiEcommerce from "./images/projects/api-ecommerce.webp";
import blog from "./images/projects/blog.webp";
import disciplinas from "./images/projects/disciplinas.webp";
import ecommerce from "./images/projects/ecommerce.webp";
import ollama from "./images/projects/ollama-oracle.webp";
import restaurante from "./images/projects/restaurante.webp";

export interface Project {
	readonly title: string;
	readonly description: string;
	readonly tech: readonly string[];
	/** Import em `src/data/images/projects/` — Astro redimensiona no build */
	readonly imageUrl: ImageMetadata;
	readonly link: string;
	readonly github: string;
}

export const projects: readonly Project[] = [
	{
		title: "andre_OS: Notas, recomendações e ferramentas",
		description:
			"Criei esse blog com a intenção de ter um hub digital próprio onde eu pudesse centralizar tudo o que é útil para o meu dia a dia. O foco principal foi reunir, em um só lugar, ferramentas web simples que desenvolvi, recomendações de sites que utilizo e meus artigos sobre desenvolvimento. Construído com Astro e TypeScript, o projeto reflete minha busca por performance e organização. É a minha maneira de documentar o que aprendo e compartilhar recursos práticos com a comunidade.",
		tech: ["TypeScript", "Astro", "React", "Ferramentas", "Blog"],
		imageUrl: blog,
		link: "https://dev.andreximenes.xyz",
		github: "https://github.com/AndreXime/andre_OS",
	},
	{
		title: "Gerenciador de Grade Curricular Inteligente",
		description:
			"Desenvolvi esta aplicação para preencher uma lacuna na minha universidade: a ausência de um planejador acadêmico visual e eficiente. A ferramenta substitui o uso de planilhas manuais, permitindo que o estudante gerencie sua grade de horários de forma interativa. Construído com Next.js e Tailwind CSS, o sistema vai além da organização básica; implementei uma lógica de pré-requisitos que calcula automaticamente quais matérias estarão disponíveis para cursar nos próximos semestres, evitando conflitos e simplificando a tomada de decisão acadêmica.",
		tech: ["TypeScript", "Vite", "React", "Zustand", "Web App", "Local Storage"],
		imageUrl: disciplinas,
		link: "https://disciplina-uva.andreximenes.xyz/",
		github: "https://github.com/AndreXime/organiza-cc-uva",
	},
	{
		title: "API para E-commerce",
		description:
			"Construí a API REST de um e-commerce utilizando Bun, Hono e Prisma com PostgreSQL, abrangendo desde o catálogo com filtros até o fluxo completo de pedidos e carrinho persistido. Implementei a autenticação JWT com refresh tokens em cookies HttpOnly, reforçando a segurança com controle de acesso por cargos e revogação imediata no logout via blocklist de JTI no Redis. Assegurei a resiliência da aplicação através de rate limiting dinâmico e implementei processamento assíncrono de tarefas com BullMQ, além de integrar o AWS S3 para gestão de uploads. Estruturei o código em uma arquitetura modular validada com Zod, garantindo tipagem de ponta a ponta no TypeScript e geração automatizada dos contratos na documentação OpenAPI.",
		tech: ["TypeScript", "Hono", "AWS SDK", "PostgreSQL", "Open API"],
		imageUrl: apiEcommerce,
		link: "https://ecommerce-api.andreximenes.xyz",
		github: "https://github.com/AndreXime/ecommerce-backend",
	},
	{
		title: "E-commerce de Eletrônicos",
		description:
			"Desenvolvi o front-end de um e-commerce consumindo uma API REST externa, utilizando Astro para SSR, TypeScript, Preact e Tailwind CSS. Priorizei a otimização de bundle e os Core Web Vitals ao gerenciar o estado global com Nanostores e entregar ao cliente apenas o JavaScript necessário por rota. Construí a camada de integração repassando cookies durante a renderização no servidor em prol do SEO e implementei um fluxo robusto de refresh token com deduplicação de interceptadores para erros 401. Estruturei toda a jornada funcional da aplicação, abrangendo carrinho reativo, checkout em três etapas, área do cliente e um painel administrativo com paginação e busca sob demanda.",
		tech: ["TypeScript", "Next.js", "React", "UX/UI", "TailwindCSS"],
		imageUrl: ecommerce,
		link: "https://ecommerce.andreximenes.xyz/",
		github: "https://github.com/AndreXime/ecommerce",
	},
	{
		title: "Ollama Oracle: chat corporativo com RAG local",
		description:
			"Desenvolvi esse projeto para experimentar um assistente orientado a documentos internos, com pipeline completo de RAG rodando de ponta a ponta na minha máquina: ingestão de arquivos, embeddings e busca vetorial no ChromaDB, respostas em streaming via Ollama. O objetivo foi dominar o fluxo ingestão → vetor → recuperação → LLM sem depender de serviços externos para os dados sensíveis.",
		tech: ["TypeScript", "Bun", "Ollama", "ChromaDB", "RAG", "LangChain"],
		imageUrl: ollama,
		link: "",
		github: "https://github.com/AndreXime/ollama-oracle",
	},
	{
		title: "ERP Restaurante: Arquitetura Local-First",
		description:
			"Desenvolvi este sistema de gestão (ERP) para restaurantes como um desafio pessoal de engenharia: criar uma aplicação web complexa que funcionasse inteiramente no navegador, sem backend. A arquitetura é local-first e utiliza IndexedDB para persistir e gerenciar gigabytes de dados desde o histórico financeiro até o fluxo de pedidos em tempo real. O projeto é totalmente modular, integrando frentes de caixa (PDV), monitores de cozinha, gestão de delivery e contabilidade.",
		tech: ["TypeScript", "React", "IndexedDB", "Client-Side Architecture"],
		imageUrl: restaurante,
		link: "https://restaurante.andreximenes.xyz/",
		github: "https://github.com/AndreXime/restaurante",
	},
];
