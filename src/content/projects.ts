export interface Project {
  title: string;
  description: string;
  type: "app" | "api" | "cli" | "landing page";
  tech: string[];
  imageUrl: string;
  link: string;
  github: string;
}

export const Projects: Project[] = [
  {
    title: "PDV para Restaurantes (Offline-First)",
    description:
      "Sistema de Ponto de Venda (PDV) completo para restaurantes, 100% offline, usando IndexedDB para armazenamento local de dados.",
    type: "app",
    tech: ["TypeScript", "React", "IndexedDB", "Client-Side Architecture", "PDV"],
    imageUrl: "restaurante.png",
    link: "https://restaurante.andreximenes.xyz/",
    github: "https://github.com/AndreXime/restaurante",
  },
  {
    title: "Plataforma de Captação B2B para Freelancers",
    description:
      "Desenvolvida para empresas descobrirem e contratarem serviços de desenvolvimento. Utiliza a performance do Astro e a confiabilidade do TypeScript. A arquitetura otimizada em UI/UX transforma a experiência do usuário em uma vantagem competitiva, facilitando a decisão de contratação.",
    type: "landing page",
    tech: ["TypeScript", "Astro", "Preact", "SSR", "UX / UI"],
    imageUrl: "contrate.png",
    link: "https://contrate.andreximenes.xyz/",
    github: "",
  },
  {
    title: "Planejador Acadêmico",
    description:
      "Ferramenta para alunos de Ciência da Computação planejarem semestres, calculando pré-requisitos e montando grade horária visualmente.",
    type: "app",
    tech: ["TypeScript", "React", "Local Storage", "Estruturas de Dados"],
    imageUrl: "disciplinas.png",
    link: "https://disciplina-uva.andreximenes.xyz/",
    github: "https://github.com/AndreXime/organiza-cc-uva",
  },
  {
    title: "E-commerce de Eletrônicos",
    description:
      "Plataforma desenvolvida para ecommerce com visual polido e focado na experiencia de usuario, com todas as funcionalidades essenciais como: Autenticação, Filtragem de produtos, Carrinho e Pagamento.",
    type: "landing page",
    tech: ["TypeScript", "Next.js", "React", "UX/UI", "TailwindCSS"],
    imageUrl: "ecommerce.png",
    link: "https://ecommerce.andreximenes.xyz/",
    github: "",
  },
  {
    title: "MiniHub: Utilitários para Produtividade",
    description:
      "Ferramentas para o dia a dia, como gerar senhas ou até mais complexas como gerar um resumo quanto gasta de gasolina com esse trajeto por mẽs",
    type: "app",
    tech: ["TypeScript", "React", "Ferramenta para dia a dia", "UX / UI"],
    imageUrl: "minihub.png",
    link: "https://ferramentas.andreximenes.xyz/",
    github: "http://github.com/AndreXime/minihub",
  },
  {
    title: "E-commerce RESTful API",
    description:
      "API RESTful completa para e-commerce (carrinho, autenticação JWT, CRUD) construída em Go com o framework Gin e GORM.",
    type: "api",
    tech: ["Go (Golang)", "Gin Framework", "GORM", "Swagger", "Testes E2E", "API REST"],
    imageUrl: "lojagin.png",
    link: "",
    github: "https://github.com/AndreXime/lojagin-api",
  },
  {
    title: "PixelPress: Processador de Imagens via CLI",
    description:
      "Ferramenta CLI para edição em massa de imagens com interface interativa, focada em compressão inteligente e conversão de formato.",
    type: "cli",
    tech: ["Go (Golang)", "CLI", "FFmpeg", "Otimização de Imagens"],
    imageUrl: "pixelpress.png",
    link: "",
    github: "https://github.com/AndreXime/pixel-press",
  },
  {
    title: "Media Downloader via Linha de Comando",
    description:
      "Ferramenta CLI para baixar videos e musicas do youtube usando yt-dlp, tendo a possibilidade de baixar a playlist inteira.",
    type: "cli",
    tech: ["Go (Golang)", "CLI", "yt-dlp", "Downloader"],
    imageUrl: "yt-downloader.png",
    link: "",
    github: "https://github.com/AndreXime/youtube-downloader",
  },
];
