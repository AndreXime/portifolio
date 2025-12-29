import { Mail, Linkedin, X, Check, Loader } from "lucide-preact";
import { Reveal } from "../components/Reveal";
import { useState } from "preact/compat";
import type { FormEvent } from "preact/compat";

import { socialLinks } from "@/content/social";

export const Contact = () => {
  const [showToast, setShowToast] = useState({ status: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
    <section id="contato" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <Reveal>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Vamos trabalhar juntos?</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Estou sempre aberto a novas oportunidades, projetos freelance ou apenas um bate-papo sobre tecnologia.
            Sinta-se à vontade para entrar em contato!
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${socialLinks.email}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-800">{socialLinks.email}</p>
              </div>
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">LinkedIn</p>
                <p className="font-medium text-slate-800">{socialLinks.linkedin.substring(12)}</p>
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg flex flex-col">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  placeholder="Como posso ajudar?"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full disabled:bg-primary/50 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primaryDark transition-colors shadow-lg shadow-blue-500/25"
              >
                {!loading ? (
                  "Enviar Mensagem"
                ) : (
                  <span className="flex gap-2 justify-center items-center">
                    Enviando
                    <Loader className="animate-spin" />
                  </span>
                )}
              </button>
            </form>
            {showToast.message && (
              <div className="text-red-500 py-3 px-5 text-center flex justify-center items-center mt-5">
                {showToast.status === "Error" && (
                  <span className="flex gap-2 font-bold">
                    <X /> {showToast.message}
                  </span>
                )}
                {showToast.status === "Sucesso" && (
                  <span className="flex gap-2 font-bold">
                    <Check /> {showToast.message}
                  </span>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
