import React from "react"
import classnames from "classnames"
import { Row, Col } from "../../../layout/index"
import { Code } from "../../../atoms/index"
import { isEmpty } from "../../../../utils/index"
import { getHsl } from "../utils/getHsl"

interface ColorProps {
	theme: "light" | "dark"
	overWhite?: boolean
	content?: {
		palette?: string
		shade?: string | number
		prefix?: string
		hex?: string
		variables?: boolean
	}
}

export const ColorCard: React.FC<
	ColorProps &
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
> = ({ content, theme, overWhite, ...props }) => {
	const cardClass = classnames({
		"csb-card csb-card--color": true,
		[`csb-card--${theme}`]: !!theme,
	})

	const objContent = Object.assign(
		{
			palette: "",
			shade: "",
			prefix: "",
			hex: "#000000",
			variables: true,
		},
		content,
	)

	// Check if `objContent` variables are empty or null.
	const hasPalette = !isEmpty(objContent.palette)
	const hasShade = !isEmpty(objContent.shade)
	const hasPrefix = !isEmpty(objContent.prefix)
	const hasHex = !isEmpty(objContent.hex)
	const hasVariables = objContent.variables

	if (hasPalette && objContent.palette.includes("alpha")) {
		objContent.shade = `a${objContent.shade}`
	}

	return (
		<div
			className={cardClass}
			{...(overWhite && { style: { background: "#F8F8F8" } })}
			{...props}
		>
			<div
				className="csb-card__preview"
				style={{
					background: objContent.hex,
				}}
			>
				{(hasShade || hasPrefix) && (
					<h3>
						{objContent.prefix}
						{hasShade && hasPrefix ? " / " : ""}
						{objContent.shade}
					</h3>
				)}
			</div>
			<div className="csb-card__info">
				{hasPalette && hasShade && hasVariables && (
					<Row>
						<Col size="6">
							<h4>SCSS Variable</h4>
							<Code theme="ghost" fullWidth={true}>
								$color-{objContent.palette}-{objContent.shade}
							</Code>
						</Col>
					</Row>
				)}

				{hasHex && (
					<Row>
						<Col size="3">
							<h4>HEX</h4>
							<Code theme="ghost" fullWidth={true}>
								{objContent.hex}
							</Code>
						</Col>
						<Col size="3">
							<h4>HSLA</h4>
							<Code theme="ghost" fullWidth={true}>
								{getHsl(objContent.hex)}, 1
							</Code>
						</Col>
					</Row>
				)}
			</div>
		</div>
	)
}
