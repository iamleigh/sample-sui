/**
 * Check if variable is function
 *
 * @param {unknown} value Value to be checked
 * @return {boolean} Returns true if variable is function
 */
export const isFunction = (value: unknown): boolean =>
	"function" === typeof value
