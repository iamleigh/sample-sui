import React from "react"
import classnames from "classnames"

import { FormFieldHelperProps } from "../FormField.types"
import { useStyles } from "@wpmudev/sui-hooks"

// Build "Helper" element
const Helper: React.FC<FormFieldHelperProps> = ({ id, children, ...props }) => {
	const { suiInlineClassname } = useStyles(props)

	const classNames = classnames(
		{
			"sui-form-field__helper": true,
		},
		suiInlineClassname,
	)

	return (
		<span id={`${id}-helper`} className={classNames}>
			{children}
		</span>
	)
}

export { Helper }
