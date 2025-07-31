import React from "react"
// eslint-disable-next-line import/no-extraneous-dependencies
import classnames from "classnames"
import { linkTo } from "@storybook/addon-links"
import { Button } from "../../../atoms/button/button"
import { isEmpty } from "../../../../utils/index"

interface SimpleProps {
	title: string
	description: string
	image: {
		src: string
		src2x: string
		width?: string
		height?: string
		alt?: string
	}
	action: string
	theme: "dark" | "light"
}

export const SimpleCard: React.FC<SimpleProps> = ({
	title,
	description,
	image,
	action,
	theme,
	...props
}) => {
	const cardClass = classnames({
		"csb-card csb-card--center": true,
		[`csb-card--${theme}`]: !!theme,
	})

	const fig = Object.assign(
		{
			alt: "Shared UI Developers Showcase",
			src: "",
			src2x: "",
			width: "",
			height: "",
		},
		image,
	)

	return (
		<div className={cardClass} {...props}>
			{!isEmpty(fig.src) && (
				<div className="csb-card__image" aria-hidden="true">
					<img
						alt={fig.alt}
						src={fig.src}
						{...(!isEmpty(fig.src2x) && {
							srcSet: `${fig.src} 1x, ${fig.src2x} 2x`,
						})}
						{...(!isEmpty(fig.width) && { width: `${fig.width}` })}
						{...(!isEmpty(fig.height) && { height: `${fig.height}` })}
					/>
				</div>
			)}

			<div className="csb-card__info">
				{!isEmpty(title) && <h3 className="csb-card__title">{title}</h3>}
				{!isEmpty(description) && (
					<p className="csb-card__description">{description}</p>
				)}
				{!isEmpty(action) && (
					<Button
						type="button"
						label="Learn More"
						style="secondary"
						{...("light" === theme && { color: "black" })}
						{...("dark" === theme && { color: "white" })}
						className="csb-banner__cta"
						onClick={linkTo(action)}
					/>
				)}
			</div>
		</div>
	)
}
