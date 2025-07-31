import { KeyboardEvent } from "react"

type HandleKeyDown = (
	e: KeyboardEvent<HTMLDivElement | HTMLSpanElement>,
	callback?: ((event?: any) => void) | undefined,
) => void

/**
 * Use this for onKeyDown callback when making a div or span element clickable.
 *
 * Triggers the callback when Enter or Space is pressed.
 *
 * @param e
 * @param callback
 */
export const handleOnKeyDown: HandleKeyDown = (e, callback) => {
	if ("Enter" === e.key || " " === e.key) {
		if (callback) {
			callback(e)
		}
	}
}
