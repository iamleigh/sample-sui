import React from "react"
import { Tag, TagProps } from "../src"
import { Box, BoxGroup } from "@wpmudev/sui-box"
import docs from "./ReactTag.mdx"

// Configure default options
export default {
	title: "SUI/Components/Core/Tag",
	component: Tag,
	parameters: {
		layout: "fullscreen",
		docs: {
			page: docs,
		},
	},
}

// Build "Tag" story
const Playground = ({ children, ...props }: TagProps & { color?: string }) => {
	const [isDismissed, setIsDismissed] = React.useState(true)

	React.useEffect(() => {
		if (!isDismissed) {
			setTimeout(() => setIsDismissed(true), 500)
		}
	}, [isDismissed])

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<div className="sui-layout__content">
				<Box>
					<BoxGroup>
						<Tag
							{...(props.color && { color: props.color })}
							{...(props.contentWrap && { contentWrap: props.contentWrap })}
							{...(props.isUppercase && { isUppercase: props.isUppercase })}
							{...(props.isOutlined && { isOutlined: props.isOutlined })}
							{...(props.isSmall && { isSmall: props.isSmall })}
							{...(props.isDisabled && { isDisabled: props.isDisabled })}
							{...(props.onDismiss && {
								onDismiss: () => setIsDismissed(false),
							})}
						>
							{children}
						</Tag>

						{!isDismissed && <small>Dismissed!</small>}
					</BoxGroup>
				</Box>
			</div>
		</div>
	)
}

// Set story arguments.
Playground.args = {
	children: "Hello World",
	color: "",
	contentWrap: "default",
	isUppercase: false,
	isOutlined: false,
	isSmall: false,
	isDisabled: false,
	onDismiss: false,
}

// Set controls for story arguments.
Playground.argTypes = {
	children: {},
	color: {
		options: ["", "blue", "navy", "yellow", "red", "green", "black", "white"],
		control: {
			type: "select",
			labels: {
				"": "None",
				blue: "Blue (Information)",
				navy: "Navy Blue",
				yellow: "Yellow (Warning)",
				red: "Red (Error)",
				green: "Green (Success)",
				black: "Black",
				white: "White",
			},
		},
	},
	contentWrap: {
		options: ["default", "multiline", "truncated"],
		control: {
			type: "inline-radio",
			labels: {
				default: "Default",
				multiline: "Multiline",
				truncated: "Truncated",
			},
		},
	},
	isUppercase: {
		control: {
			type: "boolean",
		},
	},
	isOutlined: {
		control: {
			type: "boolean",
		},
	},
	isSmall: {
		control: {
			type: "boolean",
		},
	},
	isDisabled: {
		control: {
			type: "boolean",
		},
	},
	onDismiss: {
		name: "onDismiss (Use predefined function)",
		control: "boolean",
		if: {
			arg: "isSmall",
			neq: true,
		},
	},
}

// Publish required stories.
export { Playground }
