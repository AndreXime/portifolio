import { Skills, Header, Contact, Projetos, Navbar } from '@/components';
import Footer from '@/components/sections/Footer';
import FadeInObserver from '@/components/ui/FadeInObserver';
// ProjectsArray precisa ser importado no server side porque lê um arquivo do projeto
import ProjectsArray from '@/content/Projects';

export default async function Page() {
    return (
        <main className="flex flex-col min-h-screen bg-slate-900 text-foreground">
            <Navbar />

            <Header />

            <Projetos ProjectsArray={ProjectsArray} />

            <Skills />

            <Contact />

            <Footer />
            <FadeInObserver ids={['projetos', 'habilidades', 'contato']} />
        </main>
    );
}
