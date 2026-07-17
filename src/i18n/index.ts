import { isLocale, type Locale } from "./locale";
import { en } from "./locales/en";
import { pt } from "./locales/pt";

export type { Locale } from "./locale";
export { isLocale, PREFERRED_LOCALE_COOKIE } from "./locale";

export const defaultLocale: Locale = "pt";
export const locales: Locale[] = ["pt", "en"];

export const dictionaries = { pt, en } as const;

export type Dictionary = {
	[K in keyof typeof pt]: {
		[P in keyof (typeof pt)[K]]: string;
	};
};

export function resolveLocale(value: string | undefined | null): Locale {
	if (value && isLocale(value)) {
		return value;
	}
	return defaultLocale;
}

export function t(locale: Locale): Dictionary {
	return dictionaries[locale];
}

export function htmlLang(locale: Locale): string {
	return locale === "pt" ? "pt-BR" : "en";
}

export function ogLocale(locale: Locale): string {
	return locale === "pt" ? "pt_BR" : "en_US";
}
