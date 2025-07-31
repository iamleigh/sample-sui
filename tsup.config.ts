import type { Options } from "tsup"
import { sassPlugin } from "esbuild-sass-plugin"
import fs from "fs"
import path from "path"

const env = process.env.NODE_ENV
const isProd = env === "production"

// Detect if we're in sui-icons package
const isSuiIcons = process.cwd().includes("sui-icons")

// Resolve correct entry
const entry = (() => {
	if (isSuiIcons) {
		const iconsEntry = path.resolve(process.cwd(), "src/components/index.ts")
		if (fs.existsSync(iconsEntry)) return ["src/components/index.ts"]
	} else {
		const indexTs = path.resolve(process.cwd(), "src/index.ts")
		const indexTsx = path.resolve(process.cwd(), "src/index.tsx")
		if (fs.existsSync(indexTs)) return ["src/index.ts"]
		if (fs.existsSync(indexTsx)) return ["src/index.tsx"]
	}
	return []
})()

export const tsup: Options = {
	entry,
	dts: false,
	clean: true,
	splitting: true,
	minify: isProd,
	bundle: isProd,
	watch: false, // !isProd
	target: "es2020",
	skipNodeModulesBundle: true,
	outDir: "dist", // isProd ? "dist" : "lib"
	format: ["cjs", "esm"],
	esbuildPlugins: [sassPlugin()],
}
