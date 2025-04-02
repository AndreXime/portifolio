const faqs = [
	{
		questao: 'O que você acha mais legal na área de desenvolvimento de software?',
		resposta: `Eu acho magnifico o procresso criativo na programação, não parece mas é parecido com outras
			areas como pintura ou arquitetura civil, começamos com uma ideia e, pouco a pouco, vamos moldando e
			estruturando algo que nem sempre é o certo de cara mas é um progresso.`,
	},
	{
		questao: 'Você prefere back-end ou front-end?',
		resposta: `Eu sempre achei que era de backend, mas é bastante satisfatorio erguer uma interface é como pintar um 
			quadro em branco mas você tem que fazer o quadro à prova de bala, fazendo tudo funcione perfeitamente
			em todos os tipos de telas e que o usuário tenha a melhor experiência possível.`,
	},
	{
		questao: 'Como você lida com momentos de bloqueio criativo ou desânimo?',
		resposta: `O melhor jeito de dar um refresh na cabeça, é fechar tudo e fazer outra coisa como academia, sair com a namorada
			 ou até dormir, depois disso você vai ver o problema como se fosse outra pessoa`,
	},
];

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
					{faqs.map((faq, index) => (
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
