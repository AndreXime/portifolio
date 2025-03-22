import { Button } from '@/components';
import { IconDocument } from '../ui/Icons';
import Link from 'next/link';

export default function Nav() {
	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-green-600 text-white backdrop-blur supports-[backdrop-filter]:bg-green-600/90">
			<div className="justify-between flex h-14 items-center px-5">
				<h2 className="font-bold text-lg">André Ximenes</h2>
				<Link
					href="curriculo.pdf"
					target="_blank">
					<Button
						size={'lg'}
						variant={'link'}
						className="bg-[#FFA500] text-white hover:bg-[#ff782a] font-bold">
						<IconDocument />
						Ver curriculo
					</Button>
				</Link>
			</div>
		</nav>
	);
}
