/**
 * O container pai deve ter propriedade relativa
 */
export default function BackgroundEffect() {
	const polygon =
		'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)';
	const polygonClass = 'absolute bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]';

	return (
		<div className="absolute inset-0 -z-10 overflow-hidden blur-xl ">
			{/* Forma 1 - Canto superior esquerdo */}
			<div
				style={{ clipPath: polygon }}
				className={'left-[-10%] top-[-10%] w-[40%] h-[40%] rotate-[15deg] opacity-30 float-animation ' + polygonClass}
			/>

			{/* Forma 2 - Canto inferior direito */}
			<div
				style={{ clipPath: polygon }}
				className={
					'right-[-15%] bottom-[-10%] w-[50%] h-[50%] rotate-[45deg] opacity-40 float-animation ' + polygonClass
				}
			/>

			{/* Forma 3 - Centro-direita */}
			<div
				style={{ clipPath: polygon }}
				className={'right-[10%] top-[30%] w-[35%] h-[35%] rotate-[25deg] opacity-25 float-animation' + polygonClass}
			/>

			{/* Forma 4 - Centro-esquerda */}
			<div
				style={{ clipPath: polygon }}
				className={'left-[5%] bottom-[30%] w-[45%] h-[45%] rotate-[10deg] opacity-35 float-animation ' + polygonClass}
			/>

			{/* Polígono - Canto superior direito */}
			<div
				style={{ clipPath: polygon }}
				className={`${polygonClass} right-[-10%] top-[-10%] w-[40%] h-[40%] rotate-[20deg] opacity-30 float-animation`}
			/>

			{/* Polígono - Canto inferior esquerdo */}
			<div
				style={{ clipPath: polygon }}
				className={`${polygonClass} left-[-10%] bottom-[-10%] w-[50%] h-[50%] rotate-[-20deg] opacity-40 float-animation`}
			/>
		</div>
	);
}
