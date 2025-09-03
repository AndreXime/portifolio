import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export interface ProjectType {
    title: string;
    shortDescription: string;
    description: string;
    images: string[];
    linkGithub: string;
    linkOnline?: string;
}

type RawProjectData = { [key: string]: string };

function parseProjectsMd(filename: string): ProjectType[] {
    const filePath = path.join(process.cwd(), 'src/content', filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Separa o arquivo em blocos de projeto usando '---' como delimitador
    const projectBlocks = fileContent.split('\n---\n').filter((block) => block.trim() !== '');

    return projectBlocks.map((block) => {
        const lines = block.trim().split('\n');

        // Constroi o objeto bruto
        const rawData = lines.reduce<RawProjectData>((acc, line) => {
            const match = line.match(/^(\w+):\s?(.*)/);
            if (match) {
                const key = match[1];
                const value = match[2].trim();
                acc[key] = value;
                acc.lastKey = key;
            } else if (acc.lastKey === 'description' || acc.lastKey === 'shortDescription') {
                // Significa que a linha não tem chave então deve ser linhas extras do description ou shortDescription
                acc[acc.lastKey] += '\n' + line.trim();
            }
            return acc;
        }, {});

        if (
            !rawData.title ||
            !rawData.folderName ||
            !rawData.imagesAmount ||
            !rawData.linkGithub ||
            !rawData.description ||
            !rawData.shortDescription
        ) {
            throw new Error(`Projeto inválido\n"${block}"`);
        }

        const folderName = rawData.folderName;

        const amount = Number(rawData.imagesAmount);

        const generatedImages = Array.from({ length: amount }, (_, i) => {
            return `/assets/${folderName}/photo${i + 1}.png`;
        });

        const descriptionHtml = marked(rawData.description.trim(), { async: false });

        return {
            title: rawData.title,
            images: generatedImages,
            linkGithub: rawData.linkGithub,
            description: descriptionHtml,
            shortDescription: rawData.shortDescription,
            ...(rawData.linkOnline && { linkOnline: rawData.linkOnline }),
        };
    });
}

const projectsArray = parseProjectsMd('ProjectsPart1.md');
const projectsArray2 = parseProjectsMd('ProjectsPart2.md');

export default [...projectsArray, ...projectsArray2];
