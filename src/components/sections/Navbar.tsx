import { User, Gem, LayoutGrid, Mail } from 'lucide-react';

const buttons = [
    { href: '#sobre', Icon: User },
    { href: '#projetos', Icon: LayoutGrid },
    { href: '#habilidades', Icon: Gem },
    { href: '#contato', Icon: Mail },
];

export default async function Navbar() {
    return (
        <nav className="header-bg fixed top-0 left-0 right-0 z-50 w-full header-bg transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-white">André Ximenes</span>
                <div className="flex items-center gap-6">
                    <nav className="hidden sm:flex items-center gap-5 sm:gap-6">
                        {buttons.map(({ href, Icon }) => (
                            <a
                                key={href}
                                href={href}
                                className="text-slate-300 hover:text-blue-500 transition-colors duration-200"
                                aria-label={href.slice(1)}
                            >
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                        ))}
                    </nav>
                    <a
                        target="_blank"
                        href="/assets/curriculo.pdf"
                        className="flex bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                        Baixar CV
                    </a>
                </div>
            </div>
        </nav>
    );
}
