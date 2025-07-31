import React from "react"
import { SuiStyleType } from "@wpmudev/sui-utils"

/**
 * Base props shared across dropdown menu items and groups.
 *
 * These props provide common fields used by both `DropdownMenuItem`
 * and `DropdownMenuGroup` components, ensuring consistency across
 * all dropdown menu elements.
 */
interface DropdownMenuBaseProps extends SuiStyleType {
	/**
	 * Unique identifier for the dropdown menu item.
	 * Used to track selection state and manage interactions.
	 */
	id: string | number

	/**
	 * The primary label displayed for the menu item.
	 * Can be plain text or a custom React node.
	 */
	label: React.ReactNode | string

	/**
	 * Optional variable or value displayed alongside the label.
	 * Useful for showing counts, tags, or secondary context.
	 */
	variable?: string

	/**
	 * Optional description text providing additional context
	 * or supporting details about the menu item.
	 */
	description?: string

	/**
	 * Indicates whether the menu item is currently selected.
	 * Used for visual highlighting and state management.
	 */
	isSelected?: boolean
}

export type { DropdownMenuBaseProps }
