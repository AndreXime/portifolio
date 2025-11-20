import { ArrowDown, Github } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import Link from 'next/link';

export const socialLinks = {
    email: 'andreximenesa20@gmail.com',
    github: 'https://github.com/AndreXime',
    linkedin: 'https://www.linkedin.com/in/andreximenesdev/',
};

export const Hero = () => {
    return (
        <section
            id="home"
            className="pt-25 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <Reveal>
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono font-semibold text-primary bg-blue-50 rounded-full border border-blue-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Atualmente trabalhando
                    </div>

                    <p className="text-lg text-slate-500 mb-2 font-medium">Olá, Meu nome é</p>
                    <h1 className="text-5xl sm:text-7xl font-bold mb-4 leading-tight text-slate-900 tracking-tight">
                        André Ximenes
                    </h1>
                    <h2 className="text-2xl sm:text-3xl text-slate-600 mb-8 font-medium leading-snug">
                        Sou desenvolvedor de software especializado em{' '}
                        <span className="text-primary font-bold">TypeScript</span>.
                    </h2>

                    <p className="text-lg text-textMuted mb-8 max-w-lg leading-relaxed border-l-4 border-primary/20 pl-4">
                        Estudante de Ciência da Computação transformando conceitos complexos em aplicações web
                        performáticas, escaláveis e com código limpo.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#projetos"
                            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primaryDark transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2"
                        >
                            Ver Projetos <ArrowDown className="w-4 h-4" />
                        </a>
                        <Link
                            href={socialLinks.github || ''}
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:border-slate-400 transition-colors flex items-center gap-2"
                        >
                            <Github className="w-4 h-4" /> GitHub
                        </Link>
                    </div>
                </Reveal>

                <Reveal delay={200}>
                    <div className="relative hidden lg:block">
                        {/* Abstract Code Visual */}
                        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
                        <div
                            className="absolute bottom-0 left-0 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl animate-float"
                            style={{ animationDelay: '2s' }}
                        ></div>

                        <div className="relative bg-slate-900 rounded-xl shadow-2xl p-6 border border-slate-700 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="ml-2 text-xs text-slate-400 font-mono">developer.ts</span>
                            </div>
                            <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
                                <code>
                                    <span className="text-purple-400">interface</span>{' '}
                                    <span className="text-yellow-300">Developer</span> {'{'}
                                    {'\n'} <span className="text-blue-300">name</span>:{' '}
                                    <span className="text-green-300">string</span>;{'\n'}{' '}
                                    <span className="text-blue-300">skills</span>:{' '}
                                    <span className="text-green-300">string</span>[];
                                    {'\n'} <span className="text-blue-300">hardWorker</span>:{' '}
                                    <span className="text-green-300">boolean</span>;{'\n'}
                                    {'}'}
                                    {'\n'}
                                    <span className="text-purple-400">const</span>{' '}
                                    <span className="text-blue-400">andre_ximenes</span>:{' '}
                                    <span className="text-yellow-300">Developer</span> = {'{'}
                                    {'\n'} <span className="text-blue-300">name</span>:{' '}
                                    <span className="text-orange-300">&quot;Andre Ximenes&quot;</span>,{'\n'}{' '}
                                    <span className="text-blue-300">skills</span>: [{'\n'}{' '}
                                    <span className="text-orange-300">&quot;TypeScript&quot;</span>,{'\n'}{' '}
                                    <span className="text-orange-300">&quot;React&quot;</span>,{'\n'}{' '}
                                    <span className="text-orange-300">&quot;Node.js&quot;</span>
                                    {'\n'} ],
                                    {'\n'} <span className="text-blue-300">hardWorker</span>:{' '}
                                    <span className="text-purple-400">true</span>
                                    {'\n'};
                                </code>
                            </pre>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
