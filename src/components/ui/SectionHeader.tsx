import type { ComponentChildren } from "preact";

interface Props {
	bagde: string;
	title: string;
	subtitle?: string;
	children?: ComponentChildren;
}

export default function SectionHeader({ bagde, title, subtitle, children }: Props) {
	return (
		<div class="text-center mb-14">
			<span class="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-primaryDark bg-primary/15 rounded-full border border-primary/25">
				{bagde}
			</span>
			<h2 class="text-4xl sm:text-5xl font-extrabold text-textMain tracking-tight leading-tight">{title}</h2>
			{subtitle && <p class="text-textMuted max-w-2xl mx-auto mt-4 mb-5 text-lg leading-relaxed">{subtitle}</p>}
			{children}
		</div>
	);
}
