import React from "react"
import classnames from "classnames"
import { useStyles } from "@wpmudev/sui-hooks"
import { generateClassNames, isEmpty } from "@wpmudev/sui-utils"
import { FormFieldLabelProps } from "../FormField.types"

// Build "Label" element
const Label: React.FC<FormFieldLabelProps> = ({
	id,
	hidden = false,
	children,
	...styleProps
}) => {
	const { suiInlineClassname } = useStyles(styleProps)

	const hasContent =
		"string" === typeof children
			? !isEmpty((children as string) ?? "")
			: !!children

	if (!hasContent) {
		throw new Error(
			`Empty content is not valid. More details below:\n\n⬇️ ⬇️ ⬇️\n\n📦 Shared UI - Components: Form Field\n\nThe "Label" component requires a child element to be passed to it.\n\n`,
		)
	}

	// Generate classnames
	const classNames = classnames({
		"sui-screen-reader-only": hidden,
		"sui-form-field__label": !hidden,
	})

	return (
		<label
			htmlFor={id}
			id={`${id}-label`}
			className={generateClassNames(classNames, {}, suiInlineClassname)}
		>
			{children}
		</label>
	)
}

export { Label }
