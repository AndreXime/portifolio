import { TechStack, Hero, Contact, Projetos } from '@/components';
import About from '@/components/sections/About';
import Navbar from '@/components/sections/Navbar';
import BackgroundEffect from '@/components/ui/BackgroundEffect';

export default function Page() {
	return (
		<main className="min-h-screen">
			<Navbar />

			<BackgroundEffect />
			<section
				id="hero"
				className="py-20 md:py-32 px-5 min-h-[70vh] relative">
				<Hero />
			</section>

			<section
				id="about"
				className="py-12 md:py-24 lg:py-32 min-h-[60dvh] ">
				<About />
			</section>

			<section
				id="projects"
				className="py-12 md:py-24 lg:py-32 min-h-[60dvh] bg-green-50">
				<Projetos />
			</section>

			<section
				id="tech"
				className="py-12 md:py-24 lg:py-32 px-2 min-h-[60dvh]">
				<TechStack />
			</section>

			<section
				id="contact"
				className="py-12 md:py-24 lg:py-32 px-5 min-h-[40dvh] bg-green-50">
				<Contact />
			</section>
		</main>
	);
}
