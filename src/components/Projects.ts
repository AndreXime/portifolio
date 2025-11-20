export interface Project {
    title: string;
    description: string;
    type: 'app' | 'api' | 'cli' | 'landing page';
    tech: string[];
    image: string;
    link: string;
    github: string;
}

export const projects: Project[] = [
    {
        title: 'Restaurante Tech',
        description:
            'Sistema de Ponto de Venda (PDV) completo para restaurantes, 100% offline, usando IndexedDB para armazenamento local de dados.',
        type: 'app',
        tech: ['TypeScript', 'React', 'IndexedDB', 'Client-Side Architecture', 'PDV'],
        image: 'restaurante.png',
        link: 'https://restaurante.andreximenes.xyz/',
        github: 'https://github.com/AndreXime/restaurante',
    },
    {
        title: 'Landing Page de Alto Desempenho para Captação de Clientes Freelancer.',
        description:
            'Desenvolvida para empresas descobrirem e contratarem serviços de desenvolvimento. Utiliza a performance do Astro e a confiabilidade do TypeScript. A arquitetura otimizada em UI/UX transforma a experiência do usuário em uma vantagem competitiva, facilitando a decisão de contratação.',
        type: 'landing page',
        tech: ['TypeScript', 'Astro', 'Preact', 'SSR', 'UX', 'UI'],
        image: 'contrate.png',
        link: 'https://contrate.andreximenes.xyz/',
        github: '',
    },
    {
        title: 'Organizador de Disciplinas',
        description:
            'Ferramenta para alunos de Ciência da Computação planejarem semestres, calculando pré-requisitos e montando grade horária visualmente.',
        type: 'app',
        tech: ['TypeScript', 'React', 'Local Storage', 'Estruturas de Dados'],
        image: 'disciplinas.png',
        link: 'https://disciplina-uva.andreximenes.xyz/',
        github: 'https://github.com/AndreXime/organiza-cc-uva',
    },
    {
        title: 'Loja Gin API',
        description:
            'API RESTful completa para e-commerce (carrinho, autenticação JWT, CRUD) construída em Go com o framework Gin e GORM.',
        type: 'api',
        tech: ['Go (Golang)', 'Gin Framework', 'PostgreSQL', 'GORM', 'JWT', 'Swagger', 'Testes E2E', 'API REST'],
        image: 'lojagin.png',
        link: '',
        github: 'https://github.com/AndreXime/lojagin-api',
    },
    {
        title: 'PixelPress',
        description:
            'Ferramenta CLI para edição em massa de imagens com interface interativa, focada em compressão inteligente e conversão de formato.',
        type: 'cli',
        tech: ['Go (Golang)', 'CLI', 'FFmpeg', 'Otimização de Imagens'],
        image: 'pixelpress.png',
        link: '',
        github: 'https://github.com/AndreXime/pixel-press',
    },
];
