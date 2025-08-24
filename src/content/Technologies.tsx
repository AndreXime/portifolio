function wrapIcon(src: string) {
    return function iconImg({ alt, className = '', ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
        // Png estica demais se usar w-full
        const finalClass = src.endsWith('.png') ? className.replace(/\bw-full\b/, 'w-9') : className;
        return <img src={src} alt={alt || 'Icone de tecnologia'} loading="lazy" className={finalClass} {...props} />;
    };
}

function wrapIconPair(src1: string, src2: string) {
    return function iconImg({ alt }: React.ImgHTMLAttributes<HTMLDivElement>) {
        return (
            <div className="flex justify-center items-center gap-2 mb-2">
                <img className="w-10 h-10 md:w-12 md:h-12" src={src1} alt={alt} />
                <img className="w-10 h-10 md:w-12 md:h-12" src={src2} alt={alt} />
            </div>
        );
    };
}

interface Category {
    category: string;
    skills: {
        name: string;
        Icon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>>;
        descricao: string;
    }[];
}

const Tecnologies: Category[] = [
    {
        category: 'Frontend',
        skills: [
            {
                name: 'TypeScript',
                Icon: wrapIcon('/icons/typescript.svg'),
                descricao: 'Superset de JavaScript que adiciona tipagem estática para maior robustez de código.',
            },
            {
                name: 'HTML/CSS',
                Icon: wrapIconPair('/icons/html.svg', 'icons/css.svg'),
                descricao: 'Biblioteca para construir interfaces de usuário de forma declarativa e componentizada.',
            },
            {
                name: 'React.js',
                Icon: wrapIcon('/icons/react.svg'),
                descricao: 'Biblioteca para construir interfaces de usuário de forma declarativa e componentizada.',
            },
            {
                name: 'Next.js',
                Icon: wrapIcon('/icons/nextjs.svg'),
                descricao: 'Framework React com renderização híbrida (SSR/SSG) e roteamento simplificado.',
            },
            {
                name: 'Tailwind CSS',
                Icon: wrapIcon('/icons/tailwindcss.svg'),
                descricao: 'Framework utilitário de CSS que permite estilizar direto no markup com classes.',
            },
        ],
    },
    {
        category: 'Backend',
        skills: [
            {
                name: 'Node.js',
                Icon: wrapIcon('/icons/nodejs.svg'),
                descricao: 'Runtime JavaScript no servidor, ideal para aplicações I/O intensivas e em tempo real.',
            },
            {
                name: 'Express.js',
                Icon: wrapIcon('/icons/express.svg'),
                descricao: 'Framework minimalista para criar APIs e servidores HTTP sobre Node.js.',
            },
            {
                name: 'PostgreSQL',
                Icon: wrapIcon('/icons/postgresql.svg'),
                descricao: 'Banco de dados relacional open source com suporte avançado a SQL e extensões.',
            },
            {
                name: 'Go',
                Icon: wrapIcon('/icons/go.svg'),
                descricao:
                    'Linguagem compilada, concorrente e de alto desempenho, ideal para APIs com tempo de resposta critico.',
            },
            {
                name: 'Gin Framework',
                Icon: wrapIcon('/icons/gin.png'),
                descricao:
                    'Framework web minimalista e de alta performance para Go, ideal para criar APIs rápidas e escaláveis.',
            },
        ],
    },
    {
        category: 'DevOps',
        skills: [
            {
                name: 'Docker',
                Icon: wrapIcon('/icons/docker.svg'),
                descricao: 'Plataforma de conteinerização que garante ambiente isolado e reproduzível.',
            },
            {
                name: 'CI/CD',
                Icon: wrapIcon('/icons/githubactions.svg'),
                descricao: 'Conjunto de práticas para integração e entrega contínua de software de forma automatizada.',
            },
            {
                name: 'Git',
                Icon: wrapIcon('/icons/git.svg'),
                descricao:
                    'Sistema de controle de versão distribuído amplamente adotado no desenvolvimento de software.',
            },
            {
                name: 'Linux',
                Icon: wrapIcon('/icons/linux.svg'),
                descricao: 'Sistema operacional open source usado como base na maior parte de servidores de produção.',
            },
            {
                name: 'Nginx',
                Icon: wrapIcon('/icons/nginx.svg'),
                descricao: 'Servidor web e reverse proxy leve, usado para balanceamento de carga e caching.',
            },
        ],
    },
];

export default Tecnologies;
