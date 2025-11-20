'use client';
import { useMemo, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects, Project } from '../components/Projects';
import { Reveal } from '../components/Reveal';
import Image from 'next/image';
import Link from 'next/link';

export const Projects = () => {
    const [filter, setFilter] = useState<'all' | Project['type']>('all');

    const filteredProjects = useMemo(() => {
        if (filter === 'all') return projects;
        return projects.filter((p) => p.type === filter);
    }, [filter]);

    const filters: { id: Project['type'] | 'all'; label: string }[] = [
        { id: 'all', label: 'Todos' },
        { id: 'app', label: 'Web Apps' },
        { id: 'api', label: 'APIs' },
        { id: 'cli', label: 'CLI' },
        { id: 'landing page', label: 'Landing Page' },
    ] as const;

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
                                    key={f.id}
                                    onClick={() => setFilter(f.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        filter === f.id
                                            ? 'bg-primary text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                        {filteredProjects.map((project, index) => (
                            <Reveal key={`${filter}-${project.title}`} delay={index * 300}>
                                <ProjectCard project={project} index={index} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

function ProjectCard({ project }: { project: Project; index: number }) {
    return (
        <div className="bg-surface rounded-xl overflow-hidden border border-border hover:border-primary/30 flex flex-col h-full shadow-sm hover:shadow-xl">
            <div className="relative group cursor-pointer h-48 overflow-hidden bg-slate-50 border-b border-slate-100">
                <div className="absolute top-0 left-0 w-full h-6 bg-slate-100 border-b border-slate-200 z-20 flex items-center px-2 gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                </div>

                <Image
                    src={'/assets/' + project.image}
                    alt={project.title}
                    className="w-full h-full object-cover pt-6 transition-all duration-700 ease-in-out group-hover:scale-110"
                    fill
                />

                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10 pt-6">
                    {project.link && (
                        <Link
                            href={project.link}
                            className="p-2 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-lg"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </Link>
                    )}
                    {project.github && (
                        <Link
                            href={project.github}
                            className="p-2 bg-slate-800 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
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
