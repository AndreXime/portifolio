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
