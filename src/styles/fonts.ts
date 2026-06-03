/**
 * Pesos carregados (mapeamento com classes Tailwind no site):
 *
 * IBM Plex Sans (font-sans): 400 corpo, 600 font-semibold (hero, strong, modal)
 * Source Serif 4 (font-display): 600 titulos, 500 citacao em Sobre
 * JetBrains Mono (font-mono): 400 rotulos, 500 font-medium (nav, botoes, tags)
 *
 * Nao importar 500 Plex, 700 Serif nem 700 Mono: sem uso no markup.
 * Preload: header + hero. Serif 500 abaixo da dobra, sem preload.
 */

import ibmPlexSansLatin400Woff2 from "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2?url";
import ibmPlexSansLatin600Woff2 from "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2?url";
import jetbrainsLatin400Woff2 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2?url";
import jetbrainsLatin500Woff2 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2?url";
import sourceSerifLatin600Woff2 from "@fontsource/source-serif-4/files/source-serif-4-latin-600-normal.woff2?url";

export const aboveTheFoldFontPreloads: readonly string[] = [
	sourceSerifLatin600Woff2,
	ibmPlexSansLatin400Woff2,
	ibmPlexSansLatin600Woff2,
	jetbrainsLatin400Woff2,
	jetbrainsLatin500Woff2,
];

// IBM Plex Sans — corpo (400 regular, 600 semibold no hero)
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-600.css";

// Source Serif 4 — titulos (600 semibold, 500 medium na citacao em Sobre)
import "@fontsource/source-serif-4/latin-500.css";
import "@fontsource/source-serif-4/latin-600.css";

// JetBrains Mono — rotulos e botoes (400 regular, 500 medium)
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
