import React from "react"
import { FormFieldErrorProps } from "../FormField.types"

// Build "Error Message" component
const ErrorMessage: React.FC<FormFieldErrorProps> = ({
	id,
	show = false,
	children,
}) => (
	<span
		id={`${id}-error-message`}
		className="sui-form-field__helper sui-color-error--50"
	>
		{show && children}
	</span>
)

export { ErrorMessage }
