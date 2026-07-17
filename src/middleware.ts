import { defineMiddleware } from "astro:middleware";
import { isLocale, PREFERRED_LOCALE_COOKIE } from "./i18n";

const BOT_UA =
	/googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|facebookexternalhit|twitterbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|applebot|semrushbot|ahrefsbot|rogerbot|screaming frog|ia_archiver/i;

function preferredLocaleFromAcceptLanguage(header: string | null): string | undefined {
	if (!header) {
		return undefined;
	}
	const primary = header.split(",")[0]?.trim().split(";")[0]?.trim();
	if (!primary) {
		return undefined;
	}
	const language = primary.split("-")[0]?.toLowerCase();
	return language;
}

export const onRequest = defineMiddleware((context, next) => {
	const { pathname } = context.url;
	if (pathname !== "/" && pathname !== "") {
		return next();
	}

	// Em prerender estático não há headers de request (redirect só em runtime/edge).
	if (context.isPrerendered) {
		return next();
	}

	const userAgent = context.request.headers.get("user-agent") ?? "";
	if (BOT_UA.test(userAgent)) {
		return next();
	}

	const cookieLang = context.cookies.get(PREFERRED_LOCALE_COOKIE)?.value;
	if (cookieLang && isLocale(cookieLang)) {
		if (cookieLang === "pt") {
			return next();
		}
		return context.redirect("/en", 302);
	}

	const fromBrowser = preferredLocaleFromAcceptLanguage(context.request.headers.get("accept-language"));
	if (fromBrowser === "pt") {
		return next();
	}

	return context.redirect("/en", 302);
});
