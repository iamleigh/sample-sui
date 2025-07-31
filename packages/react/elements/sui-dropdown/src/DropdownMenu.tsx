import React from "react"
import { generateClassNames } from "@wpmudev/sui-utils"
import { useStyles } from "@wpmudev/sui-hooks"
import { DropdownMenuProps } from "./DropdownMenu.types"

// Build "Dropdown Menu" component
const DropdownMenu: React.FC<DropdownMenuProps> = ({
	className = "",
	children,
	_style = {},
}) => {
	const { suiInlineClassname } = useStyles(_style, className)
	const classNames = generateClassNames(
		"sui-dropdown__menu",
		{},
		suiInlineClassname,
	)

	// Render the Menu component with the provided children
	return <div className={classNames}>{children}</div>
}

// Export required component(s)
export { DropdownMenu }
