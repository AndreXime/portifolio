import { BookOpen, Terminal } from "lucide-preact";
import { Reveal } from "../components/Reveal";

export const About = () => {
  return (
    <section id="sobre" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Sobre Mim</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Atualmente cursando Ciência da Computação, sou apaixonado por entender como as coisas funcionam
                &quot;por baixo dos panos&quot;. Minha jornada começou com curiosidade e se transformou em uma carreira
                focada em desenvolvimento web moderno.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Valorizo código limpo, tipagem estática e arquiteturas escaláveis. Gosto do desafio de pegar problemas
                complexos e criar sistemas que sejam não só eficientes, mas também elegantes e fáceis de manter.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <BookOpen className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-bold text-slate-800">Educação</h4>
                  <p className="text-sm text-slate-500">Bachalerado em Ciência da Computação</p>
                  <p className="text-xs text-slate-400">Em andamento</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <Terminal className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-bold text-slate-800">Experiência</h4>
                  <p className="text-sm text-slate-500">Desenvolvimento Web FullStack</p>
                  <p className="text-xs text-slate-400">6 meses trabalhando</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:w-1/2">
            <Reveal delay={200}>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Jornada</h2>
              <div className="border-l-2 border-slate-200 pl-8 space-y-8 relative">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white bg-primary"></div>
                  <h3 className="text-lg font-bold text-slate-800">Desenvolvedor Fullstack na Stackup</h3>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    2025 - Presente
                  </span>
                  <p className="text-slate-500 text-sm mt-2">
                    Estou atualmente trabalhando em uma Software House com as ferramentas mais modernas como Typescript,
                    Next.js, TailwindCSS, ShadCN, Hono, Prisma e AWS. Além disso estou aplicando conhecimento teoricos
                    na faculdade como desenhar diagramas ER do banco de dados e levantamento de requisitos
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white bg-primary"></div>
                  <h3 className="text-lg font-bold text-slate-800">Ciência da Computação</h3>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    2023 - Presente
                  </span>
                  <p className="text-slate-500 text-sm mt-2">
                    Estudando na Universidade Estadual do Vale do Acaráu. Obtendo o conhecimento teorico que todo
                    desenvolvedor deve ter.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white bg-slate-300"></div>
                  <h3 className="text-lg font-bold text-slate-800">Início dos Estudos</h3>
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">2023</span>
                  <p className="text-slate-500 text-sm mt-2">
                    Primeiro contato com lógica de programação e algoritmos, durante a Olimpíada Brasileira de
                    Informática.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
