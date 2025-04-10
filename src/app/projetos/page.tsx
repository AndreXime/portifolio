import { Navbar } from '@/components';
import { ProjectCard } from '@/components/sections/Projetos';
import { ProjectsContent } from '@/content';
import Link from 'next/link';

export default function Page() {
	return (
		<>
			<Navbar />

			<section
				id="projects"
				className="py-10 min-h-[60dvh] bg-green-50">
				<div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 px-4">
					<div className="space-y-2">
						<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl text-center">
							Todos meus projetos
						</h2>
					</div>
					<Link
						href={'/'}
						className="btn btn-primary border-0 mt-3">
						Voltar a tela inicial
					</Link>
				</div>
				<div className="flex flex-wrap justify-center gap-10 p-5">
					{ProjectsContent.map((project) => (
						<ProjectCard
							key={project.title}
							title={project.title}
							description={project.description}
							image={project.image}
							link={project.link}
							tags={project.tags}
							linkOnline={project.linkOnline}
						/>
					))}
				</div>
				<div className="flex justify-center items-center mt-5">
					<Link
						href={'/'}
						className="btn btn-primary border-0">
						Voltar a tela inicial
					</Link>
				</div>
			</section>
		</>
	);
}
