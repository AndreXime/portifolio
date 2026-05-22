const siteBase = {
	authorName: "André Ximenes",
	email: "andreximenesa20@gmail.com",
	githubUrl: "https://github.com/AndreXime",
	linkedinUrl: "https://www.linkedin.com/in/andreximenesdev",
	resumePdfUrl: "/André-Curriculo.pdf",
};

export const site = {
	...siteBase,
	heroIntroMarkdown: `
Olá, meu nome é **${siteBase.authorName}**. Sou desenvolvedor de software especializado em ecossistema TypeScript. Meu foco é traduzir regras de negócio em código auto-documentado, criando APIs estáveis e interfaces que evoluem sem medo de refatoração. **Atualmente buscando novos desafios em times de engenharia.**
`,
	aboutBodyMarkdown: `
Contribuo em backend e frontend. No backend, uso **Node.js ou Bun** para APIs objetivas, seguras e previsíveis. No frontend, cuido da experiência do usuário (UX e UI) com telas claras e funcionais, hoje principalmente com **React/Next.js ou Astro**. Na prática, isso é ligar o comportamento da API ao que a pessoa vê na tela, para que o carregamento, o erro e o sucesso fiquem claros e coerentes.

Busco código claro e bem estruturado, no espírito de *Clean Code*, para facilitar revisão e evolução no dia a dia do time. Equilibro cuidado técnico com pragmatismo. Quando uma solução menor já resolve, evito complicar além do necessário. Entendo que visão de longo prazo no código amadurece com tempo, revisão e contexto de produto. Foco em entregar com consistência, aprender com feedback e ir deixando o que toco mais sólido aos poucos.
`,
};
