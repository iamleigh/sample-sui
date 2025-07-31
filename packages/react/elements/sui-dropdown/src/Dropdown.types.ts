import React, { HTMLProps } from "react"
import {
	OmitNestedKey,
	SuiHTMLAttributes,
	SuiStyleType,
} from "@wpmudev/sui-utils"
import { IconsNamesType } from "@wpmudev/sui-icons"
import { ButtonProps } from "@wpmudev/sui-button"
import { MenuItemProps } from "./DropdownMenuItem.types"
import { MenuGroupProps } from "./DropdownMenuGroup.types"

type getOptionOptTypes = {
	page?: number
}

/**
 * Props for the `Dropdown` component, providing configuration for its appearance, behavior, and menu options.
 *
 * This interface extends common HTML attributes and style types, allowing for flexible customization.
 *
 * @remarks
 * - Supports single and multi-select modes, async loading, custom triggers, and search functionality.
 * - Menu items can be grouped or standalone, with custom content and selection callbacks.
 */
interface DropdownProps
	extends OmitNestedKey<
			SuiHTMLAttributes<HTMLProps<HTMLDivElement>>,
			"_htmlProps",
			"className"
		>,
		SuiStyleType {
	/**
	 * Text label displayed on the dropdown trigger button.
	 *
	 * Provides a clear description of the dropdown's purpose.
	 */
	label: string
	/**
	 * Custom class name(s) applied to the dropdown container
	 * for additional styling or layout overrides.
	 */
	className?: string
	/**
	 * Defines the color scheme of the dropdown trigger button.
	 *
	 * Useful for aligning the dropdown with brand or UI theme colors.
	 */
	colorScheme?: ButtonProps["colorScheme"]
	/**
	 * Optional icon to display within the dropdown trigger button.
	 *
	 * Can be used alone or alongside the label for visual context.
	 */
	buttonIcon?: IconsNamesType
	/**
	 * Indicates whether the label should be visually hidden or not.
	 *
	 * @default false
	 */
	iconOnly?: boolean
	/**
	 * Determines whether to display an arrow icon in the dropdown button.
	 *
	 * @default true
	 */
	hasArrow?: boolean
	/**
	 * When true, hides the button label on smaller screens,
	 * showing only the icon for a more compact layout.
	 *
	 * @default false
	 */
	isResponsive?: boolean
	/**
	 * Indicates whether the dropdown button size should be small or not.
	 *
	 * @default false
	 */
	isSmall?: boolean
	/**
	 * If true, disables the dropdown and prevents user interaction.
	 */
	isDisabled?: boolean
	/**
	 * Determines whether the dropdown should close when clicking outside of it.
	 *
	 * @default true
	 */
	isAutoClose?: boolean
	/**
	 * Specifies the expected type for each item in the menu array.
	 * Accepts either a single menu item or a group of menu items.
	 */
	menu?: Array<MenuItemProps | MenuGroupProps>
	/**
	 * Specifies the dropdown menu's selection behavior.
	 * - "select": Single selection mode.
	 * - "select-checkbox": Multiple selection with checkboxes.
	 * - "select-variable": Selection with variable display.
	 */
	menuType?: "" | "select" | "select-checkbox" | "select-variable"
	/**
	 * Defines the width of the dropdown menu container.
	 * - "sm": Renders a compact menu with reduced spacing.
	 * - "md": Default size, providing a balanced layout for most use cases.
	 * - "lg": Larger menu, offering more space for content-rich options.
	 *
	 * This prop only affects the dropdown menu container, not the trigger button.
	 *
	 * @default "md"
	 */
	menuWidth?: "sm" | "md" | "lg"
	/**
	 * Specifies the position of the dropdown popover relative to the trigger.
	 * - "left": Popover sticks to the left of the trigger.
	 * - "right": Popover sticks to the right of the trigger.
	 *
	 * This prop only affects the dropdown menu container, not the trigger button.
	 *
	 * @default "right"
	 */
	menuPosition?: "left" | "right"
	/**
	 * Enables a "Select All" option within the dropdown menu when in multi-select mode.
	 *
	 * When set to true, users can quickly select or deselect all available options
	 * in the dropdown menu with a single action.
	 *
	 * This prop only applies when `menuType` is set to "select-checkbox".
	 *
	 * @default false
	 */
	menuSelectAll?: boolean
	/**
	 * Determines whether to display custom content above the dropdown menu items.
	 *
	 * When enabled, the specified content renders at the top of the dropdown menu,
	 * appearing before all menu options.
	 *
	 * This prop only affects the dropdown menu container and does not impact
	 * the trigger button.
	 *
	 * @default false
	 */
	menuContentAbove?: boolean
	/**
	 * Placeholder text to display inside the dropdown's search input.
	 *
	 * Useful for guiding users on what they can search for within the menu options.
	 * Only shown when the search input is enabled via the `onMenuSearch` callback.
	 *
	 * @example "Search options..."
	 */
	menuSearchPlaceholder?: string
	/**
	 * Callback function triggered when the dropdown is opened or closed.
	 *
	 * Provides the current open state of the dropdown menu.
	 *
	 * @param isOpen - Boolean indicating whether the dropdown is currently open (`true`)
	 * or closed (`false`).
	 */
	onMenuClick?: (isOpen: boolean) => void
	/**
	 * Callback function triggered when a menu item is clicked.
	 * Receives the selected option and the associated change event.
	 */
	onMenuItemClick?: (
		option: Record<string, any> | string,
		e?: React.ChangeEvent<unknown>,
	) => void
	/**
	 * Callback function triggered when the user performs a search within the dropdown.
	 *
	 * Defining this prop automatically enables the search input in the dropdown menu,
	 * eliminating the need for a separate `menuSearch` flag (now deprecated).
	 *
	 * Use this callback to handle search queries and filter dropdown options accordingly.
	 *
	 * @param query - The search string entered by the user.
	 */
	onMenuSearch?: (query: string) => void
	/**
	 * The content of the dropdown.
	 */
	children?: React.ReactNode

	/**
	 * Under development props
	 *
	 * All these props are being developed and still require some improvements
	 * in the code or clarification on its usage.
	 */
	selected?:
		| string
		| Array<MenuItemProps | MenuGroupProps>
		| Record<string, any>

	selectAll?: (
		options: Array<MenuItemProps | MenuGroupProps>,
		selected: boolean,
	) => void

	isAsync?: boolean

	asyncOptions?: {
		perPage: number
		totalItems?: number
	}

	getOptions?: (
		query: string,
		opt: getOptionOptTypes,
		options?: DropdownProps["menu"],
	) => Promise<any>

	_buttonProps?: ButtonProps

	updateOptions?: (options: { [key: string]: any }[]) => void
}

/**
 * Exposes imperative methods for controlling the Dropdown component programmatically.
 *
 * Useful when you need to open, close, or toggle the dropdown menu
 * from outside of its normal trigger interactions (e.g., from a parent component).
 */
type DropdownRefProps = {
	/**
	 * Opens the dropdown menu.
	 */
	open: () => void

	/**
	 * Closes the dropdown menu.
	 */
	close: () => void

	/**
	 * Toggles the dropdown menu between open and closed states.
	 */
	toggle: () => void
}

export type { DropdownProps, DropdownRefProps }
