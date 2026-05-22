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
	integrations: [icon(), sitemap({})],
	build: {
		inlineStylesheets: "always",
	},
	vite: {
		plugins: [tailwindcss()],
	},
	adapter: vercel(),
});
