import type React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CursorPointer } from "../components/CursorPointer";
import { SceneShell } from "../components/SceneShell";
import { content } from "../content";
import { theme } from "../theme";
import { BEATS } from "../timing";

const NAME_CENTER_X = 960;
const NAME_CENTER_Y = 430;
const CLICK_AT = 122;

export const HeroScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const duration = BEATS.hero.duration;

	const nameSpring = spring({
		frame,
		fps,
		config: { damping: 18, stiffness: 80, mass: 1.1 },
	});
	const nameY = interpolate(nameSpring, [0, 1], [72, 0]);
	const nameOpacity = interpolate(nameSpring, [0, 1], [0, 1]);

	const roleSpring = spring({
		frame: frame - 22,
		fps,
		config: { damping: 16, stiffness: 100, mass: 0.9 },
	});
	const roleY = interpolate(roleSpring, [0, 1], [36, 0]);
	const roleOpacity = interpolate(roleSpring, [0, 1], [0, 1]);

	const barWidth = interpolate(frame, [28, 70], [0, 280], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const clickPunch = interpolate(frame, [CLICK_AT, CLICK_AT + 5, CLICK_AT + 14], [1, 0.97, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<SceneShell background={theme.hero} durationInFrames={duration} fadeIn={12} fadeOut={28}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse 70% 55% at 50% 42%, ${theme.hero2} 0%, ${theme.hero} 70%)`,
				}}
			/>
			<AbsoluteFill
				style={{
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					padding: "0 120px",
					textAlign: "center",
				}}
			>
				<div
					style={{
						fontFamily: theme.fontDisplay,
						fontWeight: 800,
						fontSize: 168,
						letterSpacing: "-0.045em",
						lineHeight: 0.95,
						color: theme.heroForeground,
						opacity: nameOpacity,
						transform: `translateY(${nameY}px) scale(${clickPunch})`,
						transformOrigin: "center center",
					}}
				>
					{content.name}
				</div>
				<div
					style={{
						marginTop: 36,
						width: barWidth,
						height: 6,
						backgroundColor: theme.accent,
						borderRadius: 3,
					}}
				/>
				<div
					style={{
						marginTop: 32,
						fontFamily: theme.fontBody,
						fontWeight: 600,
						fontSize: 48,
						letterSpacing: "0.02em",
						color: "color-mix(in srgb, oklch(97% 0.018 80) 82%, transparent)",
						opacity: roleOpacity,
						transform: `translateY(${roleY}px)`,
					}}
				>
					{content.role}
				</div>
			</AbsoluteFill>
			<CursorPointer targetX={NAME_CENTER_X} targetY={NAME_CENTER_Y} clickAt={CLICK_AT} />
		</SceneShell>
	);
};
