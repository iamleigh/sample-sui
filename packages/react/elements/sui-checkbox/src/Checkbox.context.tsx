import React, { createContext, useCallback, useContext, useState } from "react"
import {
	CheckboxContextProps,
	CheckboxItemTypes,
	CheckBoxItemsList,
	CheckboxProviderTypes,
} from "./Checkbox.types"

// Create context with default values
const CheckboxContext = createContext<CheckboxContextProps>({
	items: [],
	setItems: () => {},
	onChange: () => {},
})

/**
 * CheckboxProvider
 * Wrap your component tree with this to manage and share checkbox state.
 * @param root0
 * @param root0.children
 * @param root0.onChange
 */
const CheckboxProvider = ({ children, onChange }: CheckboxProviderTypes) => {
	const [items, setItems] = useState<CheckBoxItemsList>([])

	const handleOnChange = useCallback(
		(
			id: CheckBoxItemsList | CheckboxItemTypes["id"],
			isChecked?: CheckboxItemTypes["isChecked"],
			groupId?: CheckboxItemTypes["groupId"],
		) => {
			if (typeof id !== "string") {
				return
			}

			setItems((prevItems) => {
				const updatedItem: CheckboxItemTypes = { id, groupId, isChecked }

				const existingIndex = prevItems.findIndex(
					(item) => item.id === id && item.groupId === groupId,
				)

				const nextItems = [...prevItems]

				if (existingIndex > -1) {
					nextItems[existingIndex] = updatedItem
				} else {
					nextItems.push(updatedItem)
				}

				if (onChange) {
					onChange(nextItems)
				}

				return nextItems
			})
		},
		[onChange],
	)

	return (
		<CheckboxContext.Provider
			value={{ items, setItems, onChange: handleOnChange }}
		>
			{children}
		</CheckboxContext.Provider>
	)
}

/**
 * useCheckbox
 * A custom hook to consume the Checkbox context with helpful utilities.
 */
const useCheckbox = () => {
	// Access the Checkbox context
	const ctx = useContext(CheckboxContext)

	// Ensure that the CheckboxContext is available; throw an error if not
	if (!ctx) {
		throw new Error(
			"useCheckbox must be used within a <CheckboxContextProvider>",
		)
	}

	// Define a callback function triggered by the Checkboxes onChange event
	const onChangeCallback = (
		id: CheckboxItemTypes["id"],
		isChecked?: CheckboxItemTypes["isChecked"],
		groupId?: CheckboxItemTypes["groupId"],
	) => {
		// Trigger the onChange method from CheckboxContext, if it exists
		ctx?.onChange?.(id, isChecked, groupId)
	}

	// Function to add Checkbox details to the context's list
	const addToList = (
		id: string,
		isChecked?: boolean,
		groupId?: boolean | string,
	) => {
		// Trigger the onChange method from CheckboxContext, if it exists
		ctx?.onChange?.(id, isChecked, groupId)
	}

	return {
		...ctx, // Include other properties from CheckboxContext
		onChange: onChangeCallback,
		addToList,
	}
}

export { useCheckbox, CheckboxContext, CheckboxProvider }
