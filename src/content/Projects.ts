const Projects: ProjetcsType[] = [
    {
        title: 'ConectaQR',
        description: `
Desenvolvi uma plataforma web para exposição de produtos, inicialmente como um projeto freelance para um comércio local, mas escalável para múltiplas empresas. A plataforma permite que cada empresa tenha sua própria página
personalizada, exibindo seus produtos com imagens e informações essenciais, como WhatsApp, Instagram e localização via Google Maps.`,
        image: '/assets/conectaqr.png',
        linkGithub: 'https://github.com/AndreXime/ConnectQR',
        tags: ['Express.js', 'Typescript', 'PostgreSQL', 'TailwindCSS', 'Next.js'],
        linkOnline: 'https://conectaqr.tech',
    },
    {
        title: 'Restaurante Tech',
        description: `
Desenvolvi a interface de um sistema de Ponto de Venda (PDV) voltado para restaurantes.\n
A aplicação oferece um cardápio digital interativo, permitindo a simulação de pedidos vinculados a mesas específicas, além de telas para gerenciamento de mesas, reservas, entregas, pedidos e comunicação com a cozinha.\n
Para garantir uma experiência totalmente client-side e offline, implementei o armazenamento local com IndexedDB, eliminando a necessidade de backend durante o uso.
`,
        image: '/assets/cozinhatech.png',
        linkGithub: 'https://github.com/AndreXime/restaurante',
        tags: ['Next.js', 'Typescript', 'TailwindCSS', 'ShadCN'],
        linkOnline: 'https://restaurante.andreximenes.xyz/',
    },
    {
        title: 'Organizador de Disciplinas - CC UVA',
        description:
            'Site para organizar as disciplinas do curso de Ciência da Computação da UVA, facilitando o planejamento semestral. Permite marcar disciplinas concluídas, calcular disponibilidade com base em pré-requisitos e visualizar a grade de horários em um calendário semanal, com salvamento automático no navegador.',
        tags: ['Web', 'Organização', 'Educação', 'UI', 'SPA'],
        image: '/assets/disciplinas-uva.png',
        linkOnline: 'https://disciplina-uva.andreximenes.xyz/',
        linkGithub: 'https://github.com/AndreXime/organiza-cc-uva',
    },
    {
        title: 'TechVerse',
        description:
            'Blog com estética synthwave focado em desenvolvimento, tecnologia e compartilhamento de conhecimento técnico.',
        tags: ['Blog', 'Next.js', 'Social'],
        image: '/assets/techverse.png',
        linkOnline: 'https://techverse.andreximenes.xyz',
        linkGithub: 'https://github.com/AndreXime/TechVerse',
    },
];

interface ProjetcsType {
    title: string;
    description: string;
    image: string;
    linkGithub: string;
    linkOnline?: string;
    tags: string[];
}

export default Projects;
