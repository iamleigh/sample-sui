import { CSS_SHORTHAND_MAPS } from "./cssShorthandMap"
import { isNestedStyleProperty } from "./isNestedStyleProperty"

/**
 * Check if a key is valid CSS property
 *
 * @param {string}  prop             prop key
 * @param {boolean} value            value of the css rule
 * @param {boolean} includeShorthand include shorthand props
 */
/**
 * Checks if a CSS property is valid.
 *
 * This includes:
 * - Valid shorthand properties (if allowed)
 * - Nested properties like `@media` or `&:hover`
 * - Standard CSS properties supported by the browser
 *
 * @param prop             - The CSS property name (e.g., "color", "margin")
 * @param value            - The CSS value to validate (e.g., "red", "1rem")
 * @param includeShorthand - Whether to include shorthand validation (default: true)
 * @return True if the property is valid, false otherwise.
 */
export const isValidCSSRule = (
	prop: string,
	value: string,
	includeShorthand: boolean = true,
): boolean => {
	const isShorthand =
		includeShorthand && Object.keys(CSS_SHORTHAND_MAPS).includes(prop)

	if (isShorthand || isNestedStyleProperty(prop)) {
		return true
	}

	const isSupported = CSS.supports(prop, value)

	if (!isSupported) {
		// eslint-disable-next-line no-console
		console.error(`Invalid CSS rule in _style property:`, `"${prop}: ${value}"`)
	}

	return isSupported
}
