import React from "react"
import "@testing-library/jest-dom"
import { a11yTest } from "@wpmudev/sui-devtools"
import { render, screen } from "@testing-library/react"
import { FormField } from "../src"

describe("@wpmudev/sui-form-field", () => {
	it("🧱 Renders without crashing", () => {
		render(<FormField id="field-1" label="Test label" />)

		// Check if the form field container is in the document
		expect(screen.getByTestId("form-field")).toBeInTheDocument()
	})

	it("🏷️ Displays label and helper text", () => {
		const label = "Test label"
		const helper = "This is helper text"

		render(<FormField id="test" label={label} helper={helper} />)

		// Label and helper should be visible
		expect(screen.getByText(label)).toBeInTheDocument()
		expect(screen.getByText(helper)).toBeInTheDocument()
	})

	it("🚨 Renders an error message when provided", () => {
		const errorMsg = "Something went wrong"

		render(<FormField id="test" label="Test error message" error={errorMsg} />)

		// Error message should appear in the document
		expect(screen.getByText(errorMsg)).toBeInTheDocument()
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<FormField id="field-1" label="Test label" />)
		expect(result).toBeUndefined()
	})
})
