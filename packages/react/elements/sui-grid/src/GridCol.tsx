import React from "react"
import { _renderHTMLPropsSafely, generateClassNames } from "@wpmudev/sui-utils"
import { useDefaultChildren, useStyles } from "@wpmudev/sui-hooks"
import { ColProps } from "./Grid.types"

const Col: React.FC<ColProps> = ({
	size,
	children,
	className,
	_htmlProps = {},
	_style,
}) => {
	const { suiInlineClassname } = useStyles(_style, className)

	// Convert the size object into responsive class names
	const sizeClasses =
		typeof size === "object"
			? Object.entries(size).reduce<Record<string, boolean>>(
					(acc, [breakpoint, value]) => {
						if (value) {
							// Handle default breakpoint differently
							if (breakpoint === "default") {
								acc[value] = true
							} else {
								acc[`${breakpoint}-${value}`] = true
							}
						}
						return acc
					},
					{},
				)
			: { [size as string]: !!size }

	const classNames = generateClassNames(
		"sui-col",
		{ ...sizeClasses }, // Add size classes here,
		suiInlineClassname,
	)

	// Default children content
	children = useDefaultChildren(children, "{Column children content}")

	return (
		<div className={classNames} {..._renderHTMLPropsSafely(_htmlProps)}>
			{children}
		</div>
	)
}

export { Col }
