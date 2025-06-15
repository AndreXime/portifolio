import About from '@/content/About';
import { BookOpen, Laptop } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
	return (
		<section
			id="sobre"
			className="py-30">
			<div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
				<div className="w-full md:w-1/3 flex justify-center">
					<div className="relative w-64 h-64 md:w-80 md:h-80">
						<Image
							src={About.profilePicture}
							alt="Foto profissional de André"
							fill
							className="rounded-full object-cover border-4 border-slate-700 shadow-lg"
						/>
					</div>
				</div>
				<div className="w-full md:w-2/3 text-center md:text-left">
					<h2 className="text-4xl font-bold text-white mb-4">{About.salution}</h2>
					<p
						className="text-slate-300 text-lg leading-relaxed mb-6"
						dangerouslySetInnerHTML={{ __html: About.about }}
					/>
					<div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
						<div className="flex items-center gap-3">
							<BookOpen className="text-blue-500" />
							<span className="text-slate-200">{About.tag1}</span>
						</div>
						<div className="flex items-center gap-3">
							<Laptop className="text-blue-500" />
							<span className="text-slate-200">{About.tag2}</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
