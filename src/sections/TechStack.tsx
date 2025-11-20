import { Reveal } from '../components/Reveal';
import {
    ApiIcon,
    DatabaseIcon,
    GitIcon,
    HostIcon,
    FrontendIcon,
    ServerIcon,
    TailwindIcon,
    TypescriptIcon,
    DockerIcon,
    CICDIcon,
    LinuxIcon,
} from '@/components/Icons';

interface TechItem {
    name: string;
    role: string;
    icon: React.ElementType;
}

const technologies: TechItem[] = [
    { name: 'TypeScript', role: 'Linguagem Principal', icon: TypescriptIcon },
    { name: 'React / Next.js', role: 'Frontend Framework', icon: FrontendIcon },
    { name: 'Tailwind CSS / ShadCN', role: 'Estilização', icon: TailwindIcon },
    { name: 'Git & GitHub', role: 'Versionamento', icon: GitIcon },
    { name: 'Node.js / Bun', role: 'Backend Runtime', icon: ServerIcon },
    { name: 'Express.js / Hono', role: 'API Framework', icon: ApiIcon },
    { name: 'SQL / PostgreSQL', role: 'Banco de Dados', icon: DatabaseIcon },
    { name: 'Docker', role: 'Orquestrador de containers', icon: DockerIcon },
    { name: 'Linux', role: 'Sistema operacional', icon: LinuxIcon },
    { name: 'Github Actions', role: 'Automação de Workflow (CI/CD)', icon: CICDIcon },
    { name: 'AWS / Vercel', role: 'Hospedagem', icon: HostIcon },
];

export const TechStack = () => {
    return (
        <section id="stack" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <Reveal>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tecnologias & Ferramentas</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Minha caixa de ferramentas para construir soluções robustas.
                    </p>
                </Reveal>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {technologies.map((tech, index) => (
                    <Reveal key={tech.name} delay={index * 100}>
                        <div className="p-6 bg-white border border-slate-200 rounded-xl flex flex-col items-center text-center transition-all hover:shadow-lg hover:bg-slate-50 hover:border-primary/50 group cursor-default h-full">
                            <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                            >
                                <tech.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-800">{tech.name}</h3>
                            <p className="text-xs text-slate-500 mt-1">{tech.role}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
};
