"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
	{ name: "Início", href: "#home" },
	{ name: "Sobre", href: "#sobre" },
	{ name: "Stack", href: "#stack" },
	{ name: "Projetos", href: "#projetos" },
];

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleSmoothScroll = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		href: string,
	) => {
		e.preventDefault();

		const id = href.substring(1);
		const targetElement = document.getElementById(id);

		if (targetElement) {
			window.scrollTo({
				top: targetElement.offsetTop - 64,
				behavior: "smooth",
			});
		}

		setIsMenuOpen(false);
	};

	return (
		<nav
			className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 bg-white/85 backdrop-blur-md border-b border-slate-200`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold font-mono text-sm">
							AX
						</div>
						<span className="font-bold text-xl tracking-tight text-slate-800 hidden sm:block">
							André<span className="text-primary">.Portfolio</span>
						</span>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								onClick={(e) => handleSmoothScroll(e, link.href)}
								className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
							>
								{link.name}
							</Link>
						))}
						<Link
							href="#contato"
							onClick={(e) => handleSmoothScroll(e, "#contato")}
							className="text-sm font-medium bg-slate-900 text-white hover:bg-primary px-5 py-2 rounded-full transition-colors"
						>
							Vamos conversar
						</Link>
					</div>

					<button
						aria-label="botão mobile menu"
						type="button"
						className="md:hidden p-2 text-slate-600"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Menu Dropdown */}
			{isMenuOpen && (
				<div className="md:hidden bg-white border-b border-border px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-5">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							onClick={() => setIsMenuOpen(false)}
							className="block text-slate-600 hover:text-primary font-medium"
						>
							{link.name}
						</Link>
					))}
					<Link
						href="#contato"
						onClick={() => setIsMenuOpen(false)}
						className="block text-primary font-bold"
					>
						Contato
					</Link>
				</div>
			)}
		</nav>
	);
};
