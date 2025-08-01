import React from "react"
import { Box, BoxGroup, BoxProps, BoxGroupProps } from "../src"
import { Row, Col } from "@wpmudev/sui-grid"
import { Button } from "@wpmudev/sui-button"
import { IconsName } from "@wpmudev/sui-icons"
import docs from "./Box.mdx"

// Configure default options
export default {
	title: "SUI/Components/Core/Box",
	component: Box,
	parameters: {
		layout: "fullscreen",
		docs: {
			page: docs,
		},
	},
}

// Build "Box" story
const Playground = (args: BoxProps & BoxGroupProps) => {
	const styles = {
		padding: 20,
		borderRadius: 4,
		background: "#F8F8F8",
	}

	const boxHeaderLeft = (
		<span
			key="1"
			className="sui-tag sui-tag--outlined-navy sui-tag--sm sui-tag--uppercase"
		>
			<span className="sui-tag__label">Pro</span>
		</span>
	)

	const boxHeaderRight = (
		<Button type="primary" colorScheme="blue" isSmall={true}>
			Run Action
		</Button>
	)

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<div className="sui-layout__content">
				<Box
					{...(args.title && { title: args.title })}
					{...(args.icon && { icon: args.icon })}
					hideMobileIcon={args.hideMobileIcon}
					{...(args.headerLeft && { headerLeft: boxHeaderLeft })}
					{...(args.headerRight && { headerRight: boxHeaderRight })}
				>
					<BoxGroup
						isInline={args.isInline}
						hasPadding={args.hasPadding}
						isHeader={args.isHeader}
						isFooter={args.isFooter}
					>
						<p>
							This content is placed inside a <code>BoxGroup</code>, which helps
							visually group related elements inside the <code>Box</code>{" "}
							container.
						</p>

						<Row align={{ md: "inline" }}>
							<Col size="6">
								<div style={styles}>Left column</div>
							</Col>
							<Col size="6">
								<div style={styles}>Right column</div>
							</Col>
						</Row>
					</BoxGroup>
					{args.isHeader && (
						<BoxGroup>
							<p>
								Notice how the element above now has a bottom border,
								that&apos;s because it has <code>isHeader</code> enabled.
							</p>
						</BoxGroup>
					)}
				</Box>
			</div>
		</div>
	)
}

Playground.args = {
	// Box properties
	title: "Box Title",
	icon: "",
	hideMobileIcon: false,
	headerLeft: false,
	headerRight: false,
	// BoxGroup properties
	isInline: false,
	hasPadding: true,
	isHeader: false,
	isFooter: false,
}

Playground.argTypes = {
	// Box properties
	title: {
		control: "text",
		table: {
			category: "Box",
		},
	},
	icon: {
		options: IconsName,
		control: "select",
		table: {
			category: "Box",
		},
		if: {
			arg: "title",
			neq: "",
		},
	},
	hideMobileIcon: {
		control: "boolean",
		table: {
			category: "Box",
			display: ({ arg }) => {
				return arg.title ? true : false
			},
		},
		if: {
			arg: "icon",
			neq: "",
		},
	},
	headerLeft: {
		name: "headerLeft (Show predefined content)",
		control: "boolean",
		table: {
			category: "Box",
		},
		if: {
			arg: "title",
			neq: "",
		},
	},
	headerRight: {
		name: "headerRight (Show predefined content)",
		control: "boolean",
		table: {
			category: "Box",
		},
		if: {
			arg: "title",
			neq: "",
		},
	},
	// BoxGroup properties
	isInline: {
		control: "boolean",
		table: {
			category: "BoxGroup",
		},
	},
	hasPadding: {
		control: "boolean",
		table: {
			category: "BoxGroup",
		},
	},
	isHeader: {
		control: "boolean",
		table: {
			category: "BoxGroup",
		},
		if: {
			arg: "isFooter",
			neq: true,
		},
	},
	isFooter: {
		control: "boolean",
		table: {
			category: "BoxGroup",
		},
		if: {
			arg: "isHeader",
			neq: true,
		},
	},
}

// Publish required stories
export { Playground }
