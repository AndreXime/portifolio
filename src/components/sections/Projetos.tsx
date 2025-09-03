'use client';
import { ProjectType } from '@/content/Projects';
import { useState } from 'react';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';

export default function Projetos({ ProjectsArray }: { ProjectsArray: ProjectType[] }) {
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [activeProject, setActiveProject] = useState<ProjectType>();
    const projetosVisiveis = mostrarTodos ? ProjectsArray : ProjectsArray.slice(0, 3);

    // Undefined para esconder o modal
    function setModal(value: ProjectType | undefined) {
        setActiveProject(value);
    }

    return (
        <section id="projetos" className="py-24 fade-in-section">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Projetos em Destaque</h2>
                <p className="text-slate-400 mb-12">Alguns dos trabalhos que me orgulho de ter construido.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projetosVisiveis.map((projeto) => (
                        <ProjectCard key={projeto.title} projeto={projeto} setModal={setModal} />
                    ))}
                </div>
                {ProjectsArray.length > 3 && (
                    <button
                        onClick={() => setMostrarTodos(!mostrarTodos)}
                        className="mt-12 border-2 border-blue-600 text-blue-500 font-medium py-3 px-8 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                        {mostrarTodos ? 'Ver menos' : 'Ver todos os projetos'}
                    </button>
                )}
                {activeProject && <ProjectModal projeto={activeProject} setModal={setModal} />}
            </div>
        </section>
    );
}
