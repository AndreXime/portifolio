export interface Book {
	title: string;
	author: string;
	imageUrl: string;
	state: "Lido" | "Lendo atualmente" | "Na lista de desejos";
	tag: string;
	review?: string;
}

export interface Project {
	title: string;
	description: string;
	type: "app" | "api" | "cli" | "landing page";
	tech: string[];
	imageUrl: string;
	link: string;
	github: string;
}

export interface TechItem {
	name: string;
	role: string;
	icons: string[];
}

export interface SocialLinks {
	email: string;
	github: string;
	linkedin: string;
}

export interface About {
	trajetoria: string[];
	highlights: {
		stackPrincipal: string;
		experience: string;
		location: string;
	};
	experience: {
		role: string;
		company: string;
		period: string;
		description?: string;
	}[];
	education: {
		degree: string;
		institution: string;
		period: string;
		description: string;
	}[];
}

export interface ParsedAbout {
	socialLinks: SocialLinks;
	heroText: string;
	about: About;
}
