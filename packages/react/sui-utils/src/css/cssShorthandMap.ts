/**
 * Maps utility-style shorthand props to their corresponding CSS property.
 * Commonly used for style props like p, px, mt, ml, etc.
 *
 * Note: This map is consumed by isValidCSSRule to determine if the
 * shorthand should be allowed through the _style prop logic.
 */
export const CSS_SHORTHAND_MAPS: Record<string, string> = {
	// Padding
	p: "padding",
	px: "padding",
	py: "padding",
	pt: "paddingTop",
	pr: "paddingRight",
	pb: "paddingBottom",
	pl: "paddingLeft",

	// Margin
	m: "margin",
	mx: "margin",
	my: "margin",
	mt: "marginTop",
	mr: "marginRight",
	mb: "marginBottom",
	ml: "marginLeft",
}

/**
 * Utility type to reference valid shorthand keys (e.g. "px", "mt", "pl").
 */
export type CSSShorthandKey = keyof typeof CSS_SHORTHAND_MAPS
