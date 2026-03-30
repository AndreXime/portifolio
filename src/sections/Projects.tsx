import { ExternalLink, Github } from "lucide-preact";
import { useMemo, useState } from "preact/hooks";
import ImageLoader from "@/components/ImageLoader";
import SectionHeader from "../components/ui/SectionHeader";
import type { Project } from "../content/projects";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
	const [filter, setFilter] = useState<"all" | "minimal">("minimal");

	const filteredProjects = useMemo(() => {
		if (filter === "minimal") return projects.slice(0, 3);
		return projects;
	}, [filter]);

	return (
		<section id="projetos" className="py-20 bg-bgSectionAlt border-y border-border">
			<div data-reveal-time={0} class="reveal reveal-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeader
						bagde="Portfólio"
						title="Meus Projetos"
						subtitle="O resultado prático dos meus estudos, aplicações onde solidifico meus conhecimentos e testo novas
							abordagens."
					/>

					<div className="grid grid-cols-1 gap-8 min-h-[400px] max-w-4xl mx-auto lg:max-w-none">
						{filteredProjects.map((project, index) => {
							let responsiveClass = "";

							if (filter === "minimal") {
								if (index === 2) responsiveClass = "hidden lg:block";
							}

							return (
								<div key={project.title} className={responsiveClass}>
									<ProjectCard project={project} />
								</div>
							);
						})}
						{(filter === "minimal" || filter === "all") && (
							<div className="flex justify-center items-center col-span-full">
								<button
									type="button"
									onClick={() => setFilter(filter === "all" ? "minimal" : "all")}
									aria-label={
										filter === "minimal" ? "Expandir para ver todos os projetos" : "Recolher e mostrar menos projetos"
									}
									className={`px-4 py-2 rounded-lg font-medium transition-all bg-primaryDark text-white shadow-lg shadow-primary/30 hover:bg-primary hover:shadow-xl`}
								>
									{filter === "minimal" && "Ver todos projetos"}
									{filter === "all" && "Esconder projetos"}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

function ProjectCard({ project }: { project: Project }) {
	const imageHref = project.link?.trim() || project.github?.trim() || null;
	const imageLinkLabel = project.link?.trim()
		? `Abrir site do projeto ${project.title}`
		: `Ver repositório do projeto ${project.title} no GitHub`;

	return (
		<div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border/60 bg-surface shadow-sm transition-all hover:border-primary/30 hover:shadow-xl lg:flex-row">
			<div
				data-project-preview
				className="relative aspect-[7/5] w-full shrink-0 overflow-hidden border-b-2 border-primary bg-surfaceAlt lg:aspect-auto lg:h-auto lg:w-[min(50%,28rem)] lg:max-w-md lg:border-b-0 lg:border-r-2 lg:border-r-primary"
			>
				<ImageLoader
					src={project.imageUrl}
					alt={`Screenshot do projeto ${project.title}`}
					width={700}
					height={500}
					href={imageHref}
					className="h-full w-full object-cover"
					linkLabel={imageLinkLabel}
				/>
			</div>
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex flex-1 flex-col p-5">
					<h3 className="mb-2 text-lg font-bold text-textSecondary">{project.title}</h3>
					<p className="mb-4 flex-1 text-sm leading-relaxed text-textMuted">{project.description}</p>
					<div className="flex flex-wrap gap-2 border-t border-borderLight/60 pt-3">
						{project.tech.map((t) => (
							<span
								key={t}
								className="rounded border border-border/60 bg-surfaceHighlight px-2 py-1 font-mono text-xs text-textMuted"
							>
								{t}
							</span>
						))}
					</div>
				</div>
				<div className="mt-auto flex border-t border-borderLight/60">
					{project.link && (
						<a
							href={project.link}
							target="_blank"
							rel="noreferrer"
							aria-label={`Visitar site do projeto ${project.title}`}
							className="flex flex-1 items-center justify-center gap-2 bg-primary/10 px-3 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
						>
							<ExternalLink size={16} aria-hidden="true" /> Visitar site
						</a>
					)}
					{project.github && (
						<a
							href={project.github}
							target="_blank"
							rel="noreferrer"
							aria-label={`Ver código-fonte do projeto ${project.title} no GitHub`}
							className="flex flex-1 items-center justify-center gap-2 bg-btnSecondary px-3 py-3 text-sm font-bold text-btnSecondaryText transition-colors hover:bg-btnSecondaryHover"
						>
							<Github size={16} aria-hidden="true" /> Ver no GitHub
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
