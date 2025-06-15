import { TechnologiesContent } from '@/content';

export default function TechStack() {
	return (
		<section
			id="habilidades"
			className="py-24 bg-slate-900/50">
			<div className="container mx-auto px-6 text-center">
				<h2 className="text-3xl font-bold text-white mb-2">Minhas Habilidades</h2>
				<p className="text-slate-400 mb-12">Tecnologias que utilizo para construir minhas soluções.</p>
				<div className="space-y-12">
					{TechnologiesContent.map(({ category, skills }) => (
						<div key={category}>
							<h3 className="text-xl font-semibold text-white mb-4">{category}</h3>
							<div className="grid [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))] gap-8 ">
								{skills.map(({ name, Svg }) => {
									const IconColor = name != 'Jest' ? 'text-white fill-white' : 'text-purple-500';
									return (
										<div
											key={name}
											className="skill-item flex flex-col items-center justify-center p-4 bg-slate-800 rounded-xl transition-transform transform hover:-translate-y-2">
											<Svg className={'w-12 h-12 mb-2 ' + IconColor} />
											<span className="text-slate-200 mt-2">{name}</span>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
