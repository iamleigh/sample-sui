import React, {
	useRef,
	useState,
	useId,
	forwardRef,
	useImperativeHandle,
	ChangeEvent,
	useCallback,
	useEffect,
} from "react"

import {
	_renderHTMLPropsSafely,
	generateClassNames,
	isEmpty,
} from "@wpmudev/sui-utils"
import {
	useOuterClick,
	useStyles,
	useBottomEnd,
	usePrevious,
	useDebounce,
} from "@wpmudev/sui-hooks"
import { Input } from "@wpmudev/sui-input"
import { Spinner } from "@wpmudev/sui-spinner"
import { Button, ButtonProps } from "@wpmudev/sui-button"
import { DropdownMenu } from "./DropdownMenu"
import { DropdownMenuItem } from "./DropdownMenuItem"
import { DropdownMenuGroup } from "./DropdownMenuGroup"
import { DropdownProps, DropdownRefProps } from "./Dropdown.types"

/**
 * Dropdown Component - A versatile and accessible dropdown menu for selecting or managing options.
 *
 * Supports features such as async data loading, search, multi-select with "Select All",
 * custom content rendering, and configurable placement and sizing.
 *
 * @param {DropdownProps} props - All configuration options, event callbacks, and content
 *                              customization for the Dropdown component.
 * @return {JSX.Element} A fully interactive dropdown menu element.
 */
