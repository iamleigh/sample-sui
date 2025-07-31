import React from "react"
// eslint-disable-next-line import/no-extraneous-dependencies
import classnames from "classnames"
import "./tooltip.scss"

interface TooltipProps {
	id: string
	description?: string
	active: boolean
	children: React.ReactNode
}

const Tooltip: React.FC<
	TooltipProps &
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
> = ({ id, description, active = false, children, ...props }) => {
	const tooltipClasses = classnames({
		"csb-tooltip": true,
		"csb-tooltip--active": active,
	})

	return (
		<div className={tooltipClasses} {...props}>
			{children}

			<div role="tooltip" id={id} className="csb-tooltip__message">
				{active && <>{description}</>}
			</div>
		</div>
	)
}

export { Tooltip }
