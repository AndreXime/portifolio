import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'André Portifolio',
	description: 'Portifolio de André Ximenes que mostra projetos e habilidades',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="pt-br"
			suppressHydrationWarning>
			<body className={`min-h-screen bg-white font-sans antialiased overflow-x-hidden ${inter.className}`}>
				{children}
			</body>
		</html>
	);
}
