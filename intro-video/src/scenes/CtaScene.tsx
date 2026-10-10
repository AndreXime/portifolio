import type React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { content } from "../content";
import { theme } from "../theme";
import { BEATS } from "../timing";

export const CtaScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const duration = BEATS.cta.duration;

	const headline = spring({
		frame,
		fps,
		config: { damping: 14, stiffness: 90, mass: 0.95 },
	});

	return (
		<SceneShell background={theme.hero} durationInFrames={duration} fadeIn={16} fadeOut={0}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse 80% 60% at 50% 42%, ${theme.hero2} 0%, ${theme.hero} 70%)`,
					justifyContent: "center",
					alignItems: "center",
					padding: "80px 120px",
					textAlign: "center",
				}}
			>
				<div
					style={{
						opacity: interpolate(headline, [0, 1], [0, 1]),
						transform: `translateY(${interpolate(headline, [0, 1], [40, 0])}px)`,
						fontFamily: theme.fontDisplay,
						fontWeight: 800,
						fontSize: 72,
						letterSpacing: "-0.03em",
						lineHeight: 1.1,
						color: theme.heroForeground,
						maxWidth: 1400,
					}}
				>
					{content.ctaHeadline}
				</div>

				<div
					style={{
						marginTop: 56,
						width: 120,
						height: 6,
						borderRadius: 3,
						backgroundColor: theme.accent,
						opacity: interpolate(frame, [18, 36], [0, 1], {
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						}),
					}}
				/>

				<div
					style={{
						marginTop: 56,
						display: "flex",
						flexDirection: "column",
						gap: 28,
						alignItems: "center",
					}}
				>
					{content.links.map((link, index) => {
						const enter = spring({
							frame: frame - (28 + index * 10),
							fps,
							config: { damping: 16, stiffness: 110 },
						});
						return (
							<div
								key={link.label}
								style={{
									opacity: interpolate(enter, [0, 1], [0, 1]),
									transform: `translateY(${interpolate(enter, [0, 1], [28, 0])}px)`,
									display: "flex",
									alignItems: "baseline",
									gap: 20,
									fontFamily: theme.fontBody,
								}}
							>
								<span
									style={{
										fontFamily: theme.fontDisplay,
										fontWeight: 800,
										fontSize: 40,
										color: theme.accent,
										letterSpacing: "-0.02em",
										minWidth: 200,
										textAlign: "right",
									}}
								>
									{link.label}
								</span>
								<span
									style={{
										fontWeight: 600,
										fontSize: 40,
										color: theme.heroForeground,
										letterSpacing: "-0.01em",
									}}
								>
									{link.url}
								</span>
							</div>
						);
					})}
				</div>
			</AbsoluteFill>
		</SceneShell>
	);
};
