interface Props {
	bagde: string;
	title: string;
	subtitle?: string;
	children?: React.ReactNode;
}

export default function SectionHeader({ bagde, title, subtitle, children }: Props) {
	return (
		<div class="text-center mb-14">
			<span class="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full border border-primary/20">
				{bagde}
			</span>
			<h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
			<p class="text-slate-500 max-w-3xl mx-auto mt-4 mb-5">{subtitle}</p>
			{children}
		</div>
	);
}
