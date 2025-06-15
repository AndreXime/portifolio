import { Skills, Header, Contact, Projetos, Navbar } from '@/components';
import Footer from '@/components/sections/Footer';
import FadeInSection from '@/components/ui/FadeInSection';

export default function Page() {
	return (
		<main className="flex flex-col min-h-screen bg-slate-900 text-foreground">
			<Navbar />

			<FadeInSection>
				<Header />
			</FadeInSection>

			<FadeInSection>
				<Projetos />
			</FadeInSection>

			<FadeInSection>
				<Skills />
			</FadeInSection>

			<FadeInSection>
				<Contact />
			</FadeInSection>

			<Footer />
		</main>
	);
}
