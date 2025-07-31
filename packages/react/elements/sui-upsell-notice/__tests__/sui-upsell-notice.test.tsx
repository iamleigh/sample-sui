import React from "react"
import "@testing-library/jest-dom"
import { screen, render } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { UpsellNotice } from "../src"

describe("@wpmudev/sui-upsell-notice", () => {
	it("🧱 Renders correctly", () => {
		render(<UpsellNotice />)
		expect(screen.getByTestId("upsell-notice")).toBeInTheDocument()
	})

	it("📝 Renders title and description", () => {
		const title = "Upsell Title"
		const description = "Upsell description"

		render(<UpsellNotice title={title} description={description} />)

		expect(screen.getByText(title)).toBeInTheDocument()
		expect(screen.getByText(description)).toBeInTheDocument()
	})

	it("🎨 Applies variation class", () => {
		render(<UpsellNotice variation="hummingbird" />)

		expect(screen.getByTestId("upsell-notice")).toHaveClass(
			"sui-upsell-notice--hummingbird",
		)
	})

	it("🔖 Displays tagTitle when provided", () => {
		render(<UpsellNotice tagTitle="PRO" />)
		expect(screen.getByTestId("tag")).toBeInTheDocument()
	})

	it("✅ Renders features correctly", () => {
		const features = [
			"Performance Test Reporting",
			"Uptime monitoring",
			"Enhanced file minification with CDN",
			"Database Cleanup notifications",
		]

		render(<UpsellNotice features={features} />)

		expect(screen.getByTestId("features")).toBeInTheDocument()

		features.forEach((feature) => {
			expect(screen.getByText(feature)).toBeInTheDocument()
		})
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<UpsellNotice />)
		expect(result).toBeUndefined()
	})
})
