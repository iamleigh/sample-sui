import React from "react"

import { SpinnerLoaderProps } from "./Spinner.types"
import { useStyles } from "@wpmudev/sui-hooks"
import { generateClassNames } from "@wpmudev/sui-utils"

/**
 * SpinnerLoader Component
 *
 * A simple SVG-based spinner used to indicate loading state.
 * It displays a circular loader with an optional stroke that animates when `isSpinning` is true.
 * @param root0
 * @param root0.isSpinning
 * @param root0._style
 */
const SpinnerLoader = ({ isSpinning, _style }: SpinnerLoaderProps) => {
	// Extract inline class name from the custom styles hook
	const { suiInlineClassname } = useStyles(_style)

	// Circle attributes used for both the background and stroke paths
	const attrs: Record<string, any> = {
		cx: "50%", // Center X of the circle
		cy: "50%", // Center Y of the circle
		r: 44, // Radius of the circle
	}

	// Render the SpinnerLoader component
	return (
		<div
			className={generateClassNames(
				"sui-spinner__loader",
				{},
				suiInlineClassname,
			)}
		>
			<svg className="sui-spinner__icon" viewBox="0 0 100 100">
				<title>loading</title>

				{/* Background ring (always visible) */}
				<circle className="sui-spinner__icon--background" {...attrs} />

				{/* Spinning stroke (conditionally rendered) */}
				{isSpinning && (
					<circle className="sui-spinner__icon--stroke" {...attrs} />
				)}
			</svg>
		</div>
	)
}

export { SpinnerLoader }
