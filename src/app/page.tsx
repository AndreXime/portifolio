import { Skills, Header, Contact, Projetos, Navbar } from '@/components';
import Footer from '@/components/sections/Footer';
import FadeInWrapper from '@/components/ui/FadeInSection';
import FadeInObserver from '@/components/ui/FadeInObserver';

export default async function Page() {
    return (
        <main className="flex flex-col min-h-screen bg-slate-900 text-foreground">
            <Navbar />

            <Header />

            <FadeInWrapper id="projetos">
                <Projetos />
            </FadeInWrapper>

            <FadeInWrapper id="habilidades">
                <Skills />
            </FadeInWrapper>

            <FadeInWrapper id="contato">
                <Contact />
            </FadeInWrapper>

            <Footer />
            <FadeInObserver ids={['projetos', 'habilidades', 'contato']} />
        </main>
    );
}
