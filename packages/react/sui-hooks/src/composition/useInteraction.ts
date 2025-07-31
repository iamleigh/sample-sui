import { HTMLProps, useCallback, useState } from "react"

interface InteractionTypes
	extends Pick<
		HTMLProps<HTMLElement>,
		| "onMouseEnter"
		| "onMouseLeave"
		| "onMouseDownCapture"
		| "onMouseUp"
		| "onMouseUpCapture"
		| "onFocus"
		| "onBlur"
		| "onBlurCapture"
	> {}

// Use separate event types
type MouseEvt<T> = React.MouseEvent<T>
type FocusEvt<T> = React.FocusEvent<T>

/**
 * useInteraction hook – Provides hover/focus state tracking and custom event passthrough
 *
 * @template T - The HTMLElement type being tracked (defaults to HTMLButtonElement)
 * @param {Partial<InteractionTypes>} methods - Optional custom event handlers to merge
 * @return {const} - [isHovered, isFocused, interactionHandlers, toggleHover, toggleFocus]
 */
const useInteraction = <T extends HTMLElement = HTMLButtonElement>(
	methods: Partial<InteractionTypes> = {},
) => {
	const [isHovered, setIsHovered] = useState(false)
	const [isFocused, setIsFocused] = useState(false)

	const {
		onMouseEnter,
		onMouseLeave,
		onMouseDownCapture,
		onMouseUp,
		onMouseUpCapture,
		onFocus,
		onBlur,
		onBlurCapture,
	} = methods

	// 🔁 Handle hover toggle
	const toggleHover = useCallback((state: boolean) => {
		setIsHovered(state)
	}, [])

	// 🔁 Handle focus toggle
	const toggleFocus = useCallback((state: boolean) => {
		setIsFocused(state)
	}, [])

	const onMouseUpCallback = useCallback(
		(e: MouseEvt<T>) => {
			e.currentTarget.focus()
			toggleFocus(true)
			onMouseUp?.(e)
		},
		[onMouseUp, toggleFocus],
	)

	const onMouseEnterCallback = useCallback(
		(e: MouseEvt<T>) => {
			toggleHover(true)
			onMouseEnter?.(e)
		},
		[onMouseEnter, toggleHover],
	)

	const onMouseLeaveCallback = useCallback(
		(e: MouseEvt<T>) => {
			toggleHover(false)
			onMouseLeave?.(e)
		},
		[onMouseLeave, toggleHover],
	)

	const onMouseDownCaptureCallback = useCallback(
		(e: MouseEvt<T>) => {
			toggleFocus(false)
			onMouseDownCapture?.(e)
		},
		[onMouseDownCapture, toggleFocus],
	)

	const onMouseUpCaptureCallback = useCallback(
		(e: MouseEvt<T>) => {
			toggleFocus(true)
			onMouseUpCapture?.(e)
		},
		[onMouseUpCapture, toggleFocus],
	)

	const onFocusCallback = useCallback(
		(e: FocusEvt<T>) => {
			toggleFocus(true)
			onFocus?.(e)
		},
		[onFocus, toggleFocus],
	)

	const onBlurCallback = useCallback(
		(e: FocusEvt<T>) => {
			toggleFocus(false)
			onBlur?.(e)
		},
		[onBlur, toggleFocus],
	)

	const onBlurCaptureCallback = useCallback(
		(e: FocusEvt<T>) => {
			toggleHover(false)
			onBlurCapture?.(e)
		},
		[onBlurCapture, toggleHover],
	)

	return [
		isHovered,
		isFocused,
		{
			onMouseUp: onMouseUpCallback,
			onMouseEnter: onMouseEnterCallback,
			onMouseLeave: onMouseLeaveCallback,
			onMouseDownCapture: onMouseDownCaptureCallback,
			onMouseUpCapture: onMouseUpCaptureCallback,
			onFocus: onFocusCallback,
			onBlur: onBlurCallback,
			onBlurCapture: onBlurCaptureCallback,
		},
		toggleHover,
		toggleFocus,
	] as const
}

export { useInteraction }
export type { InteractionTypes }
