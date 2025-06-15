import ReactIcon from 'devicon/icons/react/react-original.svg';
import NextjsIcon from 'devicon/icons/nextjs/nextjs-original.svg';
import TypescriptIcon from 'devicon/icons/typescript/typescript-original.svg';
import TailwindIcon from 'devicon/icons/tailwindcss/tailwindcss-original.svg';

import NodejsIcon from 'devicon/icons/nodejs/nodejs-original.svg';
import { SiExpress as ExpressIcon } from 'react-icons/si';
import PostgresqlIcon from 'devicon/icons/postgresql/postgresql-original.svg';

import DockerIcon from 'devicon/icons/docker/docker-original.svg';
import CICDIcon from 'devicon/icons/githubactions/githubactions-original.svg';
import GitIcon from 'devicon/icons/git/git-original.svg';
import LinuxIcon from 'devicon/icons/linux/linux-original.svg';
import NginxIcon from 'devicon/icons/nginx/nginx-original.svg';

import VscodeIcon from 'devicon/icons/vscode/vscode-original.svg';
import { SiJest as JestIcon } from 'react-icons/si';
import { FaGithub as GithubIcon } from 'react-icons/fa';
import { SiVercel as VercelIcon } from 'react-icons/si';

interface Skill {
	name: string;
	Svg:
		| string // para `img src`
		| React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // para componente
}

interface Category {
	category: string;
	skills: Skill[];
}

const Tecnologies: Category[] = [
	{
		category: 'Desenvolvimento Web',
		skills: [
			{ name: 'React', Svg: ReactIcon },
			{ name: 'Next.js', Svg: NextjsIcon },
			{ name: 'TypeScript', Svg: TypescriptIcon },
			{ name: 'Tailwind CSS', Svg: TailwindIcon },
			{ name: 'Node.js', Svg: NodejsIcon },
			{ name: 'Express', Svg: ExpressIcon },
			{ name: 'PostgreSQL', Svg: PostgresqlIcon },
		],
	},
	{
		category: 'DevOps',
		skills: [
			{ name: 'Docker', Svg: DockerIcon },
			{ name: 'CI/CD', Svg: CICDIcon },
			{ name: 'Git', Svg: GitIcon },
			{ name: 'Linux', Svg: LinuxIcon },
			{ name: 'Nginx', Svg: NginxIcon },
		],
	},
	{
		category: 'Ferramentas',
		skills: [
			{ name: 'VS Code', Svg: VscodeIcon },
			{ name: 'Jest', Svg: JestIcon },
			{ name: 'GitHub', Svg: GithubIcon },
			{ name: 'Vercel', Svg: VercelIcon },
		],
	},
];

export default Tecnologies;
