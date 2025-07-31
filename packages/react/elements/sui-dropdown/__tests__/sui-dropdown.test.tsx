import React, { useRef } from "react"
import "@testing-library/jest-dom"
import { screen, render, fireEvent } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { Button } from "@wpmudev/sui-button"
import { Dropdown, DropdownRefProps } from "../src"
import { MenuGroupProps, MenuItemProps } from "../src/Dropdown.types"

describe("@wpmudev/sui-dropdown", () => {
	const props = {
		label: "__MENU_BUTTON__",
		isSmall: false,
		iconOnly: false,
		onMenuClick: jest.fn(),
		children: "__BODY_CONTENT__",
		menu: [
			{
				id: "plugin-variants",
				label: "Plugin Variations",
				menus: [
					{
						id: "menu-ivt",
						label: "IVT",
						props: {
							icon: "PluginIvt",
							variation: "ivt",
						},
					},
				],
			},
		] as Array<MenuItemProps | MenuGroupProps>,
	}

	it("🧱 Renders correctly", () => {
		render(<Dropdown {...props} />)
		expect(screen.getByTestId("dropdown")).toBeInTheDocument()
	})

	it("🎯 Custom trigger button toggles dropdown", () => {
		const openBtnTitle = "__OPEN_BTN_TITLE__"

		const DropdownWithTrigger = () => {
			const ref = useRef<DropdownRefProps | null>(null)
			return (
				<Dropdown
					{...props}
					ref={ref}
					trigger={
						<Button onClick={() => ref?.current?.toggle()}>
							{openBtnTitle}
						</Button>
					}
				/>
			)
		}

		render(<DropdownWithTrigger />)
		const btn = screen.getByText(openBtnTitle)
		const dropdown = screen.getByTestId("dropdown")

		expect(dropdown).not.toHaveClass("sui-dropdown--open")
		fireEvent.click(btn)
		expect(dropdown).toHaveClass("sui-dropdown--open")
		fireEvent.click(btn)
		expect(dropdown).not.toHaveClass("sui-dropdown--open")
	})

	it("🎨 Applies 'isSmall' class when enabled", () => {
		render(<Dropdown {...props} isSmall={true} />)
		expect(screen.getByTestId("dropdown")).toHaveClass("sui-dropdown--sm")
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<Dropdown {...props} />)
		expect(result).toBeUndefined()
	})
})
