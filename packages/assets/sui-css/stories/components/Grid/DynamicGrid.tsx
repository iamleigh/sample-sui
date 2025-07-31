import React from "react"
import { Grid as SuiGrid } from "./Grid"
import { Block } from "./Block"
import { Breakpoint, AlignmentOption } from "./Grid.types"

interface DynamicGridProps {
	size?: number | string
	alignment?: Partial<Record<Breakpoint, AlignmentOption>>
}

export const Grid: React.FC<DynamicGridProps> = ({ size, alignment }) => {
	let numbColumns = 12
	const printColumns: React.ReactNode[] = []

	if (typeof size !== "undefined" && size !== "") {
		numbColumns = 12 / Number(size)
	}

	if (Number.isInteger(numbColumns)) {
		for (let i = 0; i < numbColumns; i++) {
			printColumns.push(
				<div key={i} {...(size ? { size } : {})}>
					<Block>.sui-col--{size}</Block>
				</div>,
			)
		}
	} else {
		printColumns.push(
			<div key="partial-1" {...(size ? { size } : {})}>
				<Block>.sui-col--{size}</Block>
			</div>,
		)

		printColumns.push(
			<div key="partial-2" {...(size ? { size: 12 - Number(size) } : {})}>
				<Block color="blue">.sui-col--{12 - Number(size)}</Block>
			</div>,
		)
	}

	return <SuiGrid alignment={alignment}>{printColumns}</SuiGrid>
}
