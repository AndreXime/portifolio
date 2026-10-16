// @ts-check

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	output: "static",
	site: "https://andreximenes.xyz",
	session: false,
	i18n: {
		defaultLocale: "pt",
		locales: ["pt", "en"],
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: false,
		},
	},
	env: {
		schema: {
			WEB3FORMS_ACCESS_KEY: envField.string({
				context: "server",
				access: "secret",
				optional: true,
			}),
		},
	},
	integrations: [
		icon(),
		sitemap({
			filter: (page) => !page.includes("/og-image") && !page.includes("/api/"),
			i18n: {
				defaultLocale: "pt",
				locales: {
					pt: "pt-BR",
					en: "en",
				},
			},
		}),
	],
	build: {
		inlineStylesheets: "always",
	},
	vite: {
		plugins: [tailwindcss()],
		build: {
			// Scripts na home serem inline para evitar requisição extra
			assetsInlineLimit: 8000,
		},
	},
	adapter: cloudflare({
		imageService: "compile",
	}),
});
