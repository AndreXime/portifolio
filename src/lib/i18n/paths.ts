import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from "astro:i18n";
import type { Locale } from "./locale";

/** Converte `/projetos/x` em `projetos/x`; home vira `undefined` (API do Astro). */
function asRoutePath(path: string): string | undefined {
	const clean = path.replace(/^\/+|\/+$/g, "");
	return clean.length === 0 ? undefined : clean;
}

/** Remove o prefixo `/en` quando presente. */
export function stripLocalePrefix(pathname: string): string {
	const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
	if (normalized === "/en" || normalized.startsWith("/en/")) {
		const rest = normalized.slice("/en".length);
		return rest.length === 0 ? "/" : rest;
	}
	return normalized === "" ? "/" : normalized;
}

export function localizedPath(locale: Locale, path = "/"): string {
	return getRelativeLocaleUrl(locale, asRoutePath(path));
}

export function absoluteLocaleUrl(locale: Locale, path = "/"): string {
	return getAbsoluteLocaleUrl(locale, asRoutePath(path));
}

export function switchLocalePath(currentPathname: string, targetLocale: Locale): string {
	return localizedPath(targetLocale, stripLocalePrefix(currentPathname));
}

export function homeHash(locale: Locale, hash: string): string {
	const normalizedHash = hash.startsWith("#") ? hash : `#${hash}`;
	const base = getRelativeLocaleUrl(locale).replace(/\/$/, "");
	return base === "" || base === "/" ? `/${normalizedHash}` : `${base}/${normalizedHash}`;
}
