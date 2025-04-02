import fs from 'fs';
import yaml from 'js-yaml';
import { cache } from 'react';

const loadYamlContent = <T>(fileName: string): T => {
	const fileContents = fs.readFileSync(`src/content/${fileName}`, 'utf8');
	return yaml.load(fileContents) as T;
};

export const ProjectsContent = cache(() => loadYamlContent<Project[]>('Projects.yaml'))();
export const TechnologiesContent = cache(() => loadYamlContent<Technology[]>('Technologies.yaml'))();
export const QuestionsContent = cache(() => loadYamlContent<About[]>('Questions.yaml'))();

interface Project {
	title: string;
	description: string;
	image: string;
	link: string;
	tags: string[];
	linkOnline: string;
}

interface Technology {
	category: string;
	skills: { name: string; icon: string }[];
}

interface About {
	questao: string;
	resposta: string;
}
