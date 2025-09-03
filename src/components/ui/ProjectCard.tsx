import { ProjectType } from '@/content/Projects';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({
    projeto,
    setModal,
}: {
    projeto: ProjectType;
    setModal: (projeto: ProjectType) => void;
}) {
    return (
        <div className="bg-slate-800/50 rounded-lg overflow-hidden flex flex-col h-full shadow-lg transition-transform transform hover:-translate-y-2">
            <a href={projeto.linkOnline || '#'} target="_blank" rel="noopener noreferrer">
                <Image
                    src={projeto.images[0]}
                    alt={`Screenshot do ${projeto.title}`}
                    className="w-full h-50 object-cover object-top"
                    loading="lazy"
                    width={600}
                    height={600}
                />
            </a>
            <div className="flex flex-col flex-grow justify-between p-6">
                <h3 className="text-xl font-bold text-white mb-2">{projeto.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed flex-grow mb-4 py-4">{projeto.shortDescription}</p>
                <div className="mt-auto flex flex-col md:flex-row gap-4 justify-between">
                    {projeto.linkOnline && (
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href={projeto.linkOnline}
                            className="bg-blue-600 text-white py-2 px-4 text-center rounded-lg hover:bg-blue-500 transition-colors"
                        >
                            Ver Online
                        </Link>
                    )}
                    <button
                        onClick={() => setModal(projeto)}
                        className="bg-blue-900 text-white py-2 px-4 text-center rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                    >
                        Mais detalhes
                    </button>
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={projeto.linkGithub}
                        className="bg-slate-700 text-white py-2 px-4 text-center rounded-lg hover:bg-slate-600 transition-colors"
                    >
                        Ver código
                    </Link>
                </div>
            </div>
        </div>
    );
}
