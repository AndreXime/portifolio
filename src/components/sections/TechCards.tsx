import { Card } from '@/components/ui/Card';
import { TechnologiesContent } from '@/content';
import { TechnologiesPack } from '../ui/Icons';

export default function TechStack() {
	return (
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
									<IconComponent size={20} />
									{skill.name}
								</span>
							);
						})}
					</div>
				</Card>
			))}
		</div>
	);
}
