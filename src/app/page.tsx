import { TechStack, Hero, Contact, Projetos, Navbar } from '@/components';
import About from '@/components/sections/About';

export default function Page() {
	return (
		<main className="min-h-screen">
			<Navbar />

			<section
				id="hero"
				className="py-20 md:py-32 px-5 min-h-[70vh] relative">
				<Hero />
			</section>

			<section
				id="about"
				className="py-12 md:py-24 lg:py-32 min-h-[60dvh] bg-green-50">
				<About />
			</section>

			<section
				id="projects"
				className="py-12 md:py-24 lg:py-32 min-h-[60dvh]">
				<Projetos />
			</section>

			<section
				id="tech"
				className="py-12 md:py-24 lg:py-32 px-2 min-h-[60dvh] bg-green-50">
				<TechStack />
			</section>

			<section
				id="contact"
				className="py-12 md:py-24 lg:py-32 px-5 min-h-[40dvh]">
				<Contact />
			</section>
		</main>
	);
}
