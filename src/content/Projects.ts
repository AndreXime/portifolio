const Projects = [
	{
		title: 'ConectaQR',
		description: `
Desenvolvi uma plataforma web para exposição de produtos, inicialmente como um projeto freelance para um comércio local, mas escalável para múltiplas empresas. A plataforma permite que cada empresa tenha sua própria página
personalizada, exibindo seus produtos com imagens e informações essenciais, como WhatsApp, Instagram e localização via Google Maps.`,
		image: '/assets/conectaqr.png',
		link: 'https://github.com/AndreXime/ConnectQR',
		tags: ['Express.js', 'Typescript', 'PostgreSQL', 'TailwindCSS', 'Next.js'],
		linkOnline: 'https://conectaqr.tech',
	},
	{
		title: 'Restaurante Tech',
		description: `
Desenvolvi a interface de um sistema de Ponto de Venda (PDV) voltado para restaurantes, com foco em usabilidade e eficiência no ambiente operacional.\n
A aplicação oferece um cardápio digital interativo, permitindo a simulação de pedidos vinculados a mesas específicas, além de telas para gerenciamento de mesas, reservas, entregas, pedidos e comunicação com a cozinha.\n
Para garantir uma experiência totalmente client-side e offline, implementei o armazenamento local com IndexedDB, eliminando a necessidade de backend durante o uso e testes.
`,
		image: '/assets/cozinhatech.png',
		link: 'https://github.com/AndreXime/restaurante',
		tags: ['Next.js', 'Typescript', 'TailwindCSS', 'ShadCN'],
		linkOnline: 'https://restaurante.andreximenes.xyz/',
	},
	{
		title: 'Librebookmark',
		description: `
Criei esse site como uma forma melhor de gerenciar meus favoritos. Sempre achei que os favoritos dos navegadores são meio bagunçados e visualmente poluídos,
então desenvolvi essa alternativa com uma interface mais agradável e fácil de usar.\n
O site funciona quase 100% no lado do cliente, guardando tudo direto no navegador — nada vai pra servidor nenhum.
O único uso de backend (bem leve) é só pra gerar uma imagem com base na URL do favorito.\n
Dá pra organizar, editar, importar e exportar os favoritos de forma simples, e ele funciona bem tanto no desktop quanto no celular.`,
		image: '/assets/librebookmark.png',
		link: 'https://github.com/AndreXime/LibreBookmark',
		tags: ['Next.js', 'Browser', 'Typescript', 'TailwindCSS'],
		linkOnline: 'https://librebookmark.andreximenes.xyz/',
	},
];
export default Projects;
