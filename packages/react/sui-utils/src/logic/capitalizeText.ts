/**
 * Capitalize text
 *
 * @param {string} string Text to be capitalized
 *
 * @return {string} Capitalize text
 */
export const capitalizeText = (string: string): string => {
	return string?.charAt(0)?.toUpperCase() + string?.slice(1)
}
