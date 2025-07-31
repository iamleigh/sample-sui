import React, { forwardRef, useCallback, useState, useEffect } from "react"

import {
	isUndefined,
	isEmpty,
	generateClassNames,
	condContent,
	handleOnKeyDown,
	isFunction,
	_renderHTMLPropsSafely,
} from "@wpmudev/sui-utils"
import { useInteraction, useStyles } from "@wpmudev/sui-hooks"
import { Button } from "@wpmudev/sui-button"
import { Tooltip } from "@wpmudev/sui-tooltip"

import { Icon } from "./InputIcon"
import { InputProps } from "./Input.types"
import { inputTypeValues } from "./Input.values"

// Build "Input" component
const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
	(
		{
			id,
			type = "text",
			defaultValue = "",
			placeholder,
			isMultiLine = false,
			className,
			inputClass,
			isSmall,
			customWidth,
			isReadOnly = false,
			isError = false,
			isDisabled = false,
			onClick,
			onFocus,
			onKeyDown,
			onMouseEnter,
			onMouseLeave,
			onMouseDownCapture,
			onMouseUp,
			onMouseUpCapture,
			onBlur,
			onBlurCapture,
			onChange,
			onClear,
			icon,
			iconPosition,
			iconHint = "",
			iconHintWidth,
			allowClear = false,
			isRequired = false,
			pattern,
			onKeyUp,
			validate,
			ariaAttrs = {},
			_htmlProps = {},
			_style = {},
		},
		ref,
	) => {
		// Define states
		const [value, setValue] = useState<InputProps["defaultValue"]>(defaultValue)
		const [isHovered, isFocused, interactionMethods] = useInteraction({
			onMouseEnter,
			onMouseLeave,
			onMouseDownCapture,
			onMouseUp,
			onMouseUpCapture,
			onBlur,
			onBlurCapture,
		})
		const [hasError, setHasError] = useState(false)

		// Properties validation
		const hasID = !isUndefined(id) && !isEmpty(id)

		useEffect(() => {
			setValue(defaultValue)
		}, [defaultValue])

		// Input value change handler
		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				if (!isReadOnly) {
					setValue((e?.target?.value ?? "") as InputProps["defaultValue"])
				}

				onChange?.(e)
			},
			[isReadOnly, onChange],
		)

		// Input value clear handler
		const onClearCallback = useCallback(() => {
			setValue("" as InputProps["defaultValue"])
			onClear?.("")
		}, [onClear])

		// Input value validation handler on key up
		const onInputKeyUp = (e: any) => {
			if (validate && isFunction(validate)) {
				validate(value)
			}

			onKeyUp?.(e)
		}

		// Booleans
		const hasValue = !isUndefined(value) && !isEmpty((value ?? "") as string)
		const hasPlaceholder = !isUndefined(placeholder) && !isEmpty(placeholder)
		const hasClassInput = !isUndefined(inputClass) && !isEmpty(inputClass)

		// Define input type
		let inputType: string | undefined = "text"

		// Define expected types for input
		if (inputTypeValues.includes(type)) {
			inputType = type
		}

		const { suiInlineClassname } = useStyles(_style, className ?? "")

		// Generate class names based on the prop values
		const classNames = generateClassNames(
			"sui-input",
			{
				sm: isSmall,
				readonly: isReadOnly,
				hover: isHovered && !isReadOnly,
				focus: isFocused && !isReadOnly && !isError,
				filled: hasValue,
				"has-icon": !isEmpty(icon),
				"icon-start": !isEmpty(iconPosition) && "start" === iconPosition,
				"icon-end": !isEmpty(iconPosition) && "end" === iconPosition,
				error: isError,
				disabled: isDisabled,
				[`multiline${isSmall ? "-sm" : ""}`]: isMultiLine, // Define multiline class name
			},
			suiInlineClassname,
		)

		// Generate input class names
		const inputClassNames = generateClassNames(
			"sui-input__input",
			{
				"allow-clear": allowClear && !isEmpty(value as string) && !isMultiLine,
			},
			hasClassInput ? inputClass : "",
		)

		// Input field props
		const attrs = {
			id,
			ref,
			type: condContent(!isMultiLine, inputType),
			placeholder: condContent(hasPlaceholder, placeholder),
			"aria-label": placeholder || "input",
			readOnly: condContent(isReadOnly, true),
			disabled: condContent(isDisabled, true),
			value: value ?? "",
			className: inputClassNames,
			onChange: handleChange,
			// Additional props
			required: isRequired,
			pattern,
			onKeyUp: onInputKeyUp,
			onClick,
			onFocus,
			onKeyDown,
			...ariaAttrs,
		}

		// Icon rendering
		const renderIcon = () => {
			if (!(icon && !isMultiLine)) {
				return null
			}

			if (!isEmpty(iconHint) && "end" === iconPosition && !isDisabled) {
				return (
					<Tooltip
						type="icon"
						icon={icon}
						customWidth={iconHintWidth as number}
						iconSize="sm"
						placement="top"
					>
						{iconHint}
					</Tooltip>
				)
			}

			return <Icon name={icon} size="sm" placement={iconPosition ?? "start"} />
		}

		/**
		 * Define main tag
		 *
		 * NOTE: Do not use inline definition since it comes with
		 * limitations from TypeScript when rendering the tag name.
		 *
		 * TODO: To avoid this, consider in the future split rendering
		 * inline, or use `React.createElement` for dynamic tags.
		 */
		let TagName = "input"

		if (isMultiLine) {
			TagName = "textarea"
		}

		// Component rendering
		return (
			<div
				className={classNames}
				data-testid="sui-input"
				{...(customWidth && { style: { maxWidth: `${customWidth}px` } })}
			>
				{"start" === iconPosition && renderIcon()}

				<div className={generateClassNames("sui-input__input-field")}>
					<TagName {...attrs} {..._renderHTMLPropsSafely(_htmlProps)} />
				</div>

				{"end" === iconPosition && renderIcon()}

				{allowClear &&
					!isEmpty(value as string) &&
					!isMultiLine &&
					!isReadOnly &&
					"end" !== iconPosition && (
						<Button
							className="sui-input__input-clear"
							icon="CloseAlt"
							colorScheme="black"
							type="tertiary"
							iconOnly={true}
							iconSize={isSmall ? "sm" : "md"}
							onClick={onClearCallback}
							isSmall={isSmall ?? false}
							_htmlProps={{
								onKeyDown: (
									e: React.KeyboardEvent<HTMLDivElement | HTMLSpanElement>,
								) => handleOnKeyDown(e, onClear),
							}}
						>
							Clear Value
						</Button>
					)}
			</div>
		)
	},
)

Input.displayName = "Input"

export { Input }
