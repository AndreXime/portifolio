// @ts-check

import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	output: "static",
	site: "https://andreximenes.xyz",
	env: {
		schema: {
			GITHUB_ACCESS_TOKEN: envField.string({
				context: "server",
				access: "secret",
				optional: true,
			}),
			EMAIL_USER: envField.string({
				context: "server",
				access: "secret",
				optional: true,
			}),
			EMAIL_PASS: envField.string({
				context: "server",
				access: "secret",
				optional: true,
			}),
		},
	},
	integrations: [
		icon(),
		sitemap({
			filter: (page) => !page.includes("/og-image") && !page.includes("/resumo") && !page.includes("/api/"),
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
