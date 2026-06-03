/**
 * Peso no bundle (soma dos .woff2 em dist/client/_astro apos build).
 *
 * Preload: apenas pesos usados acima da dobra (header, hero, CTAs).
 */

import ibmPlexSansLatin400Woff2 from "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2?url";
import ibmPlexSansLatin500Woff2 from "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2?url";
import ibmPlexSansLatin600Woff2 from "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2?url";
import jetbrainsLatin400Woff2 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2?url";
import jetbrainsLatin500Woff2 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2?url";
import sourceSerifLatin600Woff2 from "@fontsource/source-serif-4/files/source-serif-4-latin-600-normal.woff2?url";
import sourceSerifLatin700Woff2 from "@fontsource/source-serif-4/files/source-serif-4-latin-700-normal.woff2?url";

export const aboveTheFoldFontPreloads: readonly string[] = [
	sourceSerifLatin700Woff2,
	sourceSerifLatin600Woff2,
	ibmPlexSansLatin400Woff2,
	ibmPlexSansLatin500Woff2,
	ibmPlexSansLatin600Woff2,
	jetbrainsLatin400Woff2,
	jetbrainsLatin500Woff2,
];

// IBM Plex Sans — corpo editorial
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";

// Source Serif 4 — titulos
import "@fontsource/source-serif-4/latin-600.css";
import "@fontsource/source-serif-4/latin-700.css";

// JetBrains Mono — metadados e rotulos
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
