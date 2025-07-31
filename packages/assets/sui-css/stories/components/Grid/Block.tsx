import React, { HTMLAttributes, ReactNode } from "react"

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
	container?: boolean
	color?: "blue" | string
	title?: string
	children?: ReactNode
}

export const Block: React.FC<BlockProps> = ({
	container = false,
	color,
	title,
	children,
	...args
}) => {
	const isContainer = container && typeof container === "boolean"

	const decorator: React.CSSProperties = {
		minHeight: 60,
		overflow: "hidden",
		borderRadius: 4,
		fontSize: 10,
		lineHeight: "16px",
		fontFamily: "Menlo, Courier, monospace",
		fontWeight: "bold",
	}

	if (isContainer) {
		decorator.padding = "15px 10px"
	} else {
		decorator.display = "flex"
		decorator.alignItems = "center"
		decorator.justifyContent = "center"
		decorator.padding = 5
	}

	switch (color) {
		case "blue":
			decorator.background = "#e1eaff"
			decorator.color = "#0056b1"
			break

		default:
			decorator.background = "#f9e1ff"
			decorator.color = "#8d00b1"
			break
	}

	return (
		<div style={decorator} {...args}>
			{title && title !== "" && (
				<span style={{ display: "block", marginBottom: 10 }}>{title}</span>
			)}
			{children}
		</div>
	)
}
