import React, { useRef } from "react"
import "@testing-library/jest-dom"
import { screen, render, fireEvent } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { Button } from "@wpmudev/sui-button"
import { Dropdown, DropdownRefProps } from "../src"
import { MenuGroupProps } from "../src/DropdownMenuGroup.types"
import { MenuItemProps } from "../src/DropdownMenuItem.types"

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

	it("🎨 Applies 'isSmall' class when enabled", () => {
		render(<Dropdown {...props} isSmall={true} />)
		expect(screen.getByTestId("dropdown")).toHaveClass("sui-dropdown--sm")
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<Dropdown {...props} />)
		expect(result).toBeUndefined()
	})
})
