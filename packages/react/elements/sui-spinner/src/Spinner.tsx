import React from "react"

import {
	_renderHTMLPropsSafely,
	generateClassNames,
	isEmpty,
} from "@wpmudev/sui-utils"
import { useStyles } from "@wpmudev/sui-hooks"

import { SpinnerProps } from "./Spinner.types"
import { SpinnerLoader } from "./SpinnerLoader"

/**
 * Spinner Component
 *
 * Displays a loading spinner with support for size, color scheme,
 * containment style, and positioning options.
 * @param root0
 * @param root0.loaderSize
 * @param root0.colorScheme
 * @param root0.isContained
 * @param root0.isAbsolute
 * @param root0.isSpinning
 * @param root0._htmlProps
 * @param root0._style
 */
const Spinner: React.FC<SpinnerProps> = ({
	loaderSize = "lg", // Spinner size: xs | sm | md | lg
	colorScheme = "primary", // Color theme (e.g., primary, neutral, etc.)
	isContained = false, // If true, spinner is styled as contained
	isAbsolute = false, // If true, spinner is absolutely positioned
	isSpinning = true, // Controls whether the spinner animates
	_htmlProps = {}, // Additional safe HTML attributes
	_style = {}, // Custom inline styles passed to `useStyles`
}) => {
	const { suiInlineClassname } = useStyles(_style)

	// Compute dynamic class names for the spinner container
	const classNames = generateClassNames(
		"sui-spinner",
		{
			absolute: isAbsolute,
			[loaderSize]: !isEmpty(loaderSize ?? ""),
			[colorScheme]: !isEmpty(colorScheme) && colorScheme !== "primary",
			contained: isContained,
			inactive: !isSpinning,
		},
		suiInlineClassname,
	)

	return (
		<div
			className={classNames}
			data-testid="spinner"
			{..._renderHTMLPropsSafely(_htmlProps)}
		>
			<SpinnerLoader
				colorScheme={colorScheme}
				loaderSize={loaderSize ?? "lg"}
				isSpinning={isSpinning}
			/>
		</div>
	)
}

export { Spinner }
