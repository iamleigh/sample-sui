import React from "react"
import { isUndefined, isEmpty, generateClassNames } from "@wpmudev/sui-utils"
import { IconProps } from "@wpmudev/sui-icon"
import Icons, { IconsNamesType } from "@wpmudev/sui-icons"

interface ButtonIconProps {
	/**
	 * Icon name
	 *
	 * @type {string | undefined}
	 */
	name: string
	/**
	 * Icon size
	 *
	 * @type {string}
	 */
	size?: IconProps["size"]

	/**
	 * Additional className
	 *
	 * @type {string}
	 */
	className?: string
}

// Build "Icon" component
const Icon: React.FC<ButtonIconProps> = ({
	name,
	size = "sm",
	className = "",
}) => {
	const hasIcon = !isUndefined(name) && !isEmpty(name ?? "")

	if (!hasIcon) {
		throw new Error(
			`Required parameter is empty. More details below:\n\n⬇️ ⬇️ ⬇️\n\n📦 Shared UI - Components: Button\n\nThe "name" parameter in the icon element is required and must not be empty.\n\n`,
		)
	}

	const IconName = name

	// Set Icon & iconColor based on "variation" value
	const IconTag = Icons[IconName as IconsNamesType]

	const classes = generateClassNames("sui-button__icon", {}, className)

	return (
		<span className={classes} aria-hidden="true" data-testid="button-icon">
			<IconTag size={size} />
		</span>
	)
}

// Publish required component(s)
export { Icon }
