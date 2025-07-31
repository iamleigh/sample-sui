import React, { HTMLProps } from "react"
import {
	OmitNestedKey,
	SuiHTMLAttributes,
	SuiStyleType,
} from "@wpmudev/sui-utils"
import { DropdownMenuBaseProps } from "./DropdownMenuBase.types"
import { MenuItemProps } from "./DropdownMenuItem.types"

/**
 * Props for the DropdownMenuGroup component.
 *
 * Represents a group of related menu items within a dropdown.
 * Groups can have a title, optional link behavior, and contain
 * multiple `DropdownMenuItem` elements or custom React nodes.
 */
interface DropdownMenuGroupProps
	extends OmitNestedKey<
			SuiHTMLAttributes<HTMLProps<HTMLLIElement>>,
			"_htmlProps",
			"className" | "title" | "href"
		>,
		SuiStyleType {
	/**
	 * Title text displayed at the top of the menu group.
	 * Provides context for the items contained in this group.
	 */
	title: string

	/**
	 * Optional URL for the menu group to act as a navigation link.
	 * If provided, clicking the group will navigate to this URL.
	 */
	href?: string

	/**
	 * Custom class name(s) applied to the menu group container
	 * for styling or layout overrides.
	 */
	className?: string

	/**
	 * The content of the menu group.
	 *
	 * Typically consists of one or more `DropdownMenuItem` elements,
	 * but can include any valid React nodes.
	 */
	children?: React.ReactNode
}

/**
 * Props for a group of dropdown menu items.
 *
 * Represents a logical collection of `DropdownMenuItem` elements
 * within a group container. Each group can define its own set of items
 * while sharing common base props for consistency.
 */
interface MenuGroupProps extends DropdownMenuBaseProps {
	/**
	 * The list of menu items included in this group.
	 *
	 * Each item must conform to the `MenuItemProps` interface.
	 */
	menus: Array<MenuItemProps>
}

export type { DropdownMenuGroupProps, MenuGroupProps }
