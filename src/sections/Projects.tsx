import { useMemo, useState } from "preact/compat";
import { ExternalLink, Github } from "lucide-preact";
import { type Project } from "../content/projects";
import { Reveal } from "../components/Reveal";

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
      <Reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-mono text-primary bg-white rounded-full border border-primary/20 shadow-sm">
              Portfólio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Meus Projetos Recentes</h2>

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
          </div>

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
      </Reveal>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-surface rounded-xl overflow-hidden border border-border hover:border-primary/30 flex flex-col h-full shadow-sm hover:shadow-xl">
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
          className="w-full h-full object-cover pt-6 transition-all duration-700 ease-in-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10 pt-6">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="sr-only">Link para o projeto {project.title}</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-800 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">Github para o projeto {project.title}</span>
            </a>
          )}
        </div>
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
    </div>
  );
}
