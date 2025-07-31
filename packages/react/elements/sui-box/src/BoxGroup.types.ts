import React, { CSSProperties, HTMLProps } from "react"
import { SuiHTMLAttributes, SuiStyleType } from "@wpmudev/sui-utils"

/**
 * Represents the properties for a box group component.
 */
interface BoxGroupProps
	extends SuiHTMLAttributes<HTMLProps<HTMLDivElement>>,
		SuiStyleType {
	/**
	 * Indicates whether the boxes should be displayed inline or not.
	 */
	isInline?: boolean
	/**
	 * Controls the horizontal padding within the container.
	 */
	hasPadding?: boolean
	/**
	 * Indicates whether the boxes should be displayed as header
	 * with a bottom border to indicate separation from the content below.
	 */
	isHeader?: boolean
	/**
	 * Indicates whether the boxes should be displayed as footer
	 * with a top border to indicate separation from the content above.
	 */
	isFooter?: boolean
	/**
	 * Box styles
	 */
	style?: CSSProperties
	/**
	 * The content of the box group.
	 */
	children?: React.ReactNode
}

export type { BoxGroupProps }
