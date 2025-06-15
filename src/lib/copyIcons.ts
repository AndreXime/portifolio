import { mkdirSync, copyFileSync } from 'fs';
import { resolve, join, basename } from 'path';

const icons = [
	'react/react-original.svg',
	'nextjs/nextjs-original.svg',
	'typescript/typescript-original.svg',
	'tailwindcss/tailwindcss-original.svg',
	'nodejs/nodejs-original.svg',
	'postgresql/postgresql-original.svg',
	'docker/docker-original.svg',
	'githubactions/githubactions-original.svg',
	'git/git-original.svg',
	'linux/linux-original.svg',
	'nginx/nginx-original.svg',
	'vscode/vscode-original.svg',
];

const sourceBase = resolve('node_modules/devicon/icons');
const targetBase = resolve('public/icons');

// Garante que a pasta public/icons existe
mkdirSync(targetBase, { recursive: true });

icons.forEach((iconPath) => {
	const src = join(sourceBase, iconPath);
	const filename = basename(iconPath);
	const dest = join(targetBase, filename);

	copyFileSync(src, dest);
	console.log(`✔ Copiado: ${filename}`);
});
