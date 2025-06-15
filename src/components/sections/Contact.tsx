'use client';
import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const buttons = [
	{ Icon: FaGithub, label: 'Github', href: '#' },
	{ Icon: FaLinkedin, label: 'Linkedin', href: '#' },
];

export default function Contact() {
	const [showToast, setShowToast] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShowToast(true);
		setTimeout(() => setShowToast(false), 3000);
		(e.target as HTMLFormElement).reset();
	};

	return (
		<section className="py-24">
			<div className="container mx-auto px-6 max-w-3xl text-center">
				<h2 className="text-3xl font-bold text-white mb-4">Vamos Conversar?</h2>
				<p className="text-slate-400 mb-10">
					Estou sempre aberto a novas oportunidades e colaborações. Preencha o formulário abaixo ou me encontre nas
					redes sociais.
				</p>
				<form
					onSubmit={handleSubmit}
					className="space-y-6 text-left">
					{['name', 'email', 'message'].map((field) => (
						<div key={field}>
							<label
								htmlFor={field}
								className="block text-sm font-medium text-slate-300 mb-2 capitalize">
								{field}
							</label>
							{field !== 'message' ? (
								<input
									id={field}
									name={field}
									type={field === 'email' ? 'email' : 'text'}
									required
									className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								/>
							) : (
								<textarea
									id={field}
									name={field}
									rows={4}
									required
									className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								/>
							)}
						</div>
					))}
					<div className="text-center">
						<button
							type="submit"
							className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200">
							Enviar Mensagem
						</button>
					</div>
				</form>
				<div className="mt-12 flex justify-center space-x-6">
					{buttons.map(({ Icon, label, href }, i) => (
						<a
							key={i}
							href={href}
							aria-label={label}
							className="text-slate-400 hover:text-blue-500 transition-colors">
							<Icon className="w-8 h-8" />
						</a>
					))}
				</div>
			</div>
			{showToast && (
				<div
					id="toast-success"
					className="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-5 rounded-lg shadow-xl">
					<p>✅ Mensagem enviada com sucesso!</p>
				</div>
			)}
		</section>
	);
}
