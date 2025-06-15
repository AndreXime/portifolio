export default function FadeInWrapper({ id, children }: { id: string; children: React.ReactNode }) {
	return (
		<div
			id={id}
			className="fade-in-section">
			{children}
		</div>
	);
}
