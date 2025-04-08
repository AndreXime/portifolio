import Link from 'next/link';
import { IconGithub, IconLinkedin, IconEmail, IconCV } from '../ui/Icons';

export default function Hero() {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 text-center bg-transparent">
			<div className="space-y-2">
				<h1 className="heading tracking-tighter text-4xl md:text-5xl lg:text-6xl/none">
					André Ximenes
					<span className="text-[#FFA500]">
						<br />
						Desenvolvedor FullStack
					</span>
				</h1>

				<p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
					Construindo soluções digitais com as tecnologias mais modernas presentes. Planejando desde a logica do banco
					de dados até a interface do usuário.
				</p>
			</div>
			<div className="space-x-4 flex flex-row">
				<Link
					href="https://github.com/AndreXime"
					target="_blank">
					<span className="sr-only">GitHub</span>
					<IconGithub size={40} />
				</Link>
				<Link
					href="https://linkedin.com/in/andreximenes20"
					target="_blank">
					<IconLinkedin
						color="blue"
						size={40}
					/>
					<span className="sr-only">LinkedIn</span>
				</Link>

				<Link href="mailto:andreximenesa20@gmail.com">
					<IconEmail size={40} />
					<span className="sr-only">Email</span>
				</Link>

				<Link
					href="/assets/curriculo.pdf"
					target="_blank"
					className="flex items-center justify-center">
					<IconCV size={37} />
					<span className="sr-only">Currículo</span>
				</Link>
			</div>
		</div>
	);
}
