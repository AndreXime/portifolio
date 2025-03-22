import Projects from '@/content/Projects';
import { Footer, Nav, TechStack, ProjectCard, Hero, Contact } from '@/components';

export default function Page() {
	return (
		<div className="min-h-screen bg-white">
			<Nav />

			<main>
				<section
					id="about"
					className="py-20 md:py-24 lg:py-32 px-3">
					<div className="container mx-auto">
						<Hero />
					</div>
				</section>

				<section
					id="projects"
					className="py-12 md:py-24 lg:py-32 bg-green-50">
					<div className="container">
						<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">Projetos</h2>
						<div className="flex gap-6 flex-col md:flex-row justify-evenly p-3">
							{Projects.map((project) => (
								<ProjectCard
									key={project.title}
									title={project.title}
									description={project.description}
									image={project.image}
									link={project.link}
									tags={project.tags}
								/>
							))}
						</div>
					</div>
				</section>

				<section
					id="tech"
					className="py-12 md:py-24 lg:py-32 px-2">
					<div className="container mx-auto">
						<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
							Habilidades tecnicas
						</h2>
						<TechStack />
					</div>
				</section>

				<section
					id="contact"
					className="py-12 md:py-24 lg:py-32 bg-green-50">
					<div className="container mx-auto">
						<div className="mx-auto max-w-2xl text-center">
							<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl mb-6">Fale comigo!</h2>
							<Contact />
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
