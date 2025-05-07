'use client';
import { FaCode } from 'react-icons/fa6';

export default function Navbar() {
	const scrollToContact = () => {
		document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<>
			<div className="navbar shadow-sm px-4 fixed top-0 left-0 bg-base-100 z-6">
				<div className="flex-1">
					<span className="text-lg gap-1 md:gap-3 font-bold flex flex-row items-center">
						<FaCode size={22} />
						André Ximenes
					</span>
				</div>
				<div className="flex-none">
					<button
						onClick={scrollToContact}
						className="btn btn-ghost btn-primary btn-sm md:btn-md">
						Entrar em contato
					</button>
				</div>
			</div>
			<div className="h-16" />
		</>
	);
}
