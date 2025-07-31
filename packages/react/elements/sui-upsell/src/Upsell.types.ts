import { ReactNode, HTMLProps } from "react"
import { SuiHTMLAttributes, SuiStyleType } from "@wpmudev/sui-utils"
import { IconsNamesType } from "@wpmudev/sui-icons"

/**
 * Props for the Upsell component.
 *
 * Defines the configuration and content for an Upsell block,
 * typically used to promote features, upgrades, or related services.
 *
 * Supports customization of style variation, layout, features list,
 * iconography, and interactive actions.
 */
interface UpsellProps
	extends SuiStyleType,
		SuiHTMLAttributes<HTMLProps<HTMLDivElement>> {
	/**
	 * Visual style variation of the Upsell block.
	 * Used to apply brand‑specific styling and themes.
	 *
	 * Examples include: "hummingbird", "smush", "snapshot", "defender".
	 */
	variation:
		| "hummingbird"
		| "smush"
		| "snapshot"
		| "smartcrawl"
		| "shipper"
		| "ivt"
		| "hustle"
		| "forminator"
		| "defender"
		| "branda"
		| "beehive"
		| "dashboard"

	/**
	 * Title text displayed at the top of the Upsell.
	 */
	title?: string

	/**
	 * Description text or content providing context for the Upsell.
	 * Accepts any ReactNode for flexible formatting.
	 */
	description?: ReactNode

	/**
	 * List of features or benefits to highlight in the Upsell.
	 * Each feature can be a string or custom ReactNode.
	 */
	featuresList?: (ReactNode | string)[]

	/**
	 * When true, renders the feature list in a single inline row
	 * instead of stacking vertically.
	 * @default false
	 */
	featuresInline?: false

	/**
	 * Optional icon displayed next to each feature in the list.
	 */
	featuresIcon?: IconsNamesType

	/**
	 * Title displayed above the features list.
	 * Useful for grouping or providing context to the list.
	 */
	featuresTitle?: string

	/**
	 * Actions or interactive elements rendered below the Upsell content.
	 * Typically used for CTAs like buttons or links.
	 */
	children?: React.ReactNode
}

export type { UpsellProps }
