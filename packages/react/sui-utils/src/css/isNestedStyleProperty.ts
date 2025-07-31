/**
 * Check if a key is a nested style property
 *
 * @param  name prop key
 * @return {boolean} Returns true if key is a nested style property
 */
export const isNestedStyleProperty = (name: string) => {
	return name.startsWith("&") || name.startsWith("@media ")
}
