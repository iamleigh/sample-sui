/**
 * Represents any HTML attribute that starts with "data-"
 * Example: data-testid, data-tracking-id
 */
type DataAttributeKey = `data-${string}`

/**
 * Allows passing native HTML attributes and custom data-* attributes.
 *
 * @template T - Base HTML attributes (e.g., React.HTMLAttributes<HTMLDivElement>)
 */
export type SuiHTMLAttributes<T = any> = {
	// Custom HTML props, including valid data-* attributes
	_htmlProps?: T & {
		[key in DataAttributeKey]?: unknown
	}
}
