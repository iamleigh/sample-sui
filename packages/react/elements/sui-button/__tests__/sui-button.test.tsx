import React from "react"
import "@testing-library/jest-dom"
import { render, screen, within } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { Button } from "../src"

describe("@wpmudev/sui-button", () => {
	it("🧱 Renders with default props", () => {
		render(<Button>Submit</Button>)

		const button = screen.getByTestId("button")
		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent("Submit")
	})

	it("🧩 Renders with icon and label", () => {
		render(<Button icon="Close">Button with Icon</Button>)

		const button = screen.getByTestId("button")
		const label = within(button).getByText("Button with Icon")
		const icon = screen.getByTestId("button-icon")

		expect(label).toBeInTheDocument()
		expect(icon).toBeInTheDocument()
	})

	it("🎯 Renders icon-only button", () => {
		render(
			<Button icon="Close" iconOnly={true}>
				Should not be visible
			</Button>,
		)

		expect(screen.queryByTestId("button-label")).not.toBeInTheDocument()
		expect(screen.getByTestId("button-icon")).toBeInTheDocument()
	})

	it("🎨 Applies correct type and color scheme classes", () => {
		render(
			<Button type="primary" colorScheme="red">
				ERROR
			</Button>,
		)

		const button = screen.getByTestId("button")
		const label = screen.getByTestId("button-label")

		expect(button).toHaveClass("sui-button--primary-red")
		expect(label).toBeInTheDocument()
		expect(label).toHaveTextContent("ERROR")
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<Button>Accessible</Button>)
		expect(result).toBeUndefined()
	})
})
