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
        title: 'Librebookmark',
        description: `
Criei esse site como uma forma melhor de gerenciar meus favoritos. Sempre achei que os favoritos dos navegadores são meio bagunçados e visualmente poluídos,
então desenvolvi essa alternativa com uma interface mais agradável e fácil de usar.\n
O site funciona quase 100% no lado do cliente, guardando tudo direto no navegador.\n
Dá pra organizar, editar, importar e exportar os favoritos de forma simples, e ele funciona bem tanto no desktop quanto no celular.`,
        image: '/assets/librebookmark.png',
        linkGithub: 'https://github.com/AndreXime/LibreBookmark',
        tags: ['Next.js', 'Browser', 'Typescript', 'TailwindCSS'],
        linkOnline: 'https://librebookmark.andreximenes.xyz/',
    },
    {
        title: 'Tasker CLI',
        description:
            'CLI desenvolvido em Go para gerenciar comandos frequentes no terminal. Permite salvar, executar e organizar comandos personalizados com suporte a parâmetros dinâmicos, armazenamento persistente em JSON e integração automática ao $PATH.',
        tags: ['Go', 'CLI', 'Automação', 'Terminal', 'Produtividade'],
        image: '/assets/tasker.png',
        linkGithub: 'https://github.com/AndreXime/tasker-cli',
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
