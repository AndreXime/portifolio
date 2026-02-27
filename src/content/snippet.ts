export const snippets = [
	{
		filename: "main.ts",
		code: `
import { Developer } from "./developer";

const andre = new Developer({
  name: "Andre Ximenes",
  role: "Fullstack",
  isProblemSolver: true,
  skills: ["TypeScript", "React", "Node.js", "Cloud", "PostgreSQL"],
});

const projectRequirements = ["TypeScript", "Cloud"];

if (andre.isQualifiedFor(projectRequirements)) {
  console.log(\`\${andre.name} is ready to ship!\`);
}

// Output: Andre Ximenes is ready to ship!
`,
	},
	{
		filename: "developer.ts",
		code: `
type Role = "Frontend" | "Backend" | "Fullstack";

interface DeveloperProps {
	readonly name: string;
	role: Role;
	skills: string[];
	isProblemSolver: boolean;
}

interface IDeveloper extends DeveloperProps {
	isQualifiedFor(techStack: string[]): boolean;
}

export class Developer implements IDeveloper {
	readonly name: string;
	role: Role;
	skills: string[];
	isProblemSolver: boolean;

	constructor(props: DeveloperProps) {
		this.name = props.name;
		this.role = props.role;
		this.skills = props.skills;
		this.isProblemSolver = props.isProblemSolver;
	}

	isQualifiedFor(techStack: string[]): boolean {
		return techStack.every((tech) => this.skills.includes(tech)) && this.isProblemSolver;
	}
}
`,
	},
];
