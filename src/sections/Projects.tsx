import { useMemo, useState } from "preact/hooks";
import { ExternalLink, Github } from "lucide-preact";
import type { Project } from "../content/types";
import SectionHeader from "../components/ui/SectionHeader";

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
		<section id="projetos" className="py-20 bg-surfaceHighlight border-y border-slate-200">
			<div data-reveal-time={0} class="reveal reveal-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeader
						bagde="Portfólio"
						title="Meus Projetos"
						subtitle="O resultado prático dos meus estudos, aplicações onde solidifico meus conhecimentos e testo novas
							abordagens."
					>
						<div className="flex flex-wrap justify-center gap-2">
							{filters.map((f) => (
								<button
									type="button"
									key={f.id}
									onClick={() => setFilter(f.id)}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
										filter === f.id
											? "bg-primary text-white shadow-lg shadow-blue-500/30"
											: "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary"
									}`}
								>
									{f.label}
								</button>
							))}
						</div>
					</SectionHeader>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
						{filteredProjects.map((project, index) => {
							let responsiveClass = "";

							if (filter === "minimal") {
								// Se for o 3º item (index 2), só mostra se tiver 3 colunas (lg)
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
									className={`px-4 py-2 rounded-lg font-medium transition-all bg-primary text-white shadow-lg shadow-blue-500/30`}
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
	return (
		<div className="group bg-surface rounded-xl overflow-hidden border border-border hover:border-primary/30 flex flex-col h-full shadow-sm hover:shadow-xl">
			<div className="relative group cursor-pointer h-48 overflow-hidden bg-slate-50 border-b border-slate-100">
				<div className="absolute top-0 left-0 w-full h-6 bg-slate-100 border-b border-slate-200 z-20 flex items-center px-2 gap-1.5">
					<div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
					<div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
					<div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
				</div>

				<img
					src={project.imageUrl}
					width={800}
					height={600}
					alt={project.title}
					loading="lazy"
					decoding="async"
					className={"w-full h-full object-fill pt-6 transition-all duration-700 ease-in-out lg:group-hover:scale-110"}
				/>
			</div>
			<div className="p-5 flex flex-col flex-grow">
				<h3 className="text-lg font-bold text-slate-800 mb-2">{project.title}</h3>
				<p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>
				<div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-slate-50">
					{project.tech.map((t) => (
						<span
							key={t}
							className="text-xs font-mono px-2 py-1 bg-slate-100 rounded text-slate-600 border border-slate-200"
						>
							{t}
						</span>
					))}
				</div>
			</div>
			<div className="flex justify-center mt-auto">
				{project.link && (
					<a
						href={project.link}
						target="_blank"
						rel="noreferrer"
						className="flex flex-1 items-center justify-center gap-2 py-2 px-3 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors  text-sm font-bold"
					>
						<ExternalLink size={16} /> Visitar site
						<span className="sr-only">Link para o projeto {project.title}</span>
					</a>
				)}
				{project.github && (
					<a
						href={project.github}
						target="_blank"
						rel="noreferrer"
						className="flex flex-1 items-center justify-center gap-2 py-2 px-3 bg-slate-800 text-white hover:bg-slate-900 transition-colors text-sm font-bold"
					>
						<Github size={16} /> Ver no GitHub
						<span className="sr-only">Github para o projeto {project.title}</span>
					</a>
				)}
			</div>
		</div>
	);
}
