export const INTRO = {
	fps: 30,
	width: 1920,
	height: 1080,
	durationInFrames: 720,
} as const;

/** Cinco atos com overlaps curtos. */
export const BEATS = {
	hero: { from: 0, duration: 150 },
	experiences: { from: 135, duration: 165 },
	technologies: { from: 285, duration: 150 },
	projects: { from: 420, duration: 165 },
	cta: { from: 570, duration: 150 },
	holdEnd: 720,
	sfxClickAt: 122,
	/** Whoosh nas viradas de cena */
	sfxWhooshExperiences: 145,
	sfxWhooshTechnologies: 295,
	sfxWhooshProjects: 430,
	sfxWhooshCta: 580,
} as const;
