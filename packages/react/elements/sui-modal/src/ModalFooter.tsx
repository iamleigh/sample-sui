import React from "react"
import { ModalFooterProps } from "./ModalFooter.types"
import { useDefaultChildren, useStyles } from "@wpmudev/sui-hooks"
import { _renderHTMLPropsSafely, generateClassNames } from "@wpmudev/sui-utils"

// Build "ModalFooter" component
const ModalFooter: React.FC<ModalFooterProps> = ({
	children,
	isSpaced = false,
	_style,
	_htmlProps,
}) => {
	const { suiInlineClassname } = useStyles(_style)

	// Default children content
	children = useDefaultChildren(children, "{modal footer content}")

	return (
		<footer
			className={generateClassNames(
				"sui-modal__footer",
				{
					spaced: isSpaced,
				},
				suiInlineClassname,
			)}
			{..._renderHTMLPropsSafely(_htmlProps)}
		>
			{children}
		</footer>
	)
}

// Publish required component(s)
export { ModalFooter }
