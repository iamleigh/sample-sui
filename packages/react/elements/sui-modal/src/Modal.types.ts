import React from "react"
import { SuiHTMLAttributes, SuiStyleType } from "@wpmudev/sui-utils"

/**
 * Props for the main Modal component.
 *
 * Defines the configuration, appearance, and behavior of a Modal dialog.
 * Supports customization of size, variant, styling, and content, while
 * also providing a ref for programmatic control.
 */
type ModalProps = {
	/**
	 * Unique identifier for the modal element.
	 * Useful for testing or when multiple modals are present.
	 */
	id: string

	/**
	 * Size of the modal.
	 * Determines width and layout breakpoints.
	 * - "sm": Small
	 * - "md": Medium
	 * - "lg": Large
	 * - "xl": Extra large
	 *
	 * @default "md"
	 */
	size?: "sm" | "md" | "lg" | "xl"

	/**
	 * Visual style variant of the modal.
	 * - "simple": Minimal styling for lightweight content.
	 * - "advanced": Enhanced modal layout with more structure.
	 * - "app-connect": Styled variant for app integration flows.
	 *
	 * @default "simple"
	 */
	variant?: "simple" | "advanced" | "app-connect"

	/**
	 * Ref object allowing programmatic control of the modal.
	 * Provides access to methods for opening or closing the modal.
	 */
	ref: object

	/**
	 * Callback function invoked when the modal is closed.
	 * Can be used to trigger cleanup logic or state updates in the parent.
	 */
	onCloseModal?: () => void

	/**
	 * Content to be displayed within the modal.
	 * Accepts any valid React nodes such as text, forms, or custom components.
	 */
	children?: React.ReactNode
} & SuiStyleType &
	SuiHTMLAttributes

/**
 * Actions exposed through the Modal context for programmatic control.
 *
 * Provides imperative handlers to open and close the modal,
 * making them accessible to nested modal components.
 */
type ModalActionsProps = {
	/**
	 * Opens the modal dialog.
	 */
	openModal: () => void

	/**
	 * Closes the modal dialog.
	 */
	closeModal: () => void
}

export type { ModalProps, ModalActionsProps }
