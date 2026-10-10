import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import "./fonts";
import { CtaScene } from "./scenes/CtaScene";
import { ExperiencesScene } from "./scenes/ExperiencesScene";
import { HeroScene } from "./scenes/HeroScene";
import { ProjectsScene } from "./scenes/ProjectsScene";
import { TechnologiesScene } from "./scenes/TechnologiesScene";
import { theme } from "./theme";
import { BEATS } from "./timing";

export const Intro: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: theme.hero }}>
			<Sequence from={BEATS.hero.from} durationInFrames={BEATS.hero.duration}>
				<HeroScene />
			</Sequence>
			<Sequence from={BEATS.experiences.from} durationInFrames={BEATS.experiences.duration}>
				<ExperiencesScene />
			</Sequence>
			<Sequence from={BEATS.technologies.from} durationInFrames={BEATS.technologies.duration}>
				<TechnologiesScene />
			</Sequence>
			<Sequence from={BEATS.projects.from} durationInFrames={BEATS.projects.duration}>
				<ProjectsScene />
			</Sequence>
			<Sequence from={BEATS.cta.from} durationInFrames={BEATS.cta.duration}>
				<CtaScene />
			</Sequence>

			{/* Pixabay / Universfield — escolhidos pelo usuário */}
			<Audio from={BEATS.sfxClickAt} durationInFrames={54} src={staticFile("sfx/click.mp3")} volume={1} />
			<Audio from={BEATS.sfxWhooshExperiences} durationInFrames={50} src={staticFile("sfx/whoosh.mp3")} volume={0.7} />
			<Audio
				from={BEATS.sfxWhooshTechnologies}
				durationInFrames={50}
				src={staticFile("sfx/whoosh.mp3")}
				volume={0.65}
			/>
			<Audio from={BEATS.sfxWhooshProjects} durationInFrames={50} src={staticFile("sfx/whoosh.mp3")} volume={0.65} />
			<Audio from={BEATS.sfxWhooshCta} durationInFrames={50} src={staticFile("sfx/whoosh.mp3")} volume={0.7} />
		</AbsoluteFill>
	);
};
