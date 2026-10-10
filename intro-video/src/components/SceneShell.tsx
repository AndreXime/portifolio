import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface SceneShellProps {
	background: string;
	children: React.ReactNode;
	/** Duração local da Sequence (frames). */
	durationInFrames: number;
	fadeIn?: number;
	fadeOut?: number;
}

export const SceneShell: React.FC<SceneShellProps> = ({
	background,
	children,
	durationInFrames,
	fadeIn = 18,
	fadeOut = 22,
}) => {
	const frame = useCurrentFrame();
	const opacity =
		fadeOut <= 0
			? interpolate(frame, [0, fadeIn], [0, 1], {
					extrapolateLeft: "clamp",
					extrapolateRight: "clamp",
				})
			: interpolate(frame, [0, fadeIn, durationInFrames - fadeOut, durationInFrames], [0, 1, 1, 0], {
					extrapolateLeft: "clamp",
					extrapolateRight: "clamp",
				});
	const scale = interpolate(frame, [0, fadeIn, durationInFrames], fadeOut <= 0 ? [1.06, 1, 1] : [1.06, 1, 1.02], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill style={{ backgroundColor: background, opacity }}>
			<div
				style={{
					width: "100%",
					height: "100%",
					transform: `scale(${scale})`,
					transformOrigin: "center center",
				}}
			>
				{children}
			</div>
		</AbsoluteFill>
	);
};
