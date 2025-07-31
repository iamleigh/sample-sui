import React, { Children, JSX } from "react"
// eslint-disable-next-line import/no-extraneous-dependencies
import LinkTo from "@storybook/addon-links/react"
import { isUndefined } from "../../../utils/index"
import logoLink from "../../../assets/logos/wpmudev.svg"
import "./footer.scss"

interface FooterProps {
	children: JSX.Element[] // Valid JSX Elements with props
}

const Footer: React.FC<
	FooterProps &
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
> = ({ children, ...props }) => {
	const menuItems = Children.map(children, (child, index) => {
		return (
			<li key={index} className="csb-footer__menu-item">
				{isUndefined(child?.props["data-link"]) &&
					isUndefined(child?.props["data-kind"]) && (
						<>{child?.props["data-label"]}</>
					)}

				{(!isUndefined(child?.props["data-link"]) ||
					!isUndefined(child?.props["data-kind"])) && (
					<>
						{!isUndefined(child?.props["data-link"]) && (
							<a
								href={child?.props["data-link"]}
								target="_blank"
								rel="noreferrer"
							>
								{child?.props["data-label"]}
							</a>
						)}

						{!isUndefined(child?.props["data-kind"]) && (
							<LinkTo
								kind={child?.props["data-kind"]}
								story={child?.props["data-story"]}
							>
								{child?.props["data-label"]}
							</LinkTo>
						)}
					</>
				)}
			</li>
		)
	})

	return (
		<div className="csb-footer" {...props}>
			<div className="csb-footer__brand">
				<img src={logoLink} alt="WPMU DEV Logo" aria-hidden="true" /> Powered by
				WPMU DEV
			</div>

			{!isUndefined(children) && (
				<div className="csb-footer__menu">
					<ul className="csb-footer__menu-list">{menuItems}</ul>
				</div>
			)}
		</div>
	)
}

export { Footer }
