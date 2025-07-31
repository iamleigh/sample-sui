import React from "react"
import "@storybook/addon-console"
import { SuiWrapper } from "./components/sui-wrapper"
import { Breakpoints } from "./constants/breakpoints"

import "./assets/js/body-class"
import "./assets/js/html-class"

export const globalTypes = {
	theme: {
		name: "Theme",
		description: "Change global theme of stories.",
		toolbar: {
			icon: "switchalt",
			items: [
				{ title: "Light", left: "🌞", value: "light" },
				{ title: "Dark", left: "🌚", value: "dark" },
			],
		},
	},
	direction: {
		name: "Direction",
		description:
			"The direction property specifies the text direction/writing direction within a block-level element.",
		toolbar: {
			icon: "globe",
			items: [
				{ title: "Left to right", value: "" },
				{ title: "Right to left", value: "rtl" },
			],
		},
	},
}

export const parameters = {
	actions: {
		argTypesRegex: "^on[A-Z].*",
	},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	viewport: {
		viewports: Breakpoints,
	},
	backgrounds: {
		disable: true,
	},
	options: {
		storySort: {
			order: [
				"SUI",
				[
					"Home",
					"Getting Started",
					"What's New",
					["Changelog", "Roadmap"],
					"Components",
					[
						"Overview",
						"Core",
						["Grid", "*"],
						"Simple Elements",
						["Avatar", "Button", "Icon Button", "*"],
						"Forms",
						["Form Field", "Input", "Password Field", "Checkbox", "Radio", "*"],
						"Advanced",
						["*"],
						"Modules",
						["*"],
						"Collections",
						["*"],
						"*",
					],
					"NPM Packages",
					["Components", "Hooks", "Utilities"],
					"CSS Framework",
					["Overview", "Colors", "Typography", "Layout", "Grid", "*"],
					"Icons Pack",
					"*",
				],
			],
		},
	},
}

export const decorators = [
	(Story, context) => (
		<SuiWrapper context={context}>
			<Story />
		</SuiWrapper>
	),
]
