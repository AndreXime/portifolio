/**
 * O container pai deve ter propriedade relativa
 */
export default function BackgroundEffect() {
	const polygon = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
	const polygonClass = 'absolute bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]';

	return (
		<div className="absolute inset-0 -z-10 overflow-hidden blur-xl md:blur-2xl">
			{/* Canto superior esquerdo */}
			<div
				style={{ clipPath: polygon }}
				className={`left-[-10%] top-[-10%] w-[40%] h-[40%] rotate-[15deg] opacity-30 float-animation ${polygonClass}`}
			/>

			{/* Canto superior direito */}
			<div
				style={{ clipPath: polygon }}
				className={`right-[-10%] top-[-10%] w-[40%] h-[40%] rotate-[20deg] opacity-30 float-animation ${polygonClass}`}
			/>

			{/* Canto inferior esquerdo */}
			<div
				style={{ clipPath: polygon }}
				className={`left-[-10%] bottom-[-10%] w-[50%] h-[50%] rotate-[-20deg] opacity-40 float-animation ${polygonClass}`}
			/>

			{/* Canto inferior direito */}
			<div
				style={{ clipPath: polygon }}
				className={`right-[-15%] bottom-[-10%] w-[50%] h-[50%] rotate-[45deg] opacity-40 float-animation ${polygonClass}`}
			/>

			{/* Meio-esquerda */}
			<div
				style={{ clipPath: polygon }}
				className={`left-[10%] top-[50%] w-[35%] h-[35%] rotate-[25deg] opacity-25 float-animation ${polygonClass}`}
			/>

			{/* Meio-direita */}
			<div
				style={{ clipPath: polygon }}
				className={`right-[10%] top-[50%] w-[35%] h-[35%] rotate-[-25deg] opacity-25 float-animation ${polygonClass}`}
			/>

			{/* Centro superior */}
			<div
				style={{ clipPath: polygon }}
				className={`left-[50%] top-[10%] w-[30%] h-[30%] -translate-x-1/2 rotate-[180deg] opacity-35 float-animation ${polygonClass}`}
			/>
		</div>
	);
}
