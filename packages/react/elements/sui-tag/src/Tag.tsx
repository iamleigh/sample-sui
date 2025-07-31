import React from "react"
import {
	_renderHTMLPropsSafely,
	generateClassNames,
	isEmpty,
	isUndefined,
} from "@wpmudev/sui-utils"
import { TagProps } from "./Tag.types"
import { useDefaultChildren, useStyles } from "@wpmudev/sui-hooks"
import { Close } from "@wpmudev/sui-icons"

const Tag: React.FC<TagProps> = ({
	color,
	isOutlined = false,
	contentWrap,
	isSmall = false,
	isUppercase = false,
	isDisabled = false,
	className,
	children,
	onDismiss,
	_htmlProps = {},
	_style = {},
}) => {
	const design = "outlined"
	const hasColor = !isUndefined(color) && !isEmpty(color)
	const hasStyle = ["multiline", "truncated"].includes(contentWrap ?? "")

	const { suiInlineClassname } = useStyles(_style, className)

	// Define tag design
	// Limited to: solid (default) and outlined
	const classNames = generateClassNames(
		"sui-tag",
		{
			[`${design}-${color}`]: isOutlined && hasColor,
			[design as string]: isOutlined,
			[color as string]: !isOutlined && hasColor,
			[contentWrap as string]: hasStyle,
			sm: isSmall,
			uppercase: isUppercase,
			disabled: isDisabled,
		},
		suiInlineClassname,
	)

	// Default children content
	children = useDefaultChildren(children, "{tag content}")

	return (
		<span
			className={classNames}
			{..._renderHTMLPropsSafely(_htmlProps)}
			data-testid="tag"
		>
			<div className="sui-tag__wrapper">
				<span className="sui-tag__label">{children}</span>
				{onDismiss && (
					<button className="sui-tag__cta" onClick={onDismiss}>
						<span aria-hidden="true">
							<Close size="xs" />
						</span>
						<span className="sui-screen-reader-only" tabIndex={-1}>
							Dismiss
						</span>
					</button>
				)}
			</div>
		</span>
	)
}

// Publish required component
export { Tag }
