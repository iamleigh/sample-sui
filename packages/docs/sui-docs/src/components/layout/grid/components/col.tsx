import React from "react"
// eslint-disable-next-line import/no-extraneous-dependencies
import classnames from "classnames"

interface ColProps {
	size?: "1" | "2" | "3" | "4" | "5" | "6"
	children: React.ReactNode
}
const Col: React.FC<
	ColProps &
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
> = ({ size, children, ...props }) => {
	const colClasses = classnames({
		"csb-col": true,
		[`csb-col--${size}`]: size,
	})

	return (
		<div className={colClasses} {...props}>
			{children}
		</div>
	)
}

export { Col }
