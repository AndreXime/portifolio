import {
	type SimpleIcon,
	siAstro,
	siBun,
	siDocker,
	siGit,
	siGithub,
	siGithubactions,
	siJest,
	siNestjs,
	siNextdotjs,
	siNodedotjs,
	siPostgresql,
	siPrisma,
	siRedis,
	siTailwindcss,
	siTypescript,
	siVite,
} from "simple-icons";
import { content } from "./content";

const bySlug: Record<string, SimpleIcon> = {
	typescript: siTypescript,
	nodedotjs: siNodedotjs,
	bun: siBun,
	nestjs: siNestjs,
	postgresql: siPostgresql,
	redis: siRedis,
	prisma: siPrisma,
	docker: siDocker,
	githubactions: siGithubactions,
	git: siGit,
	github: siGithub,
	nextdotjs: siNextdotjs,
	astro: siAstro,
	vite: siVite,
	tailwindcss: siTailwindcss,
	jest: siJest,
};

export function getTechIcons(): SimpleIcon[] {
	return content.techIconSlugs.map((slug) => {
		const icon = bySlug[slug];
		if (!icon) {
			throw new Error(`Ícone simple-icons ausente: ${slug}`);
		}
		return icon;
	});
}
