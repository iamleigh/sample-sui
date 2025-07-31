import React, { KeyboardEvent, ReactNode } from "react"
import { SuiHTMLAttributes, SuiStyleType } from "@wpmudev/sui-utils"
import { IconsNamesType } from "@wpmudev/sui-icons"
import { CheckboxProps } from "@wpmudev/sui-checkbox"
import { DropdownProps } from "./Dropdown.types"
import { DropdownMenuBaseProps } from "./DropdownMenuBase.types"

/**
 * Props for the DropdownMenuItem component.
 *
 * Defines the configuration and behavior of an individual item within a dropdown menu.
 * Supports variations for navigation links, checkbox selection, icon display, and custom content.
 */
interface DropdownMenuItemProps extends SuiStyleType, SuiHTMLAttributes {
	/**
	 * Internal type of the menu item, inherited from the parent Dropdown `menuType`.
	 * Used to determine rendering style and interaction mode.
	 * @internal
	 */
	_type?: DropdownProps["menuType"]

	/**
	 * URL to navigate to when the item is clicked (if the item is an anchor).
	 */
	href?: string

	/**
	 * Name of the icon to be displayed with the MenuItem.
	 */
	icon?: IconsNamesType

	/**
	 * Additional class name(s) to be applied to the MenuItem.
	 */
	className?: string

	/**
	 * Disables the menu item, preventing user interaction.
	 */
	isDisabled?: boolean

	/**
	 * Indicates whether this menu item is currently selected.
	 * Useful for highlighting or marking the active option.
	 */
	isSelected?: boolean

	/**
	 * Visual variation of the menu item, typically used for brand-specific styling.
	 */
	variation?:
		| "hummingbird"
		| "smush"
		| "snapshot"
		| "smartcrawl"
		| "shipper"
		| "ivt"
		| "hustle"
		| "forminator"
		| "defender"
		| "branda"
		| "beehive"
		| "danger"

	/**
	 * Function to be called when the MenuItem is clicked.
	 *
	 * @param e The click event object.
	 */
	onClick?: (e?: KeyboardEvent) => void

	/**
	 * Children elements to be rendered inside the MenuItem.
	 */
	children?: React.ReactNode

	/**
	 * Specifies where the linked document should be opened when the user clicks on the hyperlink.
	 */
	target?: "_blank" | "_self" | "_parent" | "_top" | string

	/**
	 * Used in "select-checkbox" mode
	 */
	isChecked?: boolean

	/**
	 * Custom content to display as a variable or value for this menu item.
	 */
	variable?: ReactNode | string

	/**
	 * Optional description text to provide additional context for the menu item.
	 */
	description?: string

	/**
	 * Additional props to be forwarded to the underlying Checkbox when
	 * the dropdown is in `select-checkbox` mode.
	 * @internal
	 */
	_checkboxProps?: CheckboxProps

	/**
	 * Color scheme applied to the menu item for contextual styling.
	 */
	colorScheme?: "default" | "red" | "green" | "yellow" | "blue"
}

/**
 * Extended menu item props used internally by the Dropdown component.
 *
 * Combines base menu item fields with additional props for
 * fine-grained control of rendering and checkbox behavior.
 */
interface MenuItemProps extends DropdownMenuBaseProps {
	/**
	 * Additional props to configure the underlying DropdownMenuItem,
	 * excluding children which are passed directly.
	 */
	props?: Omit<DropdownMenuItemProps, "children"> & {
		/** Checkbox-specific configuration when using "select-checkbox" mode. */
		_checkboxProps?: CheckboxProps
	}
}

export type { DropdownMenuItemProps, MenuItemProps }
