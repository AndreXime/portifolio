import type { ImageMetadata } from "astro";

import stackup from "./images/logos/stackup.webp";

export interface ExperienceHighlight {
	readonly label: string;
	readonly detail: string;
}

export interface Experience {
	readonly role: string;
	readonly company: string;
	readonly period: string;
	readonly summary: string;
	readonly highlights?: readonly ExperienceHighlight[];
	/** Import em `src/content/images/logos/` — Astro redimensiona no build */
	readonly logo?: ImageMetadata;
}

export const experiences: readonly Experience[] = [
	{
		role: "Desenvolvedor Fullstack",
		company: "Stackup Software",
		period: "10/2025 — 02/2026",
		logo: stackup,
		summary:
			"Atuei no ciclo de vida completo (SDLC) de um projeto de alta complexidade para o setor de seguros, com interface direta ao cliente no levantamento e refinamento de requisitos. Em ritmo acelerado de software house, traduzi regras de domínio do mercado segurador em arquitetura técnica e em código sustentável, cobrindo frontend e backend desde o estágio inicial até a orquestração do deploy, com foco em performance e manutenibilidade.",
		highlights: [
			{
				label: "Frontend",
				detail:
					"Rotas autenticadas centralizadas, sessão, limpeza de credenciais e redirects por perfil; menu e identidade em cookies assinados (somente leitura, TTL curto) para cortar chamadas repetidas ao backend. Multiportal com dezenas de jornadas na mesma base e fluxo de proposta em etapas com estado global e validações de domínio antes do envio.",
			},
			{
				label: "API e dados",
				detail:
					"Núcleo de API de garantias (autenticação, propostas, contratos, administrativo, análise) com validação estrita de payloads, Prisma/PostgreSQL, migrações na subida do serviço e reconexão ao banco com backoff exponencial para cold start ou instabilidade.",
			},
			{
				label: "Arquivos e regras de negócio",
				detail:
					"Upload via URLs assinadas, buckets bruto/processado e pipeline assíncrono (OCR em português) reconciliado à proposta. Governança de ciclo de vida com token conferido no banco, perfis e transições de status explícitas. Peças jurídicas e comerciais com Docxtemplater e modelos versionados em armazenamento objeto.",
			},
		],
	},
];
