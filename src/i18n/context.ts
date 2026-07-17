import type { SiteContent } from "../content/index";
import type { Dictionary, Locale } from "./index";

export interface PageContext {
	locale: Locale;
	ui: Dictionary;
	site: SiteContent;
}
