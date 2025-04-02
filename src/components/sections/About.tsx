import { QuestionsContent } from '@/content';

export default function TechStack() {
	return (
		<div className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:divide-x lg:divide-gray-300">
			<div>
				<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl text-center">Sobre mim</h2>

				<div className="mx-auto max-w-[700px] text-gray-800 text-left p-1 md:p-4 mt-2">
					<p>
						Sou estudante de Ciências da Computação com forte interesse em desafios que envolvem raciocínio lógico e
						resolução de problemas.
					</p>
					<p>
						Desde o ensino médio, venho me aprofundando no universo da programação e participei da Olimpíada Brasileira
						de Informática.
					</p>
					<p>
						Possuo experiência no desenvolvimento de APIs e interfaces web responsivas, além de estar familiarizado com
						ferramentas de infraestrutura.
					</p>
				</div>
			</div>
			<div>
				<h2 className="heading text-3xl tracking-tighter sm:text-4xl md:text-5xl text-center">Minhas Respostas</h2>

				<div className="space-y-4 px-1 pt-4 md:p-4 mx-auto max-w-[700px] mt-2">
					{QuestionsContent.map((faq, index) => (
						<div
							key={index}
							className="text-left text-gray-800">
							<h4 className="font-bold">{faq.questao}</h4>
							<p>{faq.resposta}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
