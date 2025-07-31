import React, { ReactNode } from "react"

interface ColProps {
	size?: string | number
	children?: ReactNode
}

export const Col: React.FC<ColProps> = ({ size, children }) => {
	const hasSize = typeof size !== "undefined" && size !== ""
	return (
		<div className={`sui-col${hasSize ? ` sui-col--${size}` : ""}`}>
			{children}
		</div>
	)
}
