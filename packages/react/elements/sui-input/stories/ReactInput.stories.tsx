import React from "react"
import { Input, InputProps } from "../src"
import { IconsName } from "@wpmudev/sui-icons"
import { FormField } from "@wpmudev/sui-form-field"
import docs from "./ReactInput.mdx"

// Configure default options
export default {
	title: "SUI/Components/Forms/Input",
	component: Input,
	parameters: {
		layout: "fullscreen",
		docs: {
			page: docs,
		},
	},
}

// Build "Input" story
const Playground = (args: InputProps) => {
	const boxStyles = {
		padding: 20,
		borderRadius: 4,
		background: "#fff",
	}

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<div className="sui-layout__content">
				<div style={boxStyles}>
					<FormField
						id={args.id}
						label="Label"
						helper="Helper Text"
						isSmall={args.isSmall}
						isDisabled={args.isDisabled}
						{...(args.isError && {
							error: "This field has an error, please fix it.",
						})}
					>
						<Input {...args} />
					</FormField>
				</div>
			</div>
		</div>
	)
}

// Set story arguments
Playground.args = {
	id: "unique-id",
	type: "text",
	defaultValue: "Hello World",
	icon: "",
	iconPosition: "start",
	iconHint: "",
	iconHintWidth: "",
	isSmall: false,
	allowClear: false,
	isReadOnly: false,
	isDisabled: false,
	isError: false,
}

// Set controls for story arguments
Playground.argTypes = {
	id: {
		control: "text",
	},
	type: {
		options: ["text", "email", "password", "number", "search", "tel", "url"],
		control: {
			type: "select",
		},
	},
	defaultValue: {
		control: "text",
	},
	icon: {
		options: IconsName,
		control: {
			type: "select",
		},
	},
	iconPosition: {
		options: ["start", "end"],
		control: {
			type: "inline-radio",
			labels: {
				start: "Start",
				end: "End",
			},
		},
		if: {
			arg: "icon",
			neq: "",
		},
	},
	iconHint: {
		control: "text",
		if: {
			arg: "iconPosition",
			eq: "end",
		},
	},
	iconHintWidth: {
		control: "number",
		if: {
			arg: "iconPosition",
			eq: "end",
		},
	},
	isSmall: {
		control: "boolean",
	},
	allowClear: {
		control: "boolean",
		if: {
			arg: "iconPosition",
			neq: "end",
		},
	},
	isReadOnly: {
		control: "boolean",
		if: {
			arg: "allowClear",
			eq: false,
		},
	},
	isDisabled: {
		control: "boolean",
	},
	isError: {
		control: "boolean",
	},
	isRequired: { table: { disable: true } },
	isMultiLine: { table: { disable: true } },
	disableInteractions: { table: { disable: true } },
	_style: { table: { disable: true } },
	_htmlProps: { table: { disable: true } },
}

// Publish required stories
export { Playground }
