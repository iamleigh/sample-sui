import React, { RefObject } from "react"
import "@testing-library/jest-dom"
import { render, screen, renderHook } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { Spinner, useSpinner } from "../src"

describe("@wpmudev/sui-spinner", () => {
	it("🧱 Renders the spinner into the DOM", () => {
		render(<Spinner />)
		const spinner = screen.getByTestId("spinner")
		expect(spinner).toBeInTheDocument()
	})

	describe("🎨 Styling props", () => {
		it('applies the class "sui-spinner--lg" when loaderSize is "lg"', () => {
			render(<Spinner loaderSize="lg" />)
			expect(screen.getByTestId("spinner")).toHaveClass("sui-spinner--lg")
		})

		it('applies the class "sui-spinner--dark" when colorScheme is "dark"', () => {
			render(<Spinner colorScheme="dark" />)
			expect(screen.getByTestId("spinner")).toHaveClass("sui-spinner--dark")
		})
	})

	describe("📐 Layout props", () => {
		it('applies the class "sui-spinner--absolute" when isAbsolute is true', () => {
			render(<Spinner isAbsolute />)
			expect(screen.getByTestId("spinner")).toHaveClass("sui-spinner--absolute")
		})
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<Spinner />)
		expect(result).toBeUndefined()
	})

	describe("🔄 useSpinner hook", () => {
		it("returns `isVisible` as false by default when Spinner is not in view", () => {
			const ref = React.createRef<HTMLDivElement>()
			const { result } = renderHook(() =>
				useSpinner(ref as RefObject<HTMLDivElement>, {}),
			)

			render(<div ref={ref}>Test Content</div>)

			expect(result.current).toBeDefined()
			expect(result.current.isVisible).toBe(false)
		})
	})
})
