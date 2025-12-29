import { technologies } from "@/content/tecnologies";
import { Reveal } from "../components/Reveal";
import { IconWrapper } from "@/components/Icons";

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
        {technologies.map((tech, index) => {
          return (
            <Reveal key={tech.name} delay={index * 100}>
              <div className="p-6 bg-white border border-slate-200 rounded-xl flex flex-col items-center text-center transition-all hover:shadow-lg hover:bg-slate-50 hover:border-primary/50 group cursor-default h-full">
                <div
                  className={`${
                    !!tech.secondIcon ? "w-24" : "w-12"
                  } h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform gap-3`}
                >
                  <IconWrapper icon={tech.icon} secondIcon={tech.secondIcon} />
                </div>
                <h3 className="font-bold text-slate-800 mt-auto">{tech.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{tech.role}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