const Dropdown = forwardRef<DropdownRefProps | null, DropdownProps>(
	(
		{
			label,
			className,
			colorScheme = "black",
			buttonIcon,
			iconOnly,
			hasArrow = true,
			isSmall = false,
			isResponsive = false,
			isAutoClose = true,
			isDisabled = false,
			menu,
			menuType = "",
			menuWidth = "md",
			menuPosition = "right",
			menuSelectAll = false,
			menuContentAbove = false,
			menuSearchPlaceholder,
			onMenuClick,
			onMenuItemClick,
			onMenuSearch,
			children,

			// Under development props
			isAsync = false,
			asyncOptions = {},
			selected = "",
			updateOptions = () => {},
			getOptions,
			_buttonProps = {},
			_htmlProps = {},
			_style = {},
		},
		ref,
	) => {
		const [isOpen, setIsOpen] = useState<boolean>(false)
		const [query, setQuery] = useState("")
		const [isFetchedAll, setIsFetchedAll] = useState(false)
		const [isLoading, setIsLoading] = useState(false)
		const [altLoader, setAltLoader] = useState(false)
		const [options, setOptions] = useState<DropdownProps["menu"]>(menu ?? [])
		const [page, setPage] = useState(1)
		const dropdownRef = useRef<HTMLDivElement | null>(null)
		const popoverRef = useRef<HTMLDivElement | null>(null)
		const searchInputRef = useRef<HTMLInputElement | null>(null)
		const id = `sui-dropdown-${useId()}`

		useOuterClick(dropdownRef, () => {
			if (isAutoClose) {
				handleOnOpen(false)
			}
		})

		const { handleScroll } = useBottomEnd(() => {
			if (!isLoading && !isFetchedAll) {
				loadFromAPI()
				setAltLoader(true)
			}
		})

		useImperativeHandle(ref, () => ({
			open: () => handleOnOpen(true),
			close: () => handleOnOpen(false),
			toggle: () => handleOnOpen(!isOpen),
		}))

		const { suiInlineClassname } = useStyles(_style, className)

		const searchQuery = useDebounce(query, 500)

		// Generate classes for the dropdown's wrapper based on the component's props.
		const wrapperClasses = generateClassNames(
			"sui-dropdown",
			{
				sm: isSmall,
				open: isOpen,
			},
			suiInlineClassname,
		)

		// Handle dropdown placement
		// Show dropdown on top/bottom based on the space available
		useEffect(() => {
			if (!isOpen || !popoverRef.current || !dropdownRef.current) {
				return
			}

			const popoverElement = popoverRef.current
			const triggerElement = dropdownRef.current

			const triggerRect = triggerElement.getBoundingClientRect()

			// Calculate the space available above and below the trigger button
			const spaceAbove = triggerRect.top
			const spaceBelow = window.innerHeight - triggerRect.bottom

			// Get the height of the popover
			const popoverHeight = popoverElement.offsetHeight

			// Determine if the popover height fits in the space below
			const showBelow = spaceBelow > popoverHeight

			// Determine if the space above is limited
			const spaceAboveLimited = spaceAbove < popoverHeight

			// Set the appropriate CSS class for placement
			popoverElement.classList.toggle(
				"sui-dropdown__popover--placement-top",
				!showBelow && !spaceAboveLimited,
			)
		}, [isOpen])

		// Update internal options state when menu prop changes
		useEffect(() => {
			if (isAsync && !menuSelectAll) {
				return
			}

			setOptions(menu)
		}, [isAsync, menuSelectAll, menu])

		// Load options from next page when list loads async
		const loadFromAPI = useCallback(async () => {
			// Do not continue
			if (!isAsync || isFetchedAll || isLoading) {
				return
			}

			// return if getOptions prop is missing
			if (!getOptions) {
				throw new Error("'getOptions' method is missing")
			}

			const { perPage = 5 } = asyncOptions ?? {}

			// Enable loader
			setIsLoading(true)

			const opt = { page, perPage }

			// Get options from API (to be hanlded in parent component)
			const data = await getOptions(searchQuery, opt, options)
			const { items, hasMore } = data

			// If selected is an array of objects, map through it to match with options
			const selectedArray = Array.isArray(selected) ? selected : []

			const updatedItems = items.map((item: Record<string, any>) => {
				// Check if this item is in the selected array
				const isSelected = selectedArray.some(
					(selectedItem) => selectedItem.id === item.id,
				)
				return { ...item, isSelected }
			})

			// Update options list
			setOptions(
				1 === page ? updatedItems : [...(options ?? []), ...updatedItems],
			)
			updateOptions(
				1 === page ? updatedItems : [...(options ?? []), ...updatedItems],
			)
			setIsLoading(false)
			setAltLoader(false)

			// Increase page
			if (hasMore) {
				setPage(page + 1)
			} else {
				setIsFetchedAll(true)
			}
		}, [
			isAsync,
			isFetchedAll,
			isLoading,
			getOptions,
			asyncOptions,
			page,
			searchQuery,
			options,
			selected,
			updateOptions,
		])

		// Handle list search
		const prevQuery = usePrevious(searchQuery)

		useEffect(() => {
			if ((prevQuery ?? "") !== searchQuery) {
				if (isAsync && !isLoading) {
					setOptions([])
					loadFromAPI()
				}

				if (!!onMenuSearch) {
					onMenuSearch(searchQuery)
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [searchQuery, onMenuSearch])

		// Handle open/close actions
		const handleOnOpen = useCallback(
			async (isDropdownOpen: boolean) => {
				setIsOpen(isDropdownOpen)

				// Focus search input when dropdown opens
				if (!!onMenuSearch) {
					setTimeout(() => searchInputRef.current?.focus(), 100)
				}

				// load options if not loaded before
				if (!!isAsync && isDropdownOpen && (options ?? [])?.length <= 0) {
					loadFromAPI()
				}

				// Pass state to parent component
				if (!!onMenuClick) {
					onMenuClick(isDropdownOpen)
				}
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[isAsync, onMenuClick],
		)

		// Handle all items selection on checkbox list
		const selectAllItem = () => {
			const allSelected = options?.every((option) => option?.isSelected)
			const isIndeterminate = options?.find((option) => option?.isSelected)

			const handleSelectAll = () => {
				const updatedOptions = options?.map((option) => ({
					...option,
					isSelected: !allSelected,
				}))

				setOptions(updatedOptions)
			}

			// @todo Make label dynamic so it can be translated
			const selectAllLabel = "Select All"

			return (
				<DropdownMenuItem
					key="select-all"
					isSelected={allSelected}
					onClick={handleSelectAll}
					_type={menuType}
					_checkboxProps={{
						isChecked: allSelected,
						isIndeterminate: !allSelected && !!isIndeterminate,
						isSmall,
					}}
				>
					{selectAllLabel}
				</DropdownMenuItem>
			)
		}

		// Function to recursively render menu items and groups.
		const renderMenus = (menus: DropdownProps["menu"]) => {
			return (
				<>
					{menuSelectAll &&
						"select-checkbox" === menuType &&
						(options ?? []).length > 0 &&
						selectAllItem()}

					{(menus || [])?.map((menuItem: Record<string, any>, index) => {
						// If it's a group item, render the MenuGroup component.
						if (!!menuItem?.menus) {
							return (
								<DropdownMenuGroup key={index} title={menuItem.label}>
									{renderMenus(menuItem?.menus)}
								</DropdownMenuGroup>
							)
						}

						// Bind onClick with onMenuItemClick prop
						if (onMenuItemClick) {
							menuItem.props = menuItem.props ?? {}
							menuItem.props.onClick = (e: ChangeEvent<unknown>) => {
								onMenuItemClick(menuItem, e)

								if ("select-variable" === menuType) {
									return
								}
								// Update isSelected property of all menu items
								if (!menuSelectAll) {
									const updatedOptions = options?.map((item) => ({
										...item,
										isSelected: item.id === menuItem.id, // Set the clicked item's isSelected to true, and others to false
									}))
									setOptions(updatedOptions)

									menuItem.isSelected = true
								} else {
									menuItem.isSelected = !menuItem.isSelected
								}
								if ("select-checkbox" !== menuType) {
									setIsOpen(false)
								}
							}
						}

						if (menuSelectAll) {
							menuItem.props = {
								...menuItem.props,
								_checkboxProps: {
									...menuItem?.props?._checkboxProps,
									isChecked: menuItem.isSelected,
									isSmall,
								},
							}
						}

						// Otherwise, render the MenuItem component.
						return (
							<DropdownMenuItem
								key={index}
								isSelected={menuItem.isSelected}
								{...menuItem.props}
								_type={menuType}
							>
								{menuItem.label}
							</DropdownMenuItem>
						)
					})}
				</>
			)
		}

		// Handle search callback
		const onSearchCallback = useCallback(
			(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setQuery(event?.target?.value)
				// Reset fetched all flag and page to 1
				if (isAsync) {
					setTimeout(() => {
						setPage(1)
						setIsFetchedAll(false)
					}, 100)
				}
			},
			[isAsync],
		)

		const hasContentAbove = menuContentAbove && !!children
		const renderMenuContent = (
			<div className="sui-dropdown__menu-content">{children}</div>
		)

		return (
			<div
				ref={dropdownRef}
				className={wrapperClasses}
				data-testid="dropdown"
				{..._renderHTMLPropsSafely(_htmlProps)}
			>
				<Button
					type="secondary"
					isSmall={isSmall ?? false}
					onClick={() => handleOnOpen(!isOpen)}
					isResponsive={isResponsive}
					isDisabled={isDisabled}
					{...(buttonIcon && { startIcon: buttonIcon })}
					iconOnly={iconOnly ?? false}
					{...(!iconOnly && hasArrow && { endIcon: "ChevronDown" })}
					colorScheme={colorScheme as ButtonProps["colorScheme"]}
					{..._buttonProps}
				>
					{label}
				</Button>

				<div
					id={id}
					tabIndex={-1}
					ref={popoverRef}
					className={generateClassNames("sui-dropdown__popover", {
						[`placement-${menuPosition}`]: !isEmpty(menuPosition ?? ""),
						[menuWidth]: true,
						[menuType]: !isEmpty(menuType ?? ""),
					})}
					{...(label && {
						"aria-labelledby": `${id}__label`,
						"aria-label": `${id}__label`,
					})}
				>
					{hasContentAbove && renderMenuContent}

					{(!!menu || isAsync) && (
						<DropdownMenu>
							{!!onMenuSearch && (
								<div className="sui-dropdown__menu-nav-search">
									<Input
										ref={searchInputRef}
										id={`${id}__search`}
										icon="Search"
										iconPosition="start"
										isSmall={true}
										placeholder={menuSearchPlaceholder ?? "Search"}
										onChange={onSearchCallback}
									/>
								</div>
							)}

							<ul className="sui-dropdown__menu-items" onScroll={handleScroll}>
								{renderMenus(options)}
								{isLoading && (
									<li
										className={generateClassNames("", {
											"sui-dropdown__menu-item-loading": true,
											"sui-dropdown__menu-item-loading--alt": altLoader,
										})}
										tabIndex={-1}
									>
										<Spinner
											colorScheme={altLoader ? "dark" : "primary"}
											loaderSize="sm"
										/>
										<span>{altLoader ? "Loading..." : "Loading"}</span>
									</li>
								)}
							</ul>
						</DropdownMenu>
					)}

					{!hasContentAbove && renderMenuContent}
				</div>
			</div>
		)
	},
)

Dropdown.displayName = "Dropdown"

export { Dropdown }
