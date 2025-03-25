import { Card, CardContent, CardFooter } from '@/components';
import { IconGithub, IconOnline } from '@/components/ui/Icons';
import Image from 'next/image';
import Link from 'next/link';
import Projects from '@/content/Projects';

export default function Projetos() {
	return (
		<div className="flex flex-wrap justify-center gap-5 p-5">
			{Projects.map((project) => (
				<ProjectCard
					key={project.title}
					title={project.title}
					description={project.description}
					image={project.image}
					link={project.link}
					tags={project.tags}
					linkOnline={project.linkOnline}
				/>
			))}
		</div>
	);
}

interface ProjectCardProps {
	title: string;
	description: string;
	image: string;
	link: string;
	tags: string[];
	linkOnline?: string;
}

function ProjectCard({ title, description, image, link, tags, linkOnline }: ProjectCardProps) {
	return (
		<Card className="card-custom">
			<div className="relative aspect-video">
				<Image
					src={image || '/placeholder.svg'}
					alt={title}
					fill
					className="object-contain transition-transform hover:scale-105"
				/>
			</div>
			<CardContent className="p-4">
				<h3 className="font-semibold text-xl mb-2 text-green-600">{title}</h3>
				<p className="text-sm text-gray-600 mb-4">{description}</p>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-200">
							{tag}
						</span>
					))}
				</div>
			</CardContent>
			<CardFooter className="p-6 pt-0">
				<Link
					href={link}
					target="_blank"
					className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline">
					<IconGithub className="h-4 w-4" />
					Ver no Github
				</Link>
				{linkOnline && (
					<Link
						href={linkOnline}
						target="_blank"
						className=" ml-auto inline-flex items-center gap-2 text-sm text-green-600 hover:underline">
						<IconOnline className="h-4 w-4" />
						Ver o projeto no ar
					</Link>
				)}
			</CardFooter>
		</Card>
	);
}
