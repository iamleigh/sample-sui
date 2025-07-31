import React from "react"

// Import required component.
import { Score, ScoreProps } from "../src"

// Import documentation main page.
import docs from "./ReactScore.mdx"

// Build "Score" story.
const Playground = ({
	bar,
	value,
	description,
	state,
	isSmall,
	isPercentage,
	color,
}: ScoreProps & { color?: string }) => {
	const boxStyles = {
		padding: 20,
		borderRadius: 4,
		background: color !== "white" ? "#fff" : "#333",
	}

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<div className="sui-layout__content">
				<div style={boxStyles}>
					<Score
						bar={bar}
						value={value}
						description={description}
						state={state}
						isSmall={isSmall}
						isPercentage={isPercentage}
					/>
				</div>
			</div>
		</div>
	)
}

// Set story arguments.
Playground.args = {
	isSmall: false,
	state: "default",
	bar: 15,
	value: 15,
	isPercentage: true,
	description: "",
}

// Set controls for story arguments.
Playground.argTypes = {
	isSmall: {
		name: "isSmall",
		description: "The scores component size.",
	},
	state: {
		name: "state",
		description: "The scores color variation according to type.",
		options: ["default", "error", "warning", "success"],
		control: {
			type: "select",
			labels: {
				default: "Type: Default",
				error: "Type: Error",
				warning: "Type: Warning",
				success: "Type: Success",
			},
		},
	},
	bar: {
		name: "bar",
		description: "The score circle.",
		control: {
			type: "range",
			min: 0,
			max: 100,
			step: 1,
		},
	},
	value: {
		name: "value",
		description: "The score value to display.",
		control: "number",
	},
	isPercentage: {
		name: "isPercentage",
		description: "The percentage to display.",
	},
	description: {
		name: "description",
		description: "The score content to display.",
		control: "text",
		if: {
			arg: "isSmall",
			eq: true,
		},
	},
}

// Configure default options.
export default {
	title: "SUI/Components/Core/Score",
	component: Score,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			page: docs,
		},
	},
}

// Publish required stories.
export { Playground }
