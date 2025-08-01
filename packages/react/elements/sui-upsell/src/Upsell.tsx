import React from "react"

import {
	_renderHTMLPropsSafely,
	generateClassNames,
	isEmpty,
} from "@wpmudev/sui-utils"
import Icons, { IconsNamesType } from "@wpmudev/sui-icons"
import { useStyles } from "@wpmudev/sui-hooks"
import { UpsellProps } from "./Upsell.types"
import { variationsList } from "./Upsell.helpers"

const Upsell: React.FC<UpsellProps> = ({
	variation = "hummingbird",
	title,
	description,
	featuresList = [],
	featuresInline = false,
	featuresIcon = "Check",
	featuresTitle,
	children,
	_htmlProps = {},
	_style = {},
}) => {
	const { suiInlineClassname } = useStyles(_style)

	// Generate classnames for the upsell
	const classNames = generateClassNames(
		"sui-upsell",
		{
			[variation as string]: !isEmpty(variation ?? ""),
			lg: featuresInline,
			sm: !featuresInline,
		},
		suiInlineClassname,
	)

	// Get current variation options
	const currentVar = variationsList[variation]

	// Get the appropriate SVG Icon based on variation
	const Icon = Icons?.[currentVar?.icon as IconsNamesType]

	// Feature icon
	const FeatureIcon = Icons?.[featuresIcon]

	return (
		<div
			className={classNames}
			data-testid="upsell"
			{..._renderHTMLPropsSafely(_htmlProps)}
		>
			<div className="sui-upsell__header">
				{Icon && (
					<div className="sui-upsell__header-icon" data-testid="upsell-icon">
						<div
							className={generateClassNames("sui-upsell__icon", {
								[variation]: !isEmpty(variation ?? ""),
							})}
						>
							<Icon fill="white" />
						</div>
					</div>
				)}
				<h3
					className="sui-upsell__header-title sui-heading--h5"
					data-testid="upsell-title"
				>
					{/* Use custom title or fallback to the title from variationsList */}
					{title ?? currentVar?.title}
				</h3>
			</div>

			<div className="sui-upsell__body">
				{/* Use custom description or fallback to the description from variationsList */}
				{!isEmpty((description ?? "") as string)
					? description
					: currentVar?.description}

				{!!featuresTitle && (
					<h4 className="sui-upsell__features-title">{featuresTitle}</h4>
				)}

				{featuresList?.length > 0 && (
					<ul
						className={generateClassNames("sui-upsell__features", {
							"has-title": !!featuresTitle,
						})}
						data-testid="features"
					>
						{/* Map and render each feature with a checkmark */}
						{featuresList?.map((feature, index) => (
							<li key={index} className="sui-upsell__features-item">
								<FeatureIcon size="sm" />
								<span>{feature}</span>
							</li>
						))}
					</ul>
				)}
			</div>

			<div className="sui-upsell__footer" data-testid="actions">
				{children}
			</div>
		</div>
	)
}

Upsell.displayName = "Upsell"

export { Upsell }
