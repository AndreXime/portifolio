import { Card, CardContent, CardFooter } from '@/components';
import { IconGithub, IconOnline } from '@/components/ui/Icons';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectsContent } from '@/content/index';

export default async function Projetos() {
	return (
		<>
			<div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 px-4">
				<div className="space-y-2">
					<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl text-center">Projetos principais</h2>
					<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
						Em cada projeto, me esforcei ao máximo para aplicar todo o meu conhecimento, desde o backend para
						desenvolver a API, passando pela infraestrutura para o deploy, até o design para criar a interface.
					</p>
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-5 p-5">
				{ProjectsContent.slice(0, 2).map((project) => (
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
			<div className="flex w-full items-center justify-center">
				<Link
					href={'/projetos'}
					className="btn btn-primary text-xl mt-5 border-0 self-center">
					Ver todos meus projetos
				</Link>
			</div>
		</>
	);
}

interface ProjectCardProps {
	title: string;
	description: string;
	image: string;
	link: string;
	tags: string[];
	linkOnline: string;
}

export function ProjectCard({ title, description, image, link, tags, linkOnline }: ProjectCardProps) {
	return (
		<Card className="card-custom md:w-1/2 lg:w-1/3">
			<div className="relative aspect-video">
				<Link
					href={linkOnline}
					target="_blank">
					<Image
						src={image || '/placeholder.svg'}
						alt={title}
						width={600}
						height={600}
						className="object-contain transition-transform hover:scale-110"
					/>
				</Link>
			</div>
			<CardContent className="p-4">
				<h3 className="font-semibold text-xl mb-2 text-green-600">{title}</h3>
				<p className="text-sm text-gray-600 mb-4 whitespace-pre-line">{description}</p>
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
			<CardFooter className="p-4 pt-0 mt-auto">
				<Link
					href={link}
					target="_blank"
					className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline">
					<IconGithub className="h-4 w-4" />
					Ver no Github
				</Link>
				<Link
					href={linkOnline}
					target="_blank"
					className=" ml-auto inline-flex items-center gap-2 text-sm text-green-600 hover:underline">
					<IconOnline className="h-4 w-4" />
					Ver online
				</Link>
			</CardFooter>
		</Card>
	);
}
