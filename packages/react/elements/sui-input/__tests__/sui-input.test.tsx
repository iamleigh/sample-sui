import React from "react"
import "@testing-library/jest-dom"
import { a11yTest } from "@wpmudev/sui-devtools"
import { screen, render } from "@testing-library/react"

import { Input } from "../src"

describe("@wpmudev/sui-input", () => {
	it("🧱 Renders component correctly", () => {
		render(<Input id="first-name" />)
		expect(screen.getByTestId("sui-input")).toBeInTheDocument()
	})

	it("🚫 Applies 'disabled' class when isDisabled is true", () => {
		render(<Input id="disabled-check" isDisabled={true} />)
		expect(screen.getByTestId("sui-input")).toHaveClass("sui-input--disabled")
	})

	it("❌ Applies 'error' class when isError is true", () => {
		render(<Input id="error-check" isError={true} />)
		expect(screen.getByTestId("sui-input")).toHaveClass("sui-input--error")
	})

	it("🧹 Shows 'Clear' button when allowClear is true", () => {
		render(
			<Input id="clear-check" allowClear={true} defaultValue="Hello World" />,
		)
		expect(screen.getByText("Clear")).toBeInTheDocument()
	})

	it("🧱 Renders icon correctly for both 'start' and 'end' positions", () => {
		const { rerender } = render(
			<Input id="icon-start" icon="Bell" iconPosition="start" />,
		)

		// Check if start icon is rendered
		expect(screen.getByTestId("input-icon-start")).toBeInTheDocument()

		// Rerender with icon at the end
		rerender(<Input id="icon-end" icon="Bell" iconPosition="end" />)

		// Check if end icon is rendered
		expect(screen.getByTestId("input-icon-end")).toBeInTheDocument()
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<Input id="a11y-test" />)
		expect(result).toBeUndefined()
	})
})
