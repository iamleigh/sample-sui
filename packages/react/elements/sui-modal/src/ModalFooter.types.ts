import React, { HTMLProps } from "react"
import { SuiHTMLAttributes, SuiStyleType } from "@wpmudev/sui-utils"

/**
 * Props for the ModalFooter component.
 *
 * Defines configuration and content for the footer section of a Modal.
 * Typically used to display action buttons (e.g., Save, Cancel) or
 * other contextual controls at the bottom of the modal dialog.
 *
 * Extends base style and HTML attribute support for flexible customization.
 */
interface ModalFooterProps
	extends SuiStyleType,
		SuiHTMLAttributes<HTMLProps<HTMLDivElement>> {
	/**
	 * Adds consistent spacing between footer items, such as buttons or controls.
	 * Useful for ensuring proper visual separation of actions.
	 *
	 * @default false
	 */
	isSpaced?: boolean

	/**
	 * The content to be displayed within the modal footer.
	 *
	 * Accepts any valid React nodes, typically one or more buttons
	 * or custom components that perform modal actions.
	 */
	children?: React.ReactNode
}

export type { ModalFooterProps }
