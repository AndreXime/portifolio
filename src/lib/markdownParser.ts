import type { About, ParsedAbout, SocialLinks } from "@/content/types";

type ExperienceItem = About["experience"][0];
type EducationItem = About["education"][0];

export function parseMarkdownToObject(markdown: string): ParsedAbout {
	const lines = markdown.split("\n");

	const socialLinks: SocialLinks = { email: "", github: "", linkedin: "" };
	let heroText = "";
	const about: About = {
		trajetoria: [],
		highlights: { stackPrincipal: "", experience: "", location: "" },
		experience: [],
		education: [],
	};

	let currentSection = "";
	let tempExp: Partial<ExperienceItem> | null = null;
	let tempEdu: Partial<EducationItem> | null = null;
	let trajetoriaParagraph = "";

	for (let line of lines) {
		const trimmed = line.trim();

		if (trimmed.startsWith("//")) continue;
		if (!trimmed) {
			if (currentSection === "TRAJETORIA" && trajetoriaParagraph) {
				about.trajetoria.push(trajetoriaParagraph);
				trajetoriaParagraph = "";
			}
			continue;
		}
		line = trimmed;

		if (line.startsWith("# ")) {
			if (currentSection === "TRAJETORIA" && trajetoriaParagraph) {
				about.trajetoria.push(trajetoriaParagraph);
				trajetoriaParagraph = "";
			}
			currentSection = line.replace("# ", "").toUpperCase();
			continue;
		}

		switch (currentSection) {
			case "HEADER": {
				const [key, ...values] = line.split(":");
				const value = values.join(":").trim();
				if (!key || !value) break;

				const k = key.toLowerCase();
				if (k === "email") socialLinks.email = value;
				else if (k === "linkedin") socialLinks.linkedin = value;
				else if (k === "github") socialLinks.github = value;
				break;
			}

			case "INTRO":
				heroText += (heroText ? " " : "") + line;
				break;

			case "TRAJETORIA":
				trajetoriaParagraph += (trajetoriaParagraph ? " " : "") + line;
				break;

			case "HIGHLIGHTS": {
				const colon = line.indexOf(":");
				if (colon === -1) break;
				const key = line.slice(0, colon).trim().toLowerCase();
				const value = line.slice(colon + 1).trim();
				if (key.includes("stack")) about.highlights.stackPrincipal = value;
				else if (key.includes("experiência") || key.includes("experiencia")) about.highlights.experience = value;
				else if (key.includes("localização") || key.includes("localizacao")) about.highlights.location = value;
				break;
			}

			case "EXPERIENCE":
				if (line.startsWith("## ")) {
					const parts = line
						.replace("## ", "")
						.split("|")
						.map((s) => s.trim());

					if (tempExp?.role && tempExp.company) {
						about.experience.push(tempExp as ExperienceItem);
					}
					tempExp = {
						role: parts[0] || "",
						company: parts[1] || "",
						period: parts[2] || "",
						description: "",
					};
				} else if (tempExp && !line.startsWith("##")) {
					tempExp.description = (tempExp.description || "") + (tempExp.description ? " " : "") + line;
				}
				break;

			case "EDUCATION":
				if (line.startsWith("## ")) {
					const parts = line
						.replace("## ", "")
						.split("|")
						.map((s) => s.trim());

					if (tempEdu?.degree) {
						about.education.push(tempEdu as EducationItem);
					}
					tempEdu = {
						degree: parts[0] || "",
						institution: parts[1] || "",
						period: parts[2] || "",
						description: "",
					};
				} else if (tempEdu && !line.startsWith("##")) {
					tempEdu.description += (tempEdu.description ? " " : "") + line;
				}
				break;
		}
	}

	if (tempExp?.role) about.experience.push(tempExp as ExperienceItem);
	if (tempEdu?.degree) about.education.push(tempEdu as EducationItem);
	if (trajetoriaParagraph) about.trajetoria.push(trajetoriaParagraph);

	return { socialLinks, heroText, about };
}

export function richTextToHtml(content: string): string {
	return content
		.replace(/\*\*(.*?)\*\*/g, `<span class="font-bold text-primary">$1</span>`)
		.replace(/\*(.*?)\*/g, `<span class="italic">$1</span>`);
}
