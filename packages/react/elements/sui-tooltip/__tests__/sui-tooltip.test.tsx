import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { Tooltip } from "../src"

describe("@wpmudev/sui-tooltip", () => {
	const label = "Tooltip Label"
	const content = "Tooltip Description"

	it("🧱 Renders label and children correctly", () => {
		render(<Tooltip label={label}>{content}</Tooltip>)

		expect(screen.getByText(label)).toBeInTheDocument()
		expect(screen.getByText(content)).toBeInTheDocument()
	})

	it("🎯 applies correct class for `placement` prop", () => {
		render(
			<Tooltip label={label} placement="bottom">
				{content}
			</Tooltip>,
		)

		const tooltipPopup = screen.getByTestId("tooltip-popup")

		expect(tooltipPopup).toHaveClass("sui-tooltip__popup--bottom")
		expect(screen.getByText(content)).toBeInTheDocument()
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<Tooltip label={label}>{content}</Tooltip>)
		expect(result).toBeUndefined()
	})
})
