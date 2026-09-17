/**
 * Pesos carregados (mapeamento com classes Tailwind no site):
 *
 * Geist Sans (font-sans): 400 corpo, 600 font-semibold
 * Bricolage Grotesque (font-display): 800 titulos
 *
 * Preload: header + hero (Bricolage 800 no h1, Geist 400/600 no corpo e CTA).
 */

import "@fontsource/bricolage-grotesque/latin-800.css";
import "@fontsource/geist-sans/latin-400.css";
import "@fontsource/geist-sans/latin-600.css";
import bricolageLatin800Woff2 from "@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff2?url";
import geistSansLatin400Woff2 from "@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff2?url";
import geistSansLatin600Woff2 from "@fontsource/geist-sans/files/geist-sans-latin-600-normal.woff2?url";

export const aboveTheFoldFontPreloads: readonly string[] = [
	bricolageLatin800Woff2,
	geistSansLatin400Woff2,
	geistSansLatin600Woff2,
];
