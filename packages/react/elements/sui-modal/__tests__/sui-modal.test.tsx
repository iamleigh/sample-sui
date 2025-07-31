import React, { Fragment, useRef } from "react"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { Button } from "@wpmudev/sui-button"

import {
	Modal,
	ModalActionsProps,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalProps,
} from "../src"

describe("@wpmudev/sui-modal", () => {
	// Shared modal props
	const commonProps = {
		id: "uniqueId",
		icon: {
			name: "info-alt",
			color: "blue",
		},
		size: "sm" as ModalProps["size"],
		variant: "simple" as ModalProps["variant"],
	}

	// Test data
	const data = {
		openModalBtn: "__OPEN_MODAL_BTN__",
		modalHeader: {
			title: "__MODAL_HEADER_TITLE__",
			body: "__MODAL_HEADER_BODY__",
		},
		modalBody: {
			body: "__MODAL_BODY__",
		},
		modalFooter: {
			closeBtn: "__CLOSE_BUTTON__",
			applyBtn: "__APPLY_BUTTON__",
		},
	}

	// Test component using the Modal
	const Component = () => {
		const ref = useRef<ModalActionsProps | null>(null)

		return (
			<Fragment>
				<Modal {...commonProps} ref={ref}>
					<ModalHeader title={data.modalHeader.title}>
						{data.modalHeader.body}
					</ModalHeader>
					<ModalBody>{data.modalBody.body}</ModalBody>
					<ModalFooter>
						<Button
							type="secondary"
							colorScheme="blue"
							isSmall={true}
							onClick={() => ref?.current?.closeModal()}
						>
							{data.modalFooter.closeBtn}
						</Button>
						<Button
							type="primary"
							colorScheme="blue"
							isSmall={true}
							onClick={jest.fn()}
						>
							{data.modalFooter.applyBtn}
						</Button>
					</ModalFooter>
				</Modal>

				<Button
					type="primary"
					colorScheme="blue"
					onClick={() => ref?.current?.openModal()}
				>
					{data.openModalBtn}
				</Button>
			</Fragment>
		)
	}

	// Should render modal and handle open/close functionality
	it("🧱 Opens modal, renders content, and applies correct classes", () => {
		render(<Component />)

		// Modal should be hidden by default
		expect(screen.queryByTestId("modal")).not.toBeInTheDocument()

		// Open modal
		fireEvent.click(screen.getByText(data.openModalBtn))

		const modal = screen.getByTestId("modal")

		// Modal should be visible
		expect(modal).toBeVisible()

		// Should apply correct size & variant classes
		expect(modal).toHaveClass("sui-modal--sm")
		expect(modal).toHaveClass("sui-modal--simple")
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<Component />)
		expect(result).toBeUndefined()
	})
})
