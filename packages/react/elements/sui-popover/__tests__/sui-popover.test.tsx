import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { Popover } from "../src"

describe("@wpmudev/sui-popover", () => {
	const label = "Popover Title"
	const description = "Popover Content"

	it("🧱 Renders title and content", () => {
		render(<Popover header={label}>{description}</Popover>)

		// 📌 It should display both the header and content
		expect(screen.getByText(label)).toBeInTheDocument()
		expect(screen.getByText(description)).toBeInTheDocument()
	})

	it("🧱 Renders optional image when provided", () => {
		const imgUrl = "https://placehold.co/600x400/EEE/31343C"

		const { container } = render(
			<Popover header="Popup with Image" image={imgUrl}>
				{description}
			</Popover>,
		)

		const imgElement = container.querySelector(".sui-popover__popup-image")
		expect(imgElement).toBeInTheDocument()
	})

	it("📍 Applies correct placement class", () => {
		render(
			<Popover header={label} placement="bottom" trigger="Test Button">
				{description}
			</Popover>,
		)

		const popoverEl = screen.getByTestId("popover")

		// ✅ Should have the bottom placement class
		expect(popoverEl).toHaveClass("sui-popover--bottom")

		// 📌 Description should still be rendered
		expect(screen.getByText(description)).toBeInTheDocument()
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(
			<Popover header={label} trigger="Test Button" placement="top">
				{description}
			</Popover>,
		)
		expect(result).toBeUndefined()
	})
})
