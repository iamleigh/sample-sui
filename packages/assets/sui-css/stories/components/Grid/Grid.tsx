import React, { ReactNode, Children, isValidElement } from "react"
import { Row } from "./Row"
import { Col } from "./Col"
import { Breakpoint, AlignmentOption } from "./Grid.types"

interface ColProps {
	size?: string
	children?: ReactNode
}

interface GridProps {
	alignment?: Partial<Record<Breakpoint, AlignmentOption>>
	children: ReactNode
}

export const Grid: React.FC<GridProps> = ({ alignment, children }) => {
	const columns = Children.map(children, (column, index) => {
		if (isValidElement<ColProps>(column)) {
			const hasSize =
				typeof column.props.size !== "undefined" && column.props.size !== ""

			return (
				<Col key={`col-${index}`} {...(hasSize && { size: column.props.size })}>
					{column.props.children}
				</Col>
			)
		}

		return null
	})

	return <Row alignment={alignment}>{columns}</Row>
}
