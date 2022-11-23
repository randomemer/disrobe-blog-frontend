import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import path from "path-browserify";

process.env.BROWSER = "firefox";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			path: "path-browserify",
		},
	},
	server: {
		port: 3000,
		strictPort: true,
	},
});
