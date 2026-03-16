// @ts-check

import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";
// https://astro.build/config
export default defineConfig({
	output: "static",
	site: "https://andreximenes.xyz",
	integrations: [
		preact(),
		sitemap({
			filter: (page) => page !== "https://andreximenes.xyz/404",
		}),
	],
	build: {
		inlineStylesheets: "always",
	},
	vite: {
		plugins: [
			tailwindcss(),
			visualizer({
				filename: "stats.html",
				open: true,
				gzipSize: true,
				brotliSize: true,
			}),
		],
	},
	adapter: vercel(),
});
