import React, { useRef } from "react"
import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalProps,
	ModalActionsProps,
	ModalHeaderProps,
	ModalFooterProps,
} from "../src"
import { Box, BoxGroup } from "@wpmudev/sui-box"
import { Button } from "@wpmudev/sui-button"
import { IconsName } from "@wpmudev/sui-icons"
import docs from "./Modal.mdx"

// Configure default options
export default {
	title: "SUI/Components/Advanced/Modal",
	component: Modal,
	parameters: {
		layout: "fullscreen",
		docs: {
			page: docs,
		},
	},
}

type PlaygroundProps = ModalProps &
	ModalHeaderProps &
	ModalFooterProps & {
		headerContent?: string
		bodyContent?: string
		footerContent?: boolean
	}

// Build "Modal" story
const Playground = (args: PlaygroundProps) => {
	const ref = useRef<ModalActionsProps | null>(null)

	const handleOpenModal = () => ref.current?.openModal()
	const handleCloseModal = () => ref.current?.closeModal()

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<div className="sui-layout__content">
				<Box>
					<BoxGroup>
						<Button type="primary" colorScheme="blue" onClick={handleOpenModal}>
							Open Modal
						</Button>

						<Modal
							id={args.id}
							size={args.size}
							variant={args.variant}
							ref={ref}
						>
							<ModalHeader
								title={args.title}
								{...(args.icon && { icon: args.icon })}
								iconSize={args.iconSize}
								iconColor={args.iconColor}
								hasCloseButton={args.hasCloseButton}
							>
								{args.headerContent &&
									"app-connect" === args.variant &&
									args.headerContent}
							</ModalHeader>
							{args.bodyContent && <ModalBody>{args.bodyContent}</ModalBody>}
							{args.footerContent && (
								<ModalFooter isSpaced={args.isSpaced}>
									<Button
										type="secondary"
										colorScheme="blue"
										isSmall={true}
										onClick={() => ref.current?.closeModal()}
									>
										Cancel
									</Button>
									<Button
										type="primary"
										colorScheme="blue"
										isSmall={true}
										onClick={() => console.log('Clicked on "Apply" button')}
									>
										Apply
									</Button>
								</ModalFooter>
							)}
						</Modal>
					</BoxGroup>
				</Box>
			</div>
		</div>
	)
}

Playground.args = {
	id: "uniqueId",
	size: "md",
	variant: "simple",
	// Modal Header
	title: "Modal Title",
	icon: "",
	iconSize: "md",
	iconColor: "neutral",
	logo: "https://placehold.co/200x200",
	hasCloseButton: true,
	headerContent: "The quick brown fox jumps over the lazy dog",
	// Modal Body
	bodyContent:
		"Lorem ipsum dolor sit amet luctus blandit rhoncus scelerisque aenean imperdiet etiam eleifend sapien. Lorem ipsum dolor sit amet proin duis libero. Lorem ipsum dolor sit amet convallis cras ultricies nisi elit fames lectus aliquet dolore blandit.",
	// Modal Footer
	isSpaced: false,
	footerContent: true,
}

Playground.argTypes = {
	size: {
		options: ["sm", "md", "lg", "xl"],
		control: {
			type: "inline-radio",
			labels: {
				sm: "sm",
				md: "md",
				lg: "lg",
				xl: "xl",
			},
		},
	},
	variant: {
		options: ["simple", "advanced", "app-connect"],
		control: {
			type: "select",
			labels: {
				simple: "Simple",
				advanced: "Advanced",
				"app-connect": "App connect",
			},
		},
	},
	// Modal Header
	title: {
		table: {
			category: "Header",
		},
	},
	icon: {
		options: [""].concat(IconsName),
		control: {
			type: "select",
			labels: {
				"": "-",
			},
		},
		table: {
			category: "Header",
		},
	},
	iconSize: {
		options: ["xs", "sm", "md", "lg", "xl"],
		control: {
			type: "inline-radio",
		},
		table: {
			category: "Header",
		},
		if: {
			arg: "icon",
			neq: "",
		},
	},
	iconColor: {
		options: ["neutral", "informative", "success", "warning", "critical"],
		control: {
			type: "inline-radio",
		},
		table: {
			category: "Header",
		},
		if: {
			arg: "icon",
			neq: "",
		},
	},
	logo: {
		table: {
			category: "Header",
		},
		if: {
			arg: "icon",
			neq: "",
		},
	},
	headerContent: {
		name: "children",
		table: {
			category: "Header",
		},
		if: {
			arg: "variant",
			eq: "app-connect",
		},
	},
	hasCloseButton: {
		table: {
			category: "Header",
		},
	},
	// Modal Body
	bodyContent: {
		name: "children",
		table: {
			category: "Body",
		},
	},
	// Modal Footer
	isSpaced: {
		table: {
			category: "Footer",
		},
	},
	footerContent: {
		name: "children (Use predefined content)",
		table: {
			category: "Footer",
		},
	},
}

// Publish required stories
export { Playground }
