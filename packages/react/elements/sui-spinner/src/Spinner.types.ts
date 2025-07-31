import { RefObject, HTMLProps } from "react"
import { SuiHTMLAttributes, SuiStyleType } from "@wpmudev/sui-utils"

/**
 * Props available for the `<Spinner />` component.
 */
interface SpinnerProps
	extends SuiStyleType,
		SuiHTMLAttributes<HTMLProps<HTMLDivElement>> {
	/**
	 * Sets the visual size of the spinner.
	 * - "xs" = extra small
	 * - "sm" = small
	 * - "lg" = large
	 */
	loaderSize?: "xs" | "sm" | "lg"

	/**
	 * Defines the color theme of the spinner.
	 * Accepts preset tokens: "primary", "dark", "white", or "gray".
	 */
	colorScheme?: "primary" | "dark" | "white" | "gray"

	/**
	 * If true, positions the spinner absolutely within its container.
	 */
	isAbsolute?: boolean

	/**
	 * If true, wraps the spinner inside a container with a fixed height (500px).
	 * Useful for centering vertically within sections.
	 */
	isContained?: boolean

	/**
	 * Controls whether the spinner is spinning or hidden.
	 */
	isSpinning?: boolean
}

/**
 * Props used internally by the SpinnerLoader subcomponent.
 * These are derived from SpinnerProps and used for rendering logic.
 */
interface SpinnerLoaderProps extends SuiStyleType {
	loaderSize: SpinnerProps["loaderSize"]
	colorScheme: SpinnerProps["colorScheme"]
	isSpinning: SpinnerProps["isSpinning"]
}

/**
 * Props for configuring the `useSpinner` hook,
 * which attaches spinner logic to a DOM element.
 */
interface SpinnerHookProps {
	/**
	 * Reference to the DOM node where the spinner will be mounted or controlled.
	 */
	targetRef: RefObject<any>

	/**
	 * Configuration object for hook behavior (animation, delay, etc.).
	 */
	options: Record<string, any>
}

/**
 * Return type of the `useSpinner` hook.
 * Provides programmatic control of a spinner instance.
 */
interface SpinnerHook {
	/**
	 * Triggers the spinner to become visible.
	 */
	show: () => void

	/**
	 * Hides the spinner from view.
	 */
	hide: () => void

	/**
	 * Indicates whether the spinner is currently displayed.
	 */
	isVisible: boolean
}

export type { SpinnerProps, SpinnerLoaderProps, SpinnerHookProps, SpinnerHook }
