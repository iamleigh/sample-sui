import React, { Children, cloneElement, ReactElement } from "react"
import { generateClassNames } from "@wpmudev/sui-utils"
import { useStyles } from "@wpmudev/sui-hooks"
import { CheckboxProvider } from "./Checkbox.context"
import { CheckboxGroupsProps } from "./Checkbox.types"

const CheckBoxGroups: React.FC<CheckboxGroupsProps> = ({
	children,
	commonCheckboxProps = {},
	onChange = () => {},
	_style,
}) => {
	const { suiInlineClassname } = useStyles(_style)
	const className = generateClassNames(
		"sui-checkbox-wrapper",
		{},
		suiInlineClassname,
	)

	return (
		<CheckboxProvider onChange={onChange}>
			<div className={className}>
				{Children.map(children, (child) => {
					return cloneElement(
						child as any,
						{
							commonCheckboxProps: {
								...commonCheckboxProps,
								// The common props from CheckboxGroup should override the common props from CheckBoxGroups
								...(child as ReactElement)?.props?.commonCheckboxProps,
							},
							_isMultiGroup: true,
						} as object,
					)
				})}
			</div>
		</CheckboxProvider>
	)
}

export { CheckBoxGroups }
