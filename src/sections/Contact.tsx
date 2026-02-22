import { Mail, Linkedin, X, Check, Loader, Github, FileText } from "lucide-preact";
import { useState } from "preact/hooks";

import { socialLinks } from "@/content/social";
import SectionHeader from "@/components/ui/SectionHeader";
import type { TargetedSubmitEvent } from "preact";

export default function Contact() {
	const [showToast, setShowToast] = useState({ status: "", message: "" });
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: TargetedSubmitEvent<HTMLFormElement>) {
		setLoading(true);
		try {
			e.preventDefault();
			const form = new FormData(e.currentTarget);

			const name = form.get("name") as string;
			const email = form.get("email") as string;
			const message = form.get("message") as string;

			if (!name || !email || !message) {
				setShowToast({ status: "Error", message: "Preencha todos os campos" });
				return;
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				setShowToast({ status: "Error", message: "Email inválido" });
				return;
			}

			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, message }),
			});
			const data = await res.json();

			if (res.ok) {
				setShowToast({
					status: "Sucesso",
					message: "Mensagem enviada com sucesso!",
				});
			} else {
				setShowToast({
					status: "Error",
					message: data.error || "Erro ao enviar mensagem.",
				});
			}
		} catch (err) {
			setShowToast({
				status: "Error",
				message: (err as string) || "Erro ao enviar mensagem.",
			});
		}

		setLoading(false);
		setTimeout(() => setShowToast({ status: "", message: "" }), 3000);
		(e.target as HTMLFormElement).reset();
	}

	return (
		<section id="contato" className="py-20 bg-section6">
			<div data-reveal-time={0} className="reveal reveal-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeader
						bagde="Contato"
						title="Vamos trabalhar juntos?"
						subtitle="Estou sempre aberto a novas oportunidades, projetos freelance ou apenas um bate-papo sobre tecnologia. Sinta-se à vontade para entrar em contato!"
					/>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
						<div className="space-y-4">
							<a
								href={`mailto:${socialLinks.email}`}
								target="_blank"
								rel="noreferrer"
								aria-label={`Enviar email para ${socialLinks.email}`}
								className="flex items-center gap-4 p-4 bg-surface border border-border/60 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group"
							>
								<div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
									<Mail className="w-5 h-5" aria-hidden="true" />
								</div>
								<div>
									<p className="text-sm text-textMuted group-hover:text-primary group-hover:font-bold transition-colors">Email</p>
									<p className="font-medium text-textSecondary group-hover:text-primary transition-colors">{socialLinks.email}</p>
								</div>
							</a>

							<a
								href={socialLinks.linkedin}
								target="_blank"
								rel="noreferrer"
								aria-label="Visitar perfil no LinkedIn"
								className="flex items-center gap-4 p-4 bg-surface border border-border/60 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group"
							>
								<div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
									<Linkedin className="w-5 h-5" aria-hidden="true" />
								</div>
								<div>
									<p className="text-sm text-textMuted group-hover:text-primary group-hover:font-bold transition-colors">LinkedIn</p>
									<p className="font-medium text-textSecondary group-hover:text-primary transition-colors">{socialLinks.linkedin.substring(12)}</p>
								</div>
							</a>

							<a
								href={socialLinks.github}
								target="_blank"
								rel="noreferrer"
								aria-label="Visitar perfil no GitHub"
								className="flex items-center gap-4 p-4 bg-surface border border-border/60 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group"
							>
								<div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
									<Github className="w-5 h-5" aria-hidden="true" />
								</div>
								<div>
									<p className="text-sm text-textMuted group-hover:text-primary group-hover:font-bold transition-colors">Github</p>
									<p className="font-medium text-textSecondary group-hover:text-primary transition-colors">{socialLinks.github.substring(8)}</p>
								</div>
							</a>

							<a
								href="/André-Curriculo.pdf"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Abrir currículo em PDF"
								className="flex items-center gap-4 p-4 bg-surface border border-border/60 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group"
							>
								<div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
									<FileText className="w-5 h-5" aria-hidden="true" />
								</div>
								<div>
									<p className="text-sm text-textMuted group-hover:text-primary group-hover:font-bold transition-colors">Currículo</p>
									<p className="font-medium text-textSecondary group-hover:text-primary transition-colors">Abrir PDF</p>
								</div>
							</a>
						</div>

						<div>
							<div className="bg-surface p-8 rounded-2xl border border-border/60 shadow-lg flex flex-col">
								<form className="space-y-4" onSubmit={handleSubmit}>
									<div>
										<label htmlFor="name" className="block text-sm font-medium text-textSecondary mb-1">
											Nome
										</label>
										<input
											type="text"
											id="name"
											name="name"
											className="w-full px-4 py-2 bg-surfaceAlt border border-border/60 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
											placeholder="Seu nome"
											required
										/>
									</div>
									<div>
										<label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-1">
											Email
										</label>
										<input
											type="email"
											id="email"
											name="email"
											className="w-full px-4 py-2 bg-surfaceAlt border border-border/60 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
											placeholder="seu@email.com"
											required
										/>
									</div>
									<div>
										<label htmlFor="message" className="block text-sm font-medium text-textSecondary mb-1">
											Mensagem
										</label>
										<textarea
											id="message"
											name="message"
											rows={4}
											className="w-full px-4 py-2 bg-surfaceAlt border border-border/60 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
											placeholder="Como posso ajudar?"
											required
										></textarea>
									</div>
									<button
										type="submit"
										disabled={loading}
										className="w-full disabled:bg-primaryDark/50 py-3 bg-primaryDark text-white font-bold rounded-lg hover:bg-primary hover:shadow-xl transition-all shadow-lg shadow-primary/25"
									>
										{!loading ? (
											"Enviar Mensagem"
										) : (
											<span className="flex gap-2 justify-center items-center">
												Enviando
												<Loader className="animate-spin" aria-hidden="true" />
											</span>
										)}
									</button>
								</form>
								{showToast.message && (
									<div
										className="py-3 px-5 text-center flex justify-center items-center mt-5"
										role="alert"
										aria-live="polite"
										aria-atomic="true"
									>
										{showToast.status === "Error" && (
											<span className="flex gap-2 font-bold text-error">
												<X aria-hidden="true" /> {showToast.message}
											</span>
										)}
										{showToast.status === "Sucesso" && (
											<span className="flex gap-2 font-bold text-success">
												<Check aria-hidden="true" /> {showToast.message}
											</span>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
