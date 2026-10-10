import type React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { content } from "../content";
import { getTechIcons } from "../techIcons";
import { theme } from "../theme";
import { BEATS } from "../timing";

const icons = getTechIcons();

export const TechnologiesScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const duration = BEATS.technologies.duration;

	const headline = spring({
		frame,
		fps,
		config: { damping: 16, stiffness: 100 },
	});

	return (
		<SceneShell background={theme.hero} durationInFrames={duration} fadeIn={18} fadeOut={22}>
			<AbsoluteFill
				style={{
					background: `linear-gradient(160deg, ${theme.hero2} 0%, ${theme.hero} 55%, oklch(18% 0.03 250) 100%)`,
					justifyContent: "center",
					alignItems: "center",
					padding: "64px 100px",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						fontFamily: theme.fontDisplay,
						fontWeight: 800,
						fontSize: 56,
						letterSpacing: "-0.03em",
						lineHeight: 1.15,
						color: theme.heroForeground,
						textAlign: "center",
						maxWidth: 1400,
						marginBottom: 48,
						opacity: interpolate(headline, [0, 1], [0, 1]),
						transform: `translateY(${interpolate(headline, [0, 1], [28, 0])}px)`,
					}}
				>
					{content.technologiesHeadline}
				</div>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(4, 360px)",
						columnGap: 40,
						rowGap: 28,
						justifyContent: "center",
						alignContent: "center",
					}}
				>
					{icons.map((icon, index) => {
						const enter = spring({
							frame: frame - (16 + index * 5),
							fps,
							config: { damping: 14, stiffness: 130, mass: 0.75 },
						});
						const opacity = interpolate(enter, [0, 1], [0, 1]);
						const y = interpolate(enter, [0, 1], [36, 0]);
						const scale = interpolate(enter, [0, 1], [0.7, 1]);

						return (
							<div
								key={icon.slug}
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									gap: 18,
									padding: "16px 20px",
									borderRadius: 24,
									backgroundColor: "color-mix(in srgb, oklch(97% 0.018 80) 12%, transparent)",
									opacity,
									transform: `translateY(${y}px) scale(${scale})`,
								}}
							>
								<svg
									role="img"
									viewBox="0 0 24 24"
									width={56}
									height={56}
									aria-label={icon.title}
									style={{ flexShrink: 0 }}
								>
									<title>{icon.title}</title>
									<path d={icon.path} fill={theme.heroForeground} />
								</svg>
								<span
									style={{
										fontFamily: theme.fontDisplay,
										fontWeight: 800,
										fontSize: 28,
										letterSpacing: "-0.03em",
										lineHeight: 1.1,
										color: theme.heroForeground,
									}}
								>
									{icon.title}
								</span>
							</div>
						);
					})}
				</div>
			</AbsoluteFill>
		</SceneShell>
	);
};
