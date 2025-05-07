'use client';
import { QuestionsContent } from '@/content';
import Image from 'next/image';
import { useState } from 'react';

export default function TechStack() {
	const [Sobre, SetSobre] = useState(true);
	return (
		<div className="flex items-center justify-center space-y-4 px-2">
			<div className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-5 p-6">
				<Image
					src={'/assets/profile.png'}
					width={450}
					height={450}
					alt="minha foto cartoon"
					className="object-cover place-self-center"
				/>
				<div>
					<div className="flex flex-row w-full gap-4 mb-8 px-3">
						<button
							className="btn btn-ghost btn-primary flex-1"
							onClick={() => SetSobre(true)}>
							Quem sou eu
						</button>
						<button
							className="btn btn-ghost btn-primary flex-1"
							onClick={() => SetSobre(false)}>
							Perguntas
						</button>
					</div>
					{Sobre ? (
						<div>
							<h2 className="heading text-3xl tracking-tighter md:text-4xl p-1 md:p-4">Quem sou eu</h2>
							<div className=" text-gray-800 text-left p-1 md:p-4 mt-2">
								<p>
									Meu nome é André, estou estudando de Ciências da Computação com inclinação para desafios que envolvem
									raciocínio lógico e resolução de problemas.
								</p>
								<p>
									Desde o ensino médio, venho me aprofundando no universo da programação e participei da Olimpíada
									Brasileira de Informática.
								</p>
								<p>
									Possuo experiência no desenvolvimento de APIs e interfaces web responsivas, além de estar
									familiarizado com ferramentas de infraestrutura.
								</p>
							</div>
						</div>
					) : (
						<div>
							<h2 className="heading text-3xl tracking-tighter text-center">Algumas Perguntas</h2>

							<div className="space-y-3 px-1 pt-4 md:p-4 mx-auto max-w-[700px]">
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
					)}
				</div>
			</div>
		</div>
	);
}
