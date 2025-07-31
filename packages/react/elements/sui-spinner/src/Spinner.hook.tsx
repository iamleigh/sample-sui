import React, { Fragment, RefObject, useEffect, useId, useState } from "react"
import { createRoot } from "react-dom/client"

import { Spinner } from "./Spinner"
import { SpinnerHook, SpinnerProps } from "./Spinner.types"

/**
 * Custom hook to handle rendering a spinner overlay on a target element.
 *
 * @param targetRef          - A ref to the DOM element where the spinner should appear.
 * @param config             - Configuration options for the spinner: `colorScheme` and `loaderSize`.
 * @param config.colorScheme
 * @param config.loaderSize
 * @return An object with `show`, `hide`, and `isVisible` properties to control the spinner.
 */
const useSpinner = (
	targetRef: RefObject<HTMLDivElement>,
	{ colorScheme, loaderSize }: Pick<SpinnerProps, "loaderSize" | "colorScheme">,
): SpinnerHook => {
	// Tracks whether the spinner should be visible or not
	const [isVisible, setIsVisible] = useState<boolean>(false)

	// Unique ID used to identify the spinner DOM element
	const id = useId()
	const spinnerId = `sui-spinner-${id}`

	useEffect(() => {
		const currentTargetRef = targetRef?.current

		// Exit early if the target DOM element is not available
		if (!currentTargetRef) {
			return
		}

		// Remove the spinner if it's currently hidden
		if (!isVisible) {
			const spinnerDiv = document.getElementById(spinnerId)

			if (!!spinnerDiv?.parentNode) {
				currentTargetRef.removeChild(spinnerDiv)
				currentTargetRef.classList.remove("sui-spinner__wrapper")
			}
			return
		}

		// Create a temporary container to render the spinner
		const fakeDiv = document.createElement("div")

		if (isVisible) {
			fakeDiv.id = spinnerId
			fakeDiv.classList.add("sui-spinner__fake")

			// Mark the container element for styling
			currentTargetRef.classList.add("sui-spinner__wrapper")

			// Mount the Spinner component inside the container using React's createRoot API
			createRoot(fakeDiv!).render(
				<Fragment>
					<div
						className={`sui-spinner__overlay sui-spinner__overlay--${colorScheme}`}
					/>
					<Spinner
						colorScheme={colorScheme}
						loaderSize={loaderSize}
						isAbsolute={true}
					/>
				</Fragment>,
			)

			// Attach the spinner container to the target element
			targetRef.current.appendChild(fakeDiv)
		}

		// Cleanup function:
		// Remove spinner when component unmounts or deps change
		return () => {
			if (fakeDiv) {
				const spinnerDiv = document.getElementById(spinnerId)
				if (!!spinnerDiv?.parentNode) {
					currentTargetRef?.removeChild(spinnerDiv)
					currentTargetRef?.classList.remove("sui-spinner__wrapper")
				}
			}
		}
	}, [colorScheme, loaderSize, targetRef, isVisible, spinnerId])

	// Public function to show the spinner
	const show = () => setIsVisible(true)

	// Public function to hide the spinner
	const hide = () => setIsVisible(false)

	// Return hook API
	return { show, hide, isVisible }
}

export { useSpinner }
