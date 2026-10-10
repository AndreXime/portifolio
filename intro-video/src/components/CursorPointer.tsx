import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

interface CursorPointerProps {
	/** Centro do alvo (nome), em px no frame 1920×1080. */
	targetX: number;
	targetY: number;
	/** Frame local em que o clique acontece. */
	clickAt: number;
	appearAt?: number;
	orbitStart?: number;
	orbitEnd?: number;
}

function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

export const CursorPointer: React.FC<CursorPointerProps> = ({
	targetX,
	targetY,
	clickAt,
	appearAt = 20,
	orbitStart = 32,
	orbitEnd = 108,
}) => {
	const frame = useCurrentFrame();

	const opacity = interpolate(frame, [appearAt, appearAt + 10], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	let x: number;
	let y: number;

	if (frame < orbitStart) {
		const t = interpolate(frame, [appearAt, orbitStart], [0, 1], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		});
		x = lerp(1580, targetX + 260, t);
		y = lerp(180, targetY - 120, t);
	} else if (frame < orbitEnd) {
		const t = (frame - orbitStart) / (orbitEnd - orbitStart);
		const angle = -0.4 + t * Math.PI * 2.15;
		const rx = 300;
		const ry = 170;
		x = targetX + Math.cos(angle) * rx;
		y = targetY + Math.sin(angle) * ry;
	} else {
		const angleEnd = -0.4 + Math.PI * 2.15;
		const fromX = targetX + Math.cos(angleEnd) * 300;
		const fromY = targetY + Math.sin(angleEnd) * 170;
		const t = interpolate(frame, [orbitEnd, clickAt], [0, 1], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		});
		const eased = 1 - (1 - t) ** 3;
		x = lerp(fromX, targetX + 8, eased);
		y = lerp(fromY, targetY + 12, eased);
	}

	const pressing = frame >= clickAt && frame < clickAt + 8;
	const cursorScale = pressing
		? interpolate(frame, [clickAt, clickAt + 4, clickAt + 8], [1, 0.82, 1], {
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
			})
		: 1;

	const ripple = interpolate(frame, [clickAt, clickAt + 18], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const rippleOpacity = interpolate(frame, [clickAt, clickAt + 6, clickAt + 18], [0, 0.55, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<div
			style={{
				position: "absolute",
				left: 0,
				top: 0,
				width: "100%",
				height: "100%",
				pointerEvents: "none",
				opacity,
			}}
		>
			{frame >= clickAt ? (
				<div
					style={{
						position: "absolute",
						left: targetX,
						top: targetY,
						width: 24 + ripple * 90,
						height: 24 + ripple * 90,
						marginLeft: -(12 + ripple * 45),
						marginTop: -(12 + ripple * 45),
						borderRadius: 999,
						border: `3px solid ${theme.accent}`,
						opacity: rippleOpacity,
					}}
				/>
			) : null}
			<svg
				width={44}
				height={44}
				viewBox="0 0 24 24"
				style={{
					position: "absolute",
					left: x,
					top: y,
					transform: `scale(${cursorScale})`,
					transformOrigin: "2px 2px",
					filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))",
				}}
				aria-hidden
			>
				<title>Cursor</title>
				<path
					d="M4 3.5L4 19.5L9.2 14.8L12.8 22L15.2 20.9L11.5 13.8L18 13.8L4 3.5Z"
					fill={theme.heroForeground}
					stroke={theme.ink}
					strokeWidth={1.2}
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};
