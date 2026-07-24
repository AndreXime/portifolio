export type Locale = "pt" | "en";

export const PREFERRED_LOCALE_COOKIE = "PREFERRED_LOCALE";

export function isLocale(value: string): value is Locale {
	return value === "pt" || value === "en";
}
