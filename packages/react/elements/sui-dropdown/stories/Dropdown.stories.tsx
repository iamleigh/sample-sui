import React from "react"
import { DropdownProps } from "../src/Dropdown.types"
import { MenuItemProps } from "../src/DropdownMenuItem.types"
import { MenuGroupProps } from "../src/DropdownMenuGroup.types"
import { Dropdown } from "../src"
import { IconsName } from "@wpmudev/sui-icons"
import { Box, BoxGroup } from "@wpmudev/sui-box"
import docs from "./Dropdown.mdx"

// Configure default options
export default {
	title: "SUI/Components/Advanced/Dropdown",
	component: Dropdown,
	parameters: {
		layout: "fullscreen",
		docs: {
			page: docs,
		},
	},
}

// Sample: Content
const ListContent = ({
	isEmpty = false,
	hasBorder = false,
	position = "bottom",
}: {
	isEmpty?: boolean
	hasBorder?: boolean
	position?: "top" | "bottom"
}) => {
	const boxStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		marginTop: hasBorder && position === "bottom" ? 8 : 0,
		marginBottom: hasBorder && position === "top" ? 8 : 0,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 16,
		paddingRight: 16,
		border: 0,
		borderTopWidth: hasBorder && position === "bottom" ? 1 : 0,
		borderBottomWidth: hasBorder && position === "top" ? 1 : 0,
		borderStyle: "solid",
		borderColor: "#DDD",
	}

	const titleStyle: React.CSSProperties = {
		marginBottom: 0,
		fontSize: 16,
	}

	const textStyle: React.CSSProperties = {
		margin: 0,
		fontSize: 14,
	}

	if (isEmpty) {
		return (
			<div style={boxStyle}>
				<h3 className="sui-color-error--50" style={titleStyle}>
					ERROR!
				</h3>
				<p style={textStyle}>
					The dropdown menu cannot be empty. Add menu items or custom content.
				</p>
			</div>
		)
	}

	return (
		<div style={boxStyle}>
			<h3 style={titleStyle}>John Doe</h3>
			<p style={textStyle}>johndoe@incsub.com</p>
		</div>
	)
}

// Sample: Simple Options
const listSimpleOptions: Array<MenuItemProps | MenuGroupProps> = [
	{
		id: "option-1",
		label: "Option One",
		props: {
			icon: "Logo",
			variable: "{option-1}",
			description: "Short description",
		},
	},
	{
		id: "option-2",
		label: "Option Two",
		props: {
			icon: "Roadmap",
			variable: "{option-2}",
			description: "Short description",
		},
	},
	{
		id: "option-3",
		label: "Option Three",
		props: {
			icon: "Download",
			variable: "{option-3}",
			description: "Short description",
		},
	},
	{
		id: "pro-beehive",
		label: "Unlock Pro Feature",
		props: {
			icon: "PluginBeehive",
			variation: "beehive",
			variable: "{option-4}",
			description: "Short description",
		},
	},
]

// Sample: Grouped Options
const listGroupedOptions: Array<MenuItemProps | MenuGroupProps> = [
	{
		id: "group-a",
		label: "Group A",
		menus: [
			{
				id: "option-a1",
				label: "Item A1",
				props: {
					icon: "Check",
					variable: "{option-a1}",
					description: "Short description",
				},
			},
			{
				id: "option-a2",
				label: "Item A2",
				props: {
					icon: "Check",
					variable: "{option-a2}",
					description: "Short description",
				},
			},
		],
	},
	{
		id: "group-b",
		label: "Group B",
		menus: [
			{
				id: "option-b1",
				label: "Item B1",
				props: {
					icon: "Check",
					variable: "{option-b1}",
					description: "Short description",
				},
			},
		],
	},
	{
		id: "group-c",
		label: "Group C",
		menus: [
			{
				id: "option-c1",
				label: "Item C1",
				props: {
					icon: "Check",
					variable: "{option-c1}",
					description: "Short description",
				},
			},
		],
	},
]

interface PlaygroundProps extends DropdownProps {
	menuDemo: "simple" | "grouped" | "content"
}

