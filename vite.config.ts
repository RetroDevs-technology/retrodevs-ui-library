import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => {
	const isBuild = command === "build";

	return {
		...(isBuild && {
			publicDir: false,
		}),
		plugins: [
			react(),
			...(isBuild
				? [
						dts({
							rollupTypes: true,
							include: ["src/**/*.ts", "src/**/*.tsx"],
							exclude: ["src/styles.ts"],
						}),
					]
				: []),
		],
		...(isBuild && {
			build: {
				lib: {
					entry: {
						index: path.resolve(__dirname, "src/index.ts"),
						styles: path.resolve(__dirname, "src/styles.ts"),
					},
					name: "GregRetroUILibrary",
					formats: ["es"],
					fileName: (format, entryName) =>
						`${entryName ?? "index"}.js`,
				},
				rollupOptions: {
					external: ["react", "react-dom", "react/jsx-runtime"],
					output: {
						globals: {
							react: "React",
							"react-dom": "ReactDOM",
							"react/jsx-runtime": "react/jsx-runtime",
						},
						assetFileNames: (assetInfo) => {
							if (assetInfo.name?.endsWith(".css")) return "styles.css";
							return "assets/[name]-[hash][extname]";
						},
					},
				},
			},
		}),
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};
});
