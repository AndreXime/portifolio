const Projects: ProjetcsType[] = [
    {
        title: 'ConectaQR',
        description: `
Desenvolvi uma plataforma web para exposição de produtos, inicialmente como um projeto freelance para um comércio local,
mas escalável para múltiplas empresas. A plataforma permite que cada empresa tenha sua própria página
personalizada, exibindo seus produtos com imagens e informações essenciais, como WhatsApp, Instagram e localização via Google Maps.
`,
        image: '/assets/conectaqr.png',
        linkGithub: 'https://github.com/AndreXime/ConnectQR',
        tags: ['Express.js', 'Typescript', 'PostgreSQL', 'TailwindCSS', 'Next.js'],
        linkOnline: 'https://conectaqr.tech',
    },
    {
        title: 'Restaurante Tech',
        description: `
Desenvolvi um sistema de Ponto de Venda (PDV) completo para restaurantes.
A principal característica é sua arquitetura totalmente client-side, que utiliza IndexedDB para o armazenamento local de dados,
garantindo que o sistema funcione de forma 100% offline e seja ágil em qualquer dispositivo.
Implementei módulos essenciais que cobrem todo o fluxo de um restaurante, incluindo a gestão do cardápio, o controle de mesas,
painel para a cozinha, o gerenciamento de entregas e um sistema de contabilidade para o fechamento de caixa.`,
        image: '/assets/cozinhatech.png',
        linkGithub: 'https://github.com/AndreXime/restaurante',
        tags: ['Next.js', 'Typescript', 'TailwindCSS', 'shadCN'],
        linkOnline: 'https://restaurante.andreximenes.xyz/',
    },
    {
        title: 'Organizador de Disciplinas',
        description: `
Para resolver um problema comum entre os alunos de Ciência da Computação na minha faculdade, 
criei um site que facilita o planejamento de cada semestre. A ferramenta substitui o uso de planilhas manuais, 
permitindo que o estudante marque as disciplinas que já concluiu. Com base nisso, o sistema calcula automaticamente 
quais são as próximas matérias disponíveis, respeitando a cadeia de pré-requisitos do curso. 
Além disso, a aplicação monta uma grade de horários visual em um calendário semanal,
ajudando o aluno a organizar sua rotina e evitar conflitos. Todo o progresso é salvo diretamente no navegador para maior praticidade.`,
        tags: ['Next.js', 'TailwindCSS', 'Educação', 'UX'],
        image: '/assets/disciplinas-uva.png',
        linkOnline: 'https://disciplina-uva.andreximenes.xyz/',
        linkGithub: 'https://github.com/AndreXime/organiza-cc-uva',
    },
    {
        title: 'API Mockup',
        description: `
    Desenvolvi uma ferramenta desktop para agilizar e simplificar o desenvolvimento de aplicações frontend.
    Com esta ferramenta, permiti desenvolvedores criar e servir endpoints de API falsos de forma rápida,
    definindo o método HTTP, o caminho, a resposta JSON e até simulando rotas que exigem autenticação. Construi o projeto com Go e Wails no backend,
    e desenvolvi a interface com TypeScript e TailwindCSS que permite gerenciar um servidor HTTP local com apenas um clique.`,
        tags: ['Go', 'Wails', 'Typescript', 'Vite', 'Developer Tool'],
        image: '/assets/api-mockup.png',
        linkGithub: 'https://github.com/AndreXime/api-mockup',
    },
    {
        title: 'PixelPress',
        description: `
Construi uma ferramenta de linha de comando (CLI) em Go para facilitar a edição de imagens em massa com uma interface interativa.
Para evitar a necessidade de decorar comandos complexos do ffmpeg.
A aplicação detecta automaticamente as imagens no diretório, permite selecionar múltiplos arquivos e oferece duas funções principais:
conversão de formato e uma compressão inteligente, onde o usuário define um tamanho máximo (em MB) e a ferramenta ajusta a qualidade 
para atingir aquele objetivo.
        `,
        image: '/assets/editphotocli.png',
        linkGithub: 'https://github.com/AndreXime/pixel-press',
        tags: ['Go', 'CLI', 'Automação', 'Edição'],
    },
    {
        title: 'TaskRunner',
        description: `
Desenvolvi uma ferramenta de linha de comando (CLI) em Go para otimizar a produtividade no terminal.
A aplicação permite que o usuário salve comandos utilizados com frequência.
É possível executar, listar, adicionar e remover esses favoritos de forma simples e rápida.
Um dos principais recursos é o suporte a placeholders como $1, que permite a criação de comandos dinâmicos onde um argumento pode 
ser passado diretamente na execução,
tornando a ferramenta flexível para diversas situações.
        `,
        image: '/assets/taskrunner.png',
        linkGithub: 'https://github.com/AndreXime/task-runner',
        tags: ['Go', 'CLI', 'Produtividade'],
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
