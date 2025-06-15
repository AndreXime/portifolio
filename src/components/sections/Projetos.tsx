import { ProjectsContent } from '@/content';
import Image from 'next/image';

export default async function Projetos() {
	return (
		<section className="py-24">
			<div className="container mx-auto px-6 text-center">
				<h2 className="text-3xl font-bold text-white mb-2">Projetos em Destaque</h2>
				<p className="text-slate-400 mb-12">Alguns dos trabalhos que me orgulho de ter participado.</p>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{ProjectsContent.map((projeto) => (
						<div
							key={projeto.title}
							className="bg-slate-800/50 rounded-lg overflow-hidden flex flex-col h-full shadow-lg transition-transform transform hover:-translate-y-2">
							<Image
								src={projeto.image}
								alt={`Screenshot do ${projeto.title}`}
								className="w-full h-48 object-cover"
								loading="lazy"
								width={500}
								height={500}
							/>
							<div className="flex flex-col flex-grow justify-between p-6">
								<h3 className="text-xl font-bold text-white mb-2">{projeto.title}</h3>
								<p className="text-slate-300 text-sm leading-relaxed flex-grow mb-4">{projeto.description}</p>
								<div className="mb-4 flex flex-wrap gap-x-1 gap-y-2">
									{projeto.tags.map((tag) => (
										<span
											key={tag}
											className="mx-auto flex-grow max-w-[150px] inline-block bg-blue-600/20 text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
											{tag}
										</span>
									))}
								</div>
								<div className="mt-auto flex justify-between gap-4">
									<a
										href={projeto.linkOnline}
										className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors">
										Ver demo
									</a>
									<a
										href={projeto.link}
										className="bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors">
										Ver código
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
				<button className="mt-12 border-2 border-blue-600 text-blue-500 font-medium py-3 px-8 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
					Ver todos os projetos
				</button>
			</div>
		</section>
	);
}
