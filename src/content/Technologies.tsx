import { SiExpress as ExpressIcon, SiVercel as VercelIcon } from 'react-icons/si';
import { FaGithub as GithubIcon } from 'react-icons/fa';

import { IconType } from 'react-icons';

const wrapSvg = (src: string) => {
    return function WrappedDevicon({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
        return <img src={src} alt={alt || 'Icone de tecnologia'} loading="lazy" {...props} />;
    };
};

export interface Skill {
    name: string;
    Icon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> | IconType;
    descricao: string;
}

interface Category {
    category: string;
    skills: Skill[];
}

const Tecnologies: Category[] = [
    {
        category: 'Desenvolvimento Web',
        skills: [
            {
                name: 'React',
                Icon: wrapSvg('/icons/react-original.svg'),
                descricao: 'Biblioteca para construir interfaces de usuário de forma declarativa e componentizada.',
            },
            {
                name: 'Next.js',
                Icon: wrapSvg('/icons/nextjs-original.svg'),
                descricao: 'Framework React com renderização híbrida (SSR/SSG) e roteamento simplificado.',
            },
            {
                name: 'TypeScript',
                Icon: wrapSvg('/icons/typescript-original.svg'),
                descricao: 'Superset de JavaScript que adiciona tipagem estática para maior robustez de código.',
            },
            {
                name: 'Tailwind CSS',
                Icon: wrapSvg('/icons/tailwindcss-original.svg'),
                descricao: 'Framework utilitário de CSS que permite estilizar direto no markup com classes.',
            },
            {
                name: 'Node.js',
                Icon: wrapSvg('/icons/nodejs-original.svg'),
                descricao: 'Runtime JavaScript no servidor, ideal para aplicações I/O intensivas e em tempo real.',
            },
            {
                name: 'Express',
                Icon: ExpressIcon,
                descricao: 'Framework minimalista para criar APIs e servidores HTTP sobre Node.js.',
            },
            {
                name: 'PostgreSQL',
                Icon: wrapSvg('/icons/postgresql-original.svg'),
                descricao: 'Banco de dados relacional open source com suporte avançado a SQL e extensões.',
            },
            {
                name: 'Prisma ORM',
                Icon: wrapSvg('/icons/prisma-original.svg'),
                descricao: 'ORM moderno e typescript-first para modelagem de dados e migrações seguras.',
            },
            {
                name: 'Golang',
                Icon: wrapSvg('/icons/go-original-wordmark.svg'),
                descricao: 'Linguagem compilada, concorrente e de alto desempenho, ideal para microsserviços.',
            },
            {
                name: 'Gin Framework',
                Icon: wrapSvg('/icons/gin-original.svg'),
                descricao: 'Microframework HTTP para Go focado em desempenho e simplicidade.',
            },
        ],
    },
    {
        category: 'DevOps',
        skills: [
            {
                name: 'Docker',
                Icon: wrapSvg('/icons/docker-original.svg'),
                descricao: 'Plataforma de conteinerização que garante ambiente isolado e reproduzível.',
            },
            {
                name: 'CI/CD',
                Icon: wrapSvg('/icons/githubactions-original.svg'),
                descricao: 'Conjunto de práticas para integração e entrega contínua de software de forma automatizada.',
            },
            {
                name: 'Git',
                Icon: wrapSvg('/icons/git-original.svg'),
                descricao:
                    'Sistema de controle de versão distribuído amplamente adotado no desenvolvimento de software.',
            },
            {
                name: 'Linux',
                Icon: wrapSvg('/icons/linux-original.svg'),
                descricao: 'Sistema operacional open source usado como base na maior parte de servidores de produção.',
            },
            {
                name: 'Nginx',
                Icon: wrapSvg('/icons/nginx-original.svg'),
                descricao: 'Servidor web e reverse proxy leve, usado para balanceamento de carga e caching.',
            },
        ],
    },
    {
        category: 'Ferramentas',
        skills: [
            {
                name: 'VS Code',
                Icon: wrapSvg('/icons/vscode-original.svg'),
                descricao: 'Editor de código leve e extensível, com suporte a múltiplas linguagens e plugins.',
            },
            {
                name: 'Jest',
                Icon: wrapSvg('/icons/jest-original.svg'),
                descricao: 'Framework de testes para JavaScript e TypeScript com foco em simplicidade e performance.',
            },
            {
                name: 'GitHub',
                Icon: GithubIcon,
                descricao: 'Plataforma de hospedagem de código e colaboração, com controle de issues e PRs.',
            },
            {
                name: 'Vercel',
                Icon: VercelIcon,
                descricao: 'Plataforma de deploy e hospedagem otimizada para front-ends e funções serverless.',
            },
        ],
    },
];

export default Tecnologies;
