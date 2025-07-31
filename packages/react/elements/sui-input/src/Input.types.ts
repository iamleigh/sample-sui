import React, { HTMLProps } from "react"
import { SuiHTMLAttributes, SuiStyleType } from "@wpmudev/sui-utils"
import { InteractionTypes, validationPropsType } from "@wpmudev/sui-hooks"
import { IconsNamesType } from "@wpmudev/sui-icons"
import type { InputType } from "./Input.values"

/**
 * The `InputPropsTypes` interface represents the props for an input element.
 * It extends the `HTMLProps<HTMLInputElement>` interface and includes additional props for interaction types.
 *
 * @interface InputProps
 * @augments {HTMLProps<HTMLInputElement>}
 * @augments {InteractionTypes}
 */
interface InputProps
	extends SuiHTMLAttributes<HTMLProps<HTMLInputElement>>,
		InteractionTypes,
		SuiStyleType,
		validationPropsType {
	/**
	 * Input field default value
	 */
	pattern?: HTMLProps<HTMLInputElement>["pattern"]

	/**
	 * Input field default value
	 */
	defaultValue?: HTMLProps<HTMLInputElement>["defaultValue"]

	/**
	 * The type of the input element.
	 */
	type?: InputType

	/**
	 * The placeholder text for the input element.
	 */
	placeholder?: string

	/**
	 * The unique identifier for the input element.
	 */
	id: string

	/**
	 * The CSS class name for the input element.
	 */
	className?: string

	/**
	 * The CSS class name for the input element's input field.
	 */
	inputClass?: string

	/**
	 * Specifies whether the input element is a multiline input.
	 */
	isMultiLine?: boolean

	/**
	 * Specifies whether the input element is small in size.
	 */
	isSmall?: boolean

	/**
	 * Specifies whether the input element is read-only.
	 */
	isReadOnly?: boolean

	/**
	 * Specifies whether the input element has an error.
	 */
	isError?: boolean

	/**
	 * Specifies whether the input element is disabled.
	 */
	isDisabled?: boolean

	/**
	 * Disables interaction methods
	 */
	isInteractionDisabled?: boolean

	/**
	 * The callback function for handling input changes.
	 */
	onChange?: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void

	/**
	 * When key up in input field
	 *
	 * @param {React.KeyboardEvent<HTMLDivElement | HTMLSpanElement>} e
	 */
	onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement | HTMLSpanElement>) => void

	/**
	 * When key down in input field
	 */
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void

	/**
	 * Input onClick
	 *
	 * @param {React.MouseEvent<HTMLInputElement>} e
	 */
	onClick?: (e: React.MouseEvent<HTMLInputElement>) => void

	/*
	 * The callback function for handling input clear
	 */
	onClear?: (value: string | number) => void

	/**
	 * Optional icon to be displayed.
	 */
	icon?: IconsNamesType

	/**
	 * Optional icon position to be displayed before or after text.
	 */
	iconPosition?: "start" | "end"

	/*
	 * Icon tooltip hint
	 * This is only used when iconPosition is "end".
	 */
	iconHint?: string

	/**
	 * Icon tooltip width
	 * This is only used when iconPosition is "end" and iconHint is set.
	 */
	iconHintWidth?: number

	/**
	 * Specifies whether the value can be cleared or not
	 */
	allowClear?: boolean

	/**
	 * Whether the input is required or not
	 */
	isRequired?: boolean

	/**
	 * Validate value on mount
	 */
	validateOnMount?: boolean

	/**
	 * Custom Width in pixels
	 */
	customWidth?: number

	/**
	 * aria attributes of field
	 */
	ariaAttrs?: object

	/**
	 * On validation callback
	 */
	onValidate?: (id?: string, value?: string | number | boolean) => void

	/**
	 * Name of the input
	 */
	name?: string
}

export type { InputProps }
