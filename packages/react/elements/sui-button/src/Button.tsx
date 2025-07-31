import React, { forwardRef } from "react"
import {
	useDefaultChildren,
	useInteraction,
	useStyles,
} from "@wpmudev/sui-hooks"

import {
	isUndefined,
	condContent,
	generateClassNames,
	isEmpty,
	_renderHTMLPropsSafely,
} from "@wpmudev/sui-utils"

// Import required component(s)
import { Label } from "./elements/button-label"
import { Icon } from "./elements/button-icon"
import { Loader } from "./elements/button-loader"

// Type definitions
import { ButtonProps } from "./Button.types"

// Build "Button" component
const Button: React.FC<ButtonProps> = forwardRef<
	HTMLButtonElement | HTMLAnchorElement,
	ButtonProps
>(
	(
		{
			href,
			target,
			htmlFor,
			type,
			colorScheme,
			isSmall = false,
			isFullWidth = false,
			isDisabled = false,
			isUnwrapped = false,
			className,
			children,
			icon,
			startIcon = icon,
			endIcon,
			iconOnly,
			iconSize = "sm",
			isResponsive = false,
			isLoading = false,
			onMouseEnter,
			onMouseLeave,
			onFocus,
			onBlur,
			onMouseUp,
			onMouseDownCapture,
			onMouseUpCapture,
			onBlurCapture,
			onClick,
			_htmlProps = {},
			_style,
		},
		ref,
	) => {
		const baseClassName = "sui-button"

		// Set default children and resolve inline styles
		children = useDefaultChildren(children, "button label")
		const { suiInlineClassname } = useStyles(_style, className ?? "")

		// Wrap children in loader component if loading
		if (isLoading) {
			isUnwrapped = true
			children = (
				<Loader colorScheme={colorScheme} isDisabled={isDisabled}>
					{children}
				</Loader>
			)
		}

		// Track hover and focus interaction states
		const [isHovered, isFocused, interactionMethods] = useInteraction({
			onMouseEnter,
			onMouseLeave,
			onFocus,
			onBlur,
			onMouseUp,
			onMouseDownCapture,
			onMouseUpCapture,
			onBlurCapture,
		})

		// Determine structural behavior
		const isLink = !isUndefined(href)
		const label = !isUndefined(htmlFor)
		const isEndIcon = !isEmpty(endIcon ?? "")

		// Generate dynamic class names
		const attrClasses = {
			sm: isSmall,
			hover: isHovered && !isDisabled,
			focus: isFocused && !isDisabled,
			disabled: isDisabled,
			"full-width": isFullWidth,
			"is-icon": (startIcon || endIcon) && iconOnly,
			[`${type}-${colorScheme}`]: !!type && !!colorScheme,
			inline: iconOnly && !type,
			responsive: isResponsive,
			loading: isLoading,
		}

		// Compose attributes for the rendered element
		const attrs = {
			ref,
			href: isLink && !!href ? href : undefined,
			...(isLink && target && { target }),
			htmlFor: condContent(label),
			className: generateClassNames(
				baseClassName,
				attrClasses,
				suiInlineClassname,
			),
			disabled: isDisabled,
			"aria-busy": isLoading,
			...(isLoading && { "aria-live": "polite" }),
			"data-testid": "button",
			onClick,
			..._renderHTMLPropsSafely(_htmlProps),
			...(interactionMethods ?? {}),
		}

		// Choose the appropriate HTML tag
		let TagName: string = isLink ? "a" : "button"
		if (htmlFor) {
			TagName = "label"
		}

		return (
			<TagName {...attrs}>
				{(startIcon || icon) && (
					<Icon
						name={startIcon ?? ""}
						size={iconSize}
						{...(isLoading ? { className: "sui-button__icon--hidden" } : {})}
					/>
				)}

				{isUnwrapped ? (
					children
				) : (
					<Label {...(iconOnly && { hidden: true })}>{children}</Label>
				)}

				{isEndIcon && (
					<Icon
						name={endIcon ?? ""}
						size={iconSize}
						{...(isLoading ? { className: "sui-button__icon--hidden" } : {})}
					/>
				)}
			</TagName>
		)
	},
)

Button.displayName = "Button"

// Publish required component(s).
export { Button }
