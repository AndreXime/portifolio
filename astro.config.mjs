// @ts-check

import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import icon from "astro-icon";

const isNode = process.env.ASTRO_NODE === "1";

// https://astro.build/config
export default defineConfig({
	output: "static",
	site: "https://andreximenes.xyz",
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
			ASTRO_NODE: envField.string({
				context: "server",
				access: "public",
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
	adapter: isNode ? node({ mode: "standalone" }) : vercel(),
});
