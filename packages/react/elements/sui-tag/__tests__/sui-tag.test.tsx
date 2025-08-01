import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"

import { Tag } from "../src"

describe("@wpmudev/sui-tag", () => {
	const text = "Pro"

	it("🧱 Renders correctly", () => {
		render(<Tag>{text}</Tag>)

		const tag = screen.getByTestId("tag")
		expect(tag).toBeInTheDocument()
		expect(tag).toHaveTextContent(text)
	})

	it("🎨 Applies design + colorScheme classes", () => {
		render(
			<Tag isOutlined={true} color="blue">
				{text}
			</Tag>,
		)

		const tag = screen.getByTestId("tag")
		expect(tag).toHaveClass("sui-tag--outlined-blue")
	})

	it("🚫 Applies disabled class when isDisabled", () => {
		render(<Tag isDisabled>{text}</Tag>)

		const tag = screen.getByTestId("tag")
		expect(tag).toHaveClass("sui-tag--disabled")
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<Tag>{text}</Tag>)
		expect(result).toBeUndefined()
	})
})
