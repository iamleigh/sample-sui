import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useState,
	useId,
} from "react"
import {
	_renderHTMLPropsSafely,
	generateClassNames,
	isEmpty,
} from "@wpmudev/sui-utils"
import {
	useDefaultChildren,
	usePortal,
	useStyles,
	useValidateProps,
} from "@wpmudev/sui-hooks"
import { ModalActionsProps, ModalProps } from "./Modal.types"
import { ModalContext } from "./ModalContext"

// Build "Modal" component
const Modal = forwardRef<ModalActionsProps, ModalProps>(
	(
		{
			id,
			size = "md",
			variant = "simple",
			onCloseModal,
			children,
			_style,
			_htmlProps,
		},
		ref,
	) => {
		// Prepare children with default values (e.g., <ModalHeader>, <ModalBody>)
		children = useDefaultChildren(children)

		// Modal open state
		const [isOpen, setIsOpen] = useState<boolean>(false)

		// Validate required props for debugging/dev
		useValidateProps({ component: Modal, propsToCheck: { id } })

		// Open modal
		const openModal = useCallback(() => {
			document.body.classList.add("sui-locked")
			setIsOpen(true)
		}, [])

		// Close modal
		const closeModal = useCallback(() => {
			document.body.classList.remove("sui-locked")
			onCloseModal?.()
			setIsOpen(false)
		}, [onCloseModal])

		// Allow parent to access open/close actions via ref
		useImperativeHandle(ref, () => ({
			openModal,
			closeModal,
		}))

		// Render in portal
		const [render] = usePortal()

		// Inline styles from hooks
		const { suiInlineClassname } = useStyles(_style, "sui-wp-overlay")

		// Exit early if not visible
		if (!isOpen) {
			return null
		}

		// Compose class names
		const classNames = generateClassNames(
			"sui-modal",
			{
				"is-open": isOpen,
				[variant]: !isEmpty(variant ?? ""),
				[size]: !isEmpty(size ?? ""),
			},
			suiInlineClassname,
		)

		return render(
			<ModalContext.Provider
				value={{
					openModal,
					closeModal,
					variant: variant ?? "simple",
					size: size ?? "sm",
				}}
			>
				<section
					className={classNames}
					data-testid="modal"
					tabIndex={-1}
					{..._renderHTMLPropsSafely(_htmlProps)}
				>
					<div
						className={generateClassNames("sui-modal__container", {})}
						role="dialog"
						aria-modal="true"
						tabIndex={-1}
					>
						{children}
					</div>
				</section>
				<div className="sui-modal__overlay" role="presentation" />
			</ModalContext.Provider>,
		) as unknown as React.ReactNode
	},
)

Modal.displayName = "Modal"

// Publish component(s)
export { Modal }