// Build "Dropdown" story
const Playground = (args: PlaygroundProps) => {
	const hasMenu = args.menuDemo.length > 0
	const hasListSimple = args.menuDemo.includes("simple")
	const hasListGrouped = args.menuDemo.includes("grouped")
	const hasLists = hasListSimple || hasListGrouped
	const showContent = args.menuDemo.includes("content")

	let menuList: Array<MenuItemProps | MenuGroupProps> = []

	menuList = []

	if (hasListSimple) {
		menuList = [...menuList, ...listSimpleOptions]
	}

	if (hasListGrouped) {
		menuList = [...menuList, ...listGroupedOptions]
	}

	const handleOption = (option: Record<string, any> | string) => {
		let message = `You clicked on: ${option["label"]}`

		if ("select-checkbox" === args.menuType) {
			const status = option["isSelected"] ? "selected" : "unselected"
			message = `You ${status} ${option["label"]}`
		}

		console.log(message)
	}

	const handleSearch = (query: string) => {
		const filtered = menuList.filter(
			(item) =>
				"label" in item &&
				typeof item.label === "string" &&
				item.label.toLowerCase().includes(query.toLowerCase()),
		)

		const results = query.length > 0 ? filtered.length : "ALL"

		console.log(`Search results: ${results}`)
	}

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<div className="sui-layout__content">
				<Box>
					<BoxGroup>
						<Dropdown
							label={args.label}
							colorScheme={args.colorScheme}
							{...(args.buttonIcon && { buttonIcon: args.buttonIcon })}
							iconOnly={args.iconOnly}
							hasArrow={args.hasArrow}
							isResponsive={args.isResponsive}
							isSmall={args.isSmall}
							isDisabled={args.isDisabled}
							isAutoClose={args.isAutoClose}
							{...(hasLists && { menu: menuList })}
							{...(args.menuType && { menuType: args.menuType })}
							menuWidth={args.menuWidth}
							menuPosition={args.menuPosition}
							menuSelectAll={args.menuSelectAll}
							menuContentAbove={args.menuContentAbove}
							onMenuItemClick={handleOption}
							{...(args.onMenuSearch && { onMenuSearch: handleSearch })}
							selected={[
								{
									id: "option-1",
									label: "Option One",
									props: {
										icon: "Logo",
										variable: "{option-1}",
										description: "Short description",
									},
								},
							]}
						>
							{showContent && (
								<ListContent
									hasBorder={hasLists}
									position={args.menuContentAbove ? "top" : "bottom"}
								/>
							)}
							{!hasMenu && <ListContent isEmpty={true} />}
						</Dropdown>
					</BoxGroup>
				</Box>
			</div>
		</div>
	)
}

Playground.args = {
	label: "Select",
	colorScheme: "black",
	buttonIcon: "",
	iconOnly: false,
	hasArrow: true,
	isResponsive: false,
	isSmall: false,
	isAutoClose: true,
	isDisabled: false,
	menuDemo: "simple",
	menuType: "",
	menuWidth: "md",
	menuPosition: "right",
	menuSelectAll: false,
	menuContentAbove: false,
	onMenuSearch: false,
}

Playground.argTypes = {
	colorScheme: {
		options: ["", "blue", "black", "red", "navy", "white"],
		control: {
			type: "select",
			labels: {
				"": "-",
				blue: "Blue",
				black: "Black",
				red: "Red",
				navy: "Navy",
				white: "White",
			},
		},
	},
	buttonIcon: {
		options: [""].concat(IconsName),
		control: {
			type: "select",
			labels: {
				"": "-",
			},
		},
	},
	iconOnly: {
		if: {
			arg: "buttonIcon",
			neq: "",
		},
	},
	hasArrow: {
		if: {
			arg: "iconOnly",
			truthy: false,
		},
	},
	isResponsive: {
		if: {
			arg: "buttonIcon",
			neq: "",
		},
	},
	menuDemo: {
		name: "menu (Use predefined options)",
		options: ["simple", "grouped", "content"],
		control: {
			type: "inline-check",
			labels: {
				simple: "Simple Options",
				grouped: "Grouped Options",
				content: "Content",
			},
		},
	},
	menuType: {
		options: ["", "select-checkbox", "select-variable"],
		control: {
			type: "inline-radio",
			labels: {
				"": "Select",
				"select-checkbox": "Select + Checkbox",
				"select-variable": "Select + Variable",
			},
		},
	},
	menuWidth: {
		options: ["sm", "md", "lg"],
		control: {
			type: "inline-radio",
			labels: {
				sm: "Small",
				md: "Medium (Default)",
				lg: "Large",
			},
		},
	},
	menuPosition: {
		options: ["left", "right"],
		control: {
			type: "inline-radio",
			labels: {
				left: "Left",
				right: "Right",
			},
		},
	},
	menuSelectAll: {
		if: {
			arg: "menuType",
			eq: "select-checkbox",
		},
	},
	onMenuSearch: {
		name: "onMenuSearch (Use predefined function)",
	},
}

// Publish required stories
export { Playground }
