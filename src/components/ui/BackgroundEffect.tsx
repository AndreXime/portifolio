'use client';
import { useEffect, useState } from 'react';
/**
 * O container pai deve ter propriedade relativa
 */
export default function BackgroundEffect() {
	const [blobs, setBlobs] = useState<React.JSX.Element[] | null>(null);

	useEffect(() => {
		const numBlobs = 6;

		const newBlobs = Array.from({ length: numBlobs }, (_, i) => {
			const rows = Math.ceil(Math.sqrt(numBlobs));
			const cols = rows;
			const row = Math.floor(i / cols);
			const col = i % cols;

			const baseTop = (row / rows) * 100;
			const baseLeft = (col / cols) * 100;
			const jitter = () => (Math.random() - 0.5) * 20;

			const top = `calc(${baseTop}% + ${jitter()}%)`;
			const left = `calc(${baseLeft}% + ${jitter()}%)`;
			const width = `${60 + Math.random() * 30}%`; // 30–60%
			const height = width;
			const rotate = -45 + Math.random() * 90; // -45° a +45°
			const animationDuration = 4 + Math.random() * 4;
			const animationDelay = Math.random() * 3;

			return (
				<SVGBlob
					key={i}
					top={top}
					left={left}
					width={width}
					height={height}
					rotate={rotate}
					animationDuration={animationDuration}
					animationDelay={animationDelay}
				/>
			);
		});

		setBlobs(newBlobs);
	}, []);

	return (
		<div
			className="absolute inset-0 z-[10] overflow-hidden blur-xl md:blur-3xl"
			aria-hidden="true">
			{blobs}
		</div>
	);
}

interface SVGBlobProps {
	top: string;
	left: string;
	width: string;
	height: string;
	rotate: number;
	animationDuration: number;
	animationDelay: number;
}

function SVGBlob({ top, left, width, height, rotate, animationDuration, animationDelay }: SVGBlobProps) {
	return (
		<svg
			viewBox="0 0 200 200"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				position: 'absolute',
				top,
				left,
				width,
				height,
				transform: `rotate(${rotate}deg)`,
				opacity: 0,
				animation: `
					fadeIn 3s ease forwards,
					floatMovement ${animationDuration}s ease-in-out ${animationDelay}s infinite
				`,
			}}>
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
