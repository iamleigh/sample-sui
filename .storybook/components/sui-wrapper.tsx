import React, { useState, useEffect } from "react"
import { WordPress } from "./wordpress"

import "../../packages/assets/sui-css/src/scss/sui-css.scss"
import "../../packages/assets/sui-icons/src/scss/sui-icons.scss"

/**
 * SUI Theme & Layout Wrapper for Storybook stories
 *
 * Applies the selected theme and text direction (LTR or RTL) from Storybook globals,
 * and wraps children in WordPress-like layout.
 */
export const SuiWrapper = ({ children, context }) => {
	// Extract global values from Storybook (theme and direction)
	const { theme, direction } = context.globals

	// State to store and manage the active SUI theme (light/dark)
	const [suitheme, setSuiTheme] = useState(theme || "light")

	// Update the theme class when the global theme value changes
	useEffect(() => {
		setSuiTheme(theme || "light")
	}, [theme])

	// Update document direction (rtl or ltr) based on the global context
	useEffect(() => {
		if (direction) {
			// Apply direction to <body> and <html>
			document.body.classList.add(direction)
			document.documentElement.dir = direction

			// Cleanup on unmount or direction change
			return () => {
				document.body.classList.remove(direction)
				document.documentElement.dir = ""
			}
		}
	}, [direction])

	return (
		<WordPress>
			<div id="sui-wrap" className={`sui-wrap sui-theme--${suitheme}`}>
				{children}
			</div>
		</WordPress>
	)
}
