import React from "react"
import {
	_renderHTMLPropsSafely,
	generateClassNames,
	isEmpty,
	isUndefined,
} from "@wpmudev/sui-utils"
import Icons, { IconsNamesType } from "@wpmudev/sui-icons"
import { IconProps } from "@wpmudev/sui-icon"

import { BoxGroup } from "./BoxGroup"
import { BoxProps } from "./Box.types"
import { useDefaultChildren, useStyles } from "@wpmudev/sui-hooks"

// Create `Box` component
const Box: React.FC<BoxProps> = ({
	title,
	icon,
	hideMobileIcon = false,
	headerLeft,
	headerRight,
	children,
	isSmall = false,
	className = "",
	style = {},
	_htmlProps = {},
	_style,
}) => {
	// Prop(s) validation
	const hasTitle = !isUndefined(title) && !isEmpty(title)
	const hasIcon = !isUndefined(icon) && !isEmpty(icon)
	const hasLeft = !!headerLeft
	const hasRight = !!headerRight

	// Determine the IconTag based on the provided icon value
	const IconTag: React.ComponentType<IconProps> = Icons[icon as IconsNamesType]
	const { suiInlineClassname } = useStyles(_style, className)
	const classNames = generateClassNames(
		"sui-box",
		{ "size-sm": isSmall },
		suiInlineClassname,
	)

	// Default children content
	children = useDefaultChildren(children)

	return (
		<div
			className={classNames}
			style={style ?? {}}
			{..._renderHTMLPropsSafely(_htmlProps)}
		>
			{hasTitle && (
				<BoxGroup isInline={true}>
					<div slot="left">
						{hasIcon && IconTag && (
							<span
								className={generateClassNames(
									"suicons",
									{},
									hideMobileIcon
										? "sui-box-group__item sui-icon--hide-sm"
										: "sui-box-group__item",
								)}
								aria-hidden="true"
							>
								<IconTag size="md" />
							</span>
						)}
						{hasTitle && (
							<h2 className="sui-heading sui-heading--h3 sui-box-group__item">
								{title}
							</h2>
						)}
						{hasLeft && headerLeft}
					</div>
					<div {...(hasRight && { slot: "right" })}>
						{hasRight && headerRight}
					</div>
				</BoxGroup>
			)}
			{children}
		</div>
	)
}

// Publish component(s)
export { Box }
