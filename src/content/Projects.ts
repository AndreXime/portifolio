import fs from 'fs';
import path from 'path';

export interface ProjectType {
    title: string;
    description: string;
    image: string;
    linkGithub: string;
    linkOnline?: string;
    tags: string[];
}

type RawProjectData = { [key: string]: string };

function parseProjectsMd(filePath: string): ProjectType[] {
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
            } else if (acc.description) {
                // Se a linha não tem uma chave e já existe uma descrição,
                // considera que é uma continuação da descrição.
                acc.description += '\n' + line.trim();
            }
            return acc;
        }, {});

        if (!rawData.title || !rawData.image || !rawData.linkGithub || !rawData.tags || !rawData.description) {
            throw new Error(`Projeto inválido.\n"${block}"`);
        }

        return {
            title: rawData.title,
            image: rawData.image,
            linkGithub: rawData.linkGithub,
            description: rawData.description,
            tags: JSON.parse(rawData.tags),
            ...(rawData.linkOnline && { linkOnline: rawData.linkOnline }),
        };
    });
}

const mdPath = path.join(process.cwd(), 'src/content/Projects.md');
const projectsArray = parseProjectsMd(mdPath);
export default projectsArray;
