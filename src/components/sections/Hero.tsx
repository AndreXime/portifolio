import Link from 'next/link';
import { IconGithub, IconLinkedin, IconEmail } from '../ui/Icons';

export default function Hero() {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 text-center">
			<div className="space-y-2">
				<h1 className="heading tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none">André Ximenes</h1>
				<h1 className="heading text-[#FFA500] tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none">
					Desenvolvedor FullStack
				</h1>

				<p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
					Construindo soluçoes digitais com as tecnologias mais modernas presentes. Planejando desde a logica do banco
					de dados até a interface do usuario.
				</p>
			</div>
			<div className="space-x-4 flex flex-row">
				<Link
					href="https://github.com"
					target="_blank">
					<span className="sr-only">GitHub</span>
					<IconGithub size={40} />
				</Link>
				<Link
					href="https://linkedin.com"
					target="_blank">
					<IconLinkedin
						color="blue"
						size={40}
					/>
					<span className="sr-only">LinkedIn</span>
				</Link>

				<Link href="mailto:hello@example.com">
					<IconEmail size={40} />
					<span className="sr-only">Email</span>
				</Link>
			</div>
		</div>
	);
}
