import React from "react"
import { SuiStyleType } from "@wpmudev/sui-utils"

/**
 * Props for the DropdownMenu component.
 *
 * Defines the configuration options for rendering a dropdown menu container,
 * including optional styling overrides and custom child elements.
 */
interface DropdownMenuProps extends SuiStyleType {
	/**
	 * Optional class name(s) applied to the DropdownMenu container
	 * for custom styling or layout overrides.
	 */
	className?: string

	/**
	 * The content to be displayed within the DropdownMenu.
	 *
	 * Typically consists of one or more `DropdownMenuItem` or custom React nodes.
	 */
	children?: React.ReactNode
}

export type { DropdownMenuProps }
