/**
 * Check if value is an object
 *
 * @param {unknown} value value to be checked
 *
 * @return {boolean} returns True if value is an object type
 */
export const isObject = (value: unknown): boolean => {
	return "object" === typeof value && !Array.isArray(value)
}
