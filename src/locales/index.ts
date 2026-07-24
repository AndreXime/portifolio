import { isLocale, type Locale } from "../lib/i18n/locale";
import { en } from "./en/ui";
import { pt } from "./pt/ui";

export type { Locale } from "../lib/i18n/locale";

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
