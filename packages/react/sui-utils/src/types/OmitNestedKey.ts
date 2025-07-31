/**
 * Omit a nested key from a specific key in an object type.
 *
 * @template T - The original object type
 * @template K - The key in T whose nested key will be omitted
 * @template NK - The nested key to omit from T[K]
 */
export type OmitNestedKey<
	T,
	K extends keyof T,
	NK extends keyof NonNullable<T[K]>,
> = {
	[P in keyof T]: P extends K // If this is the key we want to apply the nested omit to
		? NonNullable<T[P]> extends Record<NK, any>
			? Omit<NonNullable<T[P]>, NK> // Omit the nested key
			: T[P] // Otherwise, keep the original type
		: T[P] // For all other keys, keep the original type
}
