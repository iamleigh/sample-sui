// Check if element is undefined or invalid (handles numbers too)
export const isUndefined = (element: unknown, isNumber = false) => {
	const isValid = "undefined" !== typeof element
	const isNotEmpty = "" !== element

	if (element && isValid && isNotEmpty) {
		if (isNumber) {
			if (Number.isNaN(element)) {
				return false
			}
		} else {
			return false
		}
	}

	return true
}
