import { Card } from '@/components/ui/Card';
import { TechnologiesContent } from '@/content';
import { TechnologiesPack } from '../ui/Icons';

export default function TechStack() {
	return (
		<>
			<div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 px-4">
				<div className="space-y-2">
					<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl text-center">Habilidade técnicas</h2>
					<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
						Minhas habilidades foram adquiridas tanto na faculdade quanto por meio online, como YouTube e cursos.
					</p>
				</div>
			</div>
			<div className="grid gap-6 md:grid-cols-2 px-2 lg:px-10">
				{TechnologiesContent.map((tech) => (
					<Card
						key={tech.category}
						className="card-custom p-6">
						<h3 className="text-lg font-semibold mb-4 text-green-600">{tech.category}</h3>
						<div className="flex flex-wrap gap-2">
							{tech.skills.map((skill) => {
								const IconComponent = TechnologiesPack[skill.icon as keyof typeof TechnologiesPack];

								return (
									<span
										key={skill.name}
										className="tag">
										<IconComponent size={24} />
										{skill.name}
									</span>
								);
							})}
						</div>
					</Card>
				))}
			</div>
		</>
	);
}
