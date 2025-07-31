import React, { useState } from "react"
import "@testing-library/jest-dom"
import { screen, render, fireEvent } from "@testing-library/react"
import { a11yTest } from "@wpmudev/sui-devtools"
import { Checkbox, CheckboxGroup, CheckBoxGroups } from "../src"

describe("@wpmudev/sui-checkbox", () => {
	it("🧱 Renders correctly", () => {
		render(<Checkbox />)
		expect(screen.getByTestId("checkbox")).toBeInTheDocument()
	})

	it("🚫 Disabled state blocks interaction", () => {
		const Component = () => {
			const [checked, setChecked] = useState(false)

			return (
				<Checkbox
					isDisabled={true}
					isChecked={checked}
					onChange={(e) => setChecked(e.target.checked)}
				/>
			)
		}

		render(<Component />)

		const input = screen.getByTestId("checkbox-input")

		fireEvent.click(input)

		expect(input).toBeDisabled()
		expect(input).not.toBeChecked()
	})

	it("🔄 isIndeterminate applies correct style", () => {
		render(<Checkbox isIndeterminate />)
		expect(screen.getByTestId("checkbox")).toHaveClass(
			"sui-checkbox--indeterminate",
		)
	})

	it("☑️ isChecked applies correct style", () => {
		render(<Checkbox isChecked />)
		expect(screen.getByTestId("checkbox")).toHaveClass("sui-checkbox--checked")
	})

	it("♿️ Passes accessibility audit", async () => {
		const result = await a11yTest(<Checkbox />)
		expect(result).toBeUndefined()
	})

	it("🧩 CheckboxGroup passes common props to children", () => {
		const { container } = render(
			<CheckboxGroup
				title="Group 1 Label"
				commonCheckboxProps={{ name: "group-checkbox" }}
			>
				<Checkbox label="Item 1" />
				<Checkbox label="Item 2" />
			</CheckboxGroup>,
		)

		const checkboxes = container.querySelectorAll(".sui-checkbox > input")
		expect(checkboxes).toHaveLength(3)

		checkboxes.forEach((cb) =>
			expect(cb).toHaveAttribute("name", "group-checkbox"),
		)
	})

	it("🧩 CheckBoxGroups passes common props to all nested children", () => {
		const { container } = render(
			<CheckBoxGroups commonCheckboxProps={{ name: "groups-checkbox" }}>
				<CheckboxGroup title="Group 1" hasSubItems>
					<Checkbox label="Nested 1" />
					<Checkbox label="Nested 2" />
				</CheckboxGroup>
				<CheckboxGroup title="Group 2" hasSubItems>
					<Checkbox label="Nested 3" />
					<Checkbox label="Nested 4" />
				</CheckboxGroup>
			</CheckBoxGroups>,
		)

		const checkboxes = container.querySelectorAll(".sui-checkbox > input")
		expect(checkboxes).toHaveLength(6)

		checkboxes.forEach((cb) =>
			expect(cb).toHaveAttribute("name", "groups-checkbox"),
		)
	})

	it("🔗 Parent checkbox toggles all children", () => {
		const { container } = render(
			<CheckBoxGroups commonCheckboxProps={{ name: "groups-checkbox" }}>
				<CheckboxGroup title="Group" hasSubItems>
					<Checkbox label="Child 1" />
					<Checkbox label="Child 2" />
				</CheckboxGroup>
			</CheckBoxGroups>,
		)

		const checkboxes = container.querySelectorAll(".sui-checkbox")
		const parent = checkboxes[0]
		const child1 = checkboxes[1]
		const child2 = checkboxes[2]

		fireEvent.click(parent)
		checkboxes.forEach((cb) => expect(cb).toHaveClass("sui-checkbox--checked"))

		fireEvent.click(parent)
		checkboxes.forEach((cb) =>
			expect(cb).not.toHaveClass("sui-checkbox--checked"),
		)

		fireEvent.click(child1)
		fireEvent.click(child2)
		expect(parent).toHaveClass("sui-checkbox--checked")
	})

	it("🟡 Parent shows indeterminate when only one child is checked", () => {
		const { container } = render(
			<CheckBoxGroups commonCheckboxProps={{ name: "groups-checkbox" }}>
				<CheckboxGroup title="Group" hasSubItems>
					<Checkbox label="Child 1" />
					<Checkbox label="Child 2" />
				</CheckboxGroup>
			</CheckBoxGroups>,
		)

		const checkboxes = container.querySelectorAll(".sui-checkbox")
		const parent = checkboxes[0]
		const child = checkboxes[1]

		fireEvent.click(child)

		expect(child).toHaveClass("sui-checkbox--checked")
		expect(parent).toHaveClass("sui-checkbox--indeterminate")

		fireEvent.click(parent)
		checkboxes.forEach((cb) => expect(cb).toHaveClass("sui-checkbox--checked"))
	})

	it("🆔 Custom IDs work as expected", () => {
		const { container } = render(
			<CheckBoxGroups commonCheckboxProps={{ name: "groups-checkbox" }}>
				<CheckboxGroup title="Group" hasSubItems>
					<Checkbox id="1" label="Child 1" />
					<Checkbox id="2" label="Child 2" />
				</CheckboxGroup>
			</CheckBoxGroups>,
		)

		const checkboxes = container.querySelectorAll(".sui-checkbox")
		const parent = checkboxes[0]

		fireEvent.click(parent)

		checkboxes.forEach((cb) => expect(cb).toHaveClass("sui-checkbox--checked"))
	})
})
