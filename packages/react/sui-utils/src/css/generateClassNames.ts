import classnames from "classnames"

/**
 * Generate class names based on the prop variables.
 *
 * @param {string}              base
 * @param {Record<string, any>} variants
 * @param {string}              extraClassNames extra class names
 *
 * @return {string} - The generated class names.
 */
export const generateClassNames = (
	base: string,
	variants: Record<string, any> = {},
	extraClassNames: string = "",
): string => {
	const variantClasses: Record<string, boolean> = {}

	Object.keys(variants).forEach((key) => {
		if (variants[key]) {
			const className = base ? `${base}--${key}` : key
			variantClasses[className] = true
		}
	})

	return classnames(base, variantClasses, extraClassNames)
}
