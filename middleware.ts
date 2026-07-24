import { next } from "@vercel/functions";
import { isLocale, PREFERRED_LOCALE_COOKIE } from "./src/lib/i18n/locale";

export const config = {
	matcher: "/",
};

const BOT_UA =
	/googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|facebookexternalhit|twitterbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|applebot|semrushbot|ahrefsbot|rogerbot|screaming frog|ia_archiver/i;

function cookieValue(request: Request, name: string): string | undefined {
	const header = request.headers.get("cookie");
	if (!header) {
		return undefined;
	}
	for (const part of header.split(";")) {
		const [rawKey, ...rest] = part.split("=");
		const key = rawKey?.trim();
		if (key === name) {
			return decodeURIComponent(rest.join("=").trim());
		}
	}
	return undefined;
}

function preferredLanguage(header: string | null): string | undefined {
	if (!header) {
		return undefined;
	}
	const primary = header.split(",")[0]?.trim().split(";")[0]?.trim();
	if (!primary) {
		return undefined;
	}
	return primary.split("-")[0]?.toLowerCase();
}

export default function middleware(request: Request) {
	const userAgent = request.headers.get("user-agent") ?? "";
	if (BOT_UA.test(userAgent)) {
		return next();
	}

	const cookieLang = cookieValue(request, PREFERRED_LOCALE_COOKIE);
	if (cookieLang && isLocale(cookieLang)) {
		if (cookieLang === "pt") {
			return next();
		}
		return Response.redirect(new URL("/en", request.url), 302);
	}

	if (preferredLanguage(request.headers.get("accept-language")) === "pt") {
		return next();
	}

	return Response.redirect(new URL("/en", request.url), 302);
}
