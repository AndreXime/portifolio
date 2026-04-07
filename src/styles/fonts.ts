/**
 * Peso no bundle (soma dos .woff2 em dist/client/_astro após build).
 * Total tipico ~224 KiB woff2.
 *
 * Preload: apenas pesos usados acima da dobra (header, hero, CTAs).
 */

import interLatin400Woff2 from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
import interLatin600Woff2 from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
import interLatin700Woff2 from "@fontsource/inter/files/inter-latin-700-normal.woff2?url";
import interTightLatin600Woff2 from "@fontsource/inter-tight/files/inter-tight-latin-600-normal.woff2?url";
import jetbrainsLatin400Woff2 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2?url";
import jetbrainsLatin500Woff2 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2?url";

export const aboveTheFoldFontPreloads: readonly string[] = [
	interTightLatin600Woff2,
	interLatin400Woff2,
	interLatin600Woff2,
	interLatin700Woff2,
	jetbrainsLatin400Woff2,
	jetbrainsLatin500Woff2,
];

// Inter — ~95 KiB woff2 (400, 400 italic, 600, 700)
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-400-italic.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";

// Inter Tight — ~44 KiB woff2 (600, 700)
import "@fontsource/inter-tight/latin-600.css";
import "@fontsource/inter-tight/latin-700.css";

// JetBrains Mono — ~63 KiB woff2 (400, 500, 600)
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-600.css";

// Playfair Display — ~21 KiB woff2 (400 italic)
import "@fontsource/playfair-display/latin-400-italic.css";
