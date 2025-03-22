import { Button } from '@/components';
import { IconDocument } from '../ui/Icons';

export default function Nav() {
	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-green-600 text-white backdrop-blur supports-[backdrop-filter]:bg-green-600/90">
			<div className="container mx-auto flex h-14 items-center px-4 md:px-8">
				<h2 className="font-bold text-lg">André Ximenes</h2>
				<Button
					size={'lg'}
					variant={'link'}
					className="ml-auto bg-[#FFA500] text-white hover:bg-[#ff782a] font-bold">
					<IconDocument />
					Ver curriculo
				</Button>
			</div>
		</nav>
	);
}
