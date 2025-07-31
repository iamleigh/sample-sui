/**
 * Check if value is undefined
 *
 * @param {unknown} value
 *
 * @return {boolean} True if value is undefined
 */
export const isUndefined = (value: unknown): boolean =>
	"undefined" === typeof value
