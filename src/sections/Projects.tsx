import { ExternalLink, Github, Loader2 } from "lucide-preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import SectionHeader from "../components/ui/SectionHeader";
import type { Project } from "../content/projects";

const filters: { id: Project["type"] | "all"; label: string }[] = [
	{ id: "all", label: "Todos" },
	{ id: "app", label: "Web Apps" },
	{ id: "api", label: "APIs" },
	{ id: "cli", label: "CLI" },
	{ id: "landing page", label: "Landing Page" },
] as const;

export default function ProjectsSection({ projects }: { projects: Project[] }) {
	const [filter, setFilter] = useState<"all" | "minimal" | Project["type"]>("minimal");

	const filteredProjects = useMemo(() => {
		if (filter === "all") return projects;
		if (filter === "minimal") return projects.slice(0, 3);
		return projects.filter((p) => p.type === filter);
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
					>
						<fieldset className="flex flex-wrap justify-center gap-2 border-0">
							<legend className="sr-only">Filtrar projetos por categoria</legend>
							{filters.map((f) => (
								<button
									type="button"
									key={f.id}
									onClick={() => setFilter(f.id)}
									aria-pressed={filter === f.id}
									aria-label={`Filtrar por ${f.label}`}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
										filter === f.id
											? "bg-primaryDark text-white shadow-lg shadow-primary/30"
											: "bg-surface text-textMuted border border-border hover:border-primary hover:text-primary"
									}`}
								>
									{f.label}
								</button>
							))}
						</fieldset>
					</SectionHeader>

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
	const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (imgRef.current?.complete) {
			setStatus("loaded");
		}
	}, []);

	const imageHref = project.link?.trim() || project.github?.trim() || null;
	const imageLinkLabel = project.link?.trim()
		? `Abrir site do projeto ${project.title}`
		: `Ver repositório do projeto ${project.title} no GitHub`;

	const imgClassName = `h-full w-full object-cover transition-opacity duration-300 ${
		status === "loaded" ? "opacity-100" : "opacity-0"
	}`;

	const img = (
		<img
			ref={imgRef}
			src={project.imageUrl}
			width={700}
			height={500}
			alt={`Screenshot do projeto ${project.title}`}
			loading="lazy"
			decoding="async"
			onLoad={() => setStatus("loaded")}
			onError={() => setStatus("error")}
			className={imgClassName}
		/>
	);

	return (
		<div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border/60 bg-surface shadow-sm transition-all hover:border-primary/30 hover:shadow-xl lg:flex-row">
			<div
				data-project-preview
				className="relative aspect-[7/5] w-full shrink-0 overflow-hidden border-b-2 border-primary bg-surfaceAlt lg:aspect-auto lg:h-auto lg:w-[min(50%,28rem)] lg:max-w-md lg:border-b-0 lg:border-r-2 lg:border-r-primary"
			>
				<div className="absolute inset-0 h-full overflow-hidden">
					{status !== "loaded" && (
						<div className="absolute inset-0 z-10 flex items-center justify-center bg-surfaceAlt">
							{status === "loading" ? (
								<Loader2 className="h-6 w-6 animate-spin text-primary" />
							) : (
								<span className="px-4 text-center text-xs text-textMuted">Falha ao carregar imagem.</span>
							)}
						</div>
					)}
					{imageHref ? (
						<a
							href={imageHref}
							target="_blank"
							rel="noreferrer"
							aria-label={imageLinkLabel}
							className="absolute inset-0 z-[5] block focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
						>
							{img}
						</a>
					) : (
						img
					)}
				</div>
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
