import React from "react"
import { _renderHTMLPropsSafely } from "@wpmudev/sui-utils"

/**
 * ✅ Tick Icon
 *
 * This icon represents the **checked** state of the checkbox.
 *
 * @param props - HTML props to pass to the wrapper element
 * @return JSX.Element containing the tick SVG
 */
const Tick = ({ ...props }) => (
	<span {..._renderHTMLPropsSafely(props)}>
		<svg viewBox="0 0 12 10" fill="none" className="sui-checkbox__icon">
			<path d="M4.23784 9.08831L0.337838 5.16588C0.103533 4.93023 0.103533 4.54815 0.337838 4.31247L1.18635 3.45906C1.42065 3.22338 1.80057 3.22338 2.03488 3.45906L4.66211 6.10137L9.96507 0.91168C10.1994 0.676028 10.5793 0.676028 10.8136 0.91168L11.6621 1.76509C11.8964 2.00074 11.8964 2.38283 11.6621 2.6185L5.08637 9.08833C4.85205 9.32398 4.47215 9.32398 4.23784 9.08831Z" />
		</svg>
	</span>
)

/**
 * ➖ Unknown Icon (Undetermined)
 *
 * This icon represents the **indeterminate** state of the checkbox.
 *
 * @param props - HTML props to pass to the wrapper element
 * @return JSX.Element containing the indeterminate SVG
 */
const Unknown = ({ ...props }) => (
	<span {..._renderHTMLPropsSafely(props)}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="10"
			height="2"
			viewBox="-1 0 12 3"
			fill="none"
			className="sui-checkbox__icon"
		>
			<path
				d="M9.7 0H0.3C0.134315 0 0 0.134315 0 0.3V1.7C0 1.86569 0.134315 2 0.3 2H9.7C9.86569 2 10 1.86569 10 1.7V0.3C10 0.134315 9.86569 0 9.7 0Z"
				fill="white"
			/>
		</svg>
	</span>
)

export { Tick, Unknown }
