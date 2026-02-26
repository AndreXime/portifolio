export const tsCode = `
interface IDeveloper {
  name: string;
  role: "Frontend" | "Backend" | "Fullstack";
  skills: string[];
  isProblemSolver: boolean;
}

class Developer implements IDeveloper {
  private readonly name: string;
  private role: "Frontend" | "Backend" | "Fullstack";
  private skills: string[];
  private isProblemSolver: boolean;

  constructor(config: IDeveloper) {
    this.name = config.name;
    this.role = config.role;
    this.skills = config.skills;
    this.isProblemSolver = config.isProblemSolver;
  }

  /**
   * Valida se o desenvolvedor é qualificado para uma demanda.
   */
  public isQualifiedFor(techStack: string[]): boolean {
    const hasRequiredTech = techStack.every(tech => this.skills.includes(tech));
    return hasRequiredTech && this.isProblemSolver;
  }
}

const andre = new Developer({
  name: "Andre Ximenes",
  role: "Fullstack",
  isProblemSolver: true,
  skills: ["TypeScript", "React", "Node.js", "Cloud", "PostgreSQL"],
});

const projectRequirements = ["TypeScript", "Cloud"];

if (andre.isQualifiedFor(requiredTech)) {
  console.log(\`\${andre.name} is ready to ship!\`);
}

// Output: Andre Ximenes is ready to ship!`;
