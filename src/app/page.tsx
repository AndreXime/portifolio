import { TechStack, Hero, Contact, Projetos } from '@/components';
import BackgroundEffect from '@/components/ui/BackgroundEffect';

export default function Page() {
	return (
		<div className="min-h-screen ">
			<main>
				<section
					id="about"
					className="py-20 md:py-24 lg:py-32 px-5 min-h-[60vh] relative">
					<BackgroundEffect />
					<Hero />
				</section>

				<section
					id="projects"
					className="py-12 md:py-24 lg:py-32 min-h-[60dvh] bg-green-50">
					<div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 px-4">
						<div className="space-y-2">
							<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl text-center">
								Projetos principais
							</h2>
							<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
								Em cada projeto, me esforcei ao máximo para aplicar todo o meu conhecimento, desde o backend para
								desenvolver a API, passando pela infraestrutura para o deploy, até o design para criar a interface.
							</p>
						</div>
					</div>
					<Projetos />
				</section>

				<section
					id="tech"
					className="py-12 md:py-24 lg:py-32 px-2 min-h-[60dvh]">
					<div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 px-4">
						<div className="space-y-2">
							<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl text-center">
								Habilidade técnicas
							</h2>
							<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
								Minhas habilidades foram adquiridas tanto na faculdade quanto por meio online, como YouTube e cursos.
							</p>
						</div>
					</div>
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
