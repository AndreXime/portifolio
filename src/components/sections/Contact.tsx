import Link from 'next/link';
import { Button } from '../ui/Button';
import { IconGithub, IconLinkedin, IconEmail, IconDocument } from '../ui/Icons';

export default function Contact() {
	return (
		<>
			<p className="text-gray-600 mb-8 max-w-[700px] mx-auto md:text-xl">
				Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato por meio de
				qualquer um dos canais abaixo.
			</p>
			<div className="flex flex-wrap justify-center gap-4">
				<Link
					href="https://github.com/AndreXime"
					target="_blank">
					<Button
						size={'lg'}
						variant={'link'}
						className="gap-2 btn-primary">
						<IconGithub className="h-5 w-5" />
						GitHub
					</Button>
				</Link>
				<Link
					href="https://linkedin.com/in/andreximenes20"
					target="_blank">
					<Button
						size={'lg'}
						variant={'link'}
						className="gap-2 btn-primary">
						<IconLinkedin className="h-5 w-5" />
						LinkedIn
					</Button>
				</Link>
				<Link href="mailto:andreximenesa20@gmail.com">
					<Button
						size={'lg'}
						variant={'link'}
						className="gap-2 btn-primary">
						<IconEmail className="h-5 w-5" />
						Email
					</Button>
				</Link>
				<Link
					href="curriculo.pdf"
					target="_blank">
					<Button
						size={'lg'}
						variant={'link'}
						className="btn-primary gap-2">
						<IconDocument className="h-5 w-5" />
						Ver curriculo
					</Button>
				</Link>
			</div>
		</>
	);
}
