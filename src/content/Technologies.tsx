import { SiExpress as ExpressIcon, SiVercel as VercelIcon } from 'react-icons/si';
import { FaGithub as GithubIcon } from 'react-icons/fa';

import { IconType } from 'react-icons';

const wrapSvg = (src: string) => {
    return function WrappedDevicon({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
        return <img src={src} alt={alt || 'Icone de tecnologia'} loading="lazy" {...props} />;
    };
};

interface Skill {
    name: string;
    Icon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> | IconType;
}

interface Category {
    category: string;
    skills: Skill[];
}

const Tecnologies: Category[] = [
    {
        category: 'Desenvolvimento Web',
        skills: [
            { name: 'React', Icon: wrapSvg('/icons/react-original.svg') },
            { name: 'Next.js', Icon: wrapSvg('/icons/nextjs-original.svg') },
            { name: 'TypeScript', Icon: wrapSvg('/icons/typescript-original.svg') },
            { name: 'Tailwind CSS', Icon: wrapSvg('/icons/tailwindcss-original.svg') },
            { name: 'Node.js', Icon: wrapSvg('/icons/nodejs-original.svg') },
            { name: 'Express', Icon: ExpressIcon },
            { name: 'PostgreSQL', Icon: wrapSvg('/icons/postgresql-original.svg') },
            { name: 'Prisma ORM', Icon: wrapSvg('/icons/prisma-original.svg') },
            { name: 'Golang', Icon: wrapSvg('/icons/go-original-wordmark.svg') },
            { name: 'Gin Framework', Icon: wrapSvg('/icons/gin-original.svg') },
        ],
    },
    {
        category: 'DevOps',
        skills: [
            { name: 'Docker', Icon: wrapSvg('/icons/docker-original.svg') },
            { name: 'CI/CD', Icon: wrapSvg('/icons/githubactions-original.svg') },
            { name: 'Git', Icon: wrapSvg('/icons/git-original.svg') },
            { name: 'Linux', Icon: wrapSvg('/icons/linux-original.svg') },
            { name: 'Nginx', Icon: wrapSvg('/icons/nginx-original.svg') },
        ],
    },
    {
        category: 'Ferramentas',
        skills: [
            { name: 'VS Code', Icon: wrapSvg('/icons/vscode-original.svg') },
            { name: 'Jest', Icon: wrapSvg('/icons/jest-original.svg') },
            { name: 'GitHub', Icon: GithubIcon },
            { name: 'Vercel', Icon: VercelIcon },
        ],
    },
];

export default Tecnologies;
