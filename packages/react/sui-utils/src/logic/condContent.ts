import { isNull } from "../typeCheckers/isNull"

/**
 * Returns the `content` if the `condition` is truthy.
 * If `content` is null, it defaults to using `condition` as the output.
 * If the `condition` is falsy, returns the `fallback` instead.
 *
 * @param condition - The condition to evaluate.
 * @param content   - The value to return if the condition is truthy.
 * @param fallback  - The value to return if the condition is falsy.
 *
 * @return The content or fallback value based on the condition.
 */
export const condContent = (
	condition: unknown,
	content: unknown = null,
	fallback: unknown = undefined,
): any | undefined => {
	const resolvedContent = isNull(content) ? condition : content
	return Boolean(condition) ? resolvedContent : fallback
}
