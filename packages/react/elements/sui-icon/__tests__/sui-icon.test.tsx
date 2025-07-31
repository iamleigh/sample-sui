import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Icon } from "../src"

describe("@wpmudev/sui-icon", () => {
	it("🧱 Renders the icon with default props", () => {
		render(<Icon />)

		// Assert icon is in the document by test ID
		const icon = screen.getByTestId("svg-icon")
		expect(icon).toBeInTheDocument()

		// Assert it has correct tag/role
		expect(icon.tagName.toLowerCase()).toBe("svg")
	})
})
