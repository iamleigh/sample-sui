import React, { HTMLProps } from "react"

import { _renderHTMLPropsSafely, generateClassNames } from "@wpmudev/sui-utils"
import { useStyles } from "@wpmudev/sui-hooks"
import { DropdownMenuGroupProps } from "./DropdownMenuGroup.types"

// Build "Dropdown Menu Group" component
const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = ({
	title = "",
	className = "",
	children,
	_htmlProps = {},
	_style = {},
}) => {
	const { suiInlineClassname } = useStyles(_style, className)
	// Generate class names for the menu group
	const classNames = generateClassNames(
		"sui-dropdown__menu-group",
		{},
		suiInlineClassname,
	)

	// Prepare attributes for the menu group element
	const attrs = {
		className: classNames,
		..._renderHTMLPropsSafely(_htmlProps),
	}

	return (
		<li {...(attrs as HTMLProps<HTMLLIElement>)}>
			<span className="sui-dropdown__menu-group-title">{title}</span>
			<ul className="sui-dropdown__menu-group-items">{children}</ul>
		</li>
	)
}

// Export required component(s)
export { DropdownMenuGroup }
