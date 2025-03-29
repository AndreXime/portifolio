import {
	IconReact,
	IconNextjs,
	IconTypeScript,
	IconTailwindCSS,
	IconNodejs,
	IconExpress,
	IconPostgreSQL,
	IconDocker,
	IconCloud,
	IconGit,
	IconLinux,
	IconAlwaysdata,
	IconCode,
	IconJest,
	IconGithub,
	IconVercel,
} from '@/components/ui/Icons';

export const Technologies = [
	{
		category: 'Frontend',
		skills: [
			{ name: 'React', icon: <IconReact className="h-4 w-4" /> },
			{ name: 'Next.js', icon: <IconNextjs className="h-4 w-4" /> },
			{ name: 'TypeScript', icon: <IconTypeScript className="h-4 w-4" /> },
			{ name: 'TailwindCSS', icon: <IconTailwindCSS className="h-4 w-4" /> },
		],
	},
	{
		category: 'Backend',
		skills: [
			{ name: 'Node.js', icon: <IconNodejs className="h-4 w-4" /> },
			{ name: 'Express', icon: <IconExpress className="h-4 w-4" /> },
			{ name: 'TypeScript', icon: <IconTypeScript className="h-4 w-4" /> },
			{ name: 'PostgreSQL', icon: <IconPostgreSQL className="h-4 w-4" /> },
		],
	},
	{
		category: 'DevOps',
		skills: [
			{ name: 'Docker', icon: <IconDocker className="h-4 w-4" /> },
			{ name: 'CI/CD', icon: <IconCloud className="h-4 w-4" /> }, // Ícone genérico
			{ name: 'Git', icon: <IconGit className="h-4 w-4" /> },
			{ name: 'Linux', icon: <IconLinux className="h-4 w-4" /> },
			{ name: 'Nginx', icon: <IconAlwaysdata className="h-4 w-4" /> },
		],
	},
	{
		category: 'Ferramentas',
		skills: [
			{ name: 'VS Code', icon: <IconCode className="h-4 w-4" /> },
			{ name: 'Jest', icon: <IconJest className="h-4 w-4" /> },
			{ name: 'GitHub', icon: <IconGithub className="h-4 w-4" /> },
			{ name: 'Vercel', icon: <IconVercel className="h-4 w-4" /> },
		],
	},
];
