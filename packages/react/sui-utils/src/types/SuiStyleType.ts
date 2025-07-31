import { CSSProperties } from "react"

export type SuiStyleType = {
	_style?: useStylesTypes
}

// @todo: Move to hooks file
type objectValueType = Record<string, string>

type PropertyValueType = string | objectValueType

type CSSPropertiesTypes = {
	[K in keyof CSSProperties]?:
		| CSSProperties[K]
		| ReadonlyArray<Extract<CSSProperties[K], string>>
		| objectValueType
}

type NestedStylesType = {
	[key: `&${string}` | `@media ${string}`]: objectValueType
}

interface useStylesTypes extends CSSPropertiesTypes, NestedStylesType {
	// Padding shorthands
	p?: PropertyValueType
	px?: PropertyValueType
	py?: PropertyValueType
	pt?: PropertyValueType
	pr?: PropertyValueType
	pb?: PropertyValueType
	pl?: PropertyValueType
	// Margin shorthands
	m?: PropertyValueType
	mx?: PropertyValueType
	my?: PropertyValueType
	mt?: PropertyValueType
	mr?: PropertyValueType
	mb?: PropertyValueType
	ml?: PropertyValueType
}
