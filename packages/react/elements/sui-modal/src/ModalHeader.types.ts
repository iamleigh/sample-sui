import React, { HTMLProps } from "react"
import { IconsNamesType } from "@wpmudev/sui-icons"
import { SuiHTMLAttributes, SuiStyleType } from "@wpmudev/sui-utils"

/**
 * Props for the ModalHeader component.
 *
 * Defines the configuration and content for the header section of a Modal.
 * Commonly used to display a title, an optional icon, and a close button.
 *
 * Extends base style and HTML attribute support for flexible customization
 * while maintaining consistency with the design system.
 */
interface ModalHeaderProps
	extends SuiStyleType,
		SuiHTMLAttributes<HTMLProps<HTMLDivElement>> {
	/**
	 * The main title text displayed in the modal header.
	 */
	title: string

	/**
	 * The name of an icon to display within the modal header.
	 * Typically used to add visual context to the title.
	 */
	icon?: IconsNamesType

	/**
	 * The size of the header icon.
	 *
	 * @default "md"
	 */
	iconSize?: "xms" | "xs" | "sm" | "md" | "lg" | "xl"

	/**
	 * The color scheme applied to the header icon.
	 * Supports semantic variants for consistent theming.
	 */
	iconColor?:
		| ""
		| "neutral"
		| "informative"
		| "success"
		| "warning"
		| "critical"

	/**
	 * Optional logo image URL to display within the modal header.
	 *
	 * Typically used to reinforce brand identity or context alongside
	 * the modal title and icon. Accepts a valid image URL string.
	 */
	logo?: string

	/**
	 * Whether to display a close button in the header.
	 * Provides users with an easy way to dismiss the modal.
	 *
	 * @default false
	 */
	hasCloseButton?: boolean

	/**
	 * Optional custom React nodes to render in place of or alongside the title.
	 * Useful for including complex content such as styled text or actions.
	 */
	children?: React.ReactNode
}

export type { ModalHeaderProps }
