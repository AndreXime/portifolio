import { socialLinks } from "@/content/social";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-white border-t border-slate-200 py-12 mt-12">
			<div className="max-w-7xl mx-auto px-4 text-center">
				<div className="flex justify-center gap-6 mb-6">
					<Link
						href={socialLinks.github}
						aria-label="GitHub"
						target="_blank"
						rel="noreferrer"
						className="text-slate-400 hover:text-primary transition-colors"
					>
						<Github className="w-5 h-5" />
					</Link>
					<Link
						href={socialLinks.linkedin}
						aria-label="LinkedIn"
						target="_blank"
						rel="noreferrer"
						className="text-slate-400 hover:text-primary transition-colors"
					>
						<Linkedin className="w-5 h-5" />
					</Link>
				</div>
				<p className="text-slate-500 text-sm">
					&copy; {currentYear} André Ricardo Ximenes.
				</p>
			</div>
		</footer>
	);
};
