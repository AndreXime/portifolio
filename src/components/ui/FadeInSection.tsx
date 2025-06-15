'use client';
import { useEffect, useRef } from 'react';

export default function FadeInSection({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) el.classList.add('is-visible');
				});
			},
			{ threshold: 0.1 }
		);
		observer.observe(el);
		return () => observer.unobserve(el);
	}, []);

	return (
		<div
			ref={ref}
			className="fade-in-section">
			{children}
		</div>
	);
}
