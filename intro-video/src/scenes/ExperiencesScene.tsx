import type React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { content } from "../content";
import { theme } from "../theme";
import { BEATS } from "../timing";

export const ExperiencesScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const duration = BEATS.experiences.duration;
	const exp = content.experience;

	const title = spring({
		frame,
		fps,
		config: { damping: 18, stiffness: 90 },
	});

	return (
		<SceneShell background={theme.paper} durationInFrames={duration}>
			<AbsoluteFill
				style={{
					padding: "90px 120px",
					fontFamily: theme.fontBody,
					color: theme.ink,
					justifyContent: "center",
				}}
			>
				<div
					style={{
						fontFamily: theme.fontDisplay,
						fontWeight: 800,
						fontSize: 48,
						letterSpacing: "-0.02em",
						color: theme.accent,
						opacity: interpolate(title, [0, 1], [0, 1]),
						transform: `translateY(${interpolate(title, [0, 1], [24, 0])}px)`,
					}}
				>
					{content.experiencesLabel}
				</div>

				<div
					style={{
						marginTop: 24,
						fontFamily: theme.fontDisplay,
						fontWeight: 800,
						fontSize: 96,
						letterSpacing: "-0.04em",
						lineHeight: 1,
						color: theme.ink,
						opacity: interpolate(
							spring({ frame: frame - 8, fps, config: { damping: 18, stiffness: 90 } }),
							[0, 1],
							[0, 1],
						),
					}}
				>
					{exp.company}
				</div>

				<div
					style={{
						marginTop: 20,
						fontSize: 42,
						fontWeight: 600,
						color: theme.ink2,
						opacity: interpolate(frame, [18, 40], [0, 1], {
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						}),
					}}
				>
					{exp.role}
				</div>

				<div
					style={{
						marginTop: 12,
						fontSize: 36,
						fontWeight: 600,
						color: theme.muted,
						opacity: interpolate(frame, [26, 48], [0, 1], {
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						}),
					}}
				>
					{exp.period}
				</div>

				<div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 28 }}>
					{exp.highlights.map((line, index) => {
						const enter = spring({
							frame: frame - (40 + index * 12),
							fps,
							config: { damping: 16, stiffness: 110 },
						});
						return (
							<div
								key={line}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 24,
									opacity: interpolate(enter, [0, 1], [0, 1]),
									transform: `translateX(${interpolate(enter, [0, 1], [48, 0])}px)`,
								}}
							>
								<div
									style={{
										width: 18,
										height: 18,
										borderRadius: theme.radiusPill,
										backgroundColor: theme.accent,
										flexShrink: 0,
									}}
								/>
								<div
									style={{
										fontFamily: theme.fontDisplay,
										fontWeight: 800,
										fontSize: 40,
										letterSpacing: "-0.02em",
										lineHeight: 1.2,
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
						position: "absolute",
						left: 0,
						top: 0,
						bottom: 0,
						width: 14,
						backgroundColor: theme.accent,
						transform: `scaleY(${interpolate(frame, [0, 36], [0, 1], {
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						})})`,
						transformOrigin: "top center",
					}}
				/>
			</AbsoluteFill>
		</SceneShell>
	);
};
