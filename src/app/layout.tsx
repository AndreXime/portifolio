import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import type React from 'react'; // Import React

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'André Portifolio',
	description: 'Full stack developer portfolio showcasing projects and skills',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body className={`min-h-screen bg-white font-sans antialiased overflow-x-hidden ${inter.className}`}>
				{children}
			</body>
		</html>
	);
}
