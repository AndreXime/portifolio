import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { cache } from 'react';

const ProjectsContent = cache((): Project[] => {
	const filePath = path.join(process.cwd(), 'src', 'content', 'Projects.yaml');
	const fileContents = fs.readFileSync(filePath, 'utf8');
	return yaml.load(fileContents) as Project[];
})();

const TechnologiesContent = cache((): Technology[] => {
	const filePath = path.join(process.cwd(), 'src', 'content', 'Technologies.yaml');
	const fileContents = fs.readFileSync(filePath, 'utf8');
	return yaml.load(fileContents) as Technology[];
})();

export { ProjectsContent, TechnologiesContent };

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
