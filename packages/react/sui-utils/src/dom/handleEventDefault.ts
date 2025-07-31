import { MouseEvent, KeyboardEvent } from "react"

type HandleEventDefault = (
	e: MouseEvent<unknown> | KeyboardEvent<unknown>,
	stopPropagation?: boolean,
	preventDefault?: boolean,
) => void

/**
 * Handles common event operations like stopping propagation and preventing default behavior.
 *
 * @param e               - The event object.
 * @param stopPropagation - If true, stops the event from further propagation in the event chain.
 * @param preventDefault  - If true, prevents the default behavior associated with the event.
 */
export const handleEventDefault: HandleEventDefault = (
	e,
	stopPropagation,
	preventDefault,
) => {
	if (stopPropagation) {
		e?.stopPropagation()
	}

	if (preventDefault) {
		e?.preventDefault()
	}
}
