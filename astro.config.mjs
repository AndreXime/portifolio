// @ts-check

import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	output: "static",
	site: "https://andreximenes.xyz",
	integrations: [
		icon(),
		sitemap({
			filter: (page) => page !== "https://andreximenes.xyz/404",
		}),
	],
	build: {
		inlineStylesheets: "always",
	},
	vite: {
		plugins: [tailwindcss()],
	},
	adapter: vercel(),
});
