import React, { ReactNode } from "react"
import { Breakpoint, AlignmentOption } from "./Grid.types"
interface RowProps {
	alignment?: Partial<Record<Breakpoint, AlignmentOption>>
	children?: ReactNode
}

export const Row: React.FC<RowProps> = ({ alignment, children }) => {
	const align = Object.assign(
		{
			xs: "",
			sm: "",
			md: "",
			lg: "",
			xl: "",
		},
		alignment,
	)

	let alignClass = ""

	for (const key in align) {
		const value = align[key as Breakpoint]

		if (value) {
			if (key === "xs") {
				if (value !== "stacked") {
					alignClass += ` sui-row--${value}`
				}
			} else {
				alignClass += ` sui-row-${key}--${value}`
			}
		}
	}

	return <div className={`sui-row${alignClass}`}>{children}</div>
}
