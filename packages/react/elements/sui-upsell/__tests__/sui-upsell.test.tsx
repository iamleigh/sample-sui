import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { Upsell } from "../src"

describe("@wpmudev/sui-upsell", () => {
	it("🧱 Renders the component into the DOM", () => {
		render(<Upsell />)

		const upsell = screen.getByTestId("upsell")
		expect(upsell).toBeInTheDocument()
	})

	it("📝 Renders title and description", () => {
		const title = "Upsell Title"
		const description = "Upsell description"

		render(<Upsell title={title} description={description} />)

		expect(screen.getByText(title)).toBeInTheDocument()
		expect(screen.getByText(description)).toBeInTheDocument()
	})

	it("🎨 Applies variation class properly", () => {
		render(<Upsell variation="hummingbird" />)

		const upsell = screen.getByTestId("upsell")
		expect(upsell).toHaveClass("sui-upsell--hummingbird")
	})

	it("📋 Renders features list", () => {
		const features = [
			"Performance Test Reporting",
			"Uptime monitoring",
			"Enhanced file minification with CDN",
			"Database Cleanup notifications",
		]

		render(<Upsell features={features} />)

		const featureList = screen.getByTestId("features")
		expect(featureList).toBeInTheDocument()
	})

	it("♿ Passes accessibility audit", async () => {
		const result = await a11yTest(<Upsell />)
		expect(result).toBeUndefined()
	})
})
