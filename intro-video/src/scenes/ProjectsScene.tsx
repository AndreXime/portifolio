import type React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { content } from "../content";
import { theme } from "../theme";
import { BEATS } from "../timing";

export const ProjectsScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const duration = BEATS.projects.duration;

	const label = spring({
		frame,
		fps,
		config: { damping: 18, stiffness: 90 },
	});

	return (
		<SceneShell background={theme.paper} durationInFrames={duration}>
			<AbsoluteFill
				style={{
					padding: "80px 100px",
					fontFamily: theme.fontBody,
					color: theme.ink,
					justifyContent: "center",
					background: `linear-gradient(165deg, ${theme.paper} 0%, ${theme.paper2} 100%)`,
				}}
			>
				<div
					style={{
						fontFamily: theme.fontDisplay,
						fontWeight: 800,
						fontSize: 48,
						letterSpacing: "-0.02em",
						color: theme.accent,
						opacity: interpolate(label, [0, 1], [0, 1]),
						transform: `translateY(${interpolate(label, [0, 1], [24, 0])}px)`,
						marginBottom: 48,
					}}
				>
					{content.projectsLabel}
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: 48,
						alignItems: "stretch",
					}}
				>
					{content.projects.map((project, index) => {
						const enter = spring({
							frame: frame - (12 + index * 14),
							fps,
							config: { damping: 16, stiffness: 100, mass: 0.9 },
						});
						const opacity = interpolate(enter, [0, 1], [0, 1]);
						const x = interpolate(enter, [0, 1], [index === 0 ? -56 : 56, 0]);

						return (
							<div
								key={project.name}
								style={{
									flex: 1,
									opacity,
									transform: `translateX(${x}px)`,
									padding: "40px 44px",
									borderTop: `6px solid ${theme.accent}`,
									backgroundColor: "color-mix(in srgb, white 55%, transparent)",
								}}
							>
								<div
									style={{
										fontFamily: theme.fontDisplay,
										fontWeight: 800,
										fontSize: 56,
										letterSpacing: "-0.035em",
										lineHeight: 1.05,
										color: theme.ink,
									}}
								>
									{project.name}
								</div>

								<div
									style={{
										marginTop: 18,
										fontSize: 28,
										fontWeight: 600,
										lineHeight: 1.35,
										color: theme.ink2,
										maxWidth: 640,
									}}
								>
									{project.tagline}
								</div>

								<div
									style={{
										marginTop: 36,
										display: "flex",
										flexDirection: "column",
										gap: 18,
									}}
								>
									{project.highlights.map((line, highlightIndex) => {
										const lineEnter = spring({
											frame: frame - (28 + index * 10 + highlightIndex * 8),
											fps,
											config: { damping: 16, stiffness: 120 },
										});
										return (
											<div
												key={line}
												style={{
													display: "flex",
													alignItems: "center",
													gap: 16,
													opacity: interpolate(lineEnter, [0, 1], [0, 1]),
													transform: `translateY(${interpolate(lineEnter, [0, 1], [16, 0])}px)`,
												}}
											>
												<div
													style={{
														width: 12,
														height: 12,
														borderRadius: theme.radiusPill,
														backgroundColor: theme.accent,
														flexShrink: 0,
													}}
												/>
												<div
													style={{
														fontFamily: theme.fontDisplay,
														fontWeight: 800,
														fontSize: 28,
														letterSpacing: "-0.02em",
														color: theme.ink,
													}}
												>
													{line}
												</div>
											</div>
										);
									})}
								</div>

								<div
									style={{
										marginTop: 40,
										fontSize: 24,
										fontWeight: 600,
										color: theme.muted,
										letterSpacing: "-0.01em",
									}}
								>
									{project.url}
								</div>
							</div>
						);
					})}
				</div>
			</AbsoluteFill>
		</SceneShell>
	);
};
