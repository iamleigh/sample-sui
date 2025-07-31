/**
 * Check if value is number
 *
 * @param  value Value to be checked
 *
 * @return {boolean} Returns true if value is number
 */
export const isNumber = (value: unknown): boolean => {
	return "number" === typeof value || !Number.isNaN(value)
}
