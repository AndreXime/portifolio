import { Navbar } from '../sections/Navbar';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { TechStack } from '../sections/TechStack';
import { Projects } from '../sections/Projects';
import { Contact } from '../sections/Contact';
import { Footer } from '../sections/Footer';

function App() {
    return (
        <div className="bg-background text-textMain font-sans antialiased selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <About />
                <TechStack />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
