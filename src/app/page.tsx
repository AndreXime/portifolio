import { TechStack, Hero, Contact, Projetos } from '@/components';

export default function Page() {
	return (
		<div className="min-h-screen bg-white">
			<main>
				<section
					id="about"
					className="py-20 md:py-24 lg:py-32 px-5 min-h-[60dvh]">
					<Hero />
				</section>

				<section
					id="projects"
					className="py-12 md:py-24 lg:py-32 min-h-[60dvh] bg-green-50">
					<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">Projetos</h2>
					<Projetos />
				</section>

				<section
					id="tech"
					className="py-12 md:py-24 lg:py-32 px-2 min-h-[60dvh]">
					<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
						Habilidades técnicas
					</h2>
					<TechStack />
				</section>

				<section
					id="contact"
					className="py-12 md:py-24 lg:py-32 px-5 min-h-[40dvh] bg-green-50">
					<div className="text-center items-center flex flex-col">
						<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl mb-6">Fale comigo!</h2>
						<Contact />
					</div>
				</section>
			</main>
		</div>
	);
}
