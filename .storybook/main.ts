import path, { join, dirname } from "path"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, "package.json")))
}

module.exports = {
	stories: [
		"../packages/**/stories/*.stories.mdx",
		"../packages/**/stories/*.stories.@(js|jsx|ts|tsx)",
		"../packages/**/*.stories.mdx",
		"../packages/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: [
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-storyshots"),
	],
	framework: {
		name: getAbsolutePath("@storybook/react-webpack5"),
		options: {},
	},
	webpackFinal: async (config: any) => {
		config.module = config.module || {}
		config.module.rules = config.module.rules || []

		// SASS support
		config.module.rules.push({
			test: /\.scss$/,
			use: ["style-loader", "css-loader", "sass-loader"],
			include: path.resolve(__dirname, "../"),
		})

		config.resolve = config.resolve || {}
		config.resolve.extensions = config.resolve.extensions || []

		// TypeScript support
		config.module.rules.push({
			test: /\.(ts|tsx)?$/,
			exclude: /node_modules/,
			use: [
				{
					loader: "ts-loader",
					options: {
						transpileOnly: true,
					},
				},
			],
		})

		config.resolve.extensions.push(".ts", ".tsx")

		// Custom alias support
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			"@docs": path.resolve(__dirname, "../packages/docs/sui-docs/src"),

			// ⚠️ Required: Manual Mapping
			// This is necessary to avoid conflicts between local
			// and NPM packages.
			"@wpmudev/sui-css": path.resolve(
				__dirname,
				"../packages/assets/sui-css/src",
			),
			"@wpmudev/sui-icons": path.resolve(
				__dirname,
				"../packages/assets/sui-icons/src/components",
			),
			"@wpmudev/sui-docs": path.resolve(
				__dirname,
				"../packages/docs/sui-docs/src",
			),
			"@wpmudev/sui-devtools": path.resolve(
				__dirname,
				"../packages/react/sui-devtools/src",
			),
			"@wpmudev/sui-hooks": path.resolve(
				__dirname,
				"../packages/react/sui-hooks/src",
			),
			"@wpmudev/sui-utils": path.resolve(
				__dirname,
				"../packages/react/sui-utils/src",
			),
			"@wpmudev/sui-box": path.resolve(
				__dirname,
				"../packages/react/elements/sui-box/src",
			),
			"@wpmudev/sui-button": path.resolve(
				__dirname,
				"../packages/react/elements/sui-button/src",
			),
			"@wpmudev/sui-checkbox": path.resolve(
				__dirname,
				"../packages/react/elements/sui-checkbox/src",
			),
			"@wpmudev/sui-dropdown": path.resolve(
				__dirname,
				"../packages/react/elements/sui-dropdown/src",
			),
			"@wpmudev/sui-form-field": path.resolve(
				__dirname,
				"../packages/react/elements/sui-form-field/src",
			),
			"@wpmudev/sui-grid": path.resolve(
				__dirname,
				"../packages/react/elements/sui-grid/src",
			),
			"@wpmudev/sui-icon": path.resolve(
				__dirname,
				"../packages/react/elements/sui-icon/src",
			),
			"@wpmudev/sui-input": path.resolve(
				__dirname,
				"../packages/react/elements/sui-input/src",
			),
			"@wpmudev/sui-modal": path.resolve(
				__dirname,
				"../packages/react/elements/sui-modal/src",
			),
			"@wpmudev/sui-popover": path.resolve(
				__dirname,
				"../packages/react/elements/sui-popover/src",
			),
			"@wpmudev/sui-score": path.resolve(
				__dirname,
				"../packages/react/elements/sui-score/src",
			),
			"@wpmudev/sui-spinner": path.resolve(
				__dirname,
				"../packages/react/elements/sui-spinner/src",
			),
			"@wpmudev/sui-tag": path.resolve(
				__dirname,
				"../packages/react/elements/sui-tag/src",
			),
			"@wpmudev/sui-tooltip": path.resolve(
				__dirname,
				"../packages/react/elements/sui-tooltip/src",
			),
			"@wpmudev/sui-upsell": path.resolve(
				__dirname,
				"../packages/react/elements/sui-upsell/src",
			),
			"@wpmudev/sui-upsell-notice": path.resolve(
				__dirname,
				"../packages/react/elements/sui-upsell-notice/src",
			),
		}

		return config
	},
	typescript: {
		reactDocgen: "react-docgen-typescript-plugin",
	},
	docs: {
		autodocs: true,
	},
}
