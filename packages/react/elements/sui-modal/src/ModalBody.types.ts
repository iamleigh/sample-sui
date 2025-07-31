import React, { HTMLProps } from "react"
import { SuiHTMLAttributes, SuiStyleType } from "@wpmudev/sui-utils"

/**
 * Props for the ModalBody component.
 *
 * Defines the configuration and content for the body section of a Modal.
 * Typically used to display the main content within a modal dialog.
 *
 * Extends base styling and HTML attributes to allow customization
 * while maintaining consistency with the design system.
 */
interface ModalBodyProps
	extends SuiStyleType,
		SuiHTMLAttributes<HTMLProps<HTMLDivElement>> {
	/**
	 * Content to be displayed within the modal body.
	 *
	 * Accepts any valid React nodes, such as text, form elements,
	 * or custom components. Typically represents the main content
	 * of the modal dialog.
	 */
	children?: React.ReactNode
}

export type { ModalBodyProps }
