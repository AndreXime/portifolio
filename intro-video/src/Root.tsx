import type React from "react";
import { Composition } from "remotion";
import { Intro } from "./Intro";
import { INTRO } from "./timing";

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="Intro"
			component={Intro}
			durationInFrames={INTRO.durationInFrames}
			fps={INTRO.fps}
			width={INTRO.width}
			height={INTRO.height}
		/>
	);
};
