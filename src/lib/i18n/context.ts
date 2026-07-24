import type { SiteContent } from "../../content/index";
import type { Dictionary } from "../../locales";
import type { Locale } from "./locale";

export interface PageContext {
	locale: Locale;
	ui: Dictionary;
	site: SiteContent;
}
