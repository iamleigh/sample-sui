import React from "react"
// eslint-disable-next-line import/no-extraneous-dependencies
import classnames from "classnames"

interface RowProps {
	gutter?: "sm" | "lg"
	children: React.ReactNode
}

const Row: React.FC<
	RowProps &
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
> = ({ gutter, children, ...props }) => {
	const rowClasses = classnames({
		"csb-row": true,
		[`csb-row--${gutter}`]: !!gutter,
	})

	return (
		<div className={rowClasses} {...props}>
			{children}
		</div>
	)
}

export { Row }
