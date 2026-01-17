export const tsCode = `
interface Developer {
  readonly name: string;
  role: "Frontend" | "Backend" | "Fullstack";
  skills: string[];
  solutionOriented: boolean;
}

const andre: Developer = {
  name: "Andre Ximenes",
  role: "Fullstack",
  skills: ["TypeScript", "React", "Go", "API"],
  solutionOriented: true,
};

function isReady(dev: Developer): boolean {
  return dev.skills.length > 0 && dev.solutionOriented;
}

if (isReady(andre)) {
  console.log(\`\${andre.name} is ready to build!\`);
}

// Result: Andre Ximenes is ready to build!`;

export const goCode = `
package main
import "fmt"

type Developer struct {
    Name             string
    Skills           []string
    SolutionOriented bool
}

func (d Developer) IsReady() bool {
	return len(d.Skills) > 0 && d.SolutionOriented
}

func main() {
	andre := Developer{
       Name:             "André Ximenes",
       Skills:           []string{"Go", "API", "TypeScript", "React"},
       SolutionOriented: true,
	}

	if andre.IsReady() {
		fmt.Printf("%s is ready to build!\\n", andre.Name)
	}
}`;
