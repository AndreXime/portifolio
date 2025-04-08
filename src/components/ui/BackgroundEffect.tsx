/**
 * O container pai deve ter propriedade relativa
 */
export default function BackgroundEffect() {
	return (
		<div
			className="absolute inset-0 z-[5] overflow-hidden blur-xl md:blur-2xl"
			aria-hidden="true">
			<SVGBlob
				className="left-[-10%] top-[-10%] w-[45%] h-[45%]"
				rotate="rotate-[15deg]"
				opacity="opacity-30"
			/>
			<SVGBlob
				className="right-[-10%] top-[-10%] w-[45%] h-[45%]"
				rotate="rotate-[20deg]"
				opacity="opacity-30"
			/>
			<SVGBlob
				className="left-[-10%] bottom-[-10%] w-[55%] h-[55%]"
				rotate="rotate-[-20deg]"
				opacity="opacity-40"
			/>
			<SVGBlob
				className="right-[-15%] bottom-[-10%] w-[55%] h-[55%]"
				rotate="rotate-[45deg]"
				opacity="opacity-40"
			/>
			<SVGBlob
				className="left-[10%] top-[50%] w-[40%] h-[40%]"
				rotate="rotate-[25deg]"
				opacity="opacity-25"
			/>
			<SVGBlob
				className="right-[10%] top-[50%] w-[40%] h-[40%]"
				rotate="rotate-[-25deg]"
				opacity="opacity-25"
			/>
			<SVGBlob
				className="left-[50%] top-[10%] w-[35%] h-[35%] -translate-x-1/2"
				rotate="rotate-[180deg]"
				opacity="opacity-35"
			/>
		</div>
	);
}

interface SVGBlobProps {
	className?: string;
	rotate?: string;
	opacity?: string;
}

function SVGBlob({ className = '', rotate = 'rotate-0', opacity = 'opacity-30' }: SVGBlobProps) {
	return (
		<svg
			viewBox="0 0 200 200"
			xmlns="http://www.w3.org/2000/svg"
			className={`absolute ${rotate} ${opacity} ${className} float-animation`}>
			<defs>
				<linearGradient
					id="gradient1"
					x1="0%"
					y1="0%"
					x2="100%"
					y2="100%">
					<stop
						offset="0%"
						stopColor="#ff80b5"
					/>
					<stop
						offset="100%"
						stopColor="#9089fc"
					/>
				</linearGradient>
			</defs>
			<path
				fill="url(#gradient1)"
				d="M49.9,-70.8C63.8,-68.6,73.6,-53.4,80.6,-37.1C87.7,-20.8,92,-3.5,88.3,11.8C84.7,27,73.1,40.1,59,44.6C44.9,49,28.4,44.9,14.1,50C-0.3,55.2,-12.5,69.8,-22,69.4C-31.4,69.1,-38.1,54,-40.4,40.8C-42.6,27.7,-40.5,16.6,-45.8,4.3C-51.2,-8,-64,-21.6,-66.6,-36.4C-69.1,-51.2,-61.3,-67.2,-48.5,-69.8C-35.7,-72.5,-17.8,-61.6,0.1,-61.7C18,-61.8,36,-72.9,49.9,-70.8Z"
				transform="translate(100 100)"
			/>
		</svg>
	);
}
