import { getCollection, getEntry } from "astro:content";

const [portfolioEntry, experiencesEntry, formationsEntry, technologiesEntry, projectsCollection] = await Promise.all([
	getEntry("portfolio", "portfolio"),
	getEntry("experiences", "experiences"),
	getEntry("formations", "formations"),
	getEntry("technologies", "technologies"),
	getCollection("projects"),
]);

if (!portfolioEntry) {
	throw new Error("portfolio.md não encontrado na collection portfolio.");
}
if (!experiencesEntry) {
	throw new Error("experiences.md não encontrado na collection experiences.");
}
if (!formationsEntry) {
	throw new Error("formations.md não encontrado na collection formations.");
}
if (!technologiesEntry) {
	throw new Error("technologies.md não encontrado na collection technologies.");
}

const portfolio = portfolioEntry.data;

export const site = {
	authorName: portfolio.authorName,
	email: portfolio.email,
	githubUrl: portfolio.githubUrl,
	linkedinUrl: portfolio.linkedinUrl,
	blogUrl: portfolio.blogUrl,
	resumePdfUrl: portfolio.resumePdfUrl,
	seo: portfolio.seo,
	person: portfolio.person,
	hero: portfolio.hero,
	about: portfolio.about,
	sections: portfolio.sections,
	cta: portfolio.cta,
};

export const experiences = experiencesEntry.data.experiences;
export const formations = formationsEntry.data.formations;
export const technologies = technologiesEntry.data.technologies;

export const projects = projectsCollection.sort((a, b) => a.data.order - b.data.order);
