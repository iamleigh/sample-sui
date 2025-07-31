import React, { useContext } from "react"
import {
	_renderHTMLPropsSafely,
	generateClassNames,
	isEmpty,
} from "@wpmudev/sui-utils"
import { useStyles } from "@wpmudev/sui-hooks"
import { Button } from "@wpmudev/sui-button"
import { IconProps } from "@wpmudev/sui-icon"
import Icons from "@wpmudev/sui-icons"
import { ModalHeaderProps } from "./ModalHeader.types"
import { ModalContext } from "./ModalContext"

const ModalHeader: React.FC<ModalHeaderProps> = ({
	title,
	icon,
	iconColor = "",
	iconSize = "md",
	logo,
	hasCloseButton = true,
	children,
	_htmlProps,
	_style,
}) => {
	const { suiInlineClassname } = useStyles(_style)
	const ctx = useContext(ModalContext)
	const { closeModal, variant } = ctx!

	// Get SVG Icon
	let Icon: React.ComponentType<IconProps> | null = null

	if (icon) {
		Icon = Icons?.[icon]
	}

	return (
		<header
			className={generateClassNames(
				"sui-modal__header",
				{},
				suiInlineClassname,
			)}
			{..._renderHTMLPropsSafely(_htmlProps)}
		>
			<div className="sui-modal__header-actions">
				{!!Icon && "app-connect" !== variant && (
					<Icon size={iconSize} colorScheme={iconColor} />
				)}

				{!isEmpty(title ?? "") && "app-connect" !== variant && (
					<h4 className="sui-heading--h4">{title}</h4>
				)}

				{hasCloseButton && (
					<Button
						className="sui-modal__header-actions-close"
						icon="Close"
						type="tertiary"
						colorScheme="black"
						onClick={!!closeModal ? closeModal : () => {}}
						isSmall={true}
						iconOnly={true}
					>
						Close Modal
					</Button>
				)}
			</div>

			{"app-connect" === variant && (
				<div className="sui-modal__header-info">
					<h3 className="sui-heading--h3">{title}</h3>

					{!!children && (
						<div className="sui-modal__header-info-content">{children}</div>
					)}

					{!!logo && (
						<figure className="sui-modal__header-logo">
							<img src={logo} alt="Modal logo" />
						</figure>
					)}
				</div>
			)}
		</header>
	)
}

export { ModalHeader }
