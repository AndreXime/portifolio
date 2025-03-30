import Link from 'next/link';
import { IconGithub, IconLinkedin, IconEmail, IconCV } from '../ui/Icons';

export default function Hero() {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 text-center">
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
					href="curriculo.pdf"
					target="_blank"
					className="flex items-center justify-center">
					<IconCV size={40} />
					<span className="sr-only">Currículo</span>
				</Link>
			</div>
			<div className="flex flex-col text-left mt-10">
				<h2 className="heading text-2xl tracking-tighter sm:text-3xl md:text-4xl text-left">Sobre mim</h2>
				<p className="mx-auto max-w-[700px] text-gray-800 mt-1">
					Sou estudante de Ciências da Computação com forte interesse em desafios que envolvem raciocínio lógico e
					resolução de problemas. Desde o ensino médio, venho me aprofundando no universo da programação e participei da
					Olimpíada Brasileira de Informática. Possuo experiência no desenvolvimento de APIs e interfaces web
					responsivas, além de estar familiarizado com ferramentas de infraestrutura. Estou em busca de oportunidades
					onde possa aplicar o que aprendi na faculdade e em projetos pessoais, sempre com o objetivo de contribuir de
					forma prática e significativa para o desenvolvimento de soluções inovadoras.
				</p>
			</div>
		</div>
	);
}
