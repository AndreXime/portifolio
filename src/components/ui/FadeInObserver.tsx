'use client';
import { useEffect } from 'react';

export default function FadeInObserver({ ids }: { ids: string[] }) {
	useEffect(() => {
		const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
					}
				});
			},
			{ threshold: 0.1 }
		);

		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, [ids]);

	return null;
}
