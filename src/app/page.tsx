import Projects from '@/content/Projects';
import { Footer, Nav, TechStack, ProjectCard, Hero, Contact } from '@/components';

export default function Page() {
	return (
		<div className="min-h-screen bg-white">
			<Nav />

			<main>
				<section
					id="about"
					className="py-20 md:py-24 lg:py-32 px-5">
					<div className="min-h-[40dvh] mx-auto">
						<Hero />
					</div>
				</section>

				<section
					id="projects"
					className="py-12 md:py-24 lg:py-32 bg-green-50">
					<div className="min-h-[40dvh]">
						<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">Projetos</h2>
						<div className="flex flex-wrap justify-center gap-6 p-5">
							{Projects.map((project) => (
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
					</div>
				</section>

				<section
					id="tech"
					className="py-12 md:py-24 lg:py-32 px-2">
					<div className="min-h-[40dvh] mx-auto">
						<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
							Habilidades tecnicas
						</h2>
						<TechStack />
					</div>
				</section>

				<section
					id="contact"
					className="py-12 md:py-24 lg:py-32 bg-green-50 px-5">
					<div className="container mx-auto min-h-[35dvh]">
						<div className="mx-auto text-center">
							<h2 className="heading text-3xl tracking-tighter md:text-5xl mb-6">Fale comigo!</h2>
							<Contact />
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
