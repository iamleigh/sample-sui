import React from "react"
import { Body } from "../../../templates/index"

interface CanvasPageProps {
	children: React.ReactNode
}

const CanvasPage: React.FC<
	CanvasPageProps &
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
> = ({ children, ...args }) => {
	return (
		<div className="csb-page" style={{ background: "transparent" }} {...args}>
			<Body>{children}</Body>
		</div>
	)
}

export { CanvasPage }
