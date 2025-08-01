import { SiExpress as ExpressIcon } from 'react-icons/si';

import { IconType } from 'react-icons';

const wrapSvg = (src: string) => {
    return function svgImg({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
        return <img src={src} alt={alt || 'Icone de tecnologia'} loading="lazy" {...props} />;
    };
};

const wrapSvgPair = (src1: string, src2: string) => {
    return function svgImg({ alt }: React.ImgHTMLAttributes<HTMLDivElement>) {
        return (
            <div className="flex justify-center items-center gap-2 mb-2">
                <img className="w-10 h-10 md:w-12 md:h-12" src={src1} alt={alt} />
                <img className="w-10 h-10 md:w-12 md:h-12" src={src2} alt={alt} />
            </div>
        );
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
        category: 'Frontend',
        skills: [
            {
                name: 'TypeScript',
                Icon: wrapSvg('/icons/typescript.svg'),
                descricao: 'Superset de JavaScript que adiciona tipagem estática para maior robustez de código.',
            },
            {
                name: 'HTML/CSS',
                Icon: wrapSvgPair('/icons/html.svg', 'icons/css.svg'),
                descricao: 'Biblioteca para construir interfaces de usuário de forma declarativa e componentizada.',
            },
            {
                name: 'React.js',
                Icon: wrapSvg('/icons/react.svg'),
                descricao: 'Biblioteca para construir interfaces de usuário de forma declarativa e componentizada.',
            },
            {
                name: 'Next.js',
                Icon: wrapSvg('/icons/nextjs.svg'),
                descricao: 'Framework React com renderização híbrida (SSR/SSG) e roteamento simplificado.',
            },
            {
                name: 'Tailwind CSS',
                Icon: wrapSvg('/icons/tailwindcss.svg'),
                descricao: 'Framework utilitário de CSS que permite estilizar direto no markup com classes.',
            },
        ],
    },
    {
        category: 'Backend',
        skills: [
            {
                name: 'Node.js',
                Icon: wrapSvg('/icons/nodejs.svg'),
                descricao: 'Runtime JavaScript no servidor, ideal para aplicações I/O intensivas e em tempo real.',
            },
            {
                name: 'Express.js',
                Icon: ExpressIcon,
                descricao: 'Framework minimalista para criar APIs e servidores HTTP sobre Node.js.',
            },
            {
                name: 'PostgreSQL',
                Icon: wrapSvg('/icons/postgresql.svg'),
                descricao: 'Banco de dados relacional open source com suporte avançado a SQL e extensões.',
            },
            {
                name: 'Prisma ORM',
                Icon: wrapSvg('/icons/prisma.svg'),
                descricao: 'ORM moderno e typescript-first para modelagem de dados e migrações seguras.',
            },
            {
                name: 'Go',
                Icon: wrapSvg('/icons/go.svg'),
                descricao:
                    'Linguagem compilada, concorrente e de alto desempenho, ideal para APIs com tempo de resposta critico.',
            },
        ],
    },
    {
        category: 'DevOps',
        skills: [
            {
                name: 'Docker',
                Icon: wrapSvg('/icons/docker.svg'),
                descricao: 'Plataforma de conteinerização que garante ambiente isolado e reproduzível.',
            },
            {
                name: 'CI/CD',
                Icon: wrapSvg('/icons/githubactions.svg'),
                descricao: 'Conjunto de práticas para integração e entrega contínua de software de forma automatizada.',
            },
            {
                name: 'Git',
                Icon: wrapSvg('/icons/git.svg'),
                descricao:
                    'Sistema de controle de versão distribuído amplamente adotado no desenvolvimento de software.',
            },
            {
                name: 'Linux',
                Icon: wrapSvg('/icons/linux.svg'),
                descricao: 'Sistema operacional open source usado como base na maior parte de servidores de produção.',
            },
            {
                name: 'Nginx',
                Icon: wrapSvg('/icons/nginx.svg'),
                descricao: 'Servidor web e reverse proxy leve, usado para balanceamento de carga e caching.',
            },
        ],
    },
];

export default Tecnologies;
