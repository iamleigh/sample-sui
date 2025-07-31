import React from "react"
import { useDefaultChildren, useStyles } from "@wpmudev/sui-hooks"
import { _renderHTMLPropsSafely, generateClassNames } from "@wpmudev/sui-utils"
import { ModalBodyProps } from "./ModalBody.types"

// Build "ModalBody" component
const ModalBody: React.FC<ModalBodyProps> = ({
	children,
	_style,
	_htmlProps,
}) => {
	const { suiInlineClassname } = useStyles(_style)

	// Fallback to default placeholder content if no children are passed
	children = useDefaultChildren(children, "{modal body content}")

	return (
		<div
			className={generateClassNames("sui-modal__body", {}, suiInlineClassname)}
			{..._renderHTMLPropsSafely(_htmlProps)}
		>
			{children}
		</div>
	)
}

// Publish required component(s)
export { ModalBody }
