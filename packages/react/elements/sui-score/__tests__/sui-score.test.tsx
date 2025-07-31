import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { Score } from "../src"

describe("@wpmudev/sui-score", () => {
	// Utility to render <Score /> with default props
	const renderScore = (props = {}) =>
		render(<Score value={50} bar={50} {...props} />)

	it("🧱 Renders the component", () => {
		renderScore()
		expect(screen.getByTestId("score")).toBeInTheDocument()
	})

	it("🔊 Renders screen reader text", () => {
		renderScore()
		expect(screen.getByText("Score 50 out of 100")).toBeInTheDocument()
	})

	it("🎨 Applies the correct variation class", () => {
		renderScore({ state: "success" })
		expect(screen.getByTestId("score")).toHaveClass("sui-score--success")
	})

	it("📈 Shows correct animation and percentage", () => {
		render(<Score value={70} bar={70} />)

		const score = screen.getByTestId("score")
		const [, bar] = score.querySelectorAll(".sui-score__circle") || []
		const content = score.querySelector(".sui-score--content")

		expect(window.getComputedStyle(bar!).animation).toMatch("sui70")
		expect(content?.textContent).toContain("70%")
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<Score value={50} bar={50} />)
		expect(result).toBeUndefined()
	})
})
