import { Card } from '@/components/ui/Card';
import { Technologies } from '@/content/Technologies';

export default function TechStack() {
	return (
		<div className="grid gap-6 md:grid-cols-2 px-2">
			{Technologies.map((tech) => (
				<Card
					key={tech.category}
					className="card-custom p-6">
					<h3 className="text-lg font-semibold mb-4 text-green-600">{tech.category}</h3>
					<div className="flex flex-wrap gap-2">
						{tech.skills.map((skill) => (
							<span
								key={skill.name}
								className="tag">
								{skill.icon}
								{skill.name}
							</span>
						))}
					</div>
				</Card>
			))}
		</div>
	);
}
